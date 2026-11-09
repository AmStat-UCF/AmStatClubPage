# AmStatClubPage

The website for AmStat@UCF, the American Statistical Association chapter at UCF. Built with Next.js, React, and TypeScript.

## Running it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Pages reload as you save.

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Local dev server with hot reload              |
| `npm run build` | Production build (also type-checks)           |
| `npm run start` | Serve the production build                    |
| `npm run lint`  | ESLint                                        |

## Editing content

Most updates only need changes in [`src/content/`](src/content/):

| File           | What's in it                                                     |
| -------------- | ---------------------------------------------------------------- |
| `site.ts`      | Links, meeting times, dues, activities, datathon details         |
| `officers.ts`  | Officer names, roles, majors, photos (add photos to `public/officers/`) |
| `about.ts`     | About page stats, history, FAQ                                   |
| `design.ts`    | Light/dark theme: storage key and the script that applies it before first paint |

A fact with `value: null` shows a dashed placeholder on the site until it's filled in.

## Design

Light mode is the day sky: white, the logo's blue (`#5392c8`), and navy text. Dark mode is the
night sky. The footer, the Figure 1 panel, and the datathon band are night surfaces with a star
field; in dark mode the band flips to daylight. All colors are tokens in `src/styles/tokens.css`.

The logo blue only reaches 3.3:1 contrast on white, so use it for the logo, large headings, and
graphics. Small text on light backgrounds uses `--brand-text` (`#2a679c`) instead.

## Layout

```
src/
  app/
    layout.tsx        fonts, metadata, header and footer shared by every page
    page.tsx          homepage
    icon.svg          favicon (icon.png and apple-icon.png are raster copies)
  assets/logo.ts      the logo as SVG paths, traced from the logo artwork
  components/         header, footer, logo, star field, tables, and the Figure 1 histogram
  content/            editable site content
  styles/             tokens.css (colors, type), then base, home, pages, and motion
```
