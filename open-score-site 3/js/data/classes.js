/*
 * ONE place for all class information.
 *
 * The Classes list, the calendar, each Class Detail page, and the
 * Registration form all read from this list. Change a title, date, time,
 * instructor, or status here and it updates everywhere.
 *
 * Later, this list can come from a database/admin panel instead
 * (see README → "Connecting a backend").
 *
 * Field guide
 *   id                  unique id (never shown)
 *   slug                used in the web address: #/classes/<slug>
 *   title               class name
 *   tagline             one-line hook at the top of the Class Detail page
 *   shortDescription    shown on the Classes list
 *   fullDescription     "About this class" on the Class Detail page
 *   level               e.g. Beginner, All Levels
 *   format              e.g. Live Online
 *   date                YYYY-MM-DD
 *   startTime/endTime   24-hour HH:MM, e.g. "16:00"
 *   instructor          { name, role, bio, photo }  (saved for later — not shown on the site right now)
 *   learningOutcomes    [{ title, description }]  (3–4 items)
 *   materials           [{ title, description }]  "What you'll need"
 *   capacity            max students (for the future backend)
 *   registrationStatus  "open" | "closed" | "full"
 *   color               accent: "pink" | "yellow" | "green" | "blue" | "orange" | "lavender"
 *   calendarIcon        small symbol shown on the calendar
 */
window.OPEN_SCORE_CLASSES = [
  {
    id: 'cls-001',
    slug: 'music-foundations',
    title: 'Music Foundations',
    tagline: 'Build the musical foundation for everything that comes next.',
    shortDescription:
      'Explore rhythm, melody, notation, and active listening while building the skills that make learning music easier and more meaningful.',
    fullDescription:
      'Music Foundations is a relaxed, beginner-friendly class for young musicians who are just getting started. Through games, listening activities, and simple hands-on exercises, students learn to read basic notation, keep a steady beat, and talk about the music they hear. No experience needed — just curiosity.',
    level: 'Beginner',
    format: 'Live Online',
    date: '2026-09-13',
    startTime: '18:00',
    endTime: '18:45',
    instructor: {
      name: '[Instructor name]',
      role: 'Music Educator, Open Score',
      bio: '[Instructor name] has spent the last several years teaching young learners how to find joy in music through play, rhythm, and exploration.',
      photo: ''
    },
    learningOutcomes: [
      { title: 'Read music', description: 'Learn the basics of musical notation.' },
      { title: 'Find the rhythm', description: 'Explore rhythm through movement and listening.' },
      { title: 'Listen differently', description: 'Build active listening skills across different genres.' },
      { title: 'Build a foundation', description: 'Develop confidence with foundational music theory.' }
    ],
    materials: [
      { title: 'A device with camera + mic', description: 'Laptop, tablet, or phone — whatever you have.' },
      { title: 'A quiet spot to listen', description: 'Somewhere you can hear clearly and move a little.' },
      { title: 'Paper + a pencil', description: 'No instrument required. Bring one if you like!' }
    ],
    capacity: 15,
    registrationStatus: 'open',
    color: 'pink',
    calendarIcon: '●'
  },
  {
    id: 'cls-002',
    slug: 'exploring-genres',
    title: 'Exploring Genres',
    tagline: 'Discover what makes every style of music unique.',
    shortDescription:
      'Travel through different styles of music and discover what makes each one unique.',
    fullDescription:
      'Exploring Genres takes students on a listening tour through styles like classical, jazz, blues, hip-hop, folk, and music from around the world. Each session we listen closely, compare what we hear, and try simple activities that show what makes each style sound the way it does. Open to all levels — beginners and experienced musicians are both welcome.',
    level: 'All Levels',
    format: 'Live Online',
    date: '2026-09-20',
    startTime: '18:00',
    endTime: '18:45',
    instructor: {
      name: '[Instructor name]',
      role: 'Music Educator, Open Score',
      bio: '[Instructor bio — 2–3 sentences about their musical background and teaching.]',
      photo: ''
    },
    learningOutcomes: [
      { title: 'Hear the difference', description: 'Pick out the sounds and instruments that define a style.' },
      { title: 'Trace the roots', description: 'Discover where genres come from and how they connect.' },
      { title: 'Talk about music', description: 'Describe what you hear using real musical words.' },
      { title: 'Find your sound', description: 'Figure out which styles you love and why.' }
    ],
    materials: [
      { title: 'A device with camera + mic', description: 'Laptop, tablet, or phone — whatever you have.' },
      { title: 'A quiet spot to listen', description: 'Somewhere you can hear clearly and move a little.' },
      { title: 'A favorite song (optional)', description: 'Bring a song you love to share with the group.' }
    ],
    capacity: 15,
    registrationStatus: 'closed',
    color: 'yellow',
    calendarIcon: '★'
  },
  {
    id: 'cls-003',
    slug: 'rhythm-and-beat',
    title: 'Rhythm & Beat',
    tagline: 'Feel the pulse that drives every song.',
    shortDescription:
      'Learn how rhythm works through listening, movement, patterns, and interactive activities.',
    fullDescription:
      'Rhythm & Beat is an energetic, hands-on class all about the pulse that drives music. Students clap, tap, move, and play rhythm games to feel the beat, recognize patterns, and create rhythms of their own. No experience needed — just bring your energy.',
    level: 'Beginner',
    format: 'Live Online',
    date: '2026-09-27',
    startTime: '18:00',
    endTime: '18:45',
    instructor: {
      name: '[Instructor name]',
      role: 'Music Educator, Open Score',
      bio: '[Instructor bio — 2–3 sentences about their musical background and teaching.]',
      photo: ''
    },
    learningOutcomes: [
      { title: 'Feel the beat', description: 'Find and keep a steady pulse.' },
      { title: 'Spot patterns', description: 'Recognize repeating rhythms in songs you know.' },
      { title: 'Move to music', description: 'Use your body to understand tempo and rhythm.' },
      { title: 'Create rhythms', description: 'Build and perform your own short rhythm patterns.' }
    ],
    materials: [
      { title: 'A device with camera + mic', description: 'Laptop, tablet, or phone — whatever you have.' },
      { title: 'Room to move', description: 'A little open space to clap, tap, and dance.' },
      { title: 'Something to tap', description: 'A pencil, spoon, or upside-down bowl works great!' }
    ],
    capacity: 15,
    registrationStatus: 'full',
    color: 'green',
    calendarIcon: '♪'
  }
];
