/**
 * Writes the client's final copy into Sanity.
 *
 *   node scripts/seed-client-copy.mjs          # write
 *   node scripts/seed-client-copy.mjs --dry    # show what would change
 *
 * The copy itself lives in scripts/client-copy.mjs. This only moves it.
 *
 * Patches rather than replaces, and touches only the fields it owns — so
 * headshots, article references, and anything else an editor has set in
 * Studio are left alone. Safe to re-run; running it twice is a no-op.
 *
 * Authentication works the way seed-staff.mjs describes: whatever account the
 * Sanity CLI is logged in as, or SANITY_WRITE_TOKEN.
 */

import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {createClient} from '@sanity/client'

import {
  aboutMission,
  founderAttribution,
  founderQuote,
  heroLines,
  homeIntro,
  missionStatement,
  places,
  reasons,
  staff,
} from './client-copy.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
process.loadEnvFile(join(repoRoot, '.env.local'))

const dryRun = process.argv.includes('--dry')

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

/** One string per paragraph, in the only block style the About page needs. */
const toPortableText = (paragraphs) =>
  paragraphs.map((text) => ({
    _key: key(),
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{_key: key(), _type: 'span', text, marks: []}],
  }))

let written = 0
let missing = 0

/**
 * Patches one document, reporting what it touched.
 *
 * `null` in the payload means "clear this field" — Annie Wion has no bio, and
 * leaving a stale one behind would be worse than an empty card.
 */
async function patch(id, label, fields) {
  const set = {}
  const unset = []
  for (const [name, value] of Object.entries(fields)) {
    if (value === null || value === undefined) unset.push(name)
    else set[name] = value
  }

  if (dryRun) {
    console.log(`  would patch ${label}: set ${Object.keys(set).join(', ') || '—'}${
      unset.length ? `; clear ${unset.join(', ')}` : ''
    }`)
    return
  }

  let operation = client.patch(id).set(set)
  if (unset.length) operation = operation.unset(unset)
  await operation.commit()
  written += 1
  console.log(`  ${label}`)
}

console.log(`${dryRun ? 'Dry run against' : 'Seeding client copy into'} ${projectId}/${dataset}\n`)

// ---- Site settings -------------------------------------------------------
console.log('Site settings')
const settingsId = await client.fetch(`*[_type == "siteSettings"][0]._id`)
if (!settingsId) {
  console.log('  ! no siteSettings document — create one in Studio first')
  missing += 1
} else {
  await patch(settingsId, 'homepage hero, mission, and founder quote', {
    heroLines,
    homeIntro,
    missionStatement,
    founderQuote,
    founderAttribution,
    aboutMission: toPortableText(aboutMission),
  })
}

// ---- Places and reasons --------------------------------------------------
// Looked up by slug rather than by a guessed document id: these were created
// by an earlier seed and by editors in Studio, so their ids are not uniform.
console.log('\nPlaces')
for (const [slug, description] of Object.entries(places)) {
  const id = await client.fetch(`*[_type == "place" && slug.current == $slug][0]._id`, {slug})
  if (!id) {
    console.log(`  ! no place with slug "${slug}"`)
    missing += 1
    continue
  }
  await patch(id, slug, {description})
}

console.log('\nReasons')
for (const [slug, {title, description}] of Object.entries(reasons)) {
  const id = await client.fetch(`*[_type == "reason" && slug.current == $slug][0]._id`, {slug})
  if (!id) {
    console.log(`  ! no reason with slug "${slug}"`)
    missing += 1
    continue
  }
  await patch(id, slug, {title, description})
}

// ---- The masthead --------------------------------------------------------
console.log('\nStaff')
for (const person of staff) {
  const id = await client.fetch(`*[_type == "author" && slug.current == $slug][0]._id`, {
    slug: person.slug,
  })
  if (!id) {
    console.log(`  ! no author with slug "${person.slug}"`)
    missing += 1
    continue
  }
  await patch(id, person.slug, {
    role: person.role,
    hometown: person.hometown,
    travelMustHave: person.travelMustHave,
    bio: person.bio,
  })
}

console.log(
  `\n${dryRun ? 'Dry run complete.' : `Done. ${written} document(s) updated.`}` +
    (missing ? ` ${missing} document(s) not found — see the ! lines above.` : ''),
)
