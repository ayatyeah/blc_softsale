const allVendors = [
    {
        name: "Autodesk",
        logo: "logo/autodesk.webp",
        cat: "CAD",
        prods: ["AutoCAD", "Revit", "Civil 3D", "Inventor", "Fusion 360", "3ds Max", "ACC"],
        desc: "Мировой лидер в области 3D-проектирования, инженерного анализа и развлечений."
    },
    {
        name: "Graphisoft",
        logo: "logo/graphisoft.png",
        cat: "CAD",
        prods: ["Archicad", "BIMcloud", "MEP Modeler"],
        desc: "Разработчик Archicad — ведущего BIM-решения для архитекторов."
    },
    {
        name: "Bentley Systems",
        logo: "logo/bentley.png",
        cat: "CAD",
        prods: ["MicroStation", "OpenRoads", "ProjectWise", "STAAD"],
        desc: "Комплексные программные решения для поддержки инфраструктуры."
    },
    {
        name: "Trimble (Tekla)",
        logo: "logo/Trimble.png",
        cat: "CAD",
        prods: ["Tekla Structures", "Tekla Structural Designer", "Tekla Tedds"],
        desc: "Передовое ПО для информационного моделирования конструкций (BIM)."
    },
    {
        name: "SCAD Soft",
        logo: "logo/scad.png",
        cat: "CAD",
        prods: ["SCAD Office", "SCAD Induction Steel"],
        desc: "Интегрированная система прочностного анализа и проектирования конструкций."
    },
    {
        name: "Лира САПР",
        logo: "logo/лира.png",
        cat: "CAD",
        prods: ["ЛИРА-САПР", "ЛИРА-FEM", "ЛИРА-Land", "ЛИРА-Soft"],
        desc: "Программные комплексы для проектирования и расчета строительных конструкций."
    },
    {
        name: "Нанософт",
        logo: "logo/nanosoft.webp",
        cat: "CAD",
        prods: ["nanoCAD", "nanoCAD Plus", "nanoCAD Pro"],
        desc: "Российская платформа САПР с прямой поддержкой *.dwg."
    },
    {
        name: "АСКОН",
        logo: "logo/аскон.png",
        cat: "CAD",
        prods: ["КОМПАС-3D", "КОМПАС-График", "КОМПАС-Строитель", "КОМПАС-Электрик"],
        desc: "Крупнейший российский разработчик инженерного ПО."
    },
    {
        name: "VitroCAD",
        logo: "logo/vitro.webp",
        cat: "CAD",
        prods: ["VitroCAD (светопрозрачные конструкции)"],
        desc: "Среда общих данных и управление проектной документацией."
    },
    {
        name: "Robur",
        logo: "logo/robur.jpg",
        cat: "CAD",
        prods: ["Robur (инженерные сети)"],
        desc: "Проектирование автомобильных и железных дорог, а также инженерных сетей."
    },
    {
        name: "Audytor",
        logo: "logo/audytor.webp",
        cat: "CAD",
        prods: ["Audytor OZC", "Audytor NRG", "Audytor IZOL"],
        desc: "Программы для теплотехнических расчетов и проектирования систем отопления."
    },
    {
        name: "BricsCAD",
        logo: "logo/BricsCAD.webp",
        cat: "CAD",
        prods: ["BricsCAD"],
        desc: "Универсальная САПР платформа, объединяющая 2D, 3D, BIM и машиностроение."
    },
    {
        name: "Siemens",
        logo: "logo/siemens.png",
        cat: "PLM",
        prods: ["NX", "Solid Edge", "Teamcenter", "Tecnomatix", "Simcenter"],
        desc: "Лидер в области автоматизации и цифровизации промышленности."
    },
    {
        name: "Dassault Systèmes",
        logo: "logo/Dassault Systèmes.png",
        cat: "PLM",
        prods: ["SOLIDWORKS 3D CAD", "Simulation", "Flow Simulation", "Electrical", "PDM"],
        desc: "Платформа 3DEXPERIENCE и приложения для 3D-дизайна и инжиниринга."
    },
    {
        name: "EPLAN",
        logo: "logo/Eplan.png",
        cat: "PLM",
        prods: ["EPLAN Electric P8", "EPLAN Fluid", "EPLAN Pro Panel"],
        desc: "Программные решения для электротехнического инжиниринга."
    },
    {
        name: "Rockwell",
        logo: "logo/Rockwell.jpg",
        cat: "PLM",
        prods: ["Studio 5000", "RSLogix"],
        desc: "Промышленная автоматизация и цифровая трансформация."
    },
    {
        name: "K-MINE",
        logo: "logo/K-MINE.jpeg",
        cat: "PLM",
        prods: ["K-MINE (горное ПО)"],
        desc: "Комплексная система для горного дела, геологии и маркшейдерии."
    },
    {
        name: "Maxon",
        logo: "logo/Maxon.webp",
        cat: "Visual",
        prods: ["Cinema 4D"],
        desc: "Профессиональные решения для 3D-моделирования, рисования, анимации."
    },
    {
        name: "Corona",
        logo: "logo/Corona Renderer.jpg",
        cat: "Visual",
        prods: ["Corona Renderer"],
        desc: "Высокопроизводительный фотореалистичный рендер-движок."
    },
    {
        name: "D5 Render",
        logo: "logo/D5 Render.png",
        cat: "Visual",
        prods: ["D5 Render"],
        desc: "Рендеринг в реальном времени с использованием трассировки лучей."
    },
    {
        name: "Figma",
        logo: "logo/Figma.svg",
        cat: "Visual",
        prods: ["Figma (Organization)"],
        desc: "Инструмент для дизайна интерфейсов и прототипирования."
    },
    {
        name: "Red Hat",
        logo: "logo/Red Hat Enterprise Linux.png",
        cat: "IT",
        prods: ["Red Hat Enterprise Linux"],
        desc: "Ведущий поставщик решений с открытым исходным кодом."
    },
    {
        name: "Splunk",
        logo: "logo/Splunk.png",
        cat: "IT",
        prods: ["Splunk Enterprise", "Splunk Cloud"],
        desc: "Платформа для сбора, поиска, мониторинга и анализа машинных данных."
    }
];

