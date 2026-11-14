// Boot — loaded synchronously in <head> so state is applied before first paint:
//   • `js` class: enables progressive-enhancement styles (reveal animations)
//   • saved theme: avoids a flash of the wrong colour scheme
//   • `intro-seen`: skips intro animations when returning within the same tab
//     (a hard reload replays them)
(function () {
    var root = document.documentElement;
    root.classList.add('js');

    try {
        var stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            root.dataset.theme = stored;
        }
    } catch (e) {
        // Storage unavailable (privacy mode); fall back to the system preference.
    }

    try {
        var nav = performance.getEntriesByType('navigation')[0];
        if (nav && nav.type === 'reload') {
            sessionStorage.removeItem('animationsPlayed');
        }
        if (sessionStorage.getItem('animationsPlayed') === 'true') {
            root.classList.add('intro-seen');
        }
    } catch (e) {
        // sessionStorage unavailable: always play the intro.
    }
})();
