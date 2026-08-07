# VIA — Design System

Voices in Adventure. A student-run travel publication.
Two editorial products: **Dispatch** (long-form, 1,000–1,500 words) and
**Signals** (short-form industry news, 150–500 words).

This file defines what VIA looks like. `docs/anti-slop.md` defines how to
build well in general. Where they conflict, this file wins — it is the brief.

---

## Register

Editorial. The reference points are Condé Nast Traveler for the homepage and
the Georgetown Journal of International Affairs for article layouts.

The brand thesis from the founders is **"early 2000s globalism"** — the
curiosity and scale of the world, crossed with the yearning and nostalgia
young people feel about it. Not backpacker-casual. Not corporate. A real
publication run by people in their twenties.

**Photography carries the page.** Type stays out of its way. Every reference
site the client chose does the same thing: full-bleed image, type set directly
on it, almost no color anywhere else.

---

## The signature

**A live world-clock ticker.** A single row of city names with their current
local time, set in mono, running along the bottom edge of the homepage hero.

This is the one bold move on the site. It earns its place because it *is* the
brand thesis rendered as an interface element — global, simultaneous, slightly
technical, faintly nostalgic for the era of departure boards.

Rules for it:

- Live, not static. Times update.
- Cities are the ones VIA has actually published about, pulled from content —
  not a hardcoded list of world capitals.
- Mono only. This is the only place mono appears at scale.
- It sits at the bottom edge of the hero. It does not float, bob, or animate
  decoratively. It is a readout, not an ornament.

Everything else on the page stays quiet so this lands.

---

## Color

The palette is **near-white with a single blue accent.** Khue's remaining
brand colors exist only as tag coding — they never appear in layout,
backgrounds, buttons, or decoration.

```css
:root {
  /* Neutrals — 90% of non-photographic pixels */
  --bg:          #FAFAFA;  /* never pure white */
  --surface:     #F2F2F0;
  --fg:          #111111;  /* never pure black */
  --muted:       #6B6B6B;
  --border:      #E2E2DE;

  /* Accent — VIA blue. Max 2 visible uses per screen. */
  --accent:        #0B6FD4;  /* text, links, rules — passes 4.5:1 on --bg */
  --accent-bright: #1A85FF;  /* fills only, never text */

  /* Tag colors — semantic only. Never decorative. */
  --tag-europe:   #1A85FF;
  --tag-asia:     #D4562A;
  --tag-americas: #1E3A5F;
  --tag-africa:   #7A4410;
  --tag-oceania:  #C9A227;
  --tag-mideast:  #4A7C59;
}
```

Tag color assignments are provisional pending Khue's sign-off. The
constraint that matters is structural: **six colors, used only to identify
regions, never to decorate.**

Note on the accent: VIA blue is a true azure. It must not drift toward indigo
or violet under any circumstance — that is the single most recognizable
AI-generated color move, and the client's logo blue is specifically not it.

---

## Type

Three faces, each with one job.

| Role | Face | Used for |
|---|---|---|
| Display + body | **Newsreader** | Headlines, deks, article body |
| Utility | **Poppins** | Nav, metadata, captions, tags, buttons |
| Data | **Space Mono** | The world-clock ticker only |

**Newsreader** does double duty deliberately. It has optical sizes, meaning
the same family renders correctly as a 72px headline and as 18px body text —
which is exactly what an editorial site needs and what most pairings fail at.
One family across both roles is more cohesive than a display/body pair that
argue with each other.

**Poppins** is Khue's choice, carried through. It is not distinctive, but it
is legible and it keeps her system visibly present. Confining it to interface
and metadata means it never competes with the editorial voice.

**Space Mono** appears in the ticker and nowhere else. Its retro-technical
character is the point.

Pacifico and Minerve are **not used**. Script and handwriting faces cannot
carry a publication and the client has no appetite for them.

### Scale

```css
--text-xs:   0.75rem;   /* tags, timestamps */
--text-sm:   0.875rem;  /* captions, bylines */
--text-base: 1.125rem;  /* article body — 18px, not 16px */
--text-lg:   1.375rem;  /* deks, pull quotes */
--text-xl:   2rem;
--text-2xl:  3rem;
--text-3xl:  4.5rem;
--text-4xl:  7rem;      /* hero only */
```

Article body sets at 18px with a measure of 65–75 characters and line-height
1.65. This is a reading site; body text gets treated as the primary surface,
not as filler between images.

Display type gets air. Line-height 1.05 at the largest sizes, and generous
margin around it — cramped display type reads as amateur faster than almost
anything else.

---

## Layout

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-6: 24px;  --space-8: 32px;
--space-12: 48px; --space-16: 64px; --space-24: 96px;
--space-32: 128px;

--radius: 4px;        /* consistent everywhere it applies */
--measure: 68ch;      /* article column */
--gutter: var(--space-6);
```

Full-bleed media has no radius. Nothing is ever pill-shaped — no fully-rounded
buttons, no capsule tags. Tags are rectangles with the standard radius.

Section rhythm alternates density: one tight section, one that breathes.
A page of evenly-spaced equal-weight sections reads as a template.

---

## Page structure

**Home** — Three sections per the brief: mission statement over a full-bleed
photo or video, with the world-clock ticker at the bottom edge. Then featured
writers and editor's picks. Then reserved space for a social feed, currently a
placeholder (VIA's Instagram is not yet active — do not embed anything).

**About** — Extended mission, team grid (15–20 people), and a join/contribute
invitation.

**Stories** — Dispatches and Signals as separate streams, highlighted pieces
at the top, full archive below. Subscribe option for each.

**Journeys** — Two axes: *Places to go* (regional: Europe, Asia, Americas,
Africa, Oceania, Middle East) and *Reasons to go* (thematic: "for the plot,"
"stipend just dropped," "bored for the weekend," "table for one"). Both are
tag-driven aggregate views. They auto-populate. Nothing here is hand-curated.

**Resources** — Collates entities mentioned *inside* articles: products, maps,
emergency info, checklists. Products are their own records that articles link
to, which is what lets this page assemble itself.

**Article** — GJIA register. Generous measure, real hierarchy, photography
integrated rather than decorative. Dispatch and Signal share a template with
different metadata density.

---

## Motion

Calm, authored, purposeful. Dead is a failure; decorative is worse.

- The nav enters on load and responds to scroll.
- The ticker updates continuously — that is the page's pulse.
- Crafted hovers on cards and links. No lift, no scale-up, no glow.
- Never animate opacity from 0 on content. If motion fails, the words must
  still be there.
- `prefers-reduced-motion` respected throughout.

---

## Provisional

These are placeholders until Khue's call:

- Tag color assignments per region
- Whether Poppins survives as the utility face
- Any logo lockup treatment

Every one of these is a token in this file. Changing them after the call is a
single-file edit, not a refactor. Keep it that way — no hardcoded hex values,
no hardcoded font names anywhere in the codebase.
