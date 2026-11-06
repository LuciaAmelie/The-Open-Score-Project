
/*
 * The Open Score Project — API
 * Handles form submissions and loads classes and founder bios
 * from Google Sheets.
 */
(function () {
  const OS = window.OS;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function post(payload) {
    const res = await fetch(OS.config.formsEndpoint, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // Non-JSON response
    }

    if (!res.ok || !data || !data.ok) {
      throw new Error(
        (data && data.error) || `Form service replied ${res.status}`
      );
    }

    return data;
  }

  /*
   * Load classes from Google Sheets.
   * If unavailable, use the original classes.js data.
   */
  const COLORS = ['pink', 'yellow', 'green', 'blue', 'orange', 'lavender'];
  const ICONS = ['●', '★', '♪', '♫', '✿', '♡'];

  OS.loadClasses = async function () {
    OS.classesSource = 'file';

    if (!OS.config.backendConnected) return;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(
        `${OS.config.formsEndpoint}?action=classes`,
        { signal: controller.signal }
      );

      const data = await res.json();

      if (!data || !data.ok || !data.configured) return;

      const types = {};

      data.types.forEach((t, i) => {
        types[t.name] = { ...t, index: i };
      });

      const classes = data.sessions
        .filter((s) => types[s.className])
        .map((s) => {
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
            color: COLORS.indexOf(t.color) >= 0
              ? t.color
              : COLORS[t.index % COLORS.length],
            calendarIcon: ICONS[t.index % ICONS.length]
          };
        });

      window.OPEN_SCORE_CLASSES = classes;
      OS.classesSource = 'sheet';

    } catch (err) {
      console.warn(
        'Could not load classes from Google Sheets — using classes.js instead.',
        err
      );
    } finally {
      clearTimeout(timer);
    }
  };

  /*
   * Load founder biographies from the Team tab.
   *
   * Only biographies change.
   * Names, photos, credentials, colors, roles, and order
   * remain controlled by js/data/team.js.
   */
  OS.loadTeam = async function () {
    if (!OS.config.backendConnected) return;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(
        `${OS.config.formsEndpoint}?action=team`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        throw new Error(`Team service replied ${res.status}`);
      }

      const data = await res.json();

      if (!data || !data.ok || !Array.isArray(data.team)) {
        return;
      }

      const existing = window.OPEN_SCORE_TEAM;

      if (!Array.isArray(existing)) return;

      const biosByName = new Map(
        data.team
          .filter((person) =>
            person &&
            typeof person.name === 'string' &&
            typeof person.bio === 'string'
          )
          .map((person) => [
            person.name.trim().toLowerCase(),
            person.bio
          ])
      );

      window.OPEN_SCORE_TEAM = existing.map((person) => {
        const name = String(person.name).trim().toLowerCase();
        const bio = biosByName.get(name);

        if (bio === undefined) {
          return person;
        }

        return {
          ...person,
          bio: bio
        };
      });

    } catch (err) {
      console.warn(
        'Could not load founder bios from Google Sheets — using team.js instead.',
        err
      );
    } finally {
      clearTimeout(timer);
    }
  };

  /*
   * Registration and contact forms.
   * These work the same way as before.
   */
  OS.api = {
    async submitRegistration(payload) {
      if (!OS.config.backendConnected) {
        await wait(600);
        return { ok: true, saved: false };
      }

      const c = OS.getClassBySlug(payload.classSlug);

      await post({
        type: 'registration',
        classId: payload.classId,
        classTitle: c ? c.title : payload.classSlug,
        classWhen: c
          ? `${OS.formatLongDate(c.date)}, ${OS.formatTimeRange(c.startTime, c.endTime)} (${c.format})`
          : '',
        fields: payload.fields
      });

      return { ok: true, saved: true };
    },

    async submitContact(payload) {
      await post({
        type: 'contact',
        ...payload
      });

      return { ok: true };
    }
  };
})();
