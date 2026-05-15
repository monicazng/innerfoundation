(function () {
    function initNavMenu() {
        var nav = document.querySelector('nav');
        var btn = document.querySelector('.nav-menu-toggle');
        var panel = document.getElementById('site-nav-panel');
        if (!nav || !btn || !panel) return;

        function setOpen(open) {
            nav.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }

        btn.addEventListener('click', function () {
            setOpen(!nav.classList.contains('is-open'));
        });

        panel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavMenu);
    } else {
        initNavMenu();
    }
})();
