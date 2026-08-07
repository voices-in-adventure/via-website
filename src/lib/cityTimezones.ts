/**
 * City name (as editors type it into a Dispatch's `city` field) → IANA
 * timezone. The ticker's city list is small and grows only when VIA
 * publishes about somewhere new, so a maintained lookup is more honest than
 * guessing a timezone from a string at request time.
 *
 * When a Dispatch introduces a city that isn't here yet, add it — the
 * ticker will still show the city name without a live time until it does.
 * Matching is case-insensitive.
 */
const CITY_TIMEZONES: Record<string, string> = {
  lisbon: 'Europe/Lisbon',
  london: 'Europe/London',
  paris: 'Europe/Paris',
  berlin: 'Europe/Berlin',
  madrid: 'Europe/Madrid',
  rome: 'Europe/Rome',
  amsterdam: 'Europe/Amsterdam',
  athens: 'Europe/Athens',
  istanbul: 'Europe/Istanbul',
  prague: 'Europe/Prague',
  vienna: 'Europe/Vienna',
  dublin: 'Europe/Dublin',
  copenhagen: 'Europe/Copenhagen',
  stockholm: 'Europe/Stockholm',
  reykjavik: 'Atlantic/Reykjavik',

  tokyo: 'Asia/Tokyo',
  osaka: 'Asia/Tokyo',
  seoul: 'Asia/Seoul',
  beijing: 'Asia/Shanghai',
  shanghai: 'Asia/Shanghai',
  'hong kong': 'Asia/Hong_Kong',
  singapore: 'Asia/Singapore',
  bangkok: 'Asia/Bangkok',
  'ho chi minh city': 'Asia/Ho_Chi_Minh',
  hanoi: 'Asia/Bangkok',
  taipei: 'Asia/Taipei',
  manila: 'Asia/Manila',
  jakarta: 'Asia/Jakarta',
  'kuala lumpur': 'Asia/Kuala_Lumpur',
  mumbai: 'Asia/Kolkata',
  delhi: 'Asia/Kolkata',

  dubai: 'Asia/Dubai',
  doha: 'Asia/Qatar',
  'abu dhabi': 'Asia/Dubai',
  amman: 'Asia/Amman',
  jerusalem: 'Asia/Jerusalem',
  'tel aviv': 'Asia/Jerusalem',

  'cape town': 'Africa/Johannesburg',
  johannesburg: 'Africa/Johannesburg',
  nairobi: 'Africa/Nairobi',
  cairo: 'Africa/Cairo',
  marrakech: 'Africa/Casablanca',
  accra: 'Africa/Accra',
  lagos: 'Africa/Lagos',

  'new york': 'America/New_York',
  'new york city': 'America/New_York',
  boston: 'America/New_York',
  toronto: 'America/Toronto',
  chicago: 'America/Chicago',
  'mexico city': 'America/Mexico_City',
  'los angeles': 'America/Los_Angeles',
  'san francisco': 'America/Los_Angeles',
  vancouver: 'America/Vancouver',
  'buenos aires': 'America/Argentina/Buenos_Aires',
  'rio de janeiro': 'America/Sao_Paulo',
  'sao paulo': 'America/Sao_Paulo',
  santiago: 'America/Santiago',
  bogota: 'America/Bogota',
  lima: 'America/Lima',
  havana: 'America/Havana',

  sydney: 'Australia/Sydney',
  melbourne: 'Australia/Melbourne',
  auckland: 'Pacific/Auckland',
  fiji: 'Pacific/Fiji',
  honolulu: 'Pacific/Honolulu',
}

export function getTimezoneForCity(city: string): string | null {
  return CITY_TIMEZONES[city.trim().toLowerCase()] ?? null
}
