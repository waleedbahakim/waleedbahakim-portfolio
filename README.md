# Waleed Bahakim — Portfolio (Blueprint)

A full-stack engineer's portfolio presented as a blueprint / drawing set — navy drafting ink, paper white, and brand orange as markup ink.

**Live concept:** "The Drawing Set" · React single-page site.

## Stack

- React 18
- Vite 5
- lucide-react (icons)
- CSS-in-JS (single embedded stylesheet, no UI framework)

## Develop

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Assets

Drop these into `public/` so the links resolve in production:

- `Waleed_Bahakim_Resume.pdf` — the "Download CV" button links to `/Waleed_Bahakim_Resume.pdf`.

## Features

- Blueprint "drawing set" aesthetic with live IST clock, scroll reveals, and a scroll-progress indicator.
- **⌘K / Ctrl+K** command palette to jump between sheets (keyboard-first navigation).
- Fully responsive, with `prefers-reduced-motion` support.

## Deploy (Vercel)

Push this repo to GitHub, then in Vercel: **New Project → import the repo**. Framework is auto-detected as Vite (build `npm run build`, output `dist`). No environment variables required.
