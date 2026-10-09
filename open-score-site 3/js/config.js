/*
 * Site-wide settings.
 *
 * backendConnected:
 *   false = registrations and contact messages are NOT saved anywhere yet.
 *           The site shows a small "demo mode" note so nobody is misled, and
 *           the contact form opens the visitor's email app instead.
 *   true  = flip this ONLY after js/services/api.js talks to a real database.
 *
 * emailConfirmationsEnabled:
 *   true only once a real email service sends confirmation emails to families.
 *   This controls whether the confirmation screen says an email was sent.
 */
window.OPEN_SCORE_CONFIG = {
  backendConnected: false,
  emailConfirmationsEnabled: false,

  contactEmail: 'theopenscoreproject.info@gmail.com',
  instagramHandle: 'theopenscoreproject',

  timezoneLabel: 'ET'
};
