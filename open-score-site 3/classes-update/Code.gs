/**
 * The Open Score Project — form backend (Google Apps Script)
 *
 * Saves registrations and contact messages from the website into this
 * Google Sheet, emails you about each one, and (optionally) emails families
 * a registration confirmation.
 *
 * SETUP: see the steps in README.md → "Connect the forms to Google Sheets".
 */

// ===== EDIT THESE =====
const NOTIFY_EMAIL = 'theopenscoreproject.info@gmail.com'; // where new registrations + messages are sent
const SEND_FAMILY_CONFIRMATION = true;                    // email parents a confirmation after registering
// ======================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type === 'registration') saveRegistration(data);
    else if (data.type === 'contact') saveContact(data);
    else throw new Error('Unknown form type.');
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

// The website calls this (…/exec?action=classes) to load classes from the Sheet.
// Opening the URL in a browser with no action just checks it's running.
function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.action === 'classes') return json(getClassesData());
    return json({ ok: true, message: 'Open Score backend is running.' });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

/* ------------------------------------------------------------ REGISTRATION */
function saveRegistration(d) {
  const f = d.fields || {};
  const email = String(f.guardianEmail || '').trim();
  if (!f.studentFirstName || !f.guardianName || !isEmail(email)) {
    throw new Error('Missing or invalid required fields.');
  }

  // Re-check the class is still open (it may have filled up since the page loaded).
  const session = findSession(d.classId);
  if (session && session.status !== 'open') {
    throw new Error(session.status === 'full'
      ? 'Sorry, this class just filled up. Please choose another class.'
      : 'Sorry, registration for this class is closed.');
  }

  const sheet = getSheet('Registrations', [
    'Submitted', 'Class', 'Class date & time', 'Student first name',
    'Parent/guardian name', 'Parent/guardian email', 'Questions/comments', 'Class ID'
  ]);
  sheet.appendRow([
    new Date(), clean(d.classTitle), clean(d.classWhen), clean(f.studentFirstName, 100),
    clean(f.guardianName, 200), clean(email, 200), clean(f.comment, 1500), clean(d.classId, 200)
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: `New registration: ${d.classTitle} — ${f.studentFirstName}`,
    body:
      `A new student registered on the Open Score website.\n\n` +
      `Class: ${d.classTitle}\n` +
      `When: ${d.classWhen}\n\n` +
      `Student first name: ${f.studentFirstName}\n` +
      `Parent/guardian: ${f.guardianName}\n` +
      `Email: ${email}\n` +
      `Questions/comments: ${f.comment || '(none)'}\n\n` +
      `All registrations are in the "Registrations" tab of your Google Sheet.`
  });

  if (SEND_FAMILY_CONFIRMATION) {
    MailApp.sendEmail({
      to: email,
      replyTo: NOTIFY_EMAIL,
      name: 'The Open Score Project',
      subject: `You're registered for ${d.classTitle}! ♪`,
      body:
        `Hi ${f.guardianName},\n\n` +
        `Thanks for registering ${f.studentFirstName} for ${d.classTitle} with The Open Score Project!\n\n` +
        `When: ${d.classWhen}\n\n` +
        `We'll send the link to join the live online class before it starts. ` +
        `If you have any questions, just reply to this email.\n\n` +
        `See you soon!\nViolet, Freya & Cat\nThe Open Score Project`
    });
  }
}

/* ----------------------------------------------------------------- CONTACT */
function saveContact(d) {
  const email = String(d.email || '').trim();
  if (!d.name || !d.message || !isEmail(email)) throw new Error('Missing or invalid required fields.');

  const sheet = getSheet('Contact Messages', ['Submitted', 'Name', 'Email', 'Topic', 'Message']);
  sheet.appendRow([new Date(), clean(d.name, 200), clean(email, 200), clean(d.topic, 100), clean(d.message, 3000)]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: `New message (${d.topic}) from ${d.name}`,
    body: `${d.message}\n\n— ${d.name} (${email})\n\nReply to this email to answer them directly.`
  });
}

/* ----------------------------------------------------------------- HELPERS */
function getSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

