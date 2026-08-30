/**
 * Downloads the About page montage photos into public/imagery/people/.
 *
 *   node scripts/fetch-montage-photos.mjs
 *
 * Placeholder photography lives in this repo rather than being hotlinked from
 * a CDN — see CLAUDE.md. Files already on disk are left alone, so this is safe
 * to re-run.
 *
 * The brief asked for young people with vivid or hazy expressions, in contact
 * with each other or looking out at something, under a black-and-white filter.
 * The filter is applied in CSS on the About page, not baked in here, so the
 * originals stay reusable.
 *
 * Every photo is CC0, so no attribution is required — the credits below are
 * recorded anyway, so whoever replaces these knows where they came from.
 * Both sources cap out around 1000px on the long edge, which is why the
 * montage on About is a contained band rather than a full-bleed one.
 */

import {mkdir, writeFile, stat} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = join(repoRoot, 'public', 'imagery', 'people')

const USER_AGENT = 'VIA-placeholder-content/1.0 (web@voicesinadventure.com)'

/** Both CDNs serve the file directly; rawpixel wants a referer. */
const photos = [
  {
    file: 'people-1.jpg',
    credit: 'rawpixel, CC0',
    page: 'https://www.rawpixel.com/image/5916791/image-public-domain-blue-mountain',
    url: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvbWQyMTE3LWltYWdlLWt3dndxeDUyLWt6aHZxZzFwLmpwZw.jpg',
  },
  {
    file: 'people-2.jpg',
    credit: 'rawpixel, CC0',
    page: 'https://www.rawpixel.com/image/5944233/free-public-domain-cc0-photo',
    url: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4MjU1NDMtaW1hZ2Uta3d5b2Y3bDIuanBn.jpg',
  },
  {
    file: 'people-3.jpg',
    credit: 'Lucas Allmann, StockSnap, CC0',
    page: 'https://stocksnap.io/photo/man-backpack-DTBCL8UIWE',
    url: 'https://cdn.stocksnap.io/img-thumbs/960w/DTBCL8UIWE.jpg',
  },
  {
    file: 'people-4.jpg',
    credit: 'rawpixel, CC0',
    page: 'https://www.rawpixel.com/image/3293716/free-photo-image-man-and-woman-mountain-couple-lake-acadia',
    url: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYxNzA2ODIzLXdpa2ltZWRpYS1pbWFnZS1rb3dsbnp3by5qcGc.jpg',
  },
  {
    file: 'people-5.jpg',
    credit: 'Mike Giles, StockSnap, CC0',
    page: 'https://stocksnap.io/photo/musicians-guitars-L3L1V89NLF',
    url: 'https://cdn.stocksnap.io/img-thumbs/960w/L3L1V89NLF.jpg',
  },
  {
    file: 'people-6.jpg',
    credit: 'Negative Space, StockSnap, CC0',
    page: 'https://stocksnap.io/photo/sunset-dusk-YBCBJDJPDE',
    url: 'https://cdn.stocksnap.io/img-thumbs/960w/YBCBJDJPDE.jpg',
  },
  {
    file: 'people-7.jpg',
    credit: 'Josh Willink, StockSnap, CC0',
    page: 'https://stocksnap.io/photo/backpack-woman-BQ4PSC7CV5',
    url: 'https://cdn.stocksnap.io/img-thumbs/960w/BQ4PSC7CV5.jpg',
  },
  {
    file: 'people-8.jpg',
    credit: 'Brodie Vissers, StockSnap, CC0',
    page: 'https://stocksnap.io/photo/people-legs-M5ERMO26E9',
    url: 'https://cdn.stocksnap.io/img-thumbs/960w/M5ERMO26E9.jpg',
  },
]

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

await mkdir(outputDir, {recursive: true})

let downloaded = 0
let skipped = 0

for (const photo of photos) {
  const target = join(outputDir, photo.file)
  if (await exists(target)) {
    console.log(`  = ${photo.file} — already on disk`)
    skipped += 1
    continue
  }

  const response = await fetch(photo.url, {
    headers: {'User-Agent': USER_AGENT, Referer: 'https://openverse.org/'},
  })
  if (!response.ok) {
    throw new Error(`Failed to download ${photo.file}: ${response.status} ${response.statusText}\n  ${photo.url}`)
  }

  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(target, bytes)
  downloaded += 1
  console.log(`  + ${photo.file} — ${Math.round(bytes.length / 1024)} KB — ${photo.credit}`)
}

console.log(`\n${downloaded} downloaded, ${skipped} already there.`)