const vendorLogoWebMap = {
    "Autodesk": "https://logo.clearbit.com/autodesk.com",
    "Graphisoft": "https://logo.clearbit.com/graphisoft.com",
    "Bentley Systems": "https://logo.clearbit.com/bentley.com",
    "Trimble (Tekla)": "https://logo.clearbit.com/trimble.com",
    "SCAD Soft": "https://logo.clearbit.com/scadsoft.com",
    "АСКОН": "https://logo.clearbit.com/ascon.ru",
    "VitroCAD": "https://logo.clearbit.com/vitrocad.ru",
    "Robur": "https://logo.clearbit.com/robur.ru",
    "Audytor": "https://logo.clearbit.com/sankom.com",
    "BricsCAD": "https://logo.clearbit.com/bricsys.com",
    "Siemens": "https://logo.clearbit.com/siemens.com",
    "Dassault Systèmes": "https://logo.clearbit.com/3ds.com",
    "EPLAN": "https://logo.clearbit.com/eplan.com",
    "Rockwell": "https://logo.clearbit.com/rockwellautomation.com",
    "K-MINE": "https://logo.clearbit.com/k-mine.com",
    "Maxon": "https://logo.clearbit.com/maxon.net",
    "Corona": "https://logo.clearbit.com/chaos.com",
    "D5 Render": "https://logo.clearbit.com/d5render.com",
    "Figma": "https://logo.clearbit.com/figma.com",
    "Red Hat": "https://logo.clearbit.com/redhat.com",
    "Splunk": "https://logo.clearbit.com/splunk.com"
};

const vendorLocalLogoOnly = new Set(["Лира САПР", "Нанософт"]);
const vendorLogoClassMap = {
    "Лира САПР": "vendor-logo--lira",
    "Нанософт": "vendor-logo--nanosoft",
    "Maxon": "vendor-logo--scale",
    "K-MINE": "vendor-logo--scale",
    "Audytor": "vendor-logo--scale",
    "Robur": "vendor-logo--scale",
    "Bentley Systems": "vendor-logo--scale",
    "Autodesk": "vendor-logo--scale"
};
const vendorLogoWrapClassMap = {
    "Лира САПР": "vendor-logo-wrap--lira",
    "Нанософт": "vendor-logo-wrap--nanosoft",
    "Maxon": "vendor-logo-wrap--scale",
    "K-MINE": "vendor-logo-wrap--scale",
    "Audytor": "vendor-logo-wrap--scale",
    "Robur": "vendor-logo-wrap--scale",
    "Bentley Systems": "vendor-logo-wrap--scale",
    "Autodesk": "vendor-logo-wrap--scale"
};

const grid = document.getElementById('vendorGrid');
let currentCat = 'all';
let currentTask = 'all';

const taskTags = document.querySelectorAll('.task-tag');

