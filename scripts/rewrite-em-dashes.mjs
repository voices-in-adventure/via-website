/**
 * Takes the em dashes out of the placeholder articles that were written
 * directly in Sanity Studio.
 *
 *   node scripts/rewrite-em-dashes.mjs
 *
 * The seeded articles are fixed at source in sample-content.mjs and reach
 * Sanity through seed-sample-content.mjs. Four more pieces (plus one
 * unpublished draft) were typed into Studio instead, so they exist nowhere in
 * this repo and have to be edited in place.
 *
 * Each rewrite is spelled out rather than done with a regex, because
 * replacing an em dash is an editorial decision and not a punctuation swap:
 * some of these wanted a full stop, some a colon, some a pair of commas.
 *
 * Safe to re-run, and safe to run after an editor has revised a paragraph —
 * it only touches spans that still contain the exact original text, and
 * reports anything it could not find.
 */

import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
process.loadEnvFile(join(repoRoot, '.env.local'))

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2026-01-01',
  token: await resolveToken(),
  useCdn: false,
  // Drafts carry the same placeholder prose and need the same treatment.
  perspective: 'raw',
})

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

/** [fragment as written, fragment as it should read] */
const REWRITES = [
  // 36 Hours in Washington
  [
    'Metro to Foggy Bottom rather than Smithsonian — it is the same walk',
    'Metro to Foggy Bottom rather than Smithsonian. It is the same walk',
  ],
  [
    'is browsing, not buying — on an intern’s budget',
    'is browsing, not buying: on an intern’s budget',
  ],
  [
    'which creates a trap — you try to do four and remember none.',
    'which creates a trap. You try to do four and remember none.',
  ],
  [
    'Columbia Heights one stop north — the same night out',
    'Columbia Heights one stop north: the same night out',
  ],

  // Portugal Extends Digital Nomad Visa Eligibility
  [
    'the D8 visa — Portugal\'s answer to the "digital nomad" wave — required proof',
    'the D8 visa, Portugal\'s answer to the "digital nomad" wave, required proof',
  ],
  [
    'formally published as a rule — it surfaced in AIMA\'s monthly processing bulletin, not a legislative update, so expect',
    'formally published as a rule. It surfaced in AIMA\'s monthly processing bulletin rather than a legislative update, so expect',
  ],

  // 24 Hours in Berlin
  [
    'S-Bahn, U-Bahn, tram, and bus — buy a day pass at the machine',
    'S-Bahn, U-Bahn, tram, and bus. Buy a day pass at the machine',
  ],
  [
    'a proper Frühstücksteller — bread, soft cheese',
    'a proper Frühstücksteller: bread, soft cheese',
  ],
  [
    'the U-Bahn to Tempelhofer Feld — a decommissioned airport',
    'the U-Bahn to Tempelhofer Feld, a decommissioned airport',
  ],
  [
    'a Vietnamese place in Friedrichshain — both are better and cheaper',
    'a Vietnamese place in Friedrichshain. Both are better and cheaper',
  ],

  // What Nobody Tells You About a Semester in Hong Kong
  [
    'Victoria Harbour from above — the view every exchange application uses',
    'Victoria Harbour from above: the view every exchange application uses',
  ],
  [
    'the number you were quoted — say, two hundred and twenty square feet — includes the bathroom',
    'the number you were quoted, say two hundred and twenty square feet, includes the bathroom',
  ],
  [
    'Not as a comfort purchase — as the thing that stops mould',
    'Not as a comfort purchase, but as the thing that stops mould',
  ],
  [
    'The ferry, maybe — the Star Ferry costs about five dollars',
    'The ferry, maybe: the Star Ferry costs about five dollars',
  ],

  // 36 Hours in Lisbon on a Study Abroad Budget (unpublished draft)
  [
    'through Alfama with no destination — every wrong turn here is the point.',
    'through Alfama with no destination. Every wrong turn here is the point.',
  ],
  [
    'instead of a sit-down lunch — you will use it four more times',
    'instead of a sit-down lunch. You will use it four more times',
  ],
  [
    'to Belém along the river — it is flat, it is free',
    'to Belém along the river. It is flat, it is free',
  ],
  [
    'near Cais do Sodré — a pork sandwich that costs less',
    'near Cais do Sodré, a pork sandwich that costs less',
  ],
]

function rewrite(text) {
  let out = text
  for (const [from, to] of REWRITES) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  return out
}

const articles = await client.fetch(
  `*[_type in ["dispatch", "signal"]]{_id, "slug": slug.current, dek, heroCaption, newsPeg, body}`,
)

let edited = 0
const applied = new Set()

for (const article of articles) {
  const patch = {}

  for (const field of ['dek', 'heroCaption', 'newsPeg']) {
    if (typeof article[field] !== 'string') continue
    const next = rewrite(article[field])
    if (next !== article[field]) patch[field] = next
  }

  if (Array.isArray(article.body)) {
    let touched = false
    const body = article.body.map((block) => {
      if (!Array.isArray(block.children)) return block
      const children = block.children.map((span) => {
        if (typeof span.text !== 'string') return span
        const next = rewrite(span.text)
        if (next === span.text) return span
        touched = true
        return {...span, text: next}
      })
      return {...block, children}
    })
    if (touched) patch.body = body
  }

  if (Object.keys(patch).length === 0) continue

  await client.patch(article._id).set(patch).commit()
  edited += 1
  console.log(`  ${article.slug ?? article._id} (${Object.keys(patch).join(', ')})`)
}

// Anything that matched nothing is either already done or has been reworded
// in Studio since this list was written. Worth saying either way.
for (const [from] of REWRITES) {
  const found = articles.some((a) =>
    JSON.stringify([a.dek, a.heroCaption, a.newsPeg, a.body]).includes(
      from.replace(/"/g, '\\"'),
    ),
  )
  if (found) applied.add(from)
}

console.log(`\n${edited} document(s) edited.`)
const missed = REWRITES.filter(([from]) => !applied.has(from))
if (missed.length) {
  console.log(`${missed.length} rewrite(s) matched nothing (already applied, or since reworded).`)
}
