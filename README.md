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
| `design.ts`    | Which design direction is the default; the draft design switcher |

A fact with `value: null` shows a dashed placeholder on the site until it's filled in.

During drafting, a switcher in the bottom-right corner flips between four design directions.
You can also link to one directly with `?variant=journal|midnight|swiss|varsity`.

## Layout

```
src/
  app/
    layout.tsx        fonts, metadata, header and footer shared by every page
    page.tsx          homepage
    globals.css       all styles; colors and fonts are tokens at the top
    icon.png          favicon
  components/         header, footer, tables, and the Figure 1 histogram
  content/site.ts     editable site content
  assets/             logo files
```