const taskKeywords = {
    architecture: ['revit', 'archicad', 'bim', 'autocad', 'civil', 'microstation', 'nanocad', 'компас'],
    engineering: ['staad', 'fem', 'расчет', 'теплотехничес', 'electrical', 'fluid', 'nx', 'solid edge', 'лира', 'audytor'],
    render: ['render', 'cinema', 'corona', 'd5', '3ds max', 'figma'],
    devops: ['linux', 'enterprise', 'teamcenter', 'projectwise', 'pdm', 'cloud'],
    analytics: ['splunk', 'monitoring', 'simcenter', 'tecnomatix', 'анализ']
};

function matchesTask(vendor, task) {
    if (task === 'all') return true;
    const searchText = `${vendor.name} ${vendor.prods.join(' ')} ${vendor.desc}`.toLowerCase();
    const keywords = taskKeywords[task] || [];
    return keywords.some(keyword => searchText.includes(keyword));
}

const vendorRolesMap = {
    "Autodesk": ['Архитектор', 'BIM-менеджер', 'Конструктор'],
    "Graphisoft": ['Архитектор', 'BIM-координатор'],
    "Bentley Systems": ['Инженер-инфраструктуры', 'BIM-менеджер'],
    "Trimble (Tekla)": ['Конструктор КЖ/КМ', 'BIM-менеджер'],
    "SCAD Soft": ['Расчетчик', 'Конструктор'],
    "Лира САПР": ['Расчетчик', 'Конструктор', 'Проектировщик'],
    "Нанософт": ['Проектировщик', 'CAD-инженер'],
    "АСКОН": ['Машиностроитель', 'Конструктор'],
    "VitroCAD": ['Проектировщик фасадов'],
    "Robur": ['Инженер сетей', 'Дорожный инженер'],
    "Audytor": ['ОВ-инженер', 'Проектировщик инженерии'],
    "BricsCAD": ['CAD-инженер', 'BIM-специалист'],
    "Siemens": ['Инженер PLM', 'Техдиректор'],
    "Dassault Systèmes": ['Инженер-конструктор', 'PLM-менеджер'],
    "EPLAN": ['Электроинженер', 'Проектировщик АСУ'],
    "Rockwell": ['Инженер АСУТП', 'ИТ-архитектор производства'],
    "K-MINE": ['Горный инженер', 'Геолог'],
    "Maxon": ['3D-визуализатор', 'Motion-дизайнер'],
    "Corona": ['Визуализатор', 'Дизайнер интерьеров'],
    "D5 Render": ['Архвиз специалист', '3D-художник'],
    "Figma": ['UI/UX дизайнер', 'Продуктовая команда'],
    "Red Hat": ['IT-админ', 'DevOps-инженер'],
    "Splunk": ['SOC-аналитик', 'IT-админ', 'DevOps-инженер']
};

function getVendorRoles(vendor) {
    return vendorRolesMap[vendor.name] || ['Проектная команда', 'IT-специалист'];
}