// Stops text that starts with = + - @ from being treated as a spreadsheet formula.
function clean(value, max) {
  return String(value == null ? '' : value).replace(/^[=+\-@]/, "'$&").slice(0, max || 500);
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* =====================================================================
   CLASSES — managed by the founders in the "Class Types" and "Schedule"
   tabs. Use the menu  Open Score → Set up class tabs  once to create them.
   ===================================================================== */

const TYPES_TAB = 'Class Types';
const SCHEDULE_TAB = 'Schedule';
const HOWTO_TAB = 'How to use';
const STATUS_OPTIONS = ['Auto', 'Open', 'Closed', 'Full'];
const COLOR_OPTIONS = ['pink', 'yellow', 'green', 'blue', 'orange', 'lavender'];
const LEVEL_OPTIONS = ['Beginner', 'All Levels', 'Intermediate', 'Advanced'];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Open Score')
    .addItem('Set up class tabs', 'setupClassTabs')
    .addItem('Check website data', 'checkWebsiteData')
    .addToUi();
}

/** Creates the How to use, Class Types and Schedule tabs (with examples). Safe to run again. */
function setupClassTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ---- How to use ----
  let how = ss.getSheetByName(HOWTO_TAB);
  if (!how) {
    how = ss.insertSheet(HOWTO_TAB, 0);
    const lines = [
      ['How to update classes on the Open Score website'],
      [''],
      ['CLASS TYPES tab — one row per kind of class (e.g. Music Foundations).'],
      ['  • Write the name, descriptions, level, and pick a color.'],
      ['  • "What you’ll learn" and "What you’ll need": one item per line, written as  Title: description'],
      ['    (press Ctrl+Enter / ⌘+Enter inside a cell to start a new line).'],
      [''],
      ['SCHEDULE tab — one row per class session (a date and time).'],
      ['  • Pick the class from the dropdown, then type the date and times (e.g. 6:00 PM).'],
      ['  • Status:  Auto = open until it reaches Capacity or the date passes, then shows Full / Closed automatically.'],
      ['             Open / Closed / Full = always show that status.'],
      ['  • To add a class: add a new row. To move a class: change its date. To remove one: delete its row.'],
      [''],
      ['Changes appear on the website within a few seconds — just refresh the page.'],
      ['Registrations arrive in the Registrations tab; contact messages in Contact Messages.'],
      ['Tip: Open Score menu → "Check website data" shows exactly what the website will display.']
    ];
    how.getRange(1, 1, lines.length, 1).setValues(lines);
    how.getRange('A1').setFontSize(14).setFontWeight('bold');
    how.setColumnWidth(1, 900);
  }

  // ---- Class Types ----
  let types = ss.getSheetByName(TYPES_TAB);
  if (!types) {
    types = ss.insertSheet(TYPES_TAB);
    const headers = ['Class name', 'Tagline', 'Short description (Classes page)', 'Full description (About this class)',
      'Level', 'Color', 'What you’ll learn (Title: description, one per line)', 'What you’ll need (Title: description, one per line)'];
    const examples = [
      ['Music Foundations', 'Build the musical foundation for everything that comes next.',
        'Explore rhythm, melody, notation, and active listening while building the skills that make learning music easier and more meaningful.',
        'Music Foundations is a relaxed, beginner-friendly class for young musicians who are just getting started. Through games, listening activities, and simple hands-on exercises, students learn to read basic notation, keep a steady beat, and talk about the music they hear. No experience needed — just curiosity.',
        'Beginner', 'pink',
        'Read music: Learn the basics of musical notation.\nFind the rhythm: Explore rhythm through movement and listening.\nListen differently: Build active listening skills across different genres.\nBuild a foundation: Develop confidence with foundational music theory.',
        'A device with camera + mic: Laptop, tablet, or phone — whatever you have.\nA quiet spot to listen: Somewhere you can hear clearly and move a little.\nPaper + a pencil: No instrument required. Bring one if you like!'],
      ['Exploring Genres', 'Discover what makes every style of music unique.',
        'Travel through different styles of music and discover what makes each one unique.',
        'Exploring Genres takes students on a listening tour through styles like classical, jazz, blues, hip-hop, folk, and music from around the world. Each session we listen closely, compare what we hear, and try simple activities that show what makes each style sound the way it does. Open to all levels — beginners and experienced musicians are both welcome.',
        'All Levels', 'yellow',
        'Hear the difference: Pick out the sounds and instruments that define a style.\nTrace the roots: Discover where genres come from and how they connect.\nTalk about music: Describe what you hear using real musical words.\nFind your sound: Figure out which styles you love and why.',
        'A device with camera + mic: Laptop, tablet, or phone — whatever you have.\nA quiet spot to listen: Somewhere you can hear clearly and move a little.\nA favorite song (optional): Bring a song you love to share with the group.'],
      ['Rhythm & Beat', 'Feel the pulse that drives every song.',
        'Learn how rhythm works through listening, movement, patterns, and interactive activities.',
        'Rhythm & Beat is an energetic, hands-on class all about the pulse that drives music. Students clap, tap, move, and play rhythm games to feel the beat, recognize patterns, and create rhythms of their own. No experience needed — just bring your energy.',
        'Beginner', 'green',
        'Feel the beat: Find and keep a steady pulse.\nSpot patterns: Recognize repeating rhythms in songs you know.\nMove to music: Use your body to understand tempo and rhythm.\nCreate rhythms: Build and perform your own short rhythm patterns.',
        'A device with camera + mic: Laptop, tablet, or phone — whatever you have.\nRoom to move: A little open space to clap, tap, and dance.\nSomething to tap: A pencil, spoon, or upside-down bowl works great!']
    ];
    types.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#37215a').setFontColor('#ffffff');
    types.getRange(2, 1, examples.length, headers.length).setValues(examples);
    types.setFrozenRows(1);
    [200, 260, 320, 420, 110, 100, 420, 420].forEach((w, i) => types.setColumnWidth(i + 1, w));
    types.getRange('A:H').setWrap(true).setVerticalAlignment('top');
    types.getRange('E2:E').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(LEVEL_OPTIONS, true).setAllowInvalid(true).build());
    types.getRange('F2:F').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(COLOR_OPTIONS, true).build());
  }

  // ---- Schedule ----
  let sched = ss.getSheetByName(SCHEDULE_TAB);
  if (!sched) {
    sched = ss.insertSheet(SCHEDULE_TAB);
    const headers = ['Class name', 'Date', 'Start time', 'End time', 'Status', 'Capacity', 'Format'];
    const examples = [
      ['Music Foundations', new Date(2026, 8, 13), '6:00 PM', '6:45 PM', 'Auto', 15, 'Live Online'],
      ['Exploring Genres', new Date(2026, 8, 20), '6:00 PM', '6:45 PM', 'Closed', 15, 'Live Online'],
      ['Rhythm & Beat', new Date(2026, 8, 27), '6:00 PM', '6:45 PM', 'Full', 15, 'Live Online']
    ];
    sched.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#37215a').setFontColor('#ffffff');
    sched.getRange('C2:D').setNumberFormat('@'); // keep times as typed text, e.g. 6:00 PM
    sched.getRange(2, 1, examples.length, headers.length).setValues(examples);
    sched.getRange('B2:B').setNumberFormat('dddd, mmmm d, yyyy');
    sched.setFrozenRows(1);
    [200, 230, 110, 110, 100, 90, 120].forEach((w, i) => sched.setColumnWidth(i + 1, w));
    sched.getRange('A2:A').setDataValidation(SpreadsheetApp.newDataValidation()
      .requireValueInRange(types.getRange('A2:A'), true).setHelpText('Pick a class from the Class Types tab.').build());
    sched.getRange('B2:B').setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setHelpText('Type a date, e.g. 10/18/2026').build());
    sched.getRange('E2:E').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUS_OPTIONS, true).build());
  }

  SpreadsheetApp.getUi().alert('Class tabs are ready! Read the "How to use" tab, then edit Class Types and Schedule.');
}

