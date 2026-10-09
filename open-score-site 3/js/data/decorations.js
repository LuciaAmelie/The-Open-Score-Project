/*
 * Where each decoration sits, measured from the Figma design.
 * Files live in assets/images/ (export them from the "Website Assets" page
 * in Figma — see assets/images/README.md).
 *
 *   x, w  = left edge and width as % of the section's width
 *   y     = top edge as % of the section's height (negative = pokes above)
 *   big   = hidden on phones so it doesn't cover text
 *
 * Missing files are skipped automatically.
 */
window.OPEN_SCORE_DECORATIONS = {
  'home-hero': [
    { file: 'home-hero-sheet-music.png', x: 50.69, y: 29.98, w: 52.74, big: true },
    { file: 'home-hero-tape.png', x: -11.94, y: -19.48, w: 50.27, big: true },
    { file: 'home-hero-heart.png', x: 0, y: -8.27, w: 33.89, big: true },
    { file: 'home-hero-star.png', x: 75.63, y: 1.52, w: 22.62 },
    { file: 'home-hero-note.png', x: 21.53, y: 33.66, w: 9.38 }
  ],
  'home-open': [
    { file: 'home-open-notes-left.png', x: 13.96, y: 12.74, w: 14.01 },
    { file: 'home-open-notes.png', x: 64.71, y: 64.52, w: 9.51 },
    { file: 'home-open-note.png', x: 74.24, y: 5.48, w: 11.73 }
  ],
  'home-cta': [
    { file: 'home-cta-sun.png', x: 27.64, y: -12.65, w: 14.34 },
    { file: 'home-cta-star.png', x: 84.67, y: -7.35, w: 12.98 },
    { file: 'home-cta-heart.png', x: 5.63, y: 46.18, w: 15.19 },
    { file: 'home-cta-flower.png', x: 88.68, y: 49.85, w: 11.68 },
    { file: 'home-cta-star-2.png', x: 56.53, y: 74.71, w: 12.38 }
  ],
  'about-hero': [
    { file: 'about-hero-tape.png', x: 0, y: 34.56, w: 32.3, big: true },
    { file: 'about-hero-clef.png', x: 3.88, y: 8.3, w: 8.51 },
    { file: 'about-hero-star.png', x: 84.17, y: 4.22, w: 12.36 },
    { file: 'about-hero-flower.png', x: 78.33, y: 22.62, w: 11.64 },
    { file: 'about-hero-notes.png', x: 68.52, y: 83.71, w: 7.08 }
  ],
  'about-why': [
    { file: 'about-why-notes.png', x: 4.98, y: 9.09, w: 5.39 },
    { file: 'about-why-rainbow.png', x: 81.88, y: 6.06, w: 15.46 },
    { file: 'about-why-heart.png', x: 7.64, y: 45.15, w: 10.27 },
    { file: 'about-why-star.png', x: 89.58, y: 85.33, w: 6.65 }
  ],
  'about-team': [
    { file: 'about-team-notes.png', x: 40.33, y: 87.5, w: 4.06 },
    { file: 'about-team-flower.png', x: 55.56, y: 86.5, w: 4.04 }
  ],
  'about-cta': [
    { file: 'about-cta-doodle-1.png', x: 6.05, y: 7.69, w: 7.7 },
    { file: 'about-cta-doodle-2.png', x: 85.42, y: 3.06, w: 8.82 },
    { file: 'about-cta-doodle-3.png', x: 8.33, y: 74.38, w: 7.37 },
    { file: 'about-cta-doodle-4.png', x: 83.85, y: 75.96, w: 7.75 }
  ],
  'team-hero': [
    { file: 'team-hero-tape.png', x: 44.03, y: -7.39, w: 55.97, big: true },
    { file: 'team-hero-smiley.png', x: 49.58, y: -20.87, w: 28.63, big: true },
    { file: 'team-hero-star.png', x: 53.47, y: 13.14, w: 3.14 }
  ],
  'founders': [
    { file: 'team-founders-doodle.png', x: 41.32, y: 80, w: 58.68, big: true },
    { file: 'team-founders-flower.png', x: 78.13, y: 84, w: 21.88, big: true }
  ],
  'contact-hero': [
    { file: 'contact-hero-star.png', x: 51.04, y: 0, w: 25.56, big: true },
    { file: 'contact-hero-doodle.png', x: 79.51, y: 55.87, w: 16.35 }
  ],
  'contact-main': [
    { file: 'contact-main-doodle.png', x: 0, y: 32.93, w: 38.89, big: true }
  ]
};
