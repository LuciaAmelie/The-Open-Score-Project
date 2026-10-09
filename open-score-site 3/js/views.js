
/*
 * Every page of the site. Each view returns:
 *   { title, nav, html, mount(root) }
 * nav   = which navbar link is active
 * mount = attaches click/submit handlers after the HTML is on the page
 */
(function () {
  const OS = window.OS;
  const esc = OS.esc;
  const V = (OS.views = {});
 
  /* ------------------------------------------------------------------ HOME */
  V.home = function () {
    const strip = [
      ['Discover', 'Find sounds you’ve never heard before.', 'var(--blue)', '☼', 'home-icon-rainbow.png'],
      ['Listen', 'Hear music in a new way.', 'var(--pink)', '♡', 'home-icon-heart.png'],
      ['Learn', 'Build the foundations.', 'var(--green)', '𝄢', 'home-icon-bass-clef.png'],
      ['Create', 'Find your own voice.', 'var(--lavender)', '∿', 'home-icon-squiggle.png']
    ];
    return {
      title: 'The Open Score Project',
      nav: 'home',
      html: `
      <section class="home-hero has-decos">
        ${OS.decos('home-hero')}
        <h1 class="visually-hidden">The Open Score Project</h1>
        ${OS.logo('logo--hero')}
        ${OS.staff('var(--lavender)', 'staff--hero', 'home-hero-staff.png')}
        <p class="home-tagline">Music is meant to be<br>explored.</p>
      </section>
 
      <section class="score-strip" aria-label="What Open Score is about">
        <div class="wrap">
          <ul class="score-strip__list">
            ${strip.map(([word, text, color, glyph, icon]) => `
              <li class="score-strip__item" style="--accent:${color}">
                <span class="score-strip__dot" aria-hidden="true"></span>
                ${OS.sticker(icon, glyph, 'score-strip__glyph')}
                <h2 class="score-strip__word">${word}</h2>
                <p>${text}</p>
              </li>`).join('')}
          </ul>
        </div>
      </section>
 
      <section class="open-statement has-decos">
        ${OS.decos('home-open')}
        <h2 class="open-statement__text">
          <span>Music education</span>
          <span>should be</span>
          <span class="open-statement__big">Open</span>
          <span>to everyone.</span>
        </h2>
      </section>
 
      <section class="final-cta has-decos">
        ${OS.decos('home-cta')}
        <p class="final-cta__kicker">Curious?</p>
        <h2 class="final-cta__title">Come make some<br>noise.</h2>
        <a class="btn btn--violet" href="#/classes">Explore classes</a>
      </section>`
    };
  };
 
  /* ----------------------------------------------------------------- ABOUT */
  V.about = function () {
    const team = window.OPEN_SCORE_TEAM || [];
    const cardColors = [['var(--pink)', '#f9c2d4'], ['var(--lavender)', '#d9c6e3'], ['var(--yellow)', '#fde29a']];
    return {
      title: 'About · The Open Score Project',
      nav: 'about',
      html: `
      <section class="hero-band has-decos">
        ${OS.decos('about-hero')}
        <div class="about-hero wrap">
          <h1 class="about-hero__title">Build a foundation.<br>Discover a love for music.</h1>
          <p class="lead">Free online music classes designed to help young learners explore different types of music, develop curiosity, and build strong musical foundations.</p>
          <a class="btn btn--violet" href="#/classes">Explore classes</a>
        </div>
      </section>
 
      <section class="section section--mist">
        <div class="wrap what-is">
          <div class="what-is__intro">
            <h2 class="h2">What is<br>Open Score?</h2>
            <p>A free, student-led program built around curiosity and a love for music.</p>
            <p>Open Score gives young learners a place to discover music through free, live online classes.</p>
            <button class="text-link" type="button" data-scroll-to="why-open-score">Learn more →</button>
          </div>
          <ul class="what-is__list">
            <li style="--accent:var(--blue)">${OS.sticker('about-icon-cloud.png', '☁', 'what-is__icon')}<div><h3>Explore</h3><p>Discover different genres, sounds, and styles of music while finding what interests you.</p></div></li>
            <li style="--accent:var(--yellow)">${OS.sticker('about-icon-sun.png', '☼', 'what-is__icon')}<div><h3>Build</h3><p>Develop foundational musical knowledge and listening skills.</p></div></li>
            <li style="--accent:var(--green)">${OS.sticker('about-icon-note.png', '♪', 'what-is__icon')}<div><h3>Grow</h3><p>Build confidence and curiosity as you discover your interests in music.</p></div></li>
          </ul>
        </div>
      </section>
 
      <section class="section section--blush has-decos" id="why-open-score" tabindex="-1">
        ${OS.decos('about-why')}
        <div class="wrap center">
          <h2 class="h2">Music should be something<br>every child gets to explore.</h2>
          <p class="measure">Learning music can open the door to creativity, curiosity, and confidence. Open Score gives young learners a free place to explore music and build foundational skills before and during their first years of learning an instrument.</p>
          <ul class="trio">
            <li><span class="trio__word" style="color:var(--lime)">Free</span><span>No cost to<br>families.</span></li>
            <li><span class="trio__word" style="color:var(--butter)">Live</span><span>Learn with<br>instructors in real time.</span></li>
            <li><span class="trio__word" style="color:var(--sky)">Online</span><span>Join from<br>wherever you are.</span></li>
          </ul>
        </div>
      </section>
 
      <section class="section has-decos">
        ${OS.decos('about-team')}
        <div class="wrap center">
          <h2 class="h2">Meet the people<br>behind Open Score</h2>
          <p class="measure">Founded by students who believe music education should be accessible to everyone.</p>
          <ul class="founder-minis">
            ${team.map((p, i) => `
              <li class="founder-card" style="--backing:${cardColors[i % 3][1]}">
                ${OS.photo(p.photoSmall, p.name, 'photo--card')}
                <span class="founder-minis__name" style="color:${cardColors[i % 3][0]}">${esc(p.name)}</span>
                <span class="founder-minis__role">${esc(p.role)}</span>
              </li>`).join('')}
          </ul>
          <a class="text-link text-link--ink" href="#/team">Meet our team →</a>
        </div>
      </section>
 
      <section class="cta-band cta-band--ink has-decos">
        ${OS.decos('about-cta')}
        <div class="wrap center">
          <h2 class="h2">Ready to start your<br>musical journey?</h2>
          <p>Explore music, build new skills, and find a place to begin.</p>
          <a class="btn btn--butter" href="#/classes">Explore classes →</a>
        </div>
      </section>`
    };
  };
 
  /* -------------------------------------------------------------- OUR TEAM */
  // Photo for the Our Team page. If a founder has a separate photo (framePhoto)
  // and an empty frame image (photo), the photo is placed inside the frame.
  function founderPhoto(p) {
    if (!p.framePhoto) return OS.photo(p.photo, p.name, 'photo--founder');
    return `
      <div class="photo photo--founder has-img" style="position:relative;overflow:visible">
        <img src="${esc(p.framePhoto)}" alt="${esc(p.name)}" loading="lazy"
             style="position:absolute;left:14%;top:13%;width:71%;height:73%;object-fit:cover;border-radius:6px;transform:rotate(4deg)">
        <img src="${esc(p.photo)}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()"
             style="position:relative;display:block;width:100%;height:auto">
      </div>`;
  }
 
  V.team = function () {
    const team = window.OPEN_SCORE_TEAM || [];
    return {
      title: 'Our Team · The Open Score Project',
      nav: 'team',
      html: `
      <section class="hero-band has-decos">
        ${OS.decos('team-hero')}
        <div class="page-hero wrap">
        <p class="eyebrow">Our team</p>
        <h1 class="page-hero__title">The people behind<br>Open Score.</h1>
        <p class="lead">We’re students brought together by a love of music and a belief that learning it should be accessible to everyone.</p>
        <span class="page-hero__glyph" aria-hidden="true" style="color:var(--sky)">♪</span>
        </div>
      </section>
 
      <section class="section founders has-decos">
        ${OS.decos('founders')}
        <div class="wrap">
          <h2 class="h2">Meet the founders</h2>
          ${team.map((p, i) => `
            <article class="founder ${i % 2 ? 'founder--flip' : ''}">
              ${founderPhoto(p)}
              <div class="founder__text">
                <h3 class="founder__name">${esc(p.name)}</h3>
                <p class="founder__role" style="color:${esc(p.color)}">${esc(p.role)}</p>
                <span class="founder__bar" style="background:${esc(p.color)}" aria-hidden="true"></span>
                ${(p.credentials || []).length ? `
                <details class="credentials" style="--accent:${esc(p.color)}">
                  <summary class="credentials__toggle">Credentials<svg class="credentials__arrow" viewBox="0 0 14 8" aria-hidden="true"><path d="M1 1l6 6 6-6"/></svg></summary>
                  <ul class="credentials__list">${p.credentials.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
                </details>` : ''}
                <p class="founder__bio">${esc(p.bio)}</p>
              </div>
            </article>`).join('')}
        </div>
      </section>
 
      <section class="section section--sky-tint story">
        <span class="quote__glyph" aria-hidden="true">♪</span>
        <div class="wrap">
          <h2 class="quote__text story__title">“We started <span style="color:var(--hot-pink)">Open Score</span><br>because…”</h2>
 
          <div class="story__row">
            <figure class="polaroid polaroid--right" style="--tape:var(--butter)">
              <img src="assets/images/story-the-three-of-us.jpg" alt="The three Open Score founders watching a pink sunset over a lake and mountains" loading="lazy">
              <figcaption>the three of us ♡</figcaption>
            </figure>
            <div class="story__text">
              <p class="story__lead">…we believe every child, regardless of where they live or what they can afford, should have the opportunity to explore music.</p>
              <p>The three of us met at Point CounterPoint, a rigorous chamber music program in Vermont. Throughout our time there, we bonded over our shared experiences of being introduced to instruments at a young age and realized how much we wished we had been given more time to explore our own musical interests and passions.</p>
            </div>
          </div>
 
          <div class="story__row story__row--flip">
            <div class="story__text">
              <p>Because we all love working with children and sharing our love of music, we created The Open Score Project to give future generations the opportunity to discover their own musical paths from an early age.</p>
              <p class="story__sign">— Violet, Freya &amp; Cat</p>
              <span class="story__heart" aria-hidden="true">♡</span>
            </div>
            <figure class="polaroid polaroid--left" style="--tape:var(--sky)">
              <img src="assets/images/story-out-on-the-water.jpg" alt="The three Open Score founders smiling in a canoe, wearing orange life jackets" loading="lazy">
              <figcaption>out on the water ♪</figcaption>
            </figure>
          </div>
        </div>
      </section>
 
      <section class="section why-teach">
        <div class="wrap why-teach__grid">
          <h2 class="h2">Why we<br>teach.</h2>
          <div class="value value--1"><h3 style="color:var(--butter)">Creativity</h3><p>There’s more than one<br>way to make something.</p></div>
          <div class="value value--2"><h3 style="color:var(--sky)">Curiosity</h3><p>Music gives you something<br>new to discover.</p></div>
          <div class="value value--3"><h3 style="color:var(--hot-pink)">Connection</h3><p>Music brings people<br>together.</p></div>
        </div>
      </section>
 
      <section class="cta-band cta-band--pink">
        <div class="wrap center">
          <h2 class="h2">Come learn with us.</h2>
          <p>Meet the Open Score team in one of our free, live online classes.</p>
          <a class="btn btn--cream" href="#/classes">Explore classes →</a>
        </div>
      </section>`
    };
  };
 
  /* --------------------------------------------------------------- CONTACT */
  const CONTACT_FIELDS = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name', autocomplete: 'name', color: 'var(--blue)', errorMessage: 'Enter your name.' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com', autocomplete: 'email', color: 'var(--pink)', errorMessage: 'Enter your email address.' },
    { name: 'topic', label: 'I’m reaching out about', type: 'select', required: true, options: ['Classes', 'Registration', 'Volunteering or teaching', 'Something else'], color: 'var(--orange-ink)' },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us a bit about what you need...', color: 'var(--green-ink)', errorMessage: 'Write a message so we know how to help.' }
  ];
 
  V.contact = function () {
    const email = OS.config.contactEmail;
    const ig = OS.config.instagramHandle;
    return {
      title: 'Contact · The Open Score Project',
      nav: 'contact',
      html: `
      <section class="hero-band has-decos">
        ${OS.decos('contact-hero')}
        <div class="page-hero wrap">
          <p class="eyebrow">Contact</p>
          <h1 class="page-hero__title">Let’s talk<br>music. ♪</h1>
          <p class="lead">Have a question about Open Score, our classes, or getting started? We’d love to hear from you.</p>
        </div>
      </section>
 
      <section class="section section--tight has-decos">
        ${OS.decos('contact-main')}
        <div class="wrap contact-grid">
          <div class="contact-form-area" data-contact-area>
            <h2 class="h3">Send us a note</h2>
            <form class="contact-form" novalidate data-contact-form>
              ${CONTACT_FIELDS.map((f) => OS.field(f, 'contact')).join('')}
              <p class="form-error" role="alert" data-form-error></p>
              <button class="btn btn--violet" type="submit">Send message →</button>
            </form>
          </div>
          <aside class="contact-other" aria-labelledby="other-ways">
            <h2 class="h3" id="other-ways">Other ways to reach us</h2>
            <div class="contact-other__item">
              <h3>Email</h3>
              <a href="mailto:${esc(email)}">${esc(email)}</a>
            </div>
            <div class="contact-other__item">
              <h3>Instagram</h3>
              <a href="https://www.instagram.com/${esc(ig)}/" target="_blank" rel="noopener">@${esc(ig)}</a>
            </div>
          </aside>
        </div>
      </section>
 
      <section class="cta-band cta-band--sky">
        <span class="float-glyph fg-8" aria-hidden="true">♪</span>
        <span class="float-glyph fg-9" aria-hidden="true">★</span>
        <div class="wrap center">
          <h2 class="h2">Not sure where to start?</h2>
          <p>Take a look at our classes and see what Open Score is all about.</p>
          <a class="btn btn--cream" href="#/classes">Explore classes →</a>
        </div>
      </section>`,
      mount(root) {
        const form = root.querySelector('[data-contact-form]');
        const area = root.querySelector('[data-contact-area]');
        const formError = root.querySelector('[data-form-error]');
        OS.liveValidate(form, CONTACT_FIELDS);
 
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          formError.textContent = '';
          const { valid, values } = OS.validateForm(form, CONTACT_FIELDS);
          if (!valid) return;
 
          if (!OS.config.backendConnected) {
            // No backend yet: hand the message to the visitor's email app.
            const subject = `Open Score question: ${values.topic}`;
            const body = `${values.message}\n\n— ${values.name} (${values.email})`;
            const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            area.innerHTML = `
              <div class="success-panel" tabindex="-1">
                <h2 class="h3">Almost there! ♪</h2>
                <p>Your email app should open with your message ready to send. Press send there to reach us.</p>
                <p>Nothing opened? Email us at <a href="${esc(mailto)}">${esc(email)}</a>.</p>
                <button class="btn btn--outline" type="button" data-reset-contact>Write another message</button>
              </div>`;
            area.querySelector('.success-panel').focus();
            area.querySelector('[data-reset-contact]').addEventListener('click', () => OS.app.render());
            window.location.href = mailto;
            return;
          }
 
          const btn = form.querySelector('button[type="submit"]');
          btn.disabled = true; btn.textContent = 'Sending…';
          try {
            await OS.api.submitContact(values);
            area.innerHTML = `
              <div class="success-panel" tabindex="-1">
                <h2 class="h3">Message sent! ♪</h2>
                <p>Thanks for reaching out, ${esc(values.name)}. We’ll reply to ${esc(values.email)} soon.</p>
                <button class="btn btn--outline" type="button" data-reset-contact>Write another message</button>
              </div>`;
            area.querySelector('.success-panel').focus();
            area.querySelector('[data-reset-contact]').addEventListener('click', () => OS.app.render());
          } catch (err) {
            formError.textContent = `We couldn’t send your message. Try again, or email us at ${email}.`;
            btn.disabled = false; btn.textContent = 'Send message →';
          }
        });
      }
    };
  };
 
  /* --------------------------------------------------------------- CLASSES */
  // Remembered while the visitor moves around the site.
  const classesState = { calendarOpen: false, year: null, month: null };
 
  function defaultCalendarMonth(classes) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const next = classes.find((c) => OS.parseDate(c.date) >= today) || classes[0];
    const d = next ? OS.parseDate(next.date) : today;
    return { year: d.getFullYear(), month: d.getMonth() };
  }
 
  function renderCalendar(classes, year, month) {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prev = new Date(year, month - 1, 1);
    const next = new Date(year, month + 1, 1);
    const inMonth = classes.filter((c) => {
      const d = OS.parseDate(c.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
 
    const cells = [];
    for (let i = 0; i < first.getDay(); i++) cells.push('<div class="cal-cell cal-cell--empty" aria-hidden="true"></div>');
    for (let day = 1; day <= daysInMonth; day++) {
      const events = inMonth.filter((c) => OS.parseDate(c.date).getDate() === day);
      if (!events.length) {
        cells.push(`<div class="cal-cell"><span class="cal-num">${day}</span></div>`);
        continue;
      }
      cells.push(`
        <div class="cal-cell cal-cell--event">
          ${events.map((c) => `
            <a class="cal-event" href="${OS.classUrl(c)}" style="--accent:var(--${esc(c.color)})"
               aria-label="${esc(c.title)}, ${esc(OS.formatLongDate(c.date))} at ${esc(OS.formatTime(c.startTime))}">
              <span class="cal-num cal-num--ring">${day}</span>
              <span class="cal-event__icon" aria-hidden="true">${esc(c.calendarIcon || '●')}</span>
              <span class="cal-event__title" aria-hidden="true">${esc(c.title)}</span>
            </a>`).join('')}
        </div>`);
    }
 
    return `
      <div class="calendar" role="group" aria-labelledby="cal-title">
        <div class="calendar__head">
          <button class="cal-nav" type="button" data-cal-step="-1" aria-label="Show ${OS.MONTHS[prev.getMonth()]} ${prev.getFullYear()}">← ${OS.MONTHS[prev.getMonth()]}</button>
          <h3 class="calendar__title" id="cal-title" aria-live="polite">${OS.MONTHS[month]} ${year}</h3>
          <button class="cal-nav" type="button" data-cal-step="1" aria-label="Show ${OS.MONTHS[next.getMonth()]} ${next.getFullYear()}">${OS.MONTHS[next.getMonth()]} →</button>
        </div>
        <div class="cal-grid cal-grid--days" aria-hidden="true">
          ${OS.DAYS.map((d) => `<span>${d.slice(0, 3)}</span>`).join('')}
        </div>
        <div class="cal-grid">${cells.join('')}</div>
        ${inMonth.length ? '' : `<p class="calendar__empty">No classes scheduled in ${OS.MONTHS[month]}. Try another month, or browse the list below.</p>`}
      </div>`;
  }
 
  V.classes = function () {
    const classes = OS.getClasses();
    if (classesState.year === null) Object.assign(classesState, defaultCalendarMonth(classes));
 
    const rows = classes.map((c, i) => `
      <article class="class-row" style="--accent:var(--${esc(c.color)})" ${i === 0 ? 'id="upcoming-classes" tabindex="-1"' : ''}>
        <span class="class-row__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="class-row__body">
          <h3 class="class-row__title">${OS.sticker(`classes-icon-${(i % 3) + 1}.png`, '', 'class-row__icon')}<a href="${OS.classUrl(c)}">${esc(c.title)}</a></h3>
          <p class="class-row__desc">${esc(c.shortDescription)}</p>
          ${OS.metaPills(c)}
        </div>
        <div class="class-row__status">${OS.statusBadge(c)}</div>
      </article>
      ${OS.staff(OS.STAFF_COLORS[i % OS.STAFF_COLORS.length], 'staff--row', `classes-staff-${(i % 3) + 1}.png`)}`).join('');
 
    return {
      title: 'Classes · The Open Score Project',
      nav: 'classes',
      html: `
      <section class="classes-hero wrap">
        <div>
          <p class="eyebrow">Classes</p>
          <h1 class="page-hero__title">Explore what’s<br>waiting for you. ♪</h1>
          <p class="lead">Free live online classes designed to help young musicians build skills, curiosity, and confidence.</p>
        </div>
        ${OS.deco('classes-hero.png', 'deco--classes')}
      </section>
 
      <section class="classes-intro wrap">
        <div class="classes-intro__text">
          <h2 class="h3">A look at our classes</h2>
          <p>Browse what’s currently available and find a class you’d like to join.</p>
        </div>
        <button class="calendar-toggle" type="button" aria-expanded="${classesState.calendarOpen}" aria-controls="calendar-region" data-calendar-toggle>
          ${OS.sticker('classes-calendar-icon.png', '▦', 'calendar-toggle__icon')}
          <span data-calendar-toggle-label>${classesState.calendarOpen ? 'Hide calendar ↑' : 'View calendar ⌄'}</span>
        </button>
      </section>
 
      <div class="calendar-region wrap ${classesState.calendarOpen ? 'is-open' : ''}" id="calendar-region">
        <div class="calendar-region__inner" ${classesState.calendarOpen ? '' : 'inert'}>
          <div data-calendar>${renderCalendar(classes, classesState.year, classesState.month)}</div>
          <button class="text-link text-link--small" type="button" data-scroll-to="upcoming-classes">↓ Upcoming classes</button>
        </div>
      </div>
 
      <section class="class-list" aria-label="Upcoming classes">
        <div class="wrap">${rows ? '' : '<p class="calendar__empty">No classes are scheduled right now. Check back soon!</p>'}</div>
        ${rows}
      </section>`,
      mount(root) {
        const toggle = root.querySelector('[data-calendar-toggle]');
        const label = root.querySelector('[data-calendar-toggle-label]');
        const region = root.querySelector('#calendar-region');
        const inner = region.querySelector('.calendar-region__inner');
        const calHost = root.querySelector('[data-calendar]');
 
        toggle.addEventListener('click', () => {
          classesState.calendarOpen = !classesState.calendarOpen;
          const open = classesState.calendarOpen;
          region.classList.toggle('is-open', open);
          toggle.setAttribute('aria-expanded', String(open));
          label.textContent = open ? 'Hide calendar ↑' : 'View calendar ⌄';
          if (open) inner.removeAttribute('inert'); else inner.setAttribute('inert', '');
        });
 
        calHost.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-cal-step]');
          if (!btn) return;
          const step = Number(btn.dataset.calStep);
          const d = new Date(classesState.year, classesState.month + step, 1);
          classesState.year = d.getFullYear();
          classesState.month = d.getMonth();
          calHost.innerHTML = renderCalendar(classes, classesState.year, classesState.month);
          calHost.querySelector(`[data-cal-step="${step}"]`).focus();
        });
      }
    };
  };
 
  /* ---------------------------------------------------------- CLASS DETAIL */
  const NUM_COLORS = ['var(--pink)', 'var(--orange)', 'var(--blue)', 'var(--green)'];
 
  function closedMessage(c) {
    return c.registrationStatus === 'full' ? ['This class<br>is full.', 'Class full'] : ['Registration<br>is closed.', 'Registration closed'];
  }
 
  V.classDetail = function (slug) {
    const c = OS.getClassBySlug(slug);
    if (!c) return V.notFound('We couldn’t find that class.');
    const open = OS.isOpen(c);
    const when = `${OS.formatLongDate(c.date)} · ${OS.formatTimeRange(c.startTime, c.endTime)} · ${c.format}`;
    const topAction = open
      ? `<a class="btn btn--butter" href="${OS.registerUrl(c)}">Register for this class →</a>`
      : '<a class="btn btn--outline" href="#/classes">See open classes →</a>';
    const ctaTitle = open ? 'Ready to<br>join us?' : closedMessage(c)[0];
    const ctaAction = open
      ? `<a class="btn btn--butter" href="${OS.registerUrl(c)}">Register for this class →</a>`
      : '<a class="btn btn--butter" href="#/classes">See open classes →</a>';
 
    return {
      title: `${c.title} · The Open Score Project`,
      nav: 'classes',
      html: `
      <section class="detail-hero">
        <div class="wrap wrap--wide"><a class="text-link back-link" href="#/classes">← Back to classes</a></div>
        <div class="wrap detail-hero__grid">
          <div class="detail-hero__text">
            <h1 class="detail-hero__title">${esc(c.title)}.</h1>
            <p class="detail-hero__tagline">${esc(c.tagline)}</p>
            <p class="detail-hero__meta">${esc(c.level)} • ${esc(c.format)}</p>
            <p class="detail-hero__date">${esc(OS.formatLongDate(c.date))}</p>
            <p class="detail-hero__time">${esc(OS.formatTimeRange(c.startTime, c.endTime))}</p>
            ${OS.statusChip(c)}
            <div class="detail-hero__action">${topAction}</div>
          </div>
          ${OS.deco('class-detail-notes.png', 'deco--detail')}
          <span class="detail-hero__glyphs" aria-hidden="true"><span>♫</span><span>♪</span></span>
        </div>
      </section>
 
      <section class="section section--tight">
        <div class="wrap">
          <h2 class="h2">About this<br>class.</h2>
          <p class="detail-about">${esc(c.fullDescription)}</p>
        </div>
      </section>
 
      <section class="section section--tight">
        <div class="wrap">
          <h2 class="h2">What you’ll<br>learn.</h2>
          <ol class="learn-grid">
            ${c.learningOutcomes.map((o, i) => `
              <li class="learn-item">
                <span class="learn-item__num" style="color:${NUM_COLORS[i % NUM_COLORS.length]}" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 class="learn-item__title">${esc(o.title)}</h3>
                  <p class="learn-item__desc">${esc(o.description)}</p>
                </div>
              </li>`).join('')}
          </ol>
        </div>
      </section>
 
      <section class="section section--tight">
        <div class="wrap">
          <h2 class="h2">What you’ll<br>need.</h2>
          <ul class="needs">
            ${c.materials.map((m, i) => `
              <li class="need">
                <span class="need__icon" style="color:${NUM_COLORS[i % NUM_COLORS.length]}" aria-hidden="true">♪</span>
                <div><h3 class="need__title">${esc(m.title)}</h3><p>${esc(m.description)}</p></div>
              </li>`).join('')}
          </ul>
        </div>
      </section>
 
      <section class="detail-cta">
        <div class="wrap">
          <h2 class="detail-cta__title">${ctaTitle}</h2>
          <p class="detail-cta__name">${esc(c.title)}</p>
          <p class="detail-cta__when">${esc(when)}</p>
          ${ctaAction}
        </div>
      </section>`
    };
  };
 
  /* ---------------------------------------------------------- REGISTRATION */
  V.register = function (slug) {
    const c = OS.getClassBySlug(slug);
    if (!c) return V.notFound('We couldn’t find that class.');
    const fields = window.OPEN_SCORE_REGISTRATION_FIELDS || [];
    const when = `${OS.formatLongDate(c.date)} · ${OS.formatTimeRange(c.startTime, c.endTime)} · ${c.format} · ${c.level}`;
 
    // Full or closed classes never show the form, even via a direct link.
    if (!OS.isOpen(c)) {
      return {
        title: `${c.title} · Registration`,
        nav: 'classes',
        html: `
        <section class="register wrap">
          <a class="text-link back-link" href="${OS.classUrl(c)}">← Back to ${esc(c.title)}</a>
          <h1 class="page-hero__title">${closedMessage(c)[0]}</h1>
          <p class="lead">${esc(c.title)} isn’t taking registrations right now. Take a look at our other classes.</p>
          <div class="button-row">
            <a class="btn btn--violet" href="#/classes">See open classes →</a>
            <a class="btn btn--outline" href="${OS.classUrl(c)}">View class details</a>
          </div>
        </section>`
      };
    }
 
    return {
      title: `Register · ${c.title}`,
      nav: 'classes',
      html: `
      <section class="register wrap" data-register-area>
        <a class="text-link back-link" href="${OS.classUrl(c)}">← Back to ${esc(c.title)}</a>
        <div class="register__grid">
          <div class="register__main">
            <p class="eyebrow eyebrow--pink">Registration</p>
            <h1 class="page-hero__title">Save your<br>spot.</h1>
 
            <div class="selected-class">
              <p class="selected-class__label">You’re registering for</p>
              <p class="selected-class__title">${esc(c.title)}</p>
              <p class="selected-class__when">${esc(when)}</p>
            </div>
 
            <form class="form-card" novalidate data-register-form>
              ${fields.map((f) => OS.field(f, 'reg')).join('')}
              <p class="form-note">* Required. Registration questions may change as Open Score finalizes the program.</p>
              <p class="form-error" role="alert" data-form-error></p>
              <button class="btn btn--butter" type="submit">Submit registration →</button>
            </form>
            <p class="privacy-note">We only use this information to manage class registration and to contact you about this class.</p>
          </div>
          ${OS.deco('class-detail-notes.png', 'deco--register')}
        </div>
      </section>`,
      mount(root) {
        const form = root.querySelector('[data-register-form]');
        const formError = root.querySelector('[data-form-error]');
        OS.liveValidate(form, fields);
 
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          formError.textContent = '';
          const { valid, values } = OS.validateForm(form, fields);
          if (!valid) return;
 
          const btn = form.querySelector('button[type="submit"]');
          btn.disabled = true; btn.textContent = 'Submitting…';
          try {
            await OS.api.submitRegistration({ classId: c.id, classSlug: c.slug, fields: values });
            OS.app.show(V.confirmation(c, values.guardianEmail || ''));
          } catch (err) {
            console.error(err);
            formError.textContent = 'We couldn’t submit your registration. Check your connection and try again.';
            btn.disabled = false; btn.textContent = 'Submit registration →';
          }
        });
      }
    };
  };
 
  /* ---------------------------------------------------------- CONFIRMATION */
  V.confirmation = function (c, email) {
    const emailLine = OS.config.emailConfirmationsEnabled
      ? `A confirmation has been sent to <strong>${esc(email)}</strong>.`
      : `We’ll contact you at <strong>${esc(email)}</strong> with class details.`;
    return {
      title: `You’re registered · ${c.title}`,
      nav: 'classes',
      html: `
      <section class="confirmation wrap">
        ${OS.deco('class-detail-notes.png', 'deco--confirm')}
        <span class="confirmation__glyphs" aria-hidden="true">♫ ♪</span>
        <h1 class="confirmation__title" tabindex="-1">You’re registered! ♪</h1>
        <p class="confirmation__text">We received your registration for <strong class="accent-pink">${esc(c.title)}</strong>. ${emailLine}</p>
        <p class="confirmation__pill">${esc(OS.formatLongDate(c.date))} · ${esc(OS.formatTimeRange(c.startTime, c.endTime))} · ${esc(c.format)}</p>
        <a class="btn btn--violet" href="#/classes">Back to classes →</a>
        ${OS.demoNote('this registration was not saved or emailed because the site isn’t connected to a registration system yet.')}
      </section>`,
      mount(root) { root.querySelector('.confirmation__title').focus(); }
    };
  };
 
  /* -------------------------------------------------------------- NOT FOUND */
  V.notFound = function (message) {
    return {
      title: 'Page not found · The Open Score Project',
      nav: '',
      html: `
      <section class="register wrap center">
        <h1 class="page-hero__title">Hmm, that page<br>is off the score.</h1>
        <p class="lead">${esc(message || 'We couldn’t find the page you were looking for.')}</p>
        <div class="button-row button-row--center">
          <a class="btn btn--violet" href="#/classes">See classes →</a>
          <a class="btn btn--outline" href="#/">Go home</a>
        </div>
      </section>`
    };
  };
})();
 
