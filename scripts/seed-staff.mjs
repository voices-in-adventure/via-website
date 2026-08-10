/**
 * Writes the real VIA masthead and mission into Sanity.
 *
 *   python3 scripts/extract-staff-photos.py   # first — this needs the files
 *   node scripts/seed-staff.mjs
 *   node scripts/seed-sample-content.mjs      # bylines point at these people
 *
 * Safe to re-run. Every person gets a fixed `staff-` id, so a second run
 * updates what the first run wrote instead of duplicating it. Editors can
 * revise any of these records in Studio afterwards; re-running this script
 * would overwrite those edits, which is why it patches rather than replaces
 * once a document already exists.
 *
 * Authentication works the way seed-sample-content.mjs describes: whatever
 * account the Sanity CLI is logged in as, or SANITY_WRITE_TOKEN.
 */

import {readFile, stat} from 'node:fs/promises'
import {createReadStream} from 'node:fs'
import {dirname, join} from 'node:path'
import {homedir} from 'node:os'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {createClient} from '@sanity/client'
import {staff, aboutMission, missionStatement} from './staff.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const photoDir = join(repoRoot, 'imagery', 'staff')

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

const key = () => randomBytes(6).toString('hex')

/** One string per paragraph, in the only block style the About page needs. */
function toPortableText(paragraphs) {
  return paragraphs.map((text) => ({
    _key: key(),
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{_key: key(), _type: 'span', text, marks: []}],
  }))
}

/** Uploads a headshot, reusing one already in the dataset with that filename. */
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
    throw new Error(`Missing ${path}. Run: python3 scripts/extract-staff-photos.py`)
  }

  const asset = await client.assets.upload('image', createReadStream(path), {filename})
  return asset._id
}

console.log(`Seeding staff into ${projectId}/${dataset}\n`)

for (const person of staff) {
  const _id = `staff-${person.slug}`

  const fields = {
    name: person.name,
    slug: {_type: 'slug', current: person.slug},
    role: person.role,
    bio: person.bio ?? undefined,
  }

  if (person.headshot) {
    fields.headshot = {
      _type: 'image',
      asset: {_type: 'reference', _ref: await uploadPhoto(person.headshot)},
    }
  }

  /*
    createIfNotExists then patch, rather than createOrReplace: once this has
    run, a person's record belongs to the editors. Replacing would silently
    undo a bio they rewrote in Studio the next time anyone ran this script.
  */
  await client.createIfNotExists({_id, _type: 'author', name: person.name})
  await client.patch(_id).set(fields).commit()

  const photo = person.headshot ? 'photo' : 'initials'
  console.log(`  ${person.name.padEnd(16)} ${person.role.padEnd(28)} ${photo}`)
}

// ── Mission ───────────────────────────────────────────────────────────────

await client
  .patch('siteSettings')
  .set({
    aboutMission: toPortableText(aboutMission),
    missionStatement,
  })
  .commit()

console.log(`\n${staff.length} people written.`)
console.log('Mission set on siteSettings: aboutMission and missionStatement.')
