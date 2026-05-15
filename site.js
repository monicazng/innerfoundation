(function () {
    const SUBSTACK = {
        dark: 'https://innerfoundation.substack.com/embed?transparent=1',
        light: 'https://innerfoundation.substack.com/embed?transparent=1&light=1'
    };

    function getSystemTheme() {
        return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateSubstack(theme) {
        const embed = document.getElementById('substack-embed');
        if (embed) embed.src = theme === 'light' ? SUBSTACK.light : SUBSTACK.dark;
    }

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        updateSubstack(theme);
    }

    window.toggleTheme = function () {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    };

    function initNavMenu() {
        const nav = document.querySelector('nav');
        const btn = document.querySelector('.nav-menu-toggle');
        const panel = document.getElementById('site-nav-panel');
        if (!nav || !btn || !panel) return;

        const setOpen = (open) => {
            nav.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open);
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };

        btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
        panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
    }

    function initLogoRays() {
        document.querySelectorAll('.rays-container').forEach((container) => {
            for (let i = 0; i < 24; i++) {
                const line = document.createElement('div');
                line.className = 'line';
                line.style.transform = `translate(-0%, -50%) rotate(${i * 15}deg)`;
                container.appendChild(line);
            }
        });
    }

    function initTheme() {
        const saved = localStorage.getItem('theme');
        setTheme(saved || getSystemTheme());
        matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initNavMenu();
        initLogoRays();
    });
})();
