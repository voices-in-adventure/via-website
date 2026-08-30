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
| `stops` | array of objects | Only shown when `format === 'guide'`, and required for one. See below. |
| `featured` | boolean | Surfaces on the homepage. |

**Why `format` instead of a separate itinerary type.** A Destination Guide
already answers "if I have 24–72 hours here, what should I do" — that is an
itinerary. Making it a separate document type would force editors to make a
judgment call on every piece, and that ambiguity is where content models rot.
Journeys treats `format === 'guide'` as its itineraries.

### Destination Guides

A guide is a Dispatch with `format: 'guide'`. That one field does three
things, and nothing else has to be kept in sync:

- it lives at `/journeys/guides/<slug>` instead of `/dispatches/<slug>`
- it is left out of the Dispatches stream on Stories and appears on Journeys
- it renders with the itinerary-and-map template rather than the article one

Changing `format` in the Studio moves the piece completely. The routing lives
in `articleHref()` in `src/lib/articles.ts`; any new place that links to an
article must go through it rather than building a path by hand, and must
project `format` in its query — a projection missing that field silently
produces links to the old address.

`stops` is the itinerary itself, in order:

| Field | Type | Notes |
|---|---|---|
| `title` | string | required. The place's name. |
| `note` | text | What to do there, in the guide's own voice. |
| `lat` | number | required. Latitude, from Google Maps. |
| `lng` | number | required. Longitude. |

Each stop is a numbered pin on the map beside the guide, and the map follows
the reader down the page. The itinerary is written to be complete on its own:
the map is the same information drawn, so a guide still reads correctly with
the map absent, on a narrow screen, or with JavaScript off.

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

## `policy`

One section of VIA's Standards and Ethics, published at `/standards/<slug>`.
Six exist, transcribed from the client's Code of Ethics PDF.

| Field | Why |
|---|---|
| `title` | The section name. Also the link text on About. |
| `slug` | The URL under `/standards`. |
| `order` | Position in the sequence, from 1. Drives the index order and the previous/next links. |
| `summary` | One or two sentences, shown under the link on About and on the Standards index. |
| `body` | `blockContent`, the same body type Dispatches and Signals use. |

Not an article type: no author, no photography, no tags. These are a reference
document read in order, which is why `order` exists and why the six sections
carry previous/next rather than sitting in an archive. They sit with the
supporting records in the desk, not beside Dispatches — editors publish
against Dispatches daily and touch these once a year.

The copy lives in `scripts/ethics-copy.mjs` and is written into Sanity by
`scripts/seed-ethics.mjs`. That script creates missing sections and leaves
existing ones alone, so a re-run never quietly discards an edit made in
Studio; pass `--force` when the file has changed and should win.

The one-paragraph intro that introduces the whole set is *not* in Sanity — it
is static copy in `src/lib/standards.ts`, because it belongs to no section and
appears in two places.

---

## `siteSettings`

A singleton. Homepage hero image or video, mission statement, social links,
subscribe URLs for Dispatch and Signals.

Two mission fields, deliberately: `missionStatement` is the short line over
the homepage photo, `aboutMission` is the longer portable-text version at the
top of About. About falls back to the short one when the long one is empty.

### The Engage group

The Engage page has no server and no form service. Each of its three forms
opens the reader's own email app with the fields already written into the
message, so what the page needs from the CMS is where each one is addressed:

| Field | Used by |
|---|---|
| `contributeEmail` | The "Write for VIA" submission form. |
| `connectEmail` | The "Connect with VIA" form, including the 1–5 site rating. |
| `joinEmail` | The join button, when no `applicationFormUrl` is set. |
| `contributorPacketUrl` | The contributor packet button. Hidden while empty. |
| `applicationFormUrl` | The application questionnaire. Falls back to `joinEmail`. |
| `openRoles` | The open-role cards: `title` and `description` each. |

Every one of these degrades to nothing rather than to a broken link: an empty
`contributorPacketUrl` hides the button, an empty `openRoles` hides the cards,
and an empty address hides that whole form. Seeded by
`scripts/seed-engage.mjs`, which fills empty fields and leaves anything an
editor has already set alone.

Email cannot carry an attachment this way, which is why the submission form
asks for the piece to be attached to the message that opens rather than
offering a file input. Swapping in a real form service later is a change to
where the form posts, not a rebuild of the page.

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
- Journeys → Destination Guides → dispatches where `format == 'guide'`
- Stories → Dispatches → dispatches where `format != 'guide'`
- Resources → products page → all products, with the articles referencing
  each one
- Homepage ticker → distinct `city` values across published dispatches
- Homepage featured → `featured == true`, across both types, most recent first

None of these pages are hand-curated. They are queries.
