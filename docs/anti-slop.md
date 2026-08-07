
Universal rules for building this site well. `via-design.md` holds the project's
actual palette, type, and structure — where the two conflict, `via-design.md`
wins, because it is the client's brief.

Condensed from the pols.dev anti-slop law and Open Design's color craft rules,
cut down to what applies to a photo-led editorial publication built in Astro.

---

## The three that matter most

**Cohesion beats correctness.** The most common failure is not a slop tell,
it is incoherence — a page of individually-fine parts that do not belong to
each other. One palette held with discipline. One type voice. One signature
element that everything else is composed around. A page assembled from good
parts that argue reads worse than a plainer page that agrees with itself.

**Take the language from references, never the content.** The client's
reference sites (Fora, miso, the Cape Town frame) supply palette mood, type
energy, motion, and the *kind* of hero. They do not supply headlines, layouts,
or components to reproduce. Reference is direction, not stencil.

**Spend boldness in one place.** The world-clock ticker is the risk. Everything
around it stays quiet. Before calling any page done: look at it and remove one
thing.

---

## Accent discipline

The single biggest readability failure in generated interfaces is accent
overuse.

- **At most two visible uses of the accent per screen.** A typical pair: one
  link cluster plus one primary action. Not a flood.
- Links count. Focus rings count. Hover states count.
- If a screen already has an accent-colored action, demote body links to
  underlined `--fg`.
- Photography does not count toward this budget. The rule governs interface
  chrome, not images.

## Contrast gates

Run these as gates, not goals.

| Pair | Minimum |
|---|---|
| Body text on background | 4.5:1 |
| Large text (>18px, or 14px bold) | 3:1 |
| UI components against adjacent surfaces | 3:1 |

Text over photography needs a real treatment — a gradient scrim, a solid
plate, or a genuinely dark region of the image. "It looked fine on this one
photo" is not a system. Every image the CMS accepts must produce readable
type.

---

## Tells to avoid

These apply to this project. (A great many others exist for SaaS marketing
pages — pricing tables, testimonial cards, product-window mockups, logo walls.
This site has none of those surfaces, so those rules are omitted.)

**Color and light**
- Two-stop gradients as decoration. Especially blue→purple, which is the most
  recognizable machine-made color move there is.
- Any drift of the accent toward indigo or violet.
- Background glows, radial halos, and soft blurred blobs.
- Glows clipped by a section edge, ending in a visible hard line.
- Hard color seams where two sections meet.

**Shape and shadow**
- Fully-rounded pill shapes for buttons or tags.
- The default all-around drop shadow. Light comes from somewhere; shadows
  should reflect that.
- Card hover-lift. A card that rises and glows on hover is a stock component.
- An icon or logo sitting inside a filled rounded tile.

**Layout**
- Decorative grid or graph-paper backgrounds.
- Text jammed against a container edge.
- Content sliced by a section boundary in a way that reads as accidental
  rather than composed.
- Ragged parallel columns that were meant to align and don't.
- Perfect symmetry with no tension. Alternate density instead.
- Elements that are nearly centered but not actually centered.

**Type**
- Cramped display type with no air around it.
- Decorative quotation marks — giant quote glyphs, ornamental smart quotes.
  If a line needs emphasis, give it size and space.
- Tracked-caps applied to every label as a house tic.
- Two display faces competing.

**Motion**
- Content hidden behind an entrance animation. Animate position, never
  opacity-from-zero on anything the reader needs.
- Floating or bobbing decorative elements.
- Buttons that jump on hover.

**Content**
- Lorem ipsum, "feature one / two / three," or any visible placeholder text.
  Placeholder copy on this project means *realistic VIA headlines* — an empty
  section is a composition problem, not an excuse to invent filler.
- Invented statistics.
- Emoji standing in for icons.

---

## Sanctioned for this project

The source documents flag these as tells. They are **explicitly approved
here**, because they are the client's brief:

- **Photo with text overlay.** Khue's spec, and the register of every
  reference site. This is the site's primary composition.
- **High-contrast editorial serif for display.** The publication register
  depends on it.
- **A letterspaced serif wordmark**, if the logo treatment calls for it.
- **Full-bleed atmospheric hero.** Required.
- **Mono as a data voice** — confined to the ticker.

Do not avoid these. Execute them well.

Conversely, one AI-default look to steer clear of even though it is close to
the references: **warm cream background + high-contrast serif + terracotta
accent.** That combination now appears on generated sites regardless of
subject. VIA's near-white and azure sidesteps it, which is part of why the
palette is what it is. Do not drift back toward cream.

---

## Stack notes

This is **Astro**, not Next or React.

- Do not install shadcn/ui, Radix, tailark, kokonut, or Tailwind-based
  component libraries. They do not apply, and adding Tailwind to pull in one
  block is a bad trade.
- Astro components with scoped styles are the default. Reach for a client-side
  island only where interactivity genuinely requires it — the ticker needs
  one; a static card does not.
- No icon library by default. If icons are needed, draw a small custom set
  with consistent stroke weight. A uniform thin-stroke icon pack is
  recognizable on sight.
- Every color, font, radius, and spacing value comes from the tokens in
  `via-design.md`. No hardcoded hex or font-family anywhere else in the codebase.
  This is what makes Khue's feedback a one-file change.

---

## Before calling anything done

1. Count accent uses on the screen. More than two — cut one.
2. Check text-over-image contrast against the *worst* photo, not the best.
3. Look for anything nearly-but-not-quite aligned or centered.
4. Confirm no content is invisible when animation is disabled.
5. Remove one thing.
