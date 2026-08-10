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
}

/** What the article page needs. */
export interface Article extends ArticleCard {
  heroCaption?: string | null
  body: PortableTextBlock[]
  format?: 'guide' | 'feature' | 'essay' | null
  duration?: number | null
  places?: {title: string}[] | null
  reasons?: {title: string}[] | null
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
  places[]->{title},
  reasons[]->{title}
`

/**
 * Where an article lives. The two types get separate URL prefixes because
 * they are separate streams on the Stories page, and a reader should be able
 * to tell which they are looking at from the address bar.
 */
export function articleHref(article: {_type: string; slug: string}): string {
  return article._type === 'signal' ? `/signals/${article.slug}` : `/dispatches/${article.slug}`
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
