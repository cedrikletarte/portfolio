# Portfolio — cedrikletarte.com

A multilingual portfolio built with Next.js, TypeScript, Tailwind CSS, and Material UI. Deployed via Docker and GitLab CI/CD.

Live: [cedrikletarte.com](https://www.cedrikletarte.com)

![Thumbnail](/public/assets/screenshots/thumbnail.png)

---

## Getting Started

```bash
git clone <repository-url>
cd portfolio
npm install
cp .env.example .env.local   # fill in the values, see "Environment variables" below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start the dev server (Turbopack)                   |
| `npm run build`      | Production build                                   |
| `npm run start`      | Serve the production build (`npm run build` first) |
| `npm run lint`       | Run ESLint                                         |
| `npm test`           | Run the test suite once                            |
| `npm run test:watch` | Run the test suite in watch mode                   |

## Environment variables

| Variable       | Required | Purpose                                                                                                              |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `MAIL_USER`    | Yes      | Gmail address the contact form sends from/to (via Nodemailer)                                                        |
| `MAIL_PASS`    | Yes      | Gmail app password for `MAIL_USER`                                                                                   |
| `GITHUB_TOKEN` | No       | GitHub PAT to raise the API rate limit for the GitHub stats section; falls back to unauthenticated requests if unset |

## Architecture

```
src/
  app/            # Next.js App Router: pages, layouts, the /api/contact route
  components/
    layout/       # Navbar, mobile drawer, social links
    sections/     # One component per homepage section (Home, About, Skills, ...)
    projects/     # Project gallery/detail views
    backgrounds/  # Decorative canvas animations
    ui/           # Small reusable primitives (Reveal, SectionTitle, CTAButton, ...)
  data/           # Static project data (data/projects.ts)
  hooks/          # Shared hooks (useAnimatedCanvas, useCvDownload)
  i18n/           # next-intl routing/config
  lib/            # Server-only logic (GitHub API fetch)
  messages/       # en.json / fr.json translation dictionaries
  theme/          # MUI theme + the app's shared color constant
```

Sections are grouped by type rather than by feature. At this project's size that keeps things easy to scan without the overhead of a feature-folder structure.
