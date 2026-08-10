/**
 * Downloads the placeholder article photos into imagery/articles/.
 *
 *   node scripts/fetch-sample-photos.mjs
 *
 * Placeholder photography lives in this repo rather than being hotlinked
 * from a CDN — see CLAUDE.md. Files already on disk are left alone, so this
 * is safe to re-run.
 *
 * Originals off Wikimedia run to 30 MB, which has no business in a git
 * repository. Each one is capped at 2400px on its long edge after download,
 * which is larger than any hero the site renders. That uses `sips`, which
 * ships with macOS — on another platform the resize is skipped and the
 * full-size file is kept.
 */

import {mkdir, writeFile, stat} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {execFile} from 'node:child_process'
import {promisify} from 'node:util'
import {articles} from './sample-content.mjs'

const run = promisify(execFile)

/** Longest edge, in pixels, we keep a placeholder photo at. */
const MAX_EDGE = 2400

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = join(repoRoot, 'imagery', 'articles')

// Wikimedia asks that automated downloads identify themselves.
const USER_AGENT = 'VIA-placeholder-content/1.0 (web@voicesinadventure.com)'

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

for (const article of articles) {
  const {file, url} = article.photo
  const destination = join(outputDir, file)

  if (await exists(destination)) {
    console.log(`  skip  ${file} (already downloaded)`)
    skipped += 1
    continue
  }

  const response = await fetch(url, {headers: {'User-Agent': USER_AGENT}})
  if (!response.ok) {
    throw new Error(`Failed to download ${file}: ${response.status} ${response.statusText}\n  ${url}`)
  }

  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(destination, bytes)
  console.log(`  saved ${file} (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`)
  downloaded += 1
}

console.log(`\n${downloaded} downloaded, ${skipped} already present → imagery/articles/`)