/** Menu helper: shows what the website will display. */
function checkWebsiteData() {
  const data = getClassesData();
  const lines = data.sessions.map(s => `• ${s.className} — ${s.date} ${s.start}–${s.end} — ${s.status.toUpperCase()} (${s.registered}/${s.capacity || '∞'} registered)`);
  const problems = data.warnings.length ? '\n\nProblems to fix:\n' + data.warnings.join('\n') : '';
  SpreadsheetApp.getUi().alert('The website will show:\n\n' + (lines.join('\n') || '(no classes)') + problems);
}

/** Reads Class Types + Schedule (+ registration counts) for the website. */
function getClassesData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tz = ss.getSpreadsheetTimeZone();
  const warnings = [];
  const typesSheet = ss.getSheetByName(TYPES_TAB), schedSheet = ss.getSheetByName(SCHEDULE_TAB);
  if (!typesSheet || !schedSheet) return { ok: true, configured: false, types: [], sessions: [], warnings: ['Run Open Score → Set up class tabs.'] };

  const types = typesSheet.getDataRange().getValues().slice(1)
    .filter(r => String(r[0]).trim())
    .map(r => ({
      name: String(r[0]).trim(), tagline: String(r[1]).trim(), shortDescription: String(r[2]).trim(),
      fullDescription: String(r[3]).trim(), level: String(r[4]).trim() || 'All Levels',
      color: String(r[5]).trim().toLowerCase(), learn: parseItems(r[6]), need: parseItems(r[7])
    }));
  const typeNames = types.map(t => t.name);

  const counts = registrationCounts(ss);
  const values = schedSheet.getDataRange().getValues();
  const display = schedSheet.getDataRange().getDisplayValues();
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  const sessions = [];
  for (let i = 1; i < values.length; i++) {
    const name = String(values[i][0]).trim();
    if (!name) continue;
    const row = i + 1;
    if (typeNames.indexOf(name) < 0) { warnings.push(`Schedule row ${row}: "${name}" isn't in Class Types.`); continue; }
    const dateVal = values[i][1];
    if (!(dateVal instanceof Date)) { warnings.push(`Schedule row ${row}: the date isn't a real date.`); continue; }
    const date = Utilities.formatDate(dateVal, tz, 'yyyy-MM-dd');
    const start = parseTime(display[i][2]), end = parseTime(display[i][3]);
    if (!start) { warnings.push(`Schedule row ${row}: start time "${display[i][2]}" — write it like 6:00 PM.`); continue; }
    const capacity = Number(values[i][5]) || 0;
    const id = slugify(name) + '-' + date;
    const registered = counts[id] || 0;
    let status = String(values[i][4]).trim().toLowerCase() || 'auto';
    if (status === 'auto') status = date < today ? 'closed' : (capacity && registered >= capacity ? 'full' : 'open');
    if (['open', 'closed', 'full'].indexOf(status) < 0) status = 'closed';
    sessions.push({ id, className: name, date, start, end: end || addMinutes(start, 45), status, capacity, registered,
      format: String(values[i][6]).trim() || 'Live Online' });
  }
  sessions.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  return { ok: true, configured: true, types, sessions, warnings };
}

