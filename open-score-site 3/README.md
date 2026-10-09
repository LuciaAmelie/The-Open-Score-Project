# The Open Score Project — website

This is the website for The Open Score Project, which offers free live online music classes for young musicians. It's built with plain HTML, CSS, and JavaScript. There's no build step and nothing to install, and it runs on GitHub Pages for free.

## Put it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `open-score`.
2. Upload everything in this folder, including the hidden `.nojekyll` file. You can either:
   - use **Add file → Upload files** and drag the folder contents in, or
   - use git: `git init`, `git add .`, `git commit -m "Open Score site"`, then push.
3. In the repo, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then pick **main** and **/ (root)**, and click **Save**.
4. After a minute or two, your site will be live at `https://YOUR-USERNAME.github.io/open-score/`.

To preview on your computer, just double-click `index.html`.

## Decorations and photos

All 60 images (58 Figma decorations and photos, plus the 2 story photos on Our Team) are already included in `assets/images/`. They've been compressed so the site loads fast. If you change a decoration in Figma later, re-export it from the **Website Assets** page and replace the file with the same name. See [`assets/images/README.md`](assets/images/README.md) for details.

## Change classes

**All class information lives in one file:** `js/data/classes.js`. This includes the title, date, time, level, descriptions, instructor, what students will learn, what they'll need, and the status.

When you edit a class there, it updates everywhere at once: the Classes list, the calendar, the Class Detail page, and the Registration form.

- To **close registration**, set `registrationStatus: 'closed'`.
- To **mark a class full**, set `registrationStatus: 'full'`.
- To **add a class**, copy one class block, paste it below, and give it a new `id` and `slug`. The slug is what appears in the web address, so use lowercase letters and dashes, like `'piano-basics'`.

Other things you can edit:

- **Registration questions** are in `js/data/registration-fields.js`.
- **Founders and their credentials** are in `js/data/team.js`.
- **The contact email and Instagram handle** are in `js/config.js`.

## Pages and web addresses

| Page | Address |
|---|---|
| Home | `#/` |
| About | `#/about` |
| Classes (with calendar) | `#/classes` |
| Class Detail | `#/classes/music-foundations` (one per class, generated from the data) |
| Registration | `#/classes/music-foundations/register` |
| Our Team | `#/team` |
| Contact | `#/contact` |

The addresses use `#/` so they work on GitHub Pages without any server setup.

## Every interactive element and what it does

| Element | Action |
|---|---|
| Navbar logo | Goes to Home. If you're already on Home, it scrolls to the top. |
| About / Classes / Our Team / Contact | Go to that page. The current page is highlighted in pink with an underline. |
| Menu button (phones/tablets) | Opens and closes the nav. The menu closes when you pick a page or press Esc. |
| Skip to content (keyboard users) | Jumps past the navbar. |
| Explore Classes buttons (Home, About, Our Team, Contact) | Go to Classes. |
| Learn More → (About) | Scrolls down to the "Music should be something every child gets to explore" section. |
| Meet Our Team → (About) | Goes to Our Team. |
| View Calendar ⌄ / Hide Calendar ↑ | Expands the calendar above the class list, pushing the list down, then collapses it. |
| ← Month / Month → (calendar) | Shows the previous or next month. Months with no classes say so. |
| Class dates on the calendar | Open that class's detail page. |
| ↓ Upcoming classes | Scrolls to the class list. |
| Class titles | Open that class's detail page. |
| Credentials ▾ (Our Team) | Opens/closes each founder's list of credentials. |
| Register → (open classes) | Opens that class's detail page. |
| Registration Closed / Full | Status labels only, not clickable. |
| ← Back to classes (Class Detail) | Goes back to Classes. |
| Register for this class → (top and bottom of Class Detail) | Opens the registration form for that class. |
| See open classes → (closed or full classes) | Goes back to Classes. |
| Registration form | Checks the required fields and the email format. On success, it shows "You're registered! ♪". |
| Back to classes → (confirmation) | Goes back to Classes. |
| Contact form | Checks the required fields and the email format. It then opens the visitor's email app with the message ready to send (until a backend is connected). |
| Email / Instagram links (Contact) | Open the email app, or Instagram in a new tab. |

**Visiting a closed or full class's `/register` address directly** shows a "registration is closed" message instead of the form. **Unknown addresses** show a friendly page-not-found screen with links back.

## Needs a backend before launch

These work on screen but **don't save or send anything yet**. The site is honest about that and shows a "Demo mode" note so families aren't misled.

1. **Saving registrations.** Replace the placeholder in `submitRegistration()` in `js/services/api.js` with a real database call, for example to Supabase. Then set `backendConnected: true` in `js/config.js`.
2. **Confirmation emails to families.** This needs an email service, such as Resend or Supabase plus an email function. Once emails really send, set `emailConfirmationsEnabled: true`. The confirmation screen will then say "A confirmation has been sent to…".
3. **Contact messages.** For now, the form hands the message to the visitor's email app, which actually works. To receive messages directly instead, write `submitContact()` in `api.js` (or use a form service like Formspree).
4. **Founders editing classes without code.** Move the class list from `classes.js` into a database or admin panel, and load it in `OS.getClasses()` in `js/utils.js`.
5. **Marking classes full automatically.** Compare the number of registrations to each class's `capacity` once registrations are stored.

## Folder map

```
index.html                    page shell + navbar
css/styles.css                all styling (colors and fonts at the top)
js/config.js                  site settings + backend/email switches
js/data/classes.js            ★ all class info
js/data/team.js               founders
js/data/registration-fields.js  registration questions
js/data/decorations.js        where each Figma decoration sits
js/utils.js                   date/time formatting, helpers
js/services/api.js            where backend calls go
js/components.js              shared pieces (logo, badges, form fields…)
js/views.js                   every page
js/app.js                     page switching, menu, scrolling
assets/images/                images exported from Figma
```
