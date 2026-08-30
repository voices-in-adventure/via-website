import type {SanityImageSource} from '@sanity/image-url'

/**
 * Products are the one thing on this site collated from *inside* articles
 * rather than filtered across them — see docs/content-model.md. A product is
 * its own document that articles reference, which is what lets the Resources
 * page assemble itself instead of being maintained by hand.
 */

export interface ProductMention {
  _type: 'dispatch' | 'signal'
  title: string
  slug: string
  publishedAt: string
  /**
   * Needed by articleHref(): a Dispatch with format 'guide' is a Destination
   * Guide and lives under /journeys/guides/, not /dispatches/. Leaving it out
   * silently produced links to pages that no longer exist.
   */
  format?: 'guide' | 'feature' | 'essay' | null
}

export interface Product {
  name: string
  slug: string
  category?: ProductCategory | null
  description?: string | null
  image?: SanityImageSource | null
  url?: string | null
  /** Every published article referencing this product, newest first. */
  articles: ProductMention[]
}

export type ProductCategory = 'gear' | 'app' | 'service' | 'booking' | 'other'

/**
 * `product` has no field pointing at articles — the reference runs the other
 * way — so the mentions are gathered with a back-reference. Products nothing
 * has been written about are filtered out: this page's whole premise is that
 * these are things VIA has actually used and covered.
 */
const MENTIONS = `*[_type in ["dispatch", "signal"] && publishedAt <= now() && references(^._id)]`

export const PRODUCTS_QUERY = `
  *[_type == "product" && defined(name) && defined(slug.current) && count(${MENTIONS}) > 0]{
    name,
    "slug": slug.current,
    category,
    description,
    image,
    url,
    "articles": ${MENTIONS} | order(publishedAt desc){
      _type, title, "slug": slug.current, publishedAt, format
    }
  }
`

/** Plain-language names for the dropdown values an editor picks in the Studio. */
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  gear: 'Gear',
  app: 'Apps',
  service: 'Services',
  booking: 'Booking',
  other: 'Everything else',
}

/** Fixed order, so the page doesn't reshuffle its sections as content changes. */
export const CATEGORY_ORDER: ProductCategory[] = ['gear', 'app', 'service', 'booking', 'other']

/**
 * Groups products under their category heading, dropping empty categories and
 * keeping CATEGORY_ORDER. Anything with no category set falls into "other"
 * rather than vanishing — the field isn't required in the schema.
 */
export function groupByCategory(products: Product[]): {
  category: ProductCategory
  label: string
  products: Product[]
}[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    products: products.filter((product) => (product.category ?? 'other') === category),
  })).filter((group) => group.products.length > 0)
}

/** Most-written-about first — the useful order for a page of recommendations. */
export function byMentions(a: Product, b: Product): number {
  return b.articles.length - a.articles.length || a.name.localeCompare(b.name)
}

/**
 * "rome2rio.com" — the outbound link reads as where it goes rather than as a
 * bare "Visit site", which tells a reader nothing before they click.
 */
export function linkLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
