/**
 * The client's final copy, transcribed from `edits/VIA Website Text Edits.docx`.
 *
 * This file is the transcription; scripts/seed-client-copy.mjs writes it into
 * Sanity. Editors can revise any of it in Studio afterwards — re-running the
 * seed would overwrite those edits, which is why it is a separate script you
 * run deliberately rather than part of the build.
 *
 * Transcribed as written, apart from the corrections below — all of them
 * plain slips in the source document, agreed with the owner:
 *
 *   - Justin Liu's "loves to learn jog" is written here as "loves to jog".
 *   - The founder quote's "mop-ed" is written here as "moped", and the quote
 *     gains the full stop it was missing before its closing quote mark.
 *   - Syrah Anand's "Philips Exeter Academy" is spelled "Phillips Exeter
 *     Academy", which is the school's actual name.
 *   - Five bios ended their last sentence with no full stop — Monika Tran,
 *     Justin Liu, Zoë Curtis, Jordan Lubis, and Syrah Anand. All five have
 *     one here.
 *   - Trailing full stops are dropped from the travel must-haves, which are
 *     labelled fragments on the page rather than sentences.
 *
 * Hometowns, roles, and must-haves are labels rather than sentences, so they
 * are left without terminal punctuation on purpose.
 *
 * Straight quotes and apostrophes in the source are curled, matching the rest
 * of the site's copy.
 *
 * Biography only. The staff forms also carry phone numbers, email addresses,
 * and social handles; none of that is here, none of it goes into Sanity, and
 * the source documents are gitignored.
 */

/**
 * The lines over the homepage photo.
 *
 * Deliberately empty. The client's edit round supplied three ordered lines
 * for the hero, and they were built and then reverted at the owner's
 * direction with the COO's sign-off — the front page reads better with the
 * single mission statement it opened with. index.astro falls back to
 * `missionStatement` whenever this is empty, so clearing it is the whole
 * revert.
 *
 * The three lines are kept here, commented, because the decision was a
 * preference rather than a rejection and may well come back:
 *
 *   'Via means ‘by way of’'
 *   'For those who have long dreamed of exploring the world, we’re here for you.'
 *   'Our platform is dedicated to inspiring, informing, and spotlighting young travelers worldwide.'
 */
export const heroLines = []

/**
 * The band below the homepage photo. The client's note against this section
 * reads "could use the topographical background", which is where the pattern
 * on the homepage comes from.
 */
export const homeIntro = [
  'From one young person to another, we offer firsthand guidance, stories, and perspectives on the questions that often make travel feel intimidating. Where should you begin? What should you expect? How should you plan? And how can you combat uncertainty?',
  'We aim to push you beyond your familiar itineraries to new frontiers. Ones that challenge how you understand both the world around you, and who you are yourself.',
]

/**
 * The paragraph over the homepage photo, and the site's meta description.
 * This is the line the front page opened with before the edit round; it is
 * back at the owner's direction.
 */
export const missionStatement =
  'Voices in Adventure is a platform for informing, highlighting, and inspiring young travelers around the world. “Via” means “by way of,” and we care as much about what carries you somewhere as about where you land.'

/** The pull quote at the top of About. Rendered with the page's own quote marks. */
export const founderQuote =
  '4 years ago, I stood by the side of a mountain pass in North Vietnam, overlooking a lush, green valley, right next to my moped, helmet in hand. I felt for the first time that travel could make the world feel larger than I had ever imagined it to be. That feeling, a realization that there is so much more out there to see and absorb and feel, is what sits at the heart of Voices in Adventure.'

export const founderAttribution = 'Nhan Phan, Founder'

/** One string per paragraph; the seed turns these into Portable Text. */
export const aboutMission = [
  'At our core, we believe that travel is a way of meeting new perspectives, learning through discomfort, and finding one’s place in a world that is constantly changing. That’s why we created VIA as a platform to support the truly unique experiences, questions, and curiosities that define the youth perspective.',
  'Wherever you are, we hope our stories, journeys, and resources serve as a bridge to your next adventure.',
]

