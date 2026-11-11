/**
 * City name (as editors type it into a Dispatch's `city` field) → IANA
 * timezone. A maintained lookup is more honest than guessing a timezone from
 * a string at build time.
 *
 * The list is deliberately broad — capitals, major hubs, and the places
 * student travellers actually go — so a new Dispatch almost always works
 * without a code change. A city that isn't here is simply left off the
 * homepage ticker (never shown half-broken); to bring it in, add one line.
 *
 * Matching is forgiving: case, accents ("São Paulo" = "sao paulo"), extra
 * spaces, and anything after a comma ("Paris, France" = "paris") are all
 * ignored. Keys below are written lowercase, without accents.
 */
const CITY_TIMEZONES: Record<string, string> = {
  // Europe
  amsterdam: 'Europe/Amsterdam',
  athens: 'Europe/Athens',
  barcelona: 'Europe/Madrid',
  belgrade: 'Europe/Belgrade',
  bergen: 'Europe/Oslo',
  berlin: 'Europe/Berlin',
  bordeaux: 'Europe/Paris',
  bratislava: 'Europe/Bratislava',
  brussels: 'Europe/Brussels',
  bucharest: 'Europe/Bucharest',
  budapest: 'Europe/Budapest',
  copenhagen: 'Europe/Copenhagen',
  dubrovnik: 'Europe/Zagreb',
  dublin: 'Europe/Dublin',
  edinburgh: 'Europe/London',
  florence: 'Europe/Rome',
  geneva: 'Europe/Zurich',
  glasgow: 'Europe/London',
  granada: 'Europe/Madrid',
  hamburg: 'Europe/Berlin',
  helsinki: 'Europe/Helsinki',
  istanbul: 'Europe/Istanbul',
  krakow: 'Europe/Warsaw',
  kyiv: 'Europe/Kyiv',
  kiev: 'Europe/Kyiv',
  lisbon: 'Europe/Lisbon',
  ljubljana: 'Europe/Ljubljana',
  london: 'Europe/London',
  lyon: 'Europe/Paris',
  madrid: 'Europe/Madrid',
  manchester: 'Europe/London',
  marseille: 'Europe/Paris',
  milan: 'Europe/Rome',
  moscow: 'Europe/Moscow',
  munich: 'Europe/Berlin',
  naples: 'Europe/Rome',
  nice: 'Europe/Paris',
  oslo: 'Europe/Oslo',
  paris: 'Europe/Paris',
  porto: 'Europe/Lisbon',
  prague: 'Europe/Prague',
  reykjavik: 'Atlantic/Reykjavik',
  riga: 'Europe/Riga',
  rome: 'Europe/Rome',
  sarajevo: 'Europe/Sarajevo',
  seville: 'Europe/Madrid',
  sofia: 'Europe/Sofia',
  split: 'Europe/Zagreb',
  stockholm: 'Europe/Stockholm',
  tallinn: 'Europe/Tallinn',
  tbilisi: 'Asia/Tbilisi',
  valencia: 'Europe/Madrid',
  venice: 'Europe/Rome',
  vienna: 'Europe/Vienna',
  vilnius: 'Europe/Vilnius',
  warsaw: 'Europe/Warsaw',
  zagreb: 'Europe/Zagreb',
  zurich: 'Europe/Zurich',
  'canary islands': 'Atlantic/Canary',
  azores: 'Atlantic/Azores',

  // Middle East and Central Asia
  'abu dhabi': 'Asia/Dubai',
  almaty: 'Asia/Almaty',
  amman: 'Asia/Amman',
  baku: 'Asia/Baku',
  beirut: 'Asia/Beirut',
  doha: 'Asia/Qatar',
  dubai: 'Asia/Dubai',
  jerusalem: 'Asia/Jerusalem',
  muscat: 'Asia/Muscat',
  petra: 'Asia/Amman',
  riyadh: 'Asia/Riyadh',
  samarkand: 'Asia/Samarkand',
  tashkent: 'Asia/Tashkent',
  'tel aviv': 'Asia/Jerusalem',
  tehran: 'Asia/Tehran',
  yerevan: 'Asia/Yerevan',

  // South and East Asia
  bali: 'Asia/Makassar',
  bangalore: 'Asia/Kolkata',
  bengaluru: 'Asia/Kolkata',
  bangkok: 'Asia/Bangkok',
  beijing: 'Asia/Shanghai',
  busan: 'Asia/Seoul',
  'chiang mai': 'Asia/Bangkok',
  chengdu: 'Asia/Shanghai',
  colombo: 'Asia/Colombo',
  delhi: 'Asia/Kolkata',
  'new delhi': 'Asia/Kolkata',
  dhaka: 'Asia/Dhaka',
  goa: 'Asia/Kolkata',
  hanoi: 'Asia/Ho_Chi_Minh',
  'ho chi minh city': 'Asia/Ho_Chi_Minh',
  saigon: 'Asia/Ho_Chi_Minh',
  'hoi an': 'Asia/Ho_Chi_Minh',
  'hong kong': 'Asia/Hong_Kong',
  jaipur: 'Asia/Kolkata',
  jakarta: 'Asia/Jakarta',
  kathmandu: 'Asia/Kathmandu',
  kolkata: 'Asia/Kolkata',
  'kuala lumpur': 'Asia/Kuala_Lumpur',
  kyoto: 'Asia/Tokyo',
  'luang prabang': 'Asia/Vientiane',
  macau: 'Asia/Macau',
  manila: 'Asia/Manila',
  mumbai: 'Asia/Kolkata',
  osaka: 'Asia/Tokyo',
  'phnom penh': 'Asia/Phnom_Penh',
  pokhara: 'Asia/Kathmandu',
  'siem reap': 'Asia/Phnom_Penh',
  sapporo: 'Asia/Tokyo',
  seoul: 'Asia/Seoul',
  shanghai: 'Asia/Shanghai',
  singapore: 'Asia/Singapore',
  taipei: 'Asia/Taipei',
  thimphu: 'Asia/Thimphu',
  tokyo: 'Asia/Tokyo',
  ulaanbaatar: 'Asia/Ulaanbaatar',
  yangon: 'Asia/Yangon',

  // Africa
  accra: 'Africa/Accra',
  'addis ababa': 'Africa/Addis_Ababa',
  arusha: 'Africa/Dar_es_Salaam',
  cairo: 'Africa/Cairo',
  'cape town': 'Africa/Johannesburg',
  casablanca: 'Africa/Casablanca',
  dakar: 'Africa/Dakar',
  'dar es salaam': 'Africa/Dar_es_Salaam',
  fez: 'Africa/Casablanca',
  johannesburg: 'Africa/Johannesburg',
  kampala: 'Africa/Kampala',
  kigali: 'Africa/Kigali',
  lagos: 'Africa/Lagos',
  luxor: 'Africa/Cairo',
  marrakech: 'Africa/Casablanca',
  marrakesh: 'Africa/Casablanca',
  nairobi: 'Africa/Nairobi',
  tunis: 'Africa/Tunis',
  windhoek: 'Africa/Windhoek',
  zanzibar: 'Africa/Dar_es_Salaam',

  // North America and the Caribbean
  anchorage: 'America/Anchorage',
  atlanta: 'America/New_York',
  austin: 'America/Chicago',
  boston: 'America/New_York',
  cancun: 'America/Cancun',
  chicago: 'America/Chicago',
  denver: 'America/Denver',
  havana: 'America/Havana',
  honolulu: 'Pacific/Honolulu',
  houston: 'America/Chicago',
  'las vegas': 'America/Los_Angeles',
  'los angeles': 'America/Los_Angeles',
  miami: 'America/New_York',
  montreal: 'America/Toronto',
  nashville: 'America/Chicago',
  'new orleans': 'America/Chicago',
  'mexico city': 'America/Mexico_City',
  oaxaca: 'America/Mexico_City',
  'new york': 'America/New_York',
  'new york city': 'America/New_York',
  nyc: 'America/New_York',
  philadelphia: 'America/New_York',
  phoenix: 'America/Phoenix',
  portland: 'America/Los_Angeles',
  'quebec city': 'America/Toronto',
  'san diego': 'America/Los_Angeles',
  'san francisco': 'America/Los_Angeles',
  'san juan': 'America/Puerto_Rico',
  seattle: 'America/Los_Angeles',
  toronto: 'America/Toronto',
  vancouver: 'America/Vancouver',
  // Editors type all of these for the same city.
  'washington d.c.': 'America/New_York',
  'washington dc': 'America/New_York',
  'washington d.c': 'America/New_York',
  washington: 'America/New_York',

  // Central and South America
  'buenos aires': 'America/Argentina/Buenos_Aires',
  bogota: 'America/Bogota',
  cartagena: 'America/Bogota',
  cusco: 'America/Lima',
  cuzco: 'America/Lima',
  'guatemala city': 'America/Guatemala',
  antigua: 'America/Guatemala',
  'la paz': 'America/La_Paz',
  lima: 'America/Lima',
  medellin: 'America/Bogota',
  montevideo: 'America/Montevideo',
  'panama city': 'America/Panama',
  quito: 'America/Guayaquil',
  'rio de janeiro': 'America/Sao_Paulo',
  'san jose': 'America/Costa_Rica',
  santiago: 'America/Santiago',
  'sao paulo': 'America/Sao_Paulo',
  ushuaia: 'America/Argentina/Ushuaia',

  // Oceania
  auckland: 'Pacific/Auckland',
  brisbane: 'Australia/Brisbane',
  cairns: 'Australia/Brisbane',
  fiji: 'Pacific/Fiji',
  melbourne: 'Australia/Melbourne',
  perth: 'Australia/Perth',
  queenstown: 'Pacific/Auckland',
  sydney: 'Australia/Sydney',
  tahiti: 'Pacific/Tahiti',
  wellington: 'Pacific/Auckland',
}

/** "  São Paulo, Brazil " → "sao paulo" */
function normalizeCity(city: string): string {
  return city
    .split(',')[0]
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function getTimezoneForCity(city: string | null | undefined): string | null {
  if (!city) return null
  return CITY_TIMEZONES[normalizeCity(city)] ?? null
}

/**
 * How many minutes ahead of UTC a timezone currently is. Used only to order
 * the ticker west-to-east, the way a departures board or a wall of office
 * clocks is ordered — an unsorted readout looks arbitrary.
 *
 * Cities with no known timezone sort last.
 */
export function getUtcOffsetMinutes(timezone: string | null): number {
  if (!timezone) return Number.MAX_SAFE_INTEGER
  try {
    const now = new Date()
    // Format the same instant in UTC and in the target zone, then diff them.
    const asUtc = new Date(now.toLocaleString('en-US', {timeZone: 'UTC'}))
    const asZone = new Date(now.toLocaleString('en-US', {timeZone: timezone}))
    return Math.round((asZone.getTime() - asUtc.getTime()) / 60000)
  } catch {
    return Number.MAX_SAFE_INTEGER
  }
}
