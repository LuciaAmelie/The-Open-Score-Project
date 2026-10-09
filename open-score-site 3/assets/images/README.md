# Decorations from Figma

**All the images are already in this folder.** You only need these steps if you change a decoration in Figma and want to update it.

## Updating images from Figma

The Figma file has a page called **Website Assets**. It holds a copy of every decoration, sticker, and framed photo. Each copy is already named with the exact file name the website expects, and each is already set up to export.

## Steps

1. Open the Figma file and go to the **Website Assets** page (in the Pages list on the left).
2. Press **⌘ ⇧ E** on Mac or **Ctrl ⇧ E** on Windows. You can also use the menu: **File → Export…**.
3. Make sure all 58 items are checked, then click **Export** and choose a folder.
4. Move every exported file into this `assets/images/` folder, so it sits next to this README.
5. Upload the updated folder to GitHub, replacing the old files.

That's it. The site places each image in the same spot as the design.

## Good to know

- **Don't rename the files.** The website looks for these exact names, like `home-hero-star.png` and `founder-violet.png`.
- **Any missing image is skipped.** Photos show initials instead, and the music staff lines fall back to drawn lines. So nothing breaks if you add images a few at a time.
- **Big decorations hide on phones** so they don't cover text.
- **To move or resize a decoration,** edit its numbers in `js/data/decorations.js`. `x` and `w` are a % of the page width, and `y` is a % of that section's height.
- **The files are large,** since Figma exports at full quality. Before uploading, you can run them through [tinypng.com](https://tinypng.com) to make the site load faster.
- **For a new instructor photo,** put the image in this folder and set `instructor.photo` in `js/data/classes.js`, for example `'assets/images/instructor-maya.jpg'`.