/** Journeys → Places to go. Keyed by the slug already in Sanity. */
export const places = {
  africa: 'Its fifty-four countries offer so much more than a safari.',
  americas: 'North to south. Sea to sea.',
  asia: 'You’ll find 4.8 billion people really have a lot to share.',
  europe: 'Gap year? Study abroad? Hostels? Trains? We’ve got it covered.',
  'middle-east':
    'Some of the world’s best food, hospitality, and sights to see (in our opinion).',
  oceania:
    'All the kangaroos, islands, reefs, and long-haul flight tricks you’ll need to reach them.',
}

/**
 * Journeys → Reasons to go. These gain sentence case: the client writes them
 * capitalised, and they are headings on the page rather than tags in a
 * sentence.
 */
export const reasons = {
  'bored-for-the-weekend': {
    title: 'Bored for the weekend',
    description: 'No plan? 48 hours to spare? We’ve got you.',
  },
  'for-the-plot': {
    title: 'For the plot',
    description:
      'Trips undertaken specifically so you’ll have something to tell at brunch. Or also, dad lore.',
  },
  'stipend-just-dropped': {
    title: 'Stipend just dropped',
    description: 'For when a few big stickers suddenly start to look more reasonable.',
  },
  'table-for-one': {
    title: 'Table for one',
    description: 'The very best solo trips.',
  },
}

/**
 * The masthead. `slug` matches the `staff-` document ids already in Sanity.
 *
 * Roles are the client's, and two of them changed in this round: Khue Pham
 * from "Chief of Visibility Strategy" to "Chief Strategy Officer", and Avery
 * Simon from "Chief of Staff/HR" to "Chief People Officer". src/pages/about.astro
 * ranks these strings to order the grid, so a role renamed here has to be
 * renamed there too.
 *
 * Annie Wion's form came back blank in the client's document, so she has a
 * name and a role and nothing else. The About grid already handles that.
 */
