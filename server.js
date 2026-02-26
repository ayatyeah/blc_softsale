require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const rateLimit = new Map();
const RATE_LIMIT_TIME = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

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
    const host = req.headers.host;

    if (!origin && !referer) return next();

    if (origin && !origin.includes(host)) {
        return res.status(403).json({ error: 'CSRF Forbidden' });
    }
    next();
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const cleaned = String(phone).replace(/\D/g, '');
    return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

app.post('/send', checkCSRF, async (req, res) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, firstRequest: now });
    } else {
        const data = rateLimit.get(ip);
        if (now - data.firstRequest > RATE_LIMIT_TIME) {
            rateLimit.set(ip, { count: 1, firstRequest: now });
        } else {
            if (data.count >= RATE_LIMIT_MAX) {
                return res.status(429).json({ error: 'Too many requests' });
            }
            data.count++;
        }
    }

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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));