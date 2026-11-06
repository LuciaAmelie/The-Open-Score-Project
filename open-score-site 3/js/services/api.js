
/*
 * The Open Score Project — API
 *
 * Handles:
 * - Class schedules from Google Sheets
 * - Founder biographies and credentials
 * - Registration submissions
 * - Contact form submissions
 */
(function () {
  const OS = window.OS;
  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // =====================================================
  // FORM SUBMISSIONS
  // =====================================================

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
        (data && data.error) ||
        `Form service replied ${res.status}`
      );
    }

    return data;
  }

  // =====================================================
  // LOAD CLASSES FROM GOOGLE SHEETS
  // =====================================================

  const COLORS = [
    'pink', 'yellow', 'green',
    'blue', 'orange', 'lavender'
  ];

  const ICONS = ['●', '★', '♪', '♫', '✿', '♡'];

  OS.loadClasses = async function () {
    OS.classesSource = 'file';

    if (!OS.config.backendConnected) return;

    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(),
      6000
    );

    try {
      const res = await fetch(
        `${OS.config.formsEndpoint}?action=classes`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        throw new Error(
          `Classes service replied ${res.status}`
        );
      }

      const data = await res.json();

      if (
        !data ||
        !data.ok ||
        !data.configured ||
        !Array.isArray(data.types) ||
        !Array.isArray(data.sessions)
      ) {
        return;
      }

      const types = {};

      data.types.forEach((t, i) => {
        types[t.name] = { ...t, index: i };
      });

      const classes = data.sessions
        .filter(s => types[s.className])
        .map(s => {
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
            color: COLORS.includes(t.color)
              ? t.color
              : COLORS[t.index % COLORS.length],
            calendarIcon: ICONS[t.index % ICONS.length]
          };
        });

      window.OPEN_SCORE_CLASSES = classes;
      OS.classesSource = 'sheet';

    } catch (err) {
      console.warn(
        'Could not load classes from Google Sheets.',
        err
      );
    } finally {
      clearTimeout(timer);
    }
  };

  // =====================================================
  // LOAD FOUNDER BIOS AND CREDENTIALS
  // =====================================================

  OS.loadTeam = async function () {
    if (!OS.config.backendConnected) {
      console.warn(
        'Founder data: Google Sheets backend not connected.'
      );
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(),
      12000
    );

    try {
      const url = new URL(OS.config.formsEndpoint);

      url.searchParams.set('action', 'team');
      url.searchParams.set('_', Date.now());

      const res = await fetch(url.toString(), {
        signal: controller.signal,
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error(
          `Team service replied ${res.status}`
        );
      }

      const data = await res.json();

      if (
        !data ||
        !data.ok ||
        !Array.isArray(data.team)
      ) {
        throw new Error(
          (data && data.error) ||
          'Invalid Team response from Google Sheets.'
        );
      }

      const existing = window.OPEN_SCORE_TEAM;

      if (!Array.isArray(existing)) {
        console.warn('Original team data not found.');
        return;
      }

      const teamByName = new Map(
        data.team
          .filter(person =>
            person &&
            typeof person.name === 'string'
          )
          .map(person => [
            person.name.trim().toLowerCase(),
            person
          ])
      );

      window.OPEN_SCORE_TEAM = existing.map(person => {
        const name = String(person.name)
          .trim()
          .toLowerCase();

        const updated = teamByName.get(name);

        if (!updated) return person;

        const result = { ...person };

        // Update the biography.
        if (typeof updated.bio === 'string') {
          result.bio = updated.bio;
        }

        // Update credentials only when the Sheet
        // provides them. Preserve the original
        // credential structure where possible.
        if (
          Array.isArray(updated.credentials) &&
          updated.credentials.length > 0
        ) {
          if (
            Array.isArray(person.credentials) &&
            person.credentials.some(item =>
              item &&
              typeof item === 'object' &&
              !Array.isArray(item)
            )
          ) {
            // Existing credentials use objects.
            // Keep their structure by using a
            // title/description format.
            result.credentials =
              updated.credentials.map(item => {
                const separator = item.indexOf(':');

                return separator >= 0
                  ? {
                      title: item.slice(0, separator).trim(),
                      description: item.slice(separator + 1).trim()
                    }
                  : {
                      title: item,
                      description: ''
                    };
              });
          } else {
            // Existing credentials use strings.
            result.credentials = updated.credentials;
          }
        }

        return result;
      });

      console.log(
        'Founder bios and credentials loaded from Google Sheets.'
      );

    } catch (err) {
      console.warn(
        'Could not load founder data from Google Sheets. Using team.js instead.',
        err
      );
    } finally {
      clearTimeout(timer);
    }
  };

  // =====================================================
  // REGISTRATION AND CONTACT FORMS
  // =====================================================

  OS.api = {
    async submitRegistration(payload) {
      if (!OS.config.backendConnected) {
        await wait(600);
        return {
          ok: true,
          saved: false
        };
      }

      const c = OS.getClassBySlug(
        payload.classSlug
      );

      await post({
        type: 'registration',
        classId: payload.classId,
        classTitle: c
          ? c.title
          : payload.classSlug,
        classWhen: c
          ? `${OS.formatLongDate(c.date)}, ${OS.formatTimeRange(c.startTime, c.endTime)} (${c.format})`
          : '',
        fields: payload.fields
      });

      return {
        ok: true,
        saved: true
      };
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
