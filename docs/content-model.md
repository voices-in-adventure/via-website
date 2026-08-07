# Content model

The Sanity schema. Everything on this site derives from it, and it is the
expensive thing to change later — Journeys and Resources are not pages
anyone builds, they are queries over this structure.

Six document types. Schemas live in `studio/schemaTypes/`, written as code so
they stay in version control.

---

## The principle

**Journeys** filters whole articles by tag: click Europe, see every Dispatch,
Signal, and guide tagged Europe.

**Resources** collates entities mentioned *inside* articles: click Products,
see every product any article has referenced.

That difference is why `product` is a document type rather than a tag. An
editor writing about a backpack links to the backpack's record; the Resources
page assembles itself from those links. If products were free-text tags, that
page could never show a description, an image, or a link.

---

## `dispatch`

Long-form, 1,000–1,500 words.

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | slug | from title, required |
| `dek` | text | One sentence. Acts as the lead and the card summary. Required — the editorial guide mandates it. |
| `author` | reference → `author` | required |
| `heroImage` | image | required, `hotspot: true` |
| `heroCaption` | string | |
| `publishedAt` | datetime | required |
| `format` | string | radio: `guide` / `feature` / `essay`. Required. |
| `duration` | number | dropdown: 24 / 36 / 48 / 72. Only shown when `format === 'guide'`. |
| `city` | string | The place this is about. Feeds the homepage ticker. |
| `places` | array of references → `place` | required, min 1 |
| `reasons` | array of references → `reason` | |
| `products` | array of references → `product` | |
| `body` | array (portable text) | required |
| `featured` | boolean | Surfaces on the homepage. |

**Why `format` instead of a separate itinerary type.** A Destination Guide
already answers "if I have 24–72 hours here, what should I do" — that is an
itinerary. Making it a separate document type would force editors to make a
judgment call on every piece, and that ambiguity is where content models rot.
Journeys treats `format === 'guide'` as its itineraries.

## `signal`

Short-form industry news, 150–500 words.

Same fields as `dispatch`, except:

- No `format`, `duration`, or `city`.
- Add `newsPeg` (text, required) — the specific development the piece is
  grounded in. The editorial standards require one.
- Add `informationAsOf` (date, required) — travel information goes stale
  fast. Prices, visa rules, and entry requirements need a date the reader can
  see. Render it on the article page.

## `product`

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | slug | required |
| `category` | string | dropdown: `gear` / `app` / `service` / `booking` / `other` |
| `description` | text | Short. One or two sentences. |
| `image` | image | |
| `url` | url | External link |

## `author`

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | slug | required |
| `role` | string | e.g. "Staff Writer", "Managing Editor" |
| `bio` | text | |
| `headshot` | image | `hotspot: true` |

Powers both article bylines and the About page team grid.

## `place`

Regional tags for Journeys → Places to go. Deliberately broad; the client
wants curiosity, not precision.

| Field | Type | Notes |
|---|---|---|
| `title` | string | Europe, Asia, Americas, Africa, Oceania, Middle East |
| `slug` | slug | required |
| `color` | string | dropdown matching the tag tokens in `via-design.md` |
| `description` | text | Shown at the top of the archive page |

## `reason`

Thematic tags for Journeys → Reasons to go. Catchy and SEO-oriented:
"for the plot," "stipend just dropped," "bored for the weekend,"
"table for one."

Same shape as `place`, minus `color`.

---

## `siteSettings`

A singleton. Homepage hero image or video, mission statement, social links,
subscribe URLs for Dispatch and Signals.

---

## Editor experience

The people using this are student editors, not developers. The Studio config
matters as much as the schema.

- Group fields into tabs: **Content** (title, dek, body), **Media** (hero,
  caption), **Tags** (places, reasons, products), **Publishing** (author,
  date, featured).
- Every field gets a `description` written in plain language. "Which regions
  does this piece cover? Pick all that apply" — not "places[]".
- Configure `preview` on every type so the document list shows the hero
  thumbnail and title, not an unlabeled row.
- Desk structure: Dispatches and Signals as top-level items, Products,
  Authors, and Tags grouped below.

## Queries this enables

- Journeys region page → dispatches and signals where `places` includes this
  place, sorted by date
- Journeys reason page → same, filtered on `reasons`
- Journeys itineraries → dispatches where `format == 'guide'`
- Resources → products page → all products, with the articles referencing
  each one
- Homepage ticker → distinct `city` values across published dispatches
- Homepage featured → `featured == true`, across both types, most recent first

None of these pages are hand-curated. They are queries.
