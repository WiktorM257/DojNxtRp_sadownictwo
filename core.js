// =====================
// CORE.JS – FINAL (FIXED)
// =====================

// Loader (jeśli masz .loader w HTML)
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) loader.classList.add('hidden');
    }, 800);
});

// =====================
// NAVBAR SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// =====================
// MOBILE MENU – JEDYNA LOGIKA
// =====================
document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    const openStructure = document.querySelector('.mobile-open-structure');
    const backBtn = document.querySelector('.mobile-back');

    // Jeżeli któregoś elementu nie ma — nie rób nic
    if (!hamburger || !mobileMenu || !overlay) {
        console.warn('Mobile menu: brak wymaganych elementów HTML');
        return;
    }

    function openMenu() {
        mobileMenu.classList.add('open', 'show-main');
        mobileMenu.classList.remove('show-structure');

        hamburger.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');

        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        mobileMenu.classList.remove('open', 'show-main', 'show-structure');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');

        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }

    // =====================
    // HAMBURGER CLICK
    // =====================
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // =====================
    // OVERLAY CLICK
    // =====================
    overlay.addEventListener('click', closeMenu);

    // =====================
    // STRUKTURA SUBMENU
    // =====================
    if (openStructure) {
        openStructure.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('show-main');
            mobileMenu.classList.add('show-structure');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('show-structure');
            mobileMenu.classList.add('show-main');
        });
    }

    // =====================
    // ZAMYKANIE MENU PO LINKU
    // =====================
    mobileMenu.querySelectorAll(
        'a:not(.mobile-open-structure):not(.mobile-back)'
    ).forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // =====================
    // ESC = ZAMKNIJ MENU
    // =====================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

});

// =====================
// FADE-IN (JEŚLI UŻYWASZ)
// =====================
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

// =====================
// SMOOTH SCROLL (#anchors)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
