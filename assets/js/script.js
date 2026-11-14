// Portfolio interactions (v3). Loaded with `defer`, so the DOM is ready.
// Every feature checks for its own elements, so this file is safe on every page.
'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Intro animations play once per tab session (state resolved early in boot.js).
const SESSION_KEY = 'animationsPlayed';
const skipIntro = prefersReducedMotion || document.documentElement.classList.contains('intro-seen');

/* Theme toggle ----------------------------------------------------------- */
(function initThemeToggle() {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

    const render = () => {
        const isDark = currentTheme() === 'dark';
        const icon = button.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    };

    button.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Non-persistent fallback is fine.
        }
        render();
    });

    systemDark.addEventListener('change', render);
    render();
})();

/* Header: border once scrolled ------------------------------------------ */
(function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', update, { passive: true });
    update();
})();

/* Mobile navigation ------------------------------------------------------ */
(function initMobileNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
    if (!toggle || !nav) return;

    const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            toggle.focus();
        }
    });
})();

/* Active section highlighting ------------------------------------------- */
(function initScrollSpy() {
    const links = document.querySelectorAll('.site-nav--primary a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const byId = new Map();
    links.forEach((link) => byId.set(link.getAttribute('href').slice(1), link));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            });
            const active = byId.get(entry.target.id);
            if (active) {
                active.classList.add('is-active');
                active.setAttribute('aria-current', 'location');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    byId.forEach((_, id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
})();

/* Hero typewriter -------------------------------------------------------- */
(function initTypewriter() {
    const el = document.querySelector('[data-typewriter]');
    if (!el) return;

    const text = el.textContent.trim();
    if (skipIntro) return; // Leave the static text as-is.

    // Ghost keeps the final layout height; screen readers get the full sentence once.
    el.textContent = '';
    const ghost = document.createElement('span');
    ghost.className = 'typewriter__ghost';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.textContent = text;

    const live = document.createElement('span');
    live.className = 'typewriter__live';
    live.setAttribute('aria-hidden', 'true');

    const srText = document.createElement('span');
    srText.className = 'visually-hidden';
    srText.textContent = text;

    el.append(ghost, live, srText);
    el.classList.add('typewriter', 'is-typing');

    let i = 0;
    const type = () => {
        live.textContent = text.slice(0, ++i);
        if (i < text.length) {
            window.setTimeout(type, 18);
        } else {
            window.setTimeout(() => el.classList.remove('is-typing'), 900);
        }
    };
    window.setTimeout(type, 450);
})();

/* Scroll reveal ---------------------------------------------------------- */
(function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (skipIntro || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
})();

if (document.querySelector('.hero')) {
    try {
        sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {
        // Non-persistent fallback is fine.
    }
}

/* Work index: floating image preview that follows the cursor ------------ */
(function initWorkPreview() {
    const list = document.querySelector('[data-preview-list]');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!list || !finePointer.matches) return;

    const preview = document.createElement('div');
    preview.className = 'work-preview';
    preview.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img');
    img.alt = '';
    preview.append(img);
    document.body.append(preview);

    // Smoothly trail the cursor; jump straight there when motion is reduced.
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const ease = prefersReducedMotion ? 1 : 0.18;
    let rafId = null;

    const tick = () => {
        pos.x += (target.x - pos.x) * ease;
        pos.y += (target.y - pos.y) * ease;
        preview.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        rafId = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5
            ? window.requestAnimationFrame(tick)
            : null;
    };

    const hide = () => preview.classList.remove('is-visible');
    let currentRow = null;

    list.addEventListener('pointermove', (e) => {
        const row = e.target.closest('.work-row');
        const source = row && row.querySelector('.work-row__thumb img');
        if (!source) {
            hide();
            return;
        }

        target.x = e.clientX + 40;
        target.y = e.clientY;

        if (row !== currentRow) {
            currentRow = row;
            img.src = source.currentSrc || source.src;
        }
        if (!preview.classList.contains('is-visible')) {
            // Appear at the cursor instead of sliding in from the last position.
            pos.x = target.x;
            pos.y = target.y;
            preview.classList.add('is-visible');
        }
        if (!rafId) rafId = window.requestAnimationFrame(tick);
    });

    list.addEventListener('pointerleave', () => {
        currentRow = null;
        hide();
    });
    window.addEventListener('scroll', hide, { passive: true });
})();

/* Copy email ------------------------------------------------------------- */
(function initCopyEmail() {
    const button = document.querySelector('[data-copy-email]');
    const toast = document.getElementById('toast');
    if (!button || !toast) return;

    let hideTimer;
    const text = toast.querySelector('[data-toast-text]');
    const showToast = () => {
        // Re-inserting the text makes the live region announce it every time.
        text.textContent = '';
        window.requestAnimationFrame(() => {
            text.textContent = toast.dataset.message;
        });
        toast.classList.add('is-visible');
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
    };

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copyEmail);
            showToast();
        } catch (e) {
            // Clipboard blocked: fall back to the mail client.
            window.location.href = `mailto:${button.dataset.copyEmail}`;
        }
    });
})();

/* Image lightbox (native <dialog>) -------------------------------------- */
(function initLightbox() {
    const images = document.querySelectorAll('.clickable-image');
    if (!images.length || typeof HTMLDialogElement !== 'function') return;

    const dialog = document.createElement('dialog');
    dialog.className = 'image-dialog';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'icon-btn image-dialog__close';
    close.setAttribute('aria-label', 'Close image');
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-xmark';
    closeIcon.setAttribute('aria-hidden', 'true');
    close.append(closeIcon);

    const img = document.createElement('img');
    dialog.append(close, img);
    document.body.append(dialog);

    const closeDialog = () => dialog.close();
    close.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeDialog(); // backdrop click
    });
    dialog.addEventListener('close', () => {
        document.body.style.overflow = '';
    });

    images.forEach((image) => {
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');

        const open = () => {
            img.src = image.currentSrc || image.src;
            img.alt = image.alt;
            document.body.style.overflow = 'hidden';
            dialog.showModal();
        };

        image.addEventListener('click', open);
        image.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });
})();
