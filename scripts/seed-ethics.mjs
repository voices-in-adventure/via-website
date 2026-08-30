/**
 * Writes the six Standards & Ethics sections into Sanity.
 *
 *   node scripts/seed-ethics.mjs           # create any that are missing
 *   node scripts/seed-ethics.mjs --dry     # show what would happen
 *   node scripts/seed-ethics.mjs --force   # also overwrite ones that exist
 *
 * The copy itself lives in scripts/ethics-copy.mjs. This only moves it, and
 * turns its simple block shapes into Portable Text.
 *
 * By default this creates missing sections and leaves existing ones alone, so
 * re-running it never quietly discards an edit made in Studio. Pass --force
 * when you have changed ethics-copy.mjs and want that to win.
 *
 * Authentication works the way seed-client-copy.mjs describes: whatever
 * account the Sanity CLI is logged in as, or SANITY_WRITE_TOKEN.
 */

import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {createClient} from '@sanity/client'

import {policies} from './ethics-copy.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
process.loadEnvFile(join(repoRoot, '.env.local'))

const dryRun = process.argv.includes('--dry')
const force = process.argv.includes('--force')

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET

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

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-01-01',
  token: await resolveToken(),
  useCdn: false,
})

const key = () => randomBytes(6).toString('hex')

const block = (style, text, listItem) => ({
  _key: key(),
  _type: 'block',
  style,
  markDefs: [],
  ...(listItem ? {listItem, level: 1} : {}),
  children: [{_key: key(), _type: 'span', text, marks: []}],
})

/**
 * The four shapes ethics-copy.mjs uses, mapped onto the styles blockContent
 * already allows. Bulleted lists are flat: Portable Text has no list
 * container, just consecutive blocks that share a listItem.
 */
function toPortableText(body) {
  return body.flatMap((entry) => {
    if (entry.type === 'ul') return entry.items.map((item) => block('normal', item, 'bullet'))
    if (entry.type === 'h3') return [block('h3', entry.text)]
    if (entry.type === 'quote') return [block('blockquote', entry.text)]
    return [block('normal', entry.text)]
  })
}

console.log(
  `${dryRun ? 'Dry run against' : 'Seeding Standards & Ethics into'} ${projectId}/${dataset}` +
    `${force && !dryRun ? ' (overwriting existing sections)' : ''}\n`,
)

let created = 0
let updated = 0
let skipped = 0

for (const section of policies) {
  // A readable, stable id, so a re-run finds the same document and the
  // section is easy to spot in Vision.
  const id = `policy-${section.slug}`
  const doc = {
    _id: id,
    _type: 'policy',
    title: section.title,
    slug: {_type: 'slug', current: section.slug},
    order: section.order,
    summary: section.summary,
    body: toPortableText(section.body),
  }

  const existing = await client.fetch(`*[_id == $id][0]{_id}`, {id})
  const blocks = doc.body.length

  if (existing && !force) {
    console.log(`  = ${section.order}. ${section.title} — already there, left alone`)
    skipped += 1
    continue
  }

  if (dryRun) {
    console.log(
      `  ${existing ? '~' : '+'} ${section.order}. ${section.title} — ${blocks} blocks` +
        `${existing ? ' (would overwrite)' : ''}`,
    )
    continue
  }

  await client.createOrReplace(doc)
  console.log(`  ${existing ? '~' : '+'} ${section.order}. ${section.title} — ${blocks} blocks`)
  if (existing) updated += 1
  else created += 1
}

if (dryRun) {
  console.log('\nDry run — nothing written.')
} else {
  console.log(`\n${created} created, ${updated} overwritten, ${skipped} left alone.`)
  if (skipped) console.log('Re-run with --force to overwrite the ones left alone.')
}