export const staff = [
  {
    slug: 'nhan-phan',
    role: 'CEO/Founder',
    hometown: 'Ho Chi Minh City',
    travelMustHave: 'A fully charged power bank',
    bio: 'After the pandemic, Nhan was determined to leave the house as much as possible and is now an accomplished solo traveler, with over 40 countries and territories ticked off his bucket list. He will look for every reason to get out of the airport and explore if he’s given a long layover (even as little as 8 hours). Nhan is a student at Georgetown University.',
  },
  {
    slug: 'sid-mehrotra',
    role: 'Chief Operating Officer',
    hometown: 'Dubai',
    travelMustHave: 'A good pair of sunglasses',
    bio: 'Sid grew up across several different countries, from Africa to Asia, and from a young age, was fascinated by the ways in which communities around the world find ways to interact and grow. After moving to Dubai, he leveraged its location to visit more than 35 countries around the world. Closer to home, Sid is a lifelong reader, an amateur woodworker, and a committed aviation fan. Sid is a student at Georgetown University.',
  },
  {
    slug: 'eli-zainea',
    role: 'Managing Editor',
    hometown: 'Grand Rapids',
    travelMustHave: 'Music',
    bio: 'With a particular passion for diplomacy, Eli has worked and studied in four different continents. At the same time, he is learning both Arabic and Spanish, driven by his interest in migration policy and development. He matches his global expertise with his love for art, photography, and anything that expands or exercises his creative side. Eli is a student at the University of Notre Dame.',
  },
  {
    slug: 'khue-pham',
    role: 'Chief Strategy Officer',
    hometown: 'Ho Chi Minh City',
    travelMustHave: 'Sleeping mask',
    bio: 'Khue’s 4 years of high school in the United States introduced her to the world of solo traveling and hiking the backcountry. These experiences continue to inspire her adventures to this day, and she believes there is no experience quite as enchanting as a good trip. In her free time, she loves a good gothic novel almost as much as she does shoujo matcha. Khue is a student at the University of Birmingham.',
  },
  {
    slug: 'avery-simon',
    role: 'Chief People Officer',
    hometown: 'Greenville',
    travelMustHave: 'Large water bottle',
    bio: 'During her senior year of high school, Avery traveled abroad for the first time to Copenhagen, and loved the experience of trying new foods, meeting new people, and learning more about a completely different culture. Since then, she has made it a goal to visit a new country every year. She is a huge fan of Hozier, and just about any kind of indie rock music in general. Avery is a student at Georgetown University.',
  },
  {
    slug: 'monika-tran',
    role: 'External Manager',
    hometown: 'Ho Chi Minh City',
    travelMustHave: 'Sunscreen',
    bio: 'A researcher of tourism and hospitality management, Monika’s motivation for travel comes from boredom, whether out of where she is or her current energy state. She loves to spend time closer to the ground, immersing herself in locals’ stories, cultural practices, and natural environs. Monika is a student at RMIT University Vietnam.',
  },
  {
    slug: 'justin-liu',
    role: 'Digital Exposure Manager',
    hometown: 'Philadelphia',
    travelMustHave: 'Chewing gum',
    bio: 'Justin found his love for travel after receiving a scholarship from the German government to explore Germany and Austria with students from around the world, while speaking only German. Since then, he has continued to receive grants and funding to visit countries including Morocco, Saudi Arabia, and Rwanda. He is an accomplished piano player, and loves to jog. Justin is a student at Georgetown University.',
  },
  {
    slug: 'zoe-curtis',
    role: 'Senior Editor',
    hometown: 'Jackson Hole',
    travelMustHave: 'Headphones',
    bio: 'Although born in London, Zoë has been a Francophile all her life, and she recently moved back to the U.S. after studying political science in Paris. She believes traveling pushes her to keep learning new languages, whether that be in Israel, Japan, Alaska, or Monaco. In her spare time, she is an enthusiast of 60s nonfiction, skiing, and French butter. Zoë is a student at the University of Utah.',
  },
  {
    slug: 'annie-wion',
    role: 'Senior Editor',
    hometown: null,
    travelMustHave: null,
    bio: null,
  },
  {
    slug: 'jordan-lubis',
    role: 'Staff Writer',
    hometown: 'Key Largo',
    travelMustHave: 'Apple AirTags',
    bio: 'Jordan traveled abroad for the first time when he was 18 and has since been to more than 16 countries around the world, making the most of the opportunity to solo travel. He is passionate about learning new languages and believes travel is the best way to come across new perspectives and worldviews. Some of his favorite experiences include trips to France, the Netherlands, and Japan. Jordan is a student at Georgetown University.',
  },
  {
    slug: 'syrah-anand',
    role: 'Staff Writer',
    hometown: 'Dubai',
    travelMustHave: 'Scrapbook',
    bio: 'Syrah counts herself lucky for having been able to visit more than 20 countries in the span of just a few short years, with Egypt, Turkey, and Monaco as some of her favorite destinations (and ones she can keep revisiting). She takes photos no matter where she is, adding to her scrapbook that is slowly overtaking her desk. Syrah is a student at Phillips Exeter Academy.',
  },
  {
    slug: 'grace-kim',
    role: 'Staff Writer',
    hometown: 'Seattle',
    travelMustHave: 'Dark chocolate (for energy bursts)',
    bio: 'Grace found her love for travel during high school, leveraging local programs to discover new places with people her age. After entering college, she expanded her love to include more individual experiences and is always curious about the cultural drivers and effects of today’s travel industry. She has been to over 15 countries, where she loves taking long walks, café hopping, and visiting museums. Grace is a student at Georgetown University.',
  },
  {
    slug: 'bella-villarin',
    role: 'Staff Writer',
    hometown: 'San Diego',
    travelMustHave: 'Apple Maps',
    bio: 'Having lived across Japan, the U.S., and Singapore as a child, Bella found the inspiration to keep learning and immersing herself in new environments. Just recently, she spent her summer volunteering at a youth hostel in Porto. She loves spending time outdoors, with her long-term goal being to travel the entire world, and eventually, live on a sailboat. Bella is a student at Georgetown University.',
  },
  {
    slug: 'hawley-dick',
    role: 'Staff Writer',
    hometown: 'Orinda',
    travelMustHave: 'Eye mask',
    bio: 'Hawley found his love for travel while going abroad with his family, and as he got older, discovered that experiencing places on his own was even more appealing. He visited Spain and France after his high school graduation with some friends, and it made him realize just how much of the world is left to see, and how badly he wanted to explore it. Hawley is a student at Franklin & Marshall College.',
  },
]
