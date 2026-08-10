/**
 * Removes the five invented authors the placeholder content shipped with, and
 * moves anything still bylined to them onto the real masthead.
 *
 *   node scripts/seed-staff.mjs             # first — the real people
 *   node scripts/seed-sample-content.mjs    # rebylines the 14 seeded pieces
 *   node scripts/retire-sample-authors.mjs
 *
 * The seed script only owns the articles defined in sample-content.mjs. Four
 * more were written directly in Studio and are bylined to invented people
 * too, so they are repointed here by slug.
 *
 * Drafts count. An editor's unsaved work in Studio lives in the dataset as a
 * `drafts.` document and holds a real reference, so Sanity will refuse to
 * delete an author one of them still points at — and the query API hides
 * drafts unless you ask for the raw perspective, which is why this client
 * sets it. A draft is reassigned to whatever its published version now uses,
 * so reopening it in Studio shows the right byline rather than a broken one.
 *
 * Safe to re-run. Once the five are gone it finds nothing and exits.
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
  // Drafts hold references too, and the default perspective hides them.
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

/** The invented people, by the names they were given. */
const INVENTED = ['Jordan Ruiz', 'Maya Chen', 'Sofia Marchetti', 'Amara Osei', 'Theo Alvarado']

/**
 * The four articles written in Studio rather than seeded. Dispatches go to
 * staff writers and the Signal to an editor, matching how the seeded pieces
 * were reassigned.
 */
const STUDIO_BYLINES = {
  '36-hours-in-washington-on-an-interns-budget': 'grace-kim',
  '24-hours-in-berlin-when-you-landed-at-six-in-the-morning': 'hawley-dick',
  'what-nobody-tells-you-about-a-semester-in-hong-kong': 'syrah-anand',
  'portugal-extends-digital-nomad-visa-eligibility-to-non-eu-students': 'eli-zainea',
}

/** For anything not named above — a draft under a new slug, say. */
const FALLBACK = {dispatch: 'grace-kim', signal: 'eli-zainea'}

const doomed = await client.fetch(`*[_type == "author" && name in $names]{_id, name}`, {
  names: INVENTED,
})

if (doomed.length === 0) {
  console.log('Nothing to do: no invented authors left in the dataset.')
  process.exit(0)
}

// ── Repoint anything still bylined to one of them ─────────────────────────

const staffIds = new Map(
  (await client.fetch(`*[_type == "author" && _id match "staff-*"]{_id, "slug": slug.current}`)).map(
    (row) => [row.slug, row._id],
  ),
)

function staffRef(staffSlug) {
  const id = staffIds.get(staffSlug)
  if (!id) throw new Error(`No staff document with slug "${staffSlug}". Run seed-staff.mjs first.`)
  return {_type: 'reference', _ref: id}
}

/*
  Driven by what actually references the invented authors rather than by a
  fixed list of slugs, so a draft saved under a slug nobody anticipated is
  still caught. Published documents are resolved first; a draft then inherits
  whatever its published version ended up with.
*/
const referrers = await client.fetch(
  `*[references($ids)]{_id, _type, "slug": slug.current, "authorRef": author._ref}`,
  {ids: doomed.map((a) => a._id)},
)

const published = referrers.filter((doc) => !doc._id.startsWith('drafts.'))
const drafts = referrers.filter((doc) => doc._id.startsWith('drafts.'))
const assigned = new Map()

console.log(`Repointing ${referrers.length} byline(s)`)

for (const doc of published) {
  const staffSlug = STUDIO_BYLINES[doc.slug] ?? FALLBACK[doc._type]
  if (!staffSlug) throw new Error(`No fallback byline for a ${doc._type}: ${doc._id}`)

  await client.patch(doc._id).set({author: staffRef(staffSlug)}).commit()
  assigned.set(doc._id, staffSlug)
  console.log(`  ${doc.slug} -> ${staffSlug}`)
}

for (const doc of drafts) {
  const publishedId = doc._id.slice('drafts.'.length)
  const staffSlug =
    assigned.get(publishedId) ?? STUDIO_BYLINES[doc.slug] ?? FALLBACK[doc._type]
  if (!staffSlug) throw new Error(`No fallback byline for a draft ${doc._type}: ${doc._id}`)

  await client.patch(doc._id).set({author: staffRef(staffSlug)}).commit()
  console.log(`  ${doc._id} -> ${staffSlug} (unpublished draft, left otherwise untouched)`)
}

// ── Delete, once nothing points at them ───────────────────────────────────

console.log('\nDeleting invented authors')
for (const author of doomed) {
  const referrers = await client.fetch(`count(*[references($id)])`, {id: author._id})
  if (referrers > 0) {
    throw new Error(
      `${author.name} (${author._id}) is still referenced by ${referrers} document(s). ` +
        'Repoint those bylines before deleting.',
    )
  }
  await client.delete(author._id)
  console.log(`  ${author.name}`)
}

const remaining = await client.fetch(`count(*[_type == "author"])`)
console.log(`\n${doomed.length} removed. ${remaining} authors left, all real.`)