function render(list) {
    grid.textContent = '';
    list.forEach(v => {
        const onlineLogo = vendorLogoWebMap[v.name];
        const logoSrc = vendorLocalLogoOnly.has(v.name) ? v.logo : (onlineLogo || v.logo);
        const logoClass = vendorLogoClassMap[v.name] || '';
        const logoWrapClass = vendorLogoWrapClassMap[v.name] || '';

        const el = document.createElement('div');
        el.className = 'card';

        const cardHead = document.createElement('div');
        cardHead.className = 'card-head';

        const cardTitleGroup = document.createElement('div');
        cardTitleGroup.className = 'card-title-group';

        const title = document.createElement('h3');
        title.textContent = v.name;

        const category = document.createElement('div');
        category.className = 'vendor-cat';
        category.textContent = v.cat;

        cardTitleGroup.appendChild(title);
        cardTitleGroup.appendChild(category);

        const logoWrap = document.createElement('div');
        logoWrap.className = `vendor-logo-wrap ${logoWrapClass}`.trim();

        const logo = document.createElement('img');
        logo.src = logoSrc;
        logo.dataset.fallback = v.logo;
        logo.loading = 'lazy';
        logo.decoding = 'async';
        logo.className = `vendor-logo ${logoClass}`.trim();
        logo.alt = v.name;
        logo.addEventListener('error', () => {
            if (logo.dataset.fallback && logo.src !== logo.dataset.fallback) {
                logo.src = logo.dataset.fallback;
                return;
            }
            logo.style.opacity = '0.35';
            logo.style.filter = 'none';
        });

        logoWrap.appendChild(logo);
        cardHead.appendChild(cardTitleGroup);
        cardHead.appendChild(logoWrap);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const prodList = document.createElement('div');
        prodList.className = 'prod-list';
        v.prods.forEach((product) => {
            const productBadge = document.createElement('span');
            productBadge.className = 'prod-badge';
            productBadge.textContent = product;
            prodList.appendChild(productBadge);
        });

        const roleFit = document.createElement('div');
        roleFit.className = 'role-fit';

        const roleTitle = document.createElement('span');
        roleTitle.className = 'role-title';
        roleTitle.textContent = 'Кому подходит:';

        const roleList = document.createElement('div');
        roleList.className = 'role-list';
        getVendorRoles(v).forEach((role) => {
            const roleBadge = document.createElement('span');
            roleBadge.className = 'role-badge';
            roleBadge.textContent = role;
            roleList.appendChild(roleBadge);
        });

        roleFit.appendChild(roleTitle);
        roleFit.appendChild(roleList);

        const description = document.createElement('div');
        description.className = 'desc-block';
        description.textContent = v.desc;

        cardBody.appendChild(prodList);
        cardBody.appendChild(roleFit);
        cardBody.appendChild(description);

        const cardFoot = document.createElement('div');
        cardFoot.className = 'card-foot';

        const quoteBtn = document.createElement('button');
        quoteBtn.className = 'card-btn btn-q';
        quoteBtn.textContent = 'Запросить КП';
        quoteBtn.addEventListener('click', () => requestQuote(v.name));

        const infoBtn = document.createElement('button');
        infoBtn.className = 'card-btn btn-i';
        infoBtn.textContent = 'Инфо';
        infoBtn.addEventListener('click', () => toggleInfo(infoBtn));

        cardFoot.appendChild(quoteBtn);
        cardFoot.appendChild(infoBtn);

        el.appendChild(cardHead);
        el.appendChild(cardBody);
        el.appendChild(cardFoot);
        grid.appendChild(el);
    });
}

function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    track.textContent = '';

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
        allVendors.forEach((vendor) => {
            const item = document.createElement('div');
            item.className = 'marquee-item';
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => requestQuote(vendor.name));

            const name = document.createElement('span');
            name.className = 'm-name';
            name.textContent = vendor.name;

            const separator = document.createElement('span');
            separator.className = 'm-sep';
            separator.textContent = '///';

            item.appendChild(name);
            item.appendChild(separator);
            fragment.appendChild(item);
        });
    }

    track.appendChild(fragment);
}

render(allVendors);
initMarquee();

const searchInput = document.getElementById('searchInput');
const tags = document.querySelectorAll('.tag');

function doFilter() {
    const term = searchInput.value.toLowerCase();
    const filtered = allVendors.filter(v => {
        const textMatch = v.name.toLowerCase().includes(term) || v.prods.some(p => p.toLowerCase().includes(term));
        const catMatch = currentCat === 'all' || v.cat.includes(currentCat);
        const taskMatch = matchesTask(v, currentTask);
        return textMatch && catMatch && taskMatch;
    });
    render(filtered);
}

function filterBy(cat) {
    currentCat = cat;
    tags.forEach(t => t.classList.remove('active'));
    const btn = document.querySelector(`.tag[data-cat="${cat}"]`);
    if(btn) btn.classList.add('active');
    doFilter();
    document.getElementById('vendors').scrollIntoView({behavior:'smooth'});
}

searchInput.addEventListener('input', doFilter);
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentCat = tag.getAttribute('data-cat');
        doFilter();
    });
});

taskTags.forEach(tag => {
    tag.addEventListener('click', () => {
        taskTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentTask = tag.getAttribute('data-task');
        doFilter();
    });
});

function toggleMenu() {
    const nav = document.getElementById('nav-links');
    const burger = document.querySelector('.burger');
    nav.classList.toggle('active');
    burger.classList.toggle('active');
}

function toggleSub(el) {
    el.parentElement.querySelector('.menu-head').classList.toggle('active');
}

function toggleInfo(btn) {
    const card = btn.closest('.card');
    const desc = card.querySelector('.desc-block');
    const isHidden = getComputedStyle(desc).display === 'none';
    if (isHidden) {
        desc.style.display = 'block';
        btn.style.background = 'rgba(255,255,255,0.1)';
    } else {
        desc.style.display = 'none';
        btn.style.background = 'transparent';
    }
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

let selectedProducts = new Set();
const multiOptionsContainer = document.querySelector('.multi-options');
const selectedItemsContainer = document.querySelector('.selected-items');
const hiddenProductInput = document.getElementById('quote-product-hidden');

function initMultiSelect() {
    multiOptionsContainer.textContent = '';

    allVendors.forEach(vendor => {
        if (vendor.prods.length === 0) return;

        const group = document.createElement('div');
        group.className = 'multi-group';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'multi-group-title';
        groupTitle.textContent = vendor.name;
        group.appendChild(groupTitle);

        vendor.prods.forEach(prod => {
            const item = document.createElement('div');
            item.className = 'multi-option-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = prod;

            item.appendChild(checkbox);
            item.appendChild(document.createTextNode(` ${prod}`));

            item.onclick = (e) => {
                if(e.target.tagName !== 'INPUT') {
                    const cb = item.querySelector('input');
                    cb.checked = !cb.checked;
                    toggleProduct(prod, cb.checked);
                } else {
                    toggleProduct(prod, e.target.checked);
                }
            };
            group.appendChild(item);
        });

        multiOptionsContainer.appendChild(group);
    });
}

function toggleProduct(prod, isSelected) {
    if(isSelected) selectedProducts.add(prod);
    else selectedProducts.delete(prod);
    updateMultiSelectUI();
}

function updateMultiSelectUI() {
    const items = Array.from(selectedProducts);
    hiddenProductInput.value = items.join(', ');

    if(items.length === 0) {
        selectedItemsContainer.textContent = 'Выберите продукты...';
    } else {
        selectedItemsContainer.textContent = '';
        items.forEach((product) => {
            const tag = document.createElement('span');
            tag.className = 'selected-tag';
            tag.textContent = product;
            selectedItemsContainer.appendChild(tag);
        });
    }

    const checkboxes = multiOptionsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = selectedProducts.has(cb.value);
        cb.parentElement.classList.toggle('checked', cb.checked);
    });
}

function toggleMultiSelect() {
    multiOptionsContainer.classList.toggle('show');
}

window.addEventListener('click', (e) => {
    if (!e.target.closest('.multi-select-wrapper')) {
        multiOptionsContainer.classList.remove('show');
    }
});

window.requestMainQuote = function() {
    selectedProducts.clear();
    updateMultiSelectUI();
    openModal('modal-quote');
};

function requestQuote(vendorName) {
    openModal('modal-quote');
    selectedProducts.clear();
    const vendor = allVendors.find(v => v.name === vendorName);
    if(vendor && vendor.prods.length > 0) {
        vendor.prods.forEach(p => selectedProducts.add(p));
    }
    updateMultiSelectUI();
}

initMultiSelect();

window.onclick = function(e) {
    if (e.target.classList.contains('modal')) closeModals();
}

document.getElementById('contact-form').addEventListener('submit', submitForm);
document.getElementById('quote-form').addEventListener('submit', submitForm);
document.getElementById('consult-form').addEventListener('submit', submitForm);

function getToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showToast(type, text) {
    const container = getToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const message = document.createElement('div');
    message.className = 'toast-message';
    message.textContent = text;

    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Закрыть уведомление');
    closeButton.textContent = '×';

    let removeTimer;
    const removeToast = () => {
        if (!toast.parentElement) return;
        toast.classList.add('is-closing');
        setTimeout(() => toast.remove(), 220);
    };

    closeButton.addEventListener('click', () => {
        clearTimeout(removeTimer);
        removeToast();
    });

    toast.appendChild(message);
    toast.appendChild(closeButton);
    container.appendChild(toast);

    removeTimer = setTimeout(removeToast, 4500);
}

async function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const t = btn.innerText;
    btn.innerText = '...';
    btn.disabled = true;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let isSuccess = false;

    try {
        const response = await fetch('/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        });

        const result = await response.json().catch(() => ({}));
        if (response.ok) {
            isSuccess = true;
            showToast('success', 'Успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        } else if (response.status === 429) {
            showToast('warning', 'Слишком много попыток. Пожалуйста, повторите позже.');
        } else {
            showToast('error', 'Ошибка: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        showToast('error', 'Ошибка сети. Проверьте подключение и попробуйте снова.');
    } finally {
        btn.innerText = t;
        btn.disabled = false;
        if (isSuccess) {
            closeModals();
            e.target.reset();
            selectedProducts.clear();
            updateMultiSelectUI();
        }
    }
}

document.querySelectorAll('.project-img, .training-img').forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -7;
        const ry = ((x - cx) / cx) * 7;

        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.05, 1.05, 1.05)`;
        el.style.transition = 'none';
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease, border-color 0.4s, box-shadow 0.4s';
    });
});