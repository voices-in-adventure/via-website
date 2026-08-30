/**
 * Writes the itineraries in scripts/guide-stops.mjs into the six Destination
 * Guides.
 *
 *   node scripts/seed-guide-stops.mjs --dry
 *   node scripts/seed-guide-stops.mjs
 *
 * Matched by slug, and only the `stops` field is touched, so anything an
 * editor has changed on these documents survives. Safe to re-run.
 */

import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {createClient} from '@sanity/client'
import {guideStops} from './guide-stops.mjs'

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

console.log(`${dryRun ? 'Dry run against' : 'Seeding guide stops into'} ${client.config().dataset}\n`)

let written = 0
let missing = 0

for (const [slug, stops] of Object.entries(guideStops)) {
  const doc = await client.fetch(
    `*[_type == "dispatch" && slug.current == $slug][0]{_id, title, format}`,
    {slug},
  )

  if (!doc) {
    console.log(`  ! no dispatch with slug "${slug}"`)
    missing += 1
    continue
  }
  if (doc.format !== 'guide') {
    console.log(`  ! "${doc.title}" is format "${doc.format}", not a guide — skipped`)
    missing += 1
    continue
  }

  // _key is required on every array member, and Sanity uses it to track
  // which row is which across edits.
  const payload = stops.map((stop) => ({
    _key: randomBytes(6).toString('hex'),
    _type: 'stop',
    title: stop.title,
    note: stop.note,
    lat: stop.lat,
    lng: stop.lng,
  }))

  if (dryRun) {
    console.log(`  would set ${String(payload.length).padStart(2)} stops on ${doc.title}`)
    continue
  }

  await client.patch(doc._id).set({stops: payload}).commit()
  written += 1
  console.log(`  ${String(payload.length).padStart(2)} stops → ${doc.title}`)
}

console.log(
  `\n${dryRun ? 'Dry run complete.' : `Done. ${written} guide(s) updated.`}` +
    (missing ? ` ${missing} not matched.` : ''),
)
