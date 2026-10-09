/*
 * Site-wide settings.
 *
 * formsEndpoint:
 *   Your Google Apps Script web app URL. Empty = demo mode (nothing saved).
 *   Filled = registrations and contact messages go to the Google Sheet,
 *   and classes are loaded from the Sheet's Class Types + Schedule tabs.
 *
 * familyConfirmationEmails:
 *   Match SEND_FAMILY_CONFIRMATION in the Apps Script.
 */
window.OPEN_SCORE_CONFIG = {
  formsEndpoint: 'https://script.google.com/macros/s/AKfycbzbjlqvJBqb3mEVCeAJBUI4KEdrLp6yP-WpQR_tkYV1wt6Z2aWlfCvvB3MYTOUxxuaKtg/exec',
  familyConfirmationEmails: true,

  contactEmail: 'theopenscoreproject.info@gmail.com',
  instagramHandle: 'theopenscoreproject',

  timezoneLabel: 'ET'
};

// Worked out automatically from the settings above — no need to edit.
window.OPEN_SCORE_CONFIG.backendConnected = /^https:\/\/script\.google\.com\//.test(window.OPEN_SCORE_CONFIG.formsEndpoint);
window.OPEN_SCORE_CONFIG.emailConfirmationsEnabled =
  window.OPEN_SCORE_CONFIG.backendConnected && window.OPEN_SCORE_CONFIG.familyConfirmationEmails;
