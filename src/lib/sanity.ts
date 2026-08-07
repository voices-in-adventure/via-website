import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Missing PUBLIC_SANITY_PROJECT_ID or PUBLIC_SANITY_DATASET. Copy .env.example to .env.local and fill in the real values.',
  )
}

/** Talks to Sanity. Used from page frontmatter to fetch content at build time. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-01-01',
  useCdn: false, // this is a static build, so freshness at build time matters more than CDN speed
})

const builder = createImageUrlBuilder(sanityClient)

/** Turns a Sanity image field into a URL you can put on an <img>. Chain .width()/.height() as needed before calling .url(). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
