# Kowsick K: Portfolio

React + Vite + Tailwind + Framer Motion. All content is in `src/data.js`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```

## Contact form (Formspree)
1. Create a form at https://formspree.io and copy its id (e.g. `xyzabcde`).
2. For local development, create an ignored `.env.local` file containing `VITE_FORMSPREE_ID=xyzabcde`.
3. For GitHub Pages, add a repository Actions secret named `VITE_FORMSPREE_ID`. For Vercel, add it as an environment variable in the project settings. Without it, the form opens the visitor's email app.
With a form id, submissions are sent to Formspree with its supported honeypot field. Without a key, the form validates input and opens the visitor's email app; the website does not store or send a message. The contact form does not have a first-party backend.

## Navigation and project details
- Press `Ctrl+K` (or `Cmd+K` on macOS) to open the searchable command palette.
- Select a project card to open its accessible project-details dialog. Its `?project=<project-slug>#projects` URL can be bookmarked or shared, works after a refresh, and follows browser back/forward.
- Project summaries, highlights, categories and technologies use the existing project data. Repository links currently point to the GitHub profile, not project-specific repositories; demo URLs and screenshots are omitted until real project links and assets are available.

## Deploy to GitHub Pages
1. Push this repository to GitHub as `kowsick10/Kowsick-portfolio` on the `main` branch.
2. In the repository, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist` to GitHub Pages.

The site will be available at `https://kowsick10.github.io/Kowsick-portfolio/`. To use the Formspree contact form, add the `VITE_FORMSPREE_ID` Actions secret in **Settings > Secrets and variables > Actions** before pushing.

## Deploy to Vercel
Use the Vite framework preset, `npm run build` as the build command, and `dist` as the output directory. Leave `VITE_BASE_PATH` unset so the site and its assets use the root path on the Vercel domain.

## Design credit
The interactive 3D skills keyboard is an original adaptation inspired by
[Naresh Khatri's 3D portfolio](https://github.com/Naresh-Khatri/3d-portfolio).

## Swap in your own content
| What | Where |
|---|---|
| Portrait | `/public/images/1000012069.jpg`, referenced as `'/images/1000012069.jpg'` by `profile.photo` in `src/data.js` |
| Resume | replace `/public/resume.pdf` |
| Project GitHub/live links | `projects[]` in `src/data.js` (search "TODO") |
| IEEE paper link | `publication.url` |
| CodeChef/SkillRack URLs | `competitive[]` |
| Domain | replace `kowsick.vercel.app` in `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| Social preview | replace `/public/og-image.png` (1200x630) |
