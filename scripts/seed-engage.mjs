/**
 * Writes the Engage page settings into Sanity.
 *
 *   node scripts/seed-engage.mjs           # fill in anything not already set
 *   node scripts/seed-engage.mjs --dry     # show what would change
 *   node scripts/seed-engage.mjs --force   # overwrite what is already there
 *
 * The values live in scripts/engage-copy.mjs. This only moves them.
 *
 * By default this fills empty fields and leaves anything an editor has
 * already set alone, so re-running it never overwrites a real address with a
 * placeholder one.
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

import {addresses, applicationFormUrl, contributorPacketUrl, openRoles} from './engage-copy.mjs'

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

const settingsId = await client.fetch(`*[_type == "siteSettings"][0]._id`)
if (!settingsId) {
  console.log('! No siteSettings document — create one in Studio first.')
  process.exit(1)
}

const current = await client.fetch(
  `*[_id == $id][0]{contributeEmail, connectEmail, joinEmail, contributorPacketUrl, applicationFormUrl, openRoles}`,
  {id: settingsId},
)

const proposed = {
  ...addresses,
  contributorPacketUrl,
  applicationFormUrl,
  openRoles: openRoles.map((role) => ({_key: key(), _type: 'openRole', ...role})),
}

const isEmpty = (value) =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)

console.log(`${dryRun ? 'Dry run against' : 'Seeding Engage settings into'} ${projectId}/${dataset}\n`)

const set = {}
for (const [name, value] of Object.entries(proposed)) {
  if (isEmpty(value)) {
    console.log(`  · ${name} — nothing to write (not supplied by the client)`)
    continue
  }
  if (!isEmpty(current?.[name]) && !force) {
    console.log(`  = ${name} — already set, left alone`)
    continue
  }
  set[name] = value
  const shown = Array.isArray(value) ? `${value.length} roles` : value
  console.log(`  ${isEmpty(current?.[name]) ? '+' : '~'} ${name} — ${shown}`)
}

if (Object.keys(set).length === 0) {
  console.log('\nNothing to write.')
} else if (dryRun) {
  console.log('\nDry run — nothing written.')
} else {
  await client.patch(settingsId).set(set).commit()
  console.log(`\n${Object.keys(set).length} field(s) written.`)
}

if (!contributorPacketUrl || !applicationFormUrl) {
  console.log(
    '\nStill needed from the client: the contributor packet file and the application form URL.\n' +
      'Until they are set, Engage hides those two buttons rather than linking nowhere.',
  )
}
