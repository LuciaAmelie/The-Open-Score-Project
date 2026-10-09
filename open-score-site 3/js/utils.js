/* Small shared helpers. Everything hangs off one global: window.OS */
(function () {
  const OS = (window.OS = window.OS || {});

  OS.config = window.OPEN_SCORE_CONFIG || {};
  OS.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  OS.DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* Escape text before putting it into HTML. Use for ALL data values. */
  OS.esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  };

  /* "2026-09-08" → Date in local time (avoids off-by-one timezone bugs). */
  OS.parseDate = function (iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  /* "Tuesday, September 8" */
  OS.formatLongDate = function (iso) {
    const d = OS.parseDate(iso);
    return `${OS.DAYS[d.getDay()]}, ${OS.MONTHS[d.getMonth()]} ${d.getDate()}`;
  };

  /* "Tue, Sep 8" */
  OS.formatShortDate = function (iso) {
    const d = OS.parseDate(iso);
    return `${OS.DAYS[d.getDay()].slice(0, 3)}, ${OS.MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  };

  /* "16:00" → "4:00 PM" */
  OS.formatTime = function (hhmm) {
    let [h, m] = hhmm.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, '0')} ${period}`;
  };

  /* "16:00","16:45" → "4:00–4:45 PM ET" */
  OS.formatTimeRange = function (start, end) {
    const a = OS.formatTime(start);
    const b = OS.formatTime(end);
    const samePeriod = a.slice(-2) === b.slice(-2);
    const tz = OS.config.timezoneLabel ? ' ' + OS.config.timezoneLabel : '';
    return `${samePeriod ? a.slice(0, -3) : a}–${b}${tz}`;
  };

  /* Classes sorted by date, earliest first. */
  OS.getClasses = function () {
    return (window.OPEN_SCORE_CLASSES || []).slice().sort((a, b) =>
      (a.date + a.startTime).localeCompare(b.date + b.startTime));
  };

  OS.getClassBySlug = function (slug) {
    return OS.getClasses().find((c) => c.slug === slug) || null;
  };

  OS.classUrl = (c) => `#/classes/${encodeURIComponent(c.slug)}`;
  OS.registerUrl = (c) => `#/classes/${encodeURIComponent(c.slug)}/register`;

  OS.isOpen = (c) => c.registrationStatus === 'open';

  OS.initials = function (name) {
    return String(name).replace(/\[|\]/g, '').split(/\s+/).filter(Boolean).slice(0, 2)
      .map((w) => w[0].toUpperCase()).join('');
  };

  OS.isValidEmail = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
  };

  OS.prefersReducedMotion = function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
})();
