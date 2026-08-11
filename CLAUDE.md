# VIA website

Editorial site for Voices in Adventure, a student-run travel publication.
Astro front end, Sanity CMS, deployed on Vercel.

## Read these

- `docs/via-design.md` — palette, type, layout, page structure. The brief.
- `docs/anti-slop.md` — craft rules and things to avoid.
- `docs/content-model.md` — Sanity schema. The architectural crux.

Read `via-design.md` before any design or layout work. Read
`content-model.md` before touching anything in `studio/` or any query.

## Who maintains this

The owner is non-technical and directs work entirely through Claude Code.
After handoff, whoever inherits the technical role will also be non-technical.

This means: explain what you changed in plain language, not just what files
you touched. Prefer boring, readable solutions over clever ones. If a
dependency would need ongoing maintenance, don't add it.

Editors publish through Sanity Studio and never touch this repo.

## Stack constraints

- **Astro**, not Next or React-first. Astro components with scoped styles are
  the default. Use a client island only where interactivity actually requires
  it.
- **No Tailwind.** No shadcn/ui, Radix, tailark, kokonut, or Tailwind-based
  component libraries.
- **No icon packs.** If icons are needed, draw a small custom set with
  consistent stroke weight.
- Every color, font, radius, and spacing value comes from the tokens defined
  in `via-design.md`, declared once in `src/styles/tokens.css`. No hardcoded
  hex values or font-family declarations anywhere else. This is load-bearing:
  the client's visual identity is not final, and changing it must be a
  one-file edit.

## Commands

```
npm run dev        # site at localhost:4321
npm run build      # production build — run before pushing
cd studio && npm run dev   # Sanity Studio at localhost:3333
```

## Content

All article content lives in Sanity, never in this repo. There are no
markdown articles.

Placeholder content for review builds must be **realistic** — plausible VIA
headlines and real travel photography, never lorem ipsum or gray boxes. The
client reviews these builds with stakeholders, and fake-looking content
produces useless feedback.

Placeholder images are downloaded into the repo, never hotlinked from an
external CDN.

## Secrets

The Sanity project ID and any tokens live in `.env.local`, which is
gitignored. Never commit them. If you need a new environment variable, add it
to `.env.example` with a placeholder value and tell the owner to set the real
value in both `.env.local` and Vercel's dashboard.

## Working style

- Run `npm run build` before saying a task is done. A broken build reaches
  production.
- Small, described commits. The commit log is documentation for whoever
  inherits this.
- If a request conflicts with `via-design.md`, say so rather than silently
  picking one.
- Keep completion summaries under five lines. Describe what changed, not how.
- Don't verify work in a browser unless the task is specifically about
  visual behavior under varied conditions. The owner checks visually.
- Only read docs/via-design.md and docs/anti-slop.md for genuine design
  work — not for copy edits, color swaps, or sizing changes.