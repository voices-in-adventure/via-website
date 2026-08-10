/**
 * Writes the placeholder articles in sample-content.mjs into Sanity.
 *
 *   node scripts/fetch-sample-photos.mjs   # first — this needs the files
 *   node scripts/seed-sample-content.mjs
 *
 * Safe to re-run. Every document gets a fixed `sample-` id, so a second run
 * replaces what the first run wrote instead of duplicating it — and the
 * prefix is how you find and delete placeholder content later. Real
 * documents created in Studio have random ids and are never touched.
 *
 * Authentication: this uses whatever account the Sanity CLI is logged in as
 * (`cd studio && npx sanity login`). No token goes in .env.local or in this
 * repo. Set SANITY_WRITE_TOKEN to override.
 */

import {readFile, stat} from 'node:fs/promises'
import {createReadStream} from 'node:fs'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {createClient} from '@sanity/client'
import {articles, authors} from './sample-content.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const photoDir = join(repoRoot, 'imagery', 'articles')

process.loadEnvFile(join(repoRoot, '.env.local'))

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-01-01',
  token: await resolveToken(),
  useCdn: false,
})

/**
 * A write token, from the environment if set, otherwise from the Sanity
 * CLI's own login. Reading the CLI's credential file means the owner never
 * has to create, store, or rotate a second token by hand.
 */
async function resolveToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN
  try {
    const config = JSON.parse(await readFile(join(homedir(), '.config/sanity/config.json'), 'utf8'))
    if (config.authToken) return config.authToken
  } catch {
    // fall through to the error below
  }
  throw new Error(
    'No Sanity credentials found. Run `cd studio && npx sanity login`, or set SANITY_WRITE_TOKEN.',
  )
}

/** Portable Text needs a stable-ish key on every block and span. */
const key = () => randomBytes(6).toString('hex')

/**
 * Turns the plain strings in sample-content.mjs into Portable Text. A string
 * is a paragraph; ['h2', text] is a subheading. Only styles that
 * studio/schemaTypes/objects/blockContent.ts allows are produced here.
 */
function toPortableText(paragraphs) {
  return paragraphs.map((entry) => {
    const [style, text] = Array.isArray(entry) ? entry : ['normal', entry]
    return {
      _key: key(),
      _type: 'block',
      style,
      markDefs: [],
      children: [{_key: key(), _type: 'span', text, marks: []}],
    }
  })
}

/** slug → document id, for a tag or author type that already exists. */
async function idsBySlug(type) {
  const rows = await client.fetch(`*[_type == $type]{_id, "slug": slug.current}`, {type})
  return new Map(rows.map((row) => [row.slug, row._id]))
}

function reference(map, slug, kind) {
  const id = map.get(slug)
  if (!id) throw new Error(`No ${kind} document with slug "${slug}". Create it in Studio first.`)
  return {_key: key(), _type: 'reference', _ref: id}
}

/**
 * Uploads a photo and returns its asset id, reusing an asset already in the
 * dataset with the same filename so re-runs don't pile up duplicates.
 */
async function uploadPhoto(filename) {
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )
  if (existing) return existing

  const path = join(photoDir, filename)
  try {
    await stat(path)
  } catch {
    throw new Error(`Missing ${path}. Run: node scripts/fetch-sample-photos.mjs`)
  }

  const asset = await client.assets.upload('image', createReadStream(path), {filename})
  return asset._id
}

// ── Authors ───────────────────────────────────────────────────────────────

console.log(`Seeding into ${projectId}/${dataset}\n`)
console.log('Authors')

for (const author of authors) {
  await client.createOrReplace({
    _id: `sample-author-${author.slug}`,
    _type: 'author',
    name: author.name,
    slug: {_type: 'slug', current: author.slug},
    role: author.role,
    bio: author.bio,
  })
  console.log(`  ${author.name} — ${author.role}`)
}

// ── Articles ──────────────────────────────────────────────────────────────

const places = await idsBySlug('place')
const reasons = await idsBySlug('reason')
const people = await idsBySlug('author')

console.log('\nPhotos')
const assetIds = new Map()
for (const article of articles) {
  const {file} = article.photo
  assetIds.set(file, await uploadPhoto(file))
  console.log(`  ${file}`)
}

console.log('\nArticles')
for (const article of articles) {
  const isDispatch = article.type === 'dispatch'

  const document = {
    _id: `sample-${article.type}-${article.slug}`,
    _type: article.type,
    title: article.title,
    slug: {_type: 'slug', current: article.slug},
    dek: article.dek,
    body: toPortableText(article.body),
    heroImage: {
      _type: 'image',
      asset: {_type: 'reference', _ref: assetIds.get(article.photo.file)},
    },
    heroCaption: article.photo.credit,
    places: article.places.map((slug) => reference(places, slug, 'place')),
    reasons: (article.reasons ?? []).map((slug) => reference(reasons, slug, 'reason')),
    author: {_type: 'reference', _ref: reference(people, article.author, 'author')._ref},
    publishedAt: article.publishedAt,
    featured: article.featured,
  }

  if (isDispatch) {
    document.format = article.format
    if (article.duration) document.duration = article.duration
    if (article.city) document.city = article.city
  } else {
    document.newsPeg = article.newsPeg
    document.informationAsOf = article.informationAsOf
  }

  await client.createOrReplace(document)

  const label = isDispatch ? `Dispatch — ${article.city}` : 'Signal'
  console.log(`  ${article.featured ? '★' : ' '} ${label}: ${article.title}`)
}

const dispatches = articles.filter((a) => a.type === 'dispatch').length
console.log(
  `\n${authors.length} authors, ${assetIds.size} photos, ` +
    `${dispatches} dispatches and ${articles.length - dispatches} signals written.`,
)
