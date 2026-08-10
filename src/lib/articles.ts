import type {SanityImageSource} from '@sanity/image-url'
import type {PortableTextBlock} from 'astro-portabletext/types'

/**
 * Shared shapes and helpers for the two article types. Dispatch and Signal
 * are the same thing with different metadata density — see
 * docs/content-model.md — so they share a template and these projections
 * rather than each page inventing its own.
 */

export interface ArticleAuthor {
  name: string
  role?: string | null
}

/** The six region colors an editor can pick on a Place. */
export type PlaceColor = 'europe' | 'asia' | 'americas' | 'africa' | 'oceania' | 'mideast'

/**
 * A tag as an article page renders it. `title` is not required() in the
 * schema, so it can genuinely be missing — callers filter those out rather
 * than printing an empty rectangle.
 */
export interface ArticleTag {
  title?: string | null
  slug?: string | null
  color?: PlaceColor | null
}

/** What a card needs. Deliberately smaller than the full article. */
export interface ArticleCard {
  _type: 'dispatch' | 'signal'
  title: string
  slug: string
  dek: string
  heroImage: SanityImageSource
  publishedAt: string
  city?: string | null
  author: ArticleAuthor | null
  /** The editors' toggle. Drives the homepage picks and the top of each Stories stream. */
  featured?: boolean | null
}

/** What the article page needs. */
export interface Article extends ArticleCard {
  heroCaption?: string | null
  body: PortableTextBlock[]
  format?: 'guide' | 'feature' | 'essay' | null
  duration?: number | null
  places?: ArticleTag[] | null
  reasons?: ArticleTag[] | null
  /** Signals only. */
  newsPeg?: string | null
  /** Signals only. */
  informationAsOf?: string | null
}

/** Fields every card on the site pulls. Kept in one place so cards stay consistent. */
export const CARD_PROJECTION = `
  _type,
  title,
  "slug": slug.current,
  dek,
  heroImage,
  publishedAt,
  city,
  featured,
  author->{name, role}
`

/** Everything an article page renders. */
export const ARTICLE_PROJECTION = `
  ${CARD_PROJECTION},
  heroCaption,
  body,
  format,
  duration,
  newsPeg,
  informationAsOf,
  places[]->{title, "slug": slug.current, color},
  reasons[]->{title, "slug": slug.current}
`

/**
 * The editors' picks, newest first. The homepage builds its whole front
 * block out of this one ordered list — the first item is the lead, the next
 * few flank it — so the order the editors publish in is the order the page
 * ranks in, with no second curation step in the code.
 */
export const FEATURED_ARTICLES = `
  *[_type in ["dispatch", "signal"] && featured == true && publishedAt <= now()]
    | order(publishedAt desc){${CARD_PROJECTION}}
`

/**
 * Everything published, newest first. The homepage river runs this and drops
 * whatever the front block already used, so the bottom of the page keeps
 * filling with recent work even when little is featured.
 */
export const LATEST_ARTICLES = `
  *[_type in ["dispatch", "signal"] && publishedAt <= now()]
    | order(publishedAt desc){${CARD_PROJECTION}}
`

/**
 * Every published article carrying a given tag, newest first. Both Journeys
 * archive types run this with $id bound to the place or reason document —
 * references() matches whichever array the tag sits in, so one query serves
 * both axes.
 */
export const TAGGED_ARTICLES = `
  *[_type in ["dispatch", "signal"] && publishedAt <= now() && references($id)]
    | order(publishedAt desc){${CARD_PROJECTION}}
`

/**
 * How many published articles carry a tag. Written as a projection fragment
 * because the Journeys landing page needs it once per tag, inside the tag
 * query — ^._id is the tag being projected.
 */
export const TAG_COUNT = `
  "count": count(*[_type in ["dispatch", "signal"] && publishedAt <= now() && references(^._id)])
`

/**
 * Where an article lives. The two types get separate URL prefixes because
 * they are separate streams on the Stories page, and a reader should be able
 * to tell which they are looking at from the address bar.
 */
export function articleHref(article: {_type: string; slug: string}): string {
  return article._type === 'signal' ? `/signals/${article.slug}` : `/dispatches/${article.slug}`
}

/**
 * Where a tag archive lives. The two axes get separate prefixes because
 * Journeys presents them as two separate ways of choosing — a place and a
 * reason are not interchangeable, and the URL should say which you picked.
 */
export function placeHref(slug: string): string {
  return `/journeys/places/${slug}`
}

export function reasonHref(slug: string): string {
  return `/journeys/reasons/${slug}`
}

/** "Dispatch — Berlin" / "Signal". The small line above a card or article title. */
export function articleKicker(article: {_type: string; city?: string | null}): string {
  const label = article._type === 'signal' ? 'Signal' : 'Dispatch'
  return article.city ? `${label} — ${article.city}` : label
}

/**
 * The same kicker, but split so the product name can be colored on its own.
 * Only "Dispatch"/"Signal" carries the accent — the city and the dash stay
 * muted, which keeps the accent on the one word that identifies what the
 * piece is. Templates that need the flat string still use articleKicker().
 */
export function articleKickerParts(article: {_type: string; city?: string | null}): {
  label: string
  city: string | null
} {
  return {
    label: article._type === 'signal' ? 'Signal' : 'Dispatch',
    city: article.city ?? null,
  }
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value))
}
