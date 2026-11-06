
/*
 * Router + global behavior.
 *
 * Routes:
 * #/                         Home
 * #/about                    About
 * #/classes                  Classes
 * #/classes/<slug>           Class Detail
 * #/classes/<slug>/register  Registration
 * #/team                     Our Team
 * #/contact                  Contact
 */
(function () {
  const OS = window.OS;
  const main = document.getElementById('main');
  const navLinks = document.getElementById('nav-links');
  const navToggle = document.querySelector('.nav-toggle');

  const routes = [
    [/^\/?$/, () => OS.views.home()],
    [/^\/about\/?$/, () => OS.views.about()],
    [/^\/classes\/?$/, () => OS.views.classes()],
    [/^\/classes\/([\w-]+)\/?$/, (m) =>
      OS.views.classDetail(decodeURIComponent(m[1]))],
    [/^\/classes\/([\w-]+)\/register\/?$/, (m) =>
      OS.views.register(decodeURIComponent(m[1]))],
    [/^\/team\/?$/, () => OS.views.team()],
    [/^\/contact\/?$/, () => OS.views.contact()]
  ];

  function currentPath() {
    const hash = window.location.hash || '#/';
    return hash.startsWith('#/') ? hash.slice(1) : null;
  }

  function resolve(path) {
    for (const [pattern, make] of routes) {
      const m = path.match(pattern);

      if (m) return make(m);
    }

    return OS.views.notFound();
  }

  function show(view, { scroll = true } = {}) {
    main.innerHTML = view.html;
    document.title = view.title;

    navLinks.querySelectorAll('a[data-nav]').forEach((a) => {
      if (a.dataset.nav === view.nav) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });

    closeMenu();

    if (scroll) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }

    if (typeof view.mount === 'function') {
      view.mount(main);
    }

    if (
      !main.contains(document.activeElement) ||
      document.activeElement === document.body
    ) {
      main.focus({ preventScroll: true });
    }
  }

  function render() {
    const path = currentPath();

    if (path === null) return;

    show(resolve(path));
  }

  /* Mobile menu */
  function closeMenu() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const open = !navLinks.classList.contains('is-open');

    navLinks.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      navLinks.classList.contains('is-open')
    ) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* Links to the current page */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');

    if (
      !a ||
      a.getAttribute('href') !== (window.location.hash || '#/')
    ) {
      return;
    }

    e.preventDefault();
    closeMenu();

    window.scrollTo({
      top: 0,
      behavior: OS.prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });

  /* In-page scroll buttons */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-scroll-to]');

    if (!btn) return;

    const target = document.getElementById(btn.dataset.scrollTo);

    if (!target) return;

    target.scrollIntoView({
      behavior: OS.prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });

    target.focus({ preventScroll: true });
  });

  /* Skip link */
  document.querySelector('[data-skip-link]').addEventListener('click', (e) => {
    e.preventDefault();
    main.focus();
  });

  /* Navbar logo */
  document.querySelector('[data-logo]').innerHTML = OS.logo('logo--nav');

  OS.app = { render, show };

  window.addEventListener('hashchange', render);

  /*
   * Load classes and founder biographies from Google Sheets.
   *
   * Both load independently.
   * If Google Sheets fails, the original local data is used.
   */
  main.innerHTML =
    '<p class="page-loading" role="status">Loading… ♪</p>';

  Promise.all([
    Promise.resolve()
      .then(() => OS.loadClasses ? OS.loadClasses() : null)
      .catch(() => {}),

    Promise.resolve()
      .then(() => OS.loadTeam ? OS.loadTeam() : null)
      .catch(() => {})
  ]).then(render);
})();
