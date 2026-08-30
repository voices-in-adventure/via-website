/**
 * Curls straight quotes and apostrophes in Sanity content.
 *
 *   node scripts/fix-typography.mjs --dry    # report only
 *   node scripts/fix-typography.mjs          # fix
 *
 * The site sets everything in Newsreader, where a straight apostrophe is
 * visibly a typewriter mark sitting in the middle of typographic copy. Most
 * of VIA's text was written with curly marks; this catches the pieces that
 * were not, usually because they were pasted in from somewhere else.
 *
 * Walks every string in every document, including the spans inside Portable
 * Text bodies, so an apostrophe halfway down an article is caught too.
 *
 * Worth re-running after any bulk content import.
 */

import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
process.loadEnvFile(join(repoRoot, '.env.local'))

const dryRun = process.argv.includes('--dry')

async function resolveToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN
  try {
    const config = JSON.parse(await readFile(join(homedir(), '.config/sanity/config.json'), 'utf8'))
    if (config.authToken) return config.authToken
  } catch {
    // fall through
  }
  throw new Error('No Sanity credentials. Run `cd studio && npx sanity login`.')
}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2026-01-01',
  token: await resolveToken(),
  useCdn: false,
})

/**
 * Straight marks to typographic ones.
 *
 * Order matters. Apostrophes inside a word are settled first, so that the
 * opening/closing pass below never sees them and never mistakes the one in
 * "don't" for an opening quote.
 *
 * A leading apostrophe on a number is a decade — ’90s, not ‘90s — which is
 * the one case where an apostrophe opens a word and still curls closing.
 */
function curl(text) {
  return (
    text
      // don't, VIA's, writers' — an apostrophe with a letter on each side
      .replace(/(\p{L})'(\p{L})/gu, '$1’$2')
      // writers' — a possessive plural, apostrophe then a word boundary
      .replace(/(\p{L})'(?=\s|$|[,.;:!?)])/gu, '$1’')
      // ’90s
      .replace(/'(?=\d\ds\b)/g, '’')
      // Opening single quote: start of a word
      .replace(/(^|[\s([{—–-])'/gm, '$1‘')
      // Anything left is a closing single quote
      .replace(/'/g, '’')
      // Opening double quote: start of a word
      .replace(/(^|[\s([{—–-])"/gm, '$1“')
      // Anything left is a closing double quote
      .replace(/"/g, '”')
  )
}

/** Rebuilds a value with every string curled, leaving structure untouched. */
function transform(node) {
  if (typeof node === 'string') return curl(node)
  if (Array.isArray(node)) return node.map(transform)
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, transform(v)]))
  }
  return node
}

// _id, _type, _rev and friends are structural, and _key values are random
// strings that must not change. Only the editorial fields are rewritten.
const STRUCTURAL = new Set(['_id', '_type', '_rev', '_createdAt', '_updatedAt', '_key', '_ref'])

const docs = await client.fetch(
  `*[_type in ["dispatch", "signal", "product", "author", "place", "reason", "siteSettings"]]`,
)

let changed = 0
let marks = 0

for (const doc of docs) {
  const patch = {}
  for (const [field, value] of Object.entries(doc)) {
    if (STRUCTURAL.has(field)) continue
    const next = transform(value)
    if (JSON.stringify(next) !== JSON.stringify(value)) patch[field] = next
  }

  if (Object.keys(patch).length === 0) continue

  const before = JSON.stringify(doc).match(/['"]/g)?.length ?? 0
  const after = JSON.stringify(transform(doc)).match(/['"]/g)?.length ?? 0
  const fixed = before - after

  changed += 1
  marks += fixed
  const label = doc.title ?? doc.name ?? doc._id
  console.log(`${dryRun ? 'would fix' : 'fixed'} ${String(fixed).padStart(2)} in ${doc._type}: ${label}`)
  for (const field of Object.keys(patch)) console.log(`     ${field}`)

  if (!dryRun) await client.patch(doc._id).set(patch).commit()
}

console.log(
  changed
    ? `\n${dryRun ? 'Would update' : 'Updated'} ${changed} document(s), ${marks} mark(s).`
    : '\nNothing to fix — all quotes are already typographic.',
)
