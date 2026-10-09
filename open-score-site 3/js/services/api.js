/*
 * Everything that talks to a server lives here, so connecting a real
 * backend later only means changing THIS file (plus the flags in config.js).
 *
 * Right now there is no backend:
 *   - submitRegistration() pretends to succeed after a short delay but
 *     DOES NOT save or email anything. The confirmation screen says so.
 *   - submitContact() is only used once backendConnected is true. Until then
 *     the contact form opens the visitor's email app (see views.js).
 *
 * TODO (backend): replace the bodies below with real calls, e.g. Supabase:
 *   const { error } = await supabase.from('registrations').insert(payload);
 *   if (error) throw error;
 */
(function () {
  const OS = window.OS;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  OS.api = {
    /**
     * @param {{classId: string, classSlug: string, fields: Object}} payload
     * @returns {Promise<{ok: boolean, saved: boolean}>}
     */
    async submitRegistration(payload) {
      if (OS.config.backendConnected) {
        // TODO (backend): send `payload` to the registrations database here.
        throw new Error('backendConnected is true but no backend call has been written in js/services/api.js yet.');
      }
      await wait(600); // mock network delay
      return { ok: true, saved: false };
    },

    /**
     * @param {{name: string, email: string, topic: string, message: string}} payload
     * @returns {Promise<{ok: boolean}>}
     */
    async submitContact(payload) {
      // TODO (backend): send `payload` to a contact-message endpoint here.
      throw new Error('No contact backend has been written in js/services/api.js yet.');
    }
  };
})();
