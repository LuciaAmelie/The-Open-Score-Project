
/*
 * Sends form submissions to the Google Apps Script set in js/config.js
 * (formsEndpoint), which saves them to a Google Sheet and sends emails.
 *
 * With no formsEndpoint (demo mode):
 *   - submitRegistration() pretends to succeed but saves nothing; the
 *     confirmation screen shows a "Demo mode" note.
 *   - the contact form opens the visitor's email app instead (views.js).
 */
(function () {
  const OS = window.OS;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function post(payload) {
    // Sent as plain text so the browser doesn't block the request to Google.
    const res = await fetch(OS.config.formsEndpoint, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* non-JSON reply */ }
    if (!res.ok || !data || !data.ok) {
      throw new Error((data && data.error) || `Form service replied ${res.status}`);
    }
    return data;
  }

  /*
   * Loads classes from the Google Sheet (Class Types + Schedule tabs).
   * If the Sheet isn't connected or can't be reached, the site keeps using
   * the classes in js/data/classes.js.
   */
  const COLORS = ['pink', 'yellow', 'green', 'blue', 'orange', 'lavender'];
  const ICONS = ['●', '★', '♪', '♫', '✿', '♡'];

  OS.loadClasses = async function () {
    OS.classesSource = 'file';
    if (!OS.config.backendConnected) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(`${OS.config.formsEndpoint}?action=classes`, { signal: controller.signal });
      const data = await res.json();
      if (!data || !data.ok || !data.configured) return;
      const types = {};
      data.types.forEach((t, i) => { types[t.name] = { ...t, index: i }; });
      const classes = data.sessions.filter((s) => types[s.className]).map((s) => {
        const t = types[s.className];
        return {
          id: s.id,
          slug: s.id,
          title: t.name,
          tagline: t.tagline,
          shortDescription: t.shortDescription,
          fullDescription: t.fullDescription,
          level: t.level,
          format: s.format,
          date: s.date,
          startTime: s.start,
          endTime: s.end,
          instructor: {},
          learningOutcomes: t.learn,
          materials: t.need,
          capacity: s.capacity,
          registrationStatus: s.status,
          color: COLORS.indexOf(t.color) >= 0 ? t.color : COLORS[t.index % COLORS.length],
          calendarIcon: ICONS[t.index % ICONS.length]
        };
      });
      window.OPEN_SCORE_CLASSES = classes;
      OS.classesSource = 'sheet';
    } catch (err) {
      console.warn('Could not load classes from Google Sheets — using js/data/classes.js instead.', err);
    } finally {
      clearTimeout(timer);
    }
  };

  /*
   * Loads only founder biographies from the Team tab. Everything else
   * (photos, credentials, colors, role, and founder order) stays in team.js.
   * On failure, the original team.js biographies remain unchanged.
   */
  OS.loadTeam = async function () {
    if (!OS.config.backendConnected) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(`${OS.config.formsEndpoint}?action=team`, { signal: controller.signal });
      if (!res.ok) throw new Error(`Team service replied ${res.status}`);
      const data = await res.json();
      if (!data || !data.ok || !Array.isArray(data.team)) return;

      const existing = window.OPEN_SCORE_TEAM;
      if (!Array.isArray(existing)) return;

      const biosByName = new Map(
        data.team
          .filter((person) => person && typeof person.name === 'string' && typeof person.bio === 'string')
          .map((person) => [person.name.trim().toLowerCase(), person.bio])
      );

      // Merge bios by name, not by row number; preserve original founder order.
      window.OPEN_SCORE_TEAM = existing.map((person) => {
        const bio = biosByName.get(String(person.name).trim().toLowerCase());
        return bio === undefined ? person : { ...person, bio };
      });
    } catch (err) {
      console.warn('Could not load founder bios from Google Sheets — using js/data/team.js instead.', err);
    } finally {
      clearTimeout(timer);
    }
  };

  OS.api = {
    /** @param {{classId: string, classSlug: string, fields: Object}} payload */
    async submitRegistration(payload) {
      if (!OS.config.backendConnected) {
        await wait(600); // demo mode
        return { ok: true, saved: false };
      }
      const c = OS.getClassBySlug(payload.classSlug);
      await post({
        type: 'registration',
        classId: payload.classId,
        classTitle: c ? c.title : payload.classSlug,
        classWhen: c ? `${OS.formatLongDate(c.date)}, ${OS.formatTimeRange(c.startTime, c.endTime)} (${c.format})` : '',
        fields: payload.fields
      });
      return { ok: true, saved: true };
    },

    /** @param {{name: string, email: string, topic: string, message: string}} payload */
    async submitContact(payload) {
      await post({ type: 'contact', ...payload });
      return { ok: true };
    }
  };
})();
