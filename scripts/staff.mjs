/**
 * The VIA masthead, transcribed from the staff introductions the client sent.
 *
 * Biography only. The source PDF also carries phone numbers, email addresses,
 * and social handles for all fourteen people; none of that is in this file,
 * none of it goes into Sanity, and the PDF itself is gitignored.
 *
 * Bios are condensed from what each person wrote about themselves — school,
 * year, field, where they are from, where they have been. Nothing is invented
 * to fill a gap: Annie Wion's form came back blank, so she has a name and a
 * role and no bio, which the About grid already handles.
 *
 * No pronouns anywhere. The forms do not state any, and a masthead reads
 * perfectly well without guessing.
 *
 * `headshot` is a filename in imagery/staff/, produced by
 * scripts/extract-staff-photos.py. Four people uploaded no photo and get the
 * initials fallback instead.
 *
 * Roles are copied verbatim from the forms. src/pages/about.astro ranks them
 * to order the masthead by seniority, so a role renamed here has to be
 * renamed there too or the person sorts to the bottom of the grid.
 */

export const staff = [
  {
    slug: 'nhan-phan',
    name: 'Nhan Phan',
    role: 'CEO/Founder',
    headshot: 'nhan-phan.jpeg',
    bio: "Third year at Georgetown's Walsh School of Foreign Service, studying international political economy with a minor in journalism. From Ho Chi Minh City, and close to forty countries and territories in.",
  },
  {
    slug: 'sid-mehrotra',
    name: 'Sid Mehrotra',
    role: 'Chief Operating Officer',
    headshot: 'sid-mehrotra.jpeg',
    bio: "Third year in regional studies at Georgetown's School of Foreign Service, focused on Europe and Oceania. Grew up across Kenya, the UK, the UAE, and India, and has visited nearly thirty-five countries.",
  },
  {
    slug: 'eli-zainea',
    name: 'Eli Zainea',
    role: 'Managing Editor',
    headshot: 'eli-zainea.jpeg',
    bio: "Junior at Notre Dame's Keough School of Global Affairs, with a secondary in Arabic. A semester in Ecuador, and a summer between Cairo and The Hague working on EU and MENA migration policy.",
  },
  {
    slug: 'khue-pham',
    name: 'Khue Pham',
    role: 'Chief of Visibility Strategy',
    headshot: 'khue-pham.jpeg',
    bio: 'Third year at the University of Birmingham, double majoring in English literature and digital media and communications. From Ho Chi Minh City, by way of four years of high school in the US.',
  },
  {
    slug: 'avery-simon',
    name: 'Avery Simon',
    role: 'Chief of Staff/HR',
    headshot: 'avery-simon.jpeg',
    bio: "Junior at Georgetown University's School of Foreign Service. From Greenville, South Carolina, and has travelled to Denmark, Ireland, Italy, Germany, Sweden, and Kenya.",
  },
  {
    slug: 'monika-tran',
    name: 'Monika Tran',
    role: 'External Manager',
    headshot: null,
    bio: 'Sophomore at RMIT University Vietnam in tourism and hospitality management, and a social media developer besides. Travels out of restlessness, and to live other lives through the stories of the people already there.',
  },
  {
    slug: 'justin-liu',
    name: 'Justin Liu',
    role: 'Digital Exposure Manager',
    headshot: 'justin-liu.jpeg',
    bio: "Junior in regional studies at Georgetown's Walsh School of Foreign Service, focused on MENA with a Persian minor. Has travelled on scholarship to five countries, among them Morocco, Saudi Arabia, and Rwanda.",
  },
  {
    slug: 'zoe-curtis',
    name: 'Zoë Curtis',
    role: 'Senior Editor',
    headshot: 'zoe-curtis.jpeg',
    bio: 'Sophomore studying English at the University of Utah, after a year at a political science university in Paris. Born in London to American parents, and a Francophile ever since.',
  },
  {
    slug: 'annie-wion',
    name: 'Annie Wion',
    role: 'Senior Editor',
    headshot: null,
    bio: null,
  },
  {
    slug: 'jordan-lubis',
    name: 'Jordan Lubis',
    role: 'Staff Writer',
    headshot: 'jordan-lubis.jpeg',
    bio: 'Rising junior at Georgetown University, studying finance and management. From the Florida Keys, eight countries in, with plans to reach sixteen by the end of the summer.',
  },
  {
    slug: 'syrah-anand',
    name: 'Syrah Anand',
    role: 'Staff Writer',
    headshot: null,
    bio: 'A student at Phillips Exeter Academy, from Dubai. Around twenty countries in, with Egypt, Turkey, and Monaco the ones that keep coming back, and a scrapbook slowly taking over a desk.',
  },
  {
    slug: 'grace-kim',
    name: 'Grace Kim',
    role: 'Staff Writer',
    headshot: 'grace-kim.jpeg',
    bio: 'Third year at Georgetown University, double majoring in government and English. Around fifteen countries in, including Turkey, Jordan, Israel, Lithuania, France, Spain, and Korea.',
  },
  {
    slug: 'bella-villarin',
    name: 'Bella Villarin',
    role: 'Staff Writer',
    headshot: 'bella-villarin.jpeg',
    bio: 'Third year at Georgetown University, studying political economy and global development. From San Diego, by way of Japan, Virginia, and Singapore.',
  },
  {
    slug: 'hawley-dick',
    name: 'Hawley Dick',
    role: 'Staff Writer',
    headshot: null,
    bio: 'Rising sophomore at Franklin and Marshall College, planning a joint major in history and environmental science with a minor in Spanish. From Orinda, California.',
  },
]

/**
 * The mission, condensed from the client's mission statement document into
 * something that reads on a web page rather than in a PDF. One string per
 * paragraph; the seed script turns these into Portable Text so editors can
 * revise them in Studio afterwards.
 *
 * The last line is the client's own closing sentence, kept verbatim.
 */
export const aboutMission = [
  'Voices in Adventure is a platform for informing, highlighting, and inspiring young travelers around the world. “Via” means “by way of,” which suits a publication interested not only in where young people are going, but in the experiences, encounters, and curiosities that carry them there.',
  'We believe travel is a way of meeting new perspectives, learning through discomfort, and finding your place in a world that will not hold still. VIA exists to spark the curiosity that sends young people out to explore it responsibly.',
  'Our writing is by and for a young audience. Dispatch is where writers, young travelers themselves, file stories, reflections, and destination advice. Signals covers the travel and hospitality industry and explains what its shifts actually mean for young travelers. Together they capture the many ways young people move through the world now, and make both travel and travel writing more accessible.',
  'If you have long dreamed of going, we are here with practical guidance and perspective on the questions that make travel feel intimidating. Where should you begin? What should you expect? How should you plan, and how do you handle the parts you cannot plan for?',
  'If you are already going, we want to push you past the familiar itinerary toward new frontiers, more thoughtful encounters, and experiences that challenge how you understand the world and yourself.',
  'Wherever you are, VIA hopes to meet you there and move with you.',
]

/** The line over the homepage hero. One sentence, from the same document. */
export const missionStatement =
  'Voices in Adventure is a platform for informing, highlighting, and inspiring young travelers around the world. “Via” means “by way of,” and we care as much about what carries you somewhere as about where you land.'
