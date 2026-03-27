require('dotenv').config();
const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const compression = require('compression');
const pino = require('pino');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const Redis = require('ioredis');
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://blcsoftsale.kz,https://www.blcsoftsale.kz,http://localhost:3000,https://monkfish-app-hi9r9.ondigitalocean.app')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOriginSet = new Set(ALLOWED_ORIGINS);

const requiredEnv = ['TELEGRAM_TOKEN', 'TELEGRAM_CHAT_ID'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
    process.stderr.write(`Missing required environment variables: ${missingEnv.join(', ')}\n`);
    process.exit(1);
}

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime
});

const baseRateLimitConfig = {
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests' }
};

let sendRateLimiter;

if (process.env.REDIS_URL) {
    const redisClient = new Redis(process.env.REDIS_URL);
    redisClient.on('error', (error) => {
        logger.error({ err: error }, 'redis client error');
    });

    sendRateLimiter = rateLimit({
        ...baseRateLimitConfig,
        store: new RedisStore({
            sendCommand: (...args) => redisClient.call(...args)
        })
    });

    logger.info('rate limiter store: redis');
} else {
    sendRateLimiter = rateLimit(baseRateLimitConfig);
    logger.warn('REDIS_URL is not set; rate limiter uses in-memory store');
}

app.set('trust proxy', 1);

app.use((req, res, next) => {
    const startedAt = Date.now();
    res.on('finish', () => {
        logger.info({
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Date.now() - startedAt,
            ip: req.ip
        }, 'request completed');
    });
    next();
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
            scriptSrcAttr: ["'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'https://logo.clearbit.com'],
            connectSrc: ["'self'"],
            formAction: ["'self'"]
        }
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permissionsPolicy: {
        features: {
            camera: [],
            geolocation: [],
            microphone: []
        }
    },
    hsts: false
}));

app.use((req, res, next) => {
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
    if (isHttps) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
});

app.use(compression());

app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));

function sanitize(str) {
    return String(str).replace(/[&<>"'/]/g, function (s) {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;'
        };
        return entityMap[s];
    });
}

function checkCSRF(req, res, next) {
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    if (!origin && !referer) {
        return res.status(403).json({ error: 'CSRF Forbidden' });
    }

    const getOriginFromSource = (source) => {
        try {
            return new URL(source).origin;
        } catch (_error) {
            return null;
        }
    };

    const isAllowedOrigin = (source) => {
        const sourceOrigin = getOriginFromSource(source);
        return !!sourceOrigin && allowedOriginSet.has(sourceOrigin);
    };

    if (origin && !isAllowedOrigin(origin)) {
        return res.status(403).json({ error: 'CSRF Forbidden' });
    }

    if (referer && !isAllowedOrigin(referer)) {
        return res.status(403).json({ error: 'CSRF Forbidden' });
    }

    next();
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const cleaned = String(phone).replace(/\D/g, '');
    return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.post('/send', sendRateLimiter, checkCSRF, async (req, res) => {

    try {
        if (req.body.phone && !validatePhone(req.body.phone)) {
            return res.status(400).json({ error: 'Некорректный формат номера телефона' });
        }

        const sanitizedBody = {};
        for (const [key, val] of Object.entries(req.body)) {
            sanitizedBody[key] = sanitize(val);
        }

        const message = Object.entries(sanitizedBody).map(([key, val]) => `${key}: ${val}`).join('\n');
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: `Новая заявка:\n${message}`
        });

        res.json({ success: true });
    } catch (error) {
        logger.error({ err: error }, 'send endpoint failed');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    logger.info({ port: PORT }, 'server started');
});