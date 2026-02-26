/**
 * Alafafe Main Interactivity Script
 * Handles active navigation, language switching, and form logic.
 */

import translations from './translations.json';
import QuoteEngine from './quote-engine.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initI18n();
    initMobileMenu();
    initQuoteEngine();
});

/**
 * Highlights the active navigation link based on the current URL
 */
function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[data-nav]');

    navLinks.forEach(link => {
        const page = link.getAttribute('href');
        const isPartic = link.getAttribute('data-nav') === 'particuliers';

        // Match specific pages or categories
        if (page === currentPath || (isPartic && ['auto.html', 'habitation.html', 'sante.html', 'voyage.html', 'prevoyance.html', 'particuliers.html'].includes(currentPath))) {
            link.classList.add('text-emerald-900', 'underline', 'decoration-2', 'underline-offset-8');
            link.classList.remove('hover:text-emerald-900');
        }
    });
}

/**
 * Lightweight i18n engine
 */
function initI18n() {
    const langFrBtns = document.querySelectorAll('.lang-fr-btn');
    const langArBtns = document.querySelectorAll('.lang-ar-btn');
    let currentLang = localStorage.getItem('alafafe-lang') || 'fr';

    const updateLang = (lang) => {
        currentLang = lang;
        localStorage.setItem('alafafe-lang', lang);

        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        // Update UI visuals for toggle
        const updateVisuals = (btns, isActive) => {
            btns.forEach(btn => {
                if (isActive) {
                    btn.classList.add('text-emerald-900');
                    btn.classList.remove('text-slate-400', 'hover:text-emerald-900');
                } else {
                    btn.classList.add('text-slate-400');
                    btn.classList.remove('text-emerald-900');
                }
            });
        };

        updateVisuals(langFrBtns, lang === 'fr');
        updateVisuals(langArBtns, lang === 'ar');

        // Translate elements with [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    };

    langFrBtns.forEach(btn => btn.addEventListener('click', () => updateLang('fr')));
    langArBtns.forEach(btn => btn.addEventListener('click', () => updateLang('ar')));

    // Initial load
    updateLang(currentLang);
}

/**
 * Handles mobile menu toggle
 */
function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const links = menu?.querySelectorAll('nav a');

    if (!openBtn || !closeBtn || !menu) return;

    const toggleMenu = (open) => {
        if (open) {
            menu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };

    openBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/**
 * Initializes the Quote Engine based on the current page
 */
function initQuoteEngine() {
    const quoteContainer = document.getElementById('quote-engine-container');
    if (!quoteContainer) return;

    const page = window.location.pathname.split('/').pop() || 'index.html';

    // Valid quote pages and their config keys
    const quotePages = {
        'auto.html': 'auto',
        'habitation.html': 'habitation',
        'sante.html': 'sante',
        'voyage.html': 'voyage',
        'prevoyance.html': 'prevoyance'
    };

    if (quotePages[page]) {
        new QuoteEngine(quotePages[page], 'quote-engine-container');
    }
}
