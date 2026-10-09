/* Reusable UI building blocks shared by several pages. */
(function () {
  const OS = window.OS;
  const esc = OS.esc;

  const LOGO_COLORS = {
    OPEN: ['#ec5a8c', '#3b9ae1', '#f5b301', '#4caf50'],
    SCORE: ['#6dbded', '#4caf50', '#582ca0', '#fd9123', '#ec5a8c']
  };

  /* The Open Score wordmark, built from text so it is crisp at any size. */
  OS.logo = function (extraClass = '') {
    let i = 0;
    const word = (w) => [...w].map((ch, n) =>
      `<span class="logo__letter" style="color:${LOGO_COLORS[w][n]};--i:${i++}">${ch}</span>`).join('');
    return `
      <span class="logo ${extraClass}" aria-hidden="true">
        <span class="logo__small">The</span>
        <span class="logo__word"><span>${word('OPEN')}</span><span>${word('SCORE')}</span></span>
        <span class="logo__small">Project</span>
      </span>`;
  };

  /* Hand-drawn style music staff used as a section divider. */
  OS.staff = function (color, extraClass = '', imageFile = '') {
    const img = imageFile
      ? `<img class="staff__img" src="assets/images/${imageFile}" alt="" onerror="this.remove()">`
      : '';
    const lines = [0, 1, 2, 3, 4].map((n) => {
      const y = 18 + n * 11;
      const w = n % 2 ? 7 : 9;
      return `<path d="M0 ${y} C 160 ${y - w}, 320 ${y + w}, 480 ${y} S 800 ${y - w}, 960 ${y} S 1280 ${y + w}, 1440 ${y}"/>`;
    }).join('');
    return `
      <div class="staff ${extraClass}" style="--staff-color:${color}" aria-hidden="true">
        ${img}
        <span class="staff__clef">𝄞</span>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" focusable="false">${lines}</svg>
      </div>`;
  };

  OS.STAFF_COLORS = ['var(--green)', 'var(--pink)', 'var(--tangerine)', 'var(--sky)', 'var(--lavender)'];

  /* Status badge for a class row. Only "open" is a link. */
  OS.statusBadge = function (c) {
    if (c.registrationStatus === 'open') {
      return `<a class="badge badge--open" href="${OS.classUrl(c)}" aria-label="Register for ${esc(c.title)}">Register →</a>`;
    }
    if (c.registrationStatus === 'full') return '<span class="badge badge--full">Full</span>';
    return '<span class="badge badge--closed">Registration closed</span>';
  };

  /* Status chip used on the Class Detail page. */
  OS.statusChip = function (c) {
    const map = {
      open: ['chip--open', 'Open for registration'],
      closed: ['chip--closed', 'Registration closed'],
      full: ['chip--full', 'Class full']
    };
    const [cls, label] = map[c.registrationStatus] || map.closed;
    return `<span class="chip ${cls}"><span class="chip__dot" aria-hidden="true"></span>${label}</span>`;
  };

  OS.metaPills = function (c) {
    const weekday = OS.DAYS[OS.parseDate(c.date).getDay()];
    const items = [c.level, `${weekday}s · ${OS.formatTime(c.startTime)}`, c.format];
    return `<ul class="pills" aria-label="Class details">${items.map((t) => `<li class="pill">${esc(t)}</li>`).join('')}</ul>`;
  };

  /* Photo with an initials fallback if the image file is missing. */
  OS.photo = function (src, name, extraClass = '') {
    const img = src
      ? `<img src="${esc(src)}" alt="${esc(name)}" loading="lazy" onload="this.parentNode.classList.add('has-img')" onerror="this.remove()">`
      : '';
    return `<div class="photo ${extraClass}" data-initials="${esc(OS.initials(name))}">${img}</div>`;
  };

  /* Optional decorative image — removes itself if the file isn't there. */
  OS.deco = function (file, extraClass) {
    return `<img class="deco ${extraClass}" src="assets/images/${file}" alt="" aria-hidden="true" onerror="this.remove()">`;
  };

  /* All the Figma-positioned decorations for one section (js/data/decorations.js). */
  OS.decos = function (key) {
    const list = (window.OPEN_SCORE_DECORATIONS || {})[key] || [];
    return list.map((d) =>
      `<img class="deco deco--placed${d.big ? ' deco--big' : ''}" src="assets/images/${esc(d.file)}" alt="" aria-hidden="true" loading="lazy" decoding="async"
        style="left:${d.x}%;top:${d.y}%;width:${d.w}%" onerror="this.remove()">`).join('');
  };

  /* A small sticker icon with a text-symbol fallback if the image is missing. */
  OS.sticker = function (file, fallback, extraClass = '') {
    return `<span class="sticker ${extraClass}" aria-hidden="true"><img src="assets/images/${esc(file)}" alt="" onerror="this.remove()"><span class="sticker__fallback">${fallback}</span></span>`;
  };

  /* One labelled form field with an error slot. */
  OS.field = function (f, idPrefix = 'f') {
    const id = `${idPrefix}-${f.name}`;
    const req = f.required ? ' required aria-required="true"' : '';
    const common = `id="${id}" name="${esc(f.name)}" class="input" placeholder="${esc(f.placeholder || '')}" autocomplete="${esc(f.autocomplete || 'off')}" aria-describedby="${id}-error"${req}`;
    let control;
    if (f.type === 'textarea') {
      control = `<textarea ${common} rows="5" maxlength="1500"></textarea>`;
    } else if (f.type === 'select') {
      const opts = (f.options || []).map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
      control = `<div class="select-wrap"><select id="${id}" name="${esc(f.name)}" class="input" aria-describedby="${id}-error"${req}>${opts}</select></div>`;
    } else {
      control = `<input type="${esc(f.type || 'text')}" ${common}>`;
    }
    const labelStyle = f.color ? ` style="color:${f.color}"` : '';
    return `
      <div class="field" data-field="${esc(f.name)}">
        <label for="${id}"${labelStyle}>${esc(f.label)}${f.required ? ' <span aria-hidden="true">*</span>' : ''}</label>
        ${control}
        <p class="field-error" id="${id}-error" aria-live="polite"></p>
      </div>`;
  };

  /*
   * Validate a form against field definitions.
   * Returns { valid, values }. Shows inline errors and focuses the first one.
   */
  OS.validateForm = function (form, fields) {
    const values = {};
    let firstBad = null;
    fields.forEach((f) => {
      const el = form.elements[f.name];
      if (!el) return;
      const value = String(el.value || '').trim();
      values[f.name] = value;
      let msg = '';
      if (f.required && !value) msg = f.errorMessage || `Enter ${f.label.toLowerCase()}.`;
      else if (value && f.type === 'email' && !OS.isValidEmail(value)) msg = 'Enter an email like name@example.com.';
      OS.setFieldError(form, f.name, msg);
      if (msg && !firstBad) firstBad = el;
    });
    if (firstBad) firstBad.focus();
    return { valid: !firstBad, values };
  };

  OS.setFieldError = function (form, name, msg) {
    const el = form.elements[name];
    const wrap = form.querySelector(`[data-field="${name}"]`);
    if (!el || !wrap) return;
    wrap.querySelector('.field-error').textContent = msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    wrap.classList.toggle('has-error', !!msg);
  };

  /* Clear a field's error as soon as the person fixes it. */
  OS.liveValidate = function (form, fields) {
    form.addEventListener('input', (e) => {
      const f = fields.find((x) => x.name === e.target.name);
      if (!f || e.target.getAttribute('aria-invalid') !== 'true') return;
      const v = e.target.value.trim();
      const ok = (!f.required || v) && (f.type !== 'email' || !v || OS.isValidEmail(v));
      if (ok) OS.setFieldError(form, f.name, '');
    });
  };

  OS.demoNote = function (text) {
    if (OS.config.backendConnected) return '';
    return `<p class="demo-note" role="note"><strong>Demo mode:</strong> ${text}</p>`;
  };
})();