function findSession(id) {
  if (!id) return null;
  try { return getClassesData().sessions.filter(s => s.id === id)[0] || null; } catch (e) { return null; }
}

function registrationCounts(ss) {
  const sheet = ss.getSheetByName('Registrations');
  const counts = {};
  if (!sheet || sheet.getLastRow() < 2) return counts;
  const rows = sheet.getDataRange().getValues();
  const col = rows[0].indexOf('Class ID');
  if (col < 0) return counts;
  rows.slice(1).forEach(r => { const k = String(r[col]); if (k) counts[k] = (counts[k] || 0) + 1; });
  return counts;
}

// "Title: description" per line  →  [{title, description}]
function parseItems(cell) {
  return String(cell || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    const i = l.indexOf(':');
    return i > 0 ? { title: l.slice(0, i).trim(), description: l.slice(i + 1).trim() } : { title: l, description: '' };
  });
}

// "6:00 PM", "6 pm", "18:00" → "18:00"
function parseTime(text) {
  const m = String(text || '').trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([ap])?\.?\s*m?\.?$/i);
  if (!m) return '';
  let h = Number(m[1]); const min = Number(m[2] || 0); const ap = (m[3] || '').toLowerCase();
  if (ap === 'p' && h < 12) h += 12;
  if (ap === 'a' && h === 12) h = 0;
  if (h > 23 || min > 59) return '';
  return (h < 10 ? '0' : '') + h + ':' + (min < 10 ? '0' : '') + min;
}

function addMinutes(hhmm, mins) {
  const p = hhmm.split(':').map(Number); const t = p[0] * 60 + p[1] + mins;
  const h = Math.floor(t / 60) % 24, m = t % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

function slugify(s) {
  return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
