/**
 * The six regions the Journeys globe can draw.
 *
 * These slugs are the `color` values on Sanity's `place` documents and the
 * `region` values in public/regions.geo.json. That is the whole join: a place
 * whose colour is `africa` lights up the shape whose region is `africa`.
 *
 * Kept in one file because three things have to agree — the schema dropdown
 * in studio/schemaTypes/documents/place.ts, the grouping in
 * scripts/build-regions.mjs, and the component. Adding a seventh region means
 * editing all three, and this list is where you find out.
 */
export const GLOBE_REGIONS = ['europe', 'asia', 'americas', 'africa', 'oceania', 'mideast'] as const

export type GlobeRegionSlug = (typeof GLOBE_REGIONS)[number]

export function isGlobeRegion(value: unknown): value is GlobeRegionSlug {
  return typeof value === 'string' && (GLOBE_REGIONS as readonly string[]).includes(value)
}

/** What the globe needs to know about one region in order to label and link it. */
export interface GlobeRegion {
  color: GlobeRegionSlug
  title: string
  href: string
  /** Already worded — "4 stories", "No stories yet" — so the globe never counts. */
  countLabel: string
}
