/**
 * Builds public/regions.geo.json — the land outlines the Journeys globe draws.
 *
 *   node scripts/build-regions.mjs
 *
 * Source is Natural Earth's 1:110m admin-0 countries file, which is in the
 * public domain. It is downloaded once into .tmp/ and cached there; the file
 * this script writes is what gets committed, so the site never fetches
 * anything from anywhere at runtime.
 *
 * What it does:
 *
 *   1. Sorts every country into one of VIA's six regions, or into `neutral`.
 *   2. Simplifies each outline until a coastline is still recognisable but
 *      the file is small enough to ship.
 *   3. Merges each region's countries into one shape, so the globe draws six
 *      regions rather than 177 countries and there are no internal borders.
 *
 * Regions are a judgement call, not a fact, so the lists below are meant to
 * be edited. Two calls worth knowing about:
 *
 *   - Egypt is in Africa, not the Middle East, because the client's own copy
 *     says Africa is "fifty-four countries."
 *   - Russia is neutral. It spans Europe and Asia, colouring it either way
 *     would swallow the globe, and VIA has no Russia coverage. Neutral land
 *     still draws — it is just the colour of a country with no stories in it.
 */

import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson'
const cachePath = join(repoRoot, '.tmp', 'ne_110m_admin_0_countries.geojson')
const outPath = join(repoRoot, 'public', 'regions.geo.json')

// Countries that go somewhere other than their Natural Earth continent.
const MIDDLE_EAST = new Set([
  'Turkey',
  'Cyprus',
  'N. Cyprus',
  'Syria',
  'Lebanon',
  'Israel',
  'Palestine',
  'Jordan',
  'Iraq',
  'Iran',
  'Saudi Arabia',
  'Yemen',
  'Oman',
  'United Arab Emirates',
  'Qatar',
  'Bahrain',
  'Kuwait',
])

const NEUTRAL = new Set(['Russia', 'Antarctica'])

const BY_CONTINENT = {
  Europe: 'europe',
  Asia: 'asia',
  Africa: 'africa',
  'North America': 'americas',
  'South America': 'americas',
  Oceania: 'oceania',
}

const REGION_TITLES = {
  europe: 'Europe',
  asia: 'Asia',
  africa: 'Africa',
  americas: 'Americas',
  oceania: 'Oceania',
  mideast: 'Middle East',
  neutral: null,
}

function regionOf(props) {
  const name = props.NAME ?? props.name ?? ''
  if (NEUTRAL.has(name)) return 'neutral'
  if (MIDDLE_EAST.has(name)) return 'mideast'
  return BY_CONTINENT[props.CONTINENT ?? props.continent] ?? 'neutral'
}

/**
 * Ramer–Douglas–Peucker, the same thinning the topography script uses. Run on
 * lon/lat degrees, so the tolerance is in degrees: 0.45 keeps Norway's fjord
 * coast reading as a coast at the size the globe is actually drawn.
 */
function simplify(points, tolerance) {
  if (points.length < 3) return points

  let farthest = 0
  let maxDistance = 0
  const [ax, ay] = points[0]
  const [bx, by] = points[points.length - 1]
  const dx = bx - ax
  const dy = by - ay
  const span = Math.hypot(dx, dy)

  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i]
    const distance =
      span === 0
        ? Math.hypot(px - ax, py - ay)
        : Math.abs(dy * px - dx * py + bx * ay - by * ax) / span
    if (distance > maxDistance) {
      maxDistance = distance
      farthest = i
    }
  }

  if (maxDistance <= tolerance) return [points[0], points[points.length - 1]]

  return [
    ...simplify(points.slice(0, farthest + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(farthest), tolerance),
  ]
}

const round = (points) => points.map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100])

/** A ring the globe can still draw: closed, and with enough corners to have an inside. */
function cleanRing(ring, tolerance) {
  const simplified = round(simplify(ring, tolerance))
  const deduped = simplified.filter(
    (point, i) => i === 0 || point[0] !== simplified[i - 1][0] || point[1] !== simplified[i - 1][1],
  )
  if (deduped.length < 4) return null
  const [first] = deduped
  const last = deduped[deduped.length - 1]
  if (first[0] !== last[0] || first[1] !== last[1]) deduped.push([...first])
  return deduped.length >= 4 ? deduped : null
}

async function loadSource() {
  try {
    return JSON.parse(await readFile(cachePath, 'utf8'))
  } catch {
    process.stdout.write(`downloading ${SOURCE_URL}\n`)
    const response = await fetch(SOURCE_URL)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    const text = await response.text()
    await mkdir(dirname(cachePath), {recursive: true})
    await writeFile(cachePath, text)
    return JSON.parse(text)
  }
}

const TOLERANCE = 0.45

const source = await loadSource()
const grouped = new Map()

for (const feature of source.features) {
  const region = regionOf(feature.properties)
  const geometry = feature.geometry
  if (!geometry) continue

  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates

  for (const polygon of polygons) {
    const rings = polygon.map((ring) => cleanRing(ring, TOLERANCE)).filter(Boolean)
    // The first ring is the outline; the rest are holes. No outline, no shape.
    if (rings.length === 0) continue
    if (!grouped.has(region)) grouped.set(region, [])
    grouped.get(region).push(rings)
  }
}

const order = ['neutral', 'africa', 'americas', 'asia', 'europe', 'mideast', 'oceania']

const collection = {
  type: 'FeatureCollection',
  // Recorded here so whoever regenerates this knows where it came from.
  source: SOURCE_URL,
  license: 'Natural Earth — public domain',
  features: order
    .filter((region) => grouped.has(region))
    .map((region) => ({
      type: 'Feature',
      properties: {region, title: REGION_TITLES[region]},
      geometry: {type: 'MultiPolygon', coordinates: grouped.get(region)},
    })),
}

const json = JSON.stringify(collection)
await writeFile(outPath, json)

const kb = (json.length / 1024).toFixed(0)
process.stdout.write(`wrote public/regions.geo.json — ${kb} KB\n`)
for (const feature of collection.features) {
  const shapes = feature.geometry.coordinates.length
  const points = feature.geometry.coordinates.flat(2).length
  process.stdout.write(`  ${feature.properties.region.padEnd(9)} ${String(shapes).padStart(3)} shapes  ${points} points\n`)
}
