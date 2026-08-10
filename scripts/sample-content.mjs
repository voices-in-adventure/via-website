/**
 * Placeholder content for review builds. Not real VIA journalism — plausible
 * headlines, deks, and short bodies whose only job is to let the owner judge
 * layout and formatting with something other than gray boxes.
 *
 * Everything here is written to satisfy the schemas in studio/schemaTypes/
 * exactly. To add another sample piece, copy an entry and change the fields;
 * the seed script derives everything else from what's here.
 *
 * Tag slugs (`places`, `reasons`) and `author` refer to documents that
 * already exist in the dataset — the seed script resolves them by slug and
 * fails loudly if one is missing rather than creating it.
 *
 * Photos come from Wikimedia Commons under the license named in `credit`,
 * which is what runs as the article's hero caption.
 */

/** Authors these samples are bylined to, beyond the two already in the dataset. */
export const authors = [
  {
    slug: 'sofia-marchetti',
    name: 'Sofia Marchetti',
    role: 'Managing Editor',
    bio: 'Runs the Dispatch desk. Holds that any itinerary worth printing should survive a delayed train.',
  },
  {
    slug: 'amara-osei',
    name: 'Amara Osei',
    role: 'Contributing Writer',
    bio: 'Studying urban planning. Writes about cities that are easier to walk than to explain.',
  },
  {
    slug: 'theo-alvarado',
    name: 'Theo Alvarado',
    role: 'Staff Writer',
    bio: 'Anthropology major, chronically on a grant. Files from wherever the fieldwork lands.',
  },
]

/**
 * The articles. `body` is an array of strings — one paragraph each — except
 * where an entry is `['h2', 'text']`, which becomes a subheading. The seed
 * script turns these into portable text.
 */
export const articles = [
  // ─── Dispatches ────────────────────────────────────────────────────────
  {
    type: 'dispatch',
    slug: '48-hours-in-lisbon-without-once-paying-for-the-tram',
    title: '48 Hours in Lisbon Without Once Paying for the Tram',
    dek: 'A weekend built on free viewpoints, the cheapest ferry in Europe, and the long walk down from Graça.',
    format: 'guide',
    duration: 48,
    city: 'Lisbon',
    places: ['europe'],
    reasons: ['bored-for-the-weekend'],
    author: 'maya-chen',
    publishedAt: '2026-08-05T09:00:00.000Z',
    featured: true,
    photo: {
      file: 'lisbon-alfama-tram.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Tram_through_Alfama_%2845633482212%29.jpg',
      credit: 'Photo: Neil / Wikimedia Commons (CC BY 2.0)',
    },
    body: [
      'The 28 tram is the most photographed thing in this city and the least useful. It costs three euros fifty to board, it is full before it reaches you, and every stop on its route is walkable from another stop on its route. Skip it. The city it climbs through is free.',
      ['h2', 'Saturday'],
      'Start at Miradouro da Senhora do Monte, the highest of the viewpoints and the only one that is ever empty. Come down through Graça on foot — not the stairs the map suggests, but the long way along Rua da Voz do Operário, where the tiled facades have not been restored and are better for it. By the time you reach Alfama you will have passed four more viewpoints, none of which charge admission.',
      'Lunch is wherever has a handwritten menu and no English on it. Expect to pay eight euros for more food than you want. Afternoon belongs to the ferry: Cais do Sodré to Cacilhas, about a euro and a half, twenty minutes, and the best view of Lisbon available at any price. Most people photograph the city from a hill. The water is where it actually resolves.',
      ['h2', 'Sunday'],
      'Feira da Ladra runs Tuesday and Saturday, so Sunday is for the Gulbenkian, free after two if you have a student card and worth the walk through Avenidas Novas regardless. End at Miradouro de Santa Catarina at dusk with something from the kiosk. You will have covered most of the city, spent under twenty euros, and never once queued for the tram.',
    ],
  },
  {
    type: 'dispatch',
    slug: 'nobody-in-mexico-city-eats-dinner-before-ten',
    title: 'Nobody in Mexico City Eats Dinner Before Ten',
    dek: 'What a night out looks like when the best food in the city starts serving around the hour your program calls curfew.',
    format: 'feature',
    city: 'Mexico City',
    places: ['americas'],
    reasons: ['for-the-plot'],
    author: 'theo-alvarado',
    publishedAt: '2026-07-28T09:00:00.000Z',
    featured: true,
    photo: {
      file: 'mexico-city-taco-stand.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Puesto_de_tacos_en_la_colonia_del_Valle.jpg',
      credit: 'Photo: ProtoplasmaKid / Wikimedia Commons (CC BY-SA 4.0)',
    },
    body: [
      'The exchange students arrive at eight and find the taquería closed. They conclude the reviews were wrong and go somewhere with a host stand. This is how you can tell how long someone has been here.',
      'The stands on Avenida Álvaro Obregón do not open until the trompo is worth lighting, which is when there are enough people out to finish one. That is ten, sometimes later. Before then the neighborhood is doing something else — the cantinas are half full, someone is setting up, and the whole colonia has the feeling of a room being turned over between sittings.',
      'What nobody explains to a semester program is that the schedule is not a quirk to be accommodated. It is the actual structure of the evening, and a curfew of eleven does not shorten your night out so much as delete it. The students who figure this out stop treating dinner as the thing you do before going out, and start treating it as the thing you do once you are already there.',
    ],
  },
  {
    type: 'dispatch',
    slug: '24-hours-in-marrakech-when-youre-traveling-alone',
    title: '24 Hours in Marrakech When You’re Traveling Alone',
    dek: 'One day in the medina, mapped for someone who would rather not be the story.',
    format: 'guide',
    duration: 24,
    city: 'Marrakech',
    places: ['africa'],
    reasons: ['table-for-one'],
    author: 'amara-osei',
    publishedAt: '2026-07-14T09:00:00.000Z',
    featured: false,
    photo: {
      file: 'marrakech-medina-souk.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Medina_souk%2C_Marrakech%2C_Morocco_-_panoramio.jpg',
      credit: 'Photo: David Broad / Wikimedia Commons (CC BY 3.0)',
    },
    body: [
      'Traveling alone in the medina is not difficult. It is conspicuous, which is a different problem and a solvable one. The fix is mostly pacing: move like you have been here before, eat at the hours locals eat, and do not stand still in the middle of a lane with a map open.',
      ['h2', 'Morning'],
      'Be in the souks by eight, before the tour groups come through Bab Agnaou. Two hours of that is enough. The Saadian Tombs and the Bahia Palace both open at nine and both empty out by eleven if you go straight there. Buy nothing before noon; the first price of the day is a formality.',
      ['h2', 'Afternoon and after'],
      'Lunch alone is easiest at a rooftop — not for the view but because a table for one on a roof is unremarkable, whereas a table for one at street level invites conversation you may not want. Jemaa el-Fnaa is worth an hour at dusk and no more. For dinner, the food stalls are fine and cheap, but the ones with laminated photographs are for you and the ones with a crowd of men eating standing up are for everyone else. Choose accordingly.',
    ],
  },
  {
    type: 'dispatch',
    slug: '72-hours-in-osaka-on-the-money-that-just-cleared',
    title: '72 Hours in Osaka on the Money That Just Cleared',
    dek: 'Three days of standing-room bars, five-hundred-yen lunches, and exactly one splurge worth the transfer fee.',
    format: 'guide',
    duration: 72,
    city: 'Osaka',
    places: ['asia'],
    reasons: ['stipend-just-dropped'],
    author: 'sofia-marchetti',
    publishedAt: '2026-07-08T09:00:00.000Z',
    featured: true,
    photo: {
      file: 'osaka-dotonbori-night.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Dotonbori_%40_Namba_at_night_%40_Osaka_%2813382249504%29.jpg',
      credit: 'Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)',
    },
    body: [
      'Osaka is the city where a research stipend goes furthest and disappears fastest, and the difference between those two outcomes is entirely a matter of where you eat standing up.',
      ['h2', 'Day one'],
      'Land, drop your bag, and go straight to a kaiten-zushi counter for lunch — not the famous one, the one nearest wherever you are staying, which will be better and half the price. Spend the afternoon in Shinsekai, which is louder and less curated than Dotonbori and where kushikatsu runs about a hundred and thirty yen a skewer. The rule about not double-dipping the sauce is real and enforced socially.',
      ['h2', 'Day two'],
      'Nakazakichō in the morning for the coffee shops in converted row houses, then the Umeda Sky Building only if the weather is clear. Evening in a standing bar in Tenma, where the entire district is walkable and nothing has a cover charge. This is the night you will spend the least and remember the most.',
      ['h2', 'Day three'],
      'The splurge. One kappo counter, one seating, roughly eight thousand yen, booked before you fly. It is the only reservation on this itinerary and the only thing here that requires planning. Everything else Osaka will hand you if you show up hungry at the right hour.',
    ],
  },
  {
    type: 'dispatch',
    slug: 'sydney-costs-a-fortune-the-harbour-doesnt',
    title: 'Sydney Costs a Fortune. The Harbour Doesn’t.',
    dek: 'An exchange semester spent finding out how much of this city you can see for the price of one ferry ticket.',
    format: 'feature',
    city: 'Sydney',
    places: ['oceania'],
    reasons: ['for-the-plot'],
    author: 'theo-alvarado',
    publishedAt: '2026-06-30T09:00:00.000Z',
    featured: false,
    photo: {
      file: 'sydney-harbour-ferry.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Sydney_Opera_House_from_ferry_02.jpg',
      credit: 'Photo: Chris Mitchell / Wikimedia Commons (CC BY-SA 4.0)',
    },
    body: [
      'Every exchange student in Sydney arrives with a budget and abandons it in the first fortnight. Rent takes most of it. What is left does not cover the version of the city that appears in the recruitment brochure, and there is a stretch around week four where it seems like the answer is simply to stay in.',
      'It is not. The answer is the ferry. A single trip to Manly costs less than a coffee near the university, runs every twenty minutes, and passes everything the harbour cruises charge sixty dollars to show you. Do it at seven in the evening and you have the deck largely to yourself.',
      'By the end of the semester I had taken it enough times that the crossing stopped being an event. That turned out to be the point. The city that costs a fortune is the one you visit; the one you can afford is the one you end up living in, and it is mostly outdoors, mostly free, and mostly reachable on a transport card you already have.',
    ],
  },
  {
    type: 'dispatch',
    slug: 'learning-to-sit-still-in-amman',
    title: 'Learning to Sit Still in Amman',
    dek: 'Six weeks of intensive Arabic taught me less than the hours I spent alone in the same café on Rainbow Street.',
    format: 'essay',
    city: 'Amman',
    places: ['middle-east'],
    reasons: ['table-for-one'],
    author: 'amara-osei',
    publishedAt: '2026-06-11T09:00:00.000Z',
    featured: true,
    photo: {
      file: 'amman-citadel.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/View_of_the_Amman_Citadel%2C_Jordan4.jpg',
      credit: 'Photo: Diego Delso / Wikimedia Commons (CC BY-SA 3.0)',
    },
    body: [
      'The program sold itself on immersion, by which it meant four hours of grammar a day and a homestay. What it did not account for is that immersion is mostly waiting — for the conversation to slow down, for the word to arrive, for someone to decide you are worth the effort of being understood.',
      'So I went to the same café every afternoon for six weeks and did nothing. I ordered the same thing badly, then adequately, then without thinking about it. The staff stopped switching to English somewhere around week three, which was the single largest jump in my Arabic and had nothing to do with the classroom.',
      'I have since been told this is a known thing, that language happens in the dead time and not in the drill. Nobody said so at the time. What they said was that I should get out more, see Jerash, do the Dead Sea. I did those too. They were fine. They are not what I think about.',
    ],
  },
  {
    type: 'dispatch',
    slug: 'what-i-got-wrong-about-cape-town',
    title: 'What I Got Wrong About Cape Town Before I Got There',
    dek: 'A semester in a city that refuses to fit the two paragraphs a study-abroad brochure gives it.',
    format: 'essay',
    city: 'Cape Town',
    places: ['africa'],
    reasons: ['for-the-plot'],
    author: 'maya-chen',
    publishedAt: '2026-05-21T09:00:00.000Z',
    featured: false,
    photo: {
      file: 'cape-town-city-bowl.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Cape_Town_City_Bowl_and_Table_Mountain_at_dawn.jpg',
      credit: 'Photo: Daniel Case / Wikimedia Commons (CC BY-SA 3.0)',
    },
    body: [
      'The brochure had a photograph of the mountain, a sentence about biodiversity, and a line about the vibrant local culture. I want to be fair to whoever wrote it: there is no version of two paragraphs that would have prepared me for the actual shape of this city.',
      'What I got wrong was the geography, and the geography is not incidental. I had assumed a city center with things arranged around it. Cape Town is not arranged around anything; it is a set of places held apart by distances that were designed to hold them apart, and understanding that took me most of a semester and a great deal of embarrassment.',
      'I am wary of the essay that turns a semester abroad into a lesson learned. I did not learn a lesson. I learned an address book, a bus route, and how little of a place four months buys you. That last part seems worth saying to whoever reads the brochure next.',
    ],
  },
  {
    type: 'dispatch',
    slug: '36-hours-in-buenos-aires-and-an-exchange-rate-to-match',
    title: '36 Hours in Buenos Aires and an Exchange Rate to Match',
    dek: 'A weekend planned around a currency that moves faster than the subte.',
    format: 'guide',
    duration: 36,
    city: 'Buenos Aires',
    places: ['americas'],
    reasons: ['stipend-just-dropped'],
    author: 'sofia-marchetti',
    publishedAt: '2026-05-06T09:00:00.000Z',
    featured: false,
    photo: {
      file: 'buenos-aires-caminito.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Buenos_Aires_-_La_Boca_-_Caminito_-_200807i.jpg',
      credit: 'Photo: Luis Argerich / Wikimedia Commons (CC BY 2.0)',
    },
    body: [
      'Any price printed in this guide will be wrong by the time you read it. That is not sloppiness, it is the exchange rate, and the correct response is to plan around categories rather than numbers: which meals are cheap in relative terms, which are not, and which are worth it either way.',
      ['h2', 'Friday evening to Saturday'],
      'Arrive and do nothing ambitious. San Telmo on a Friday night costs almost nothing and gives you the register of the city. Saturday morning is Recoleta and the cemetery, which is free and takes longer than you think, then the Ateneo Grand Splendid because everyone goes and it earns it. Lunch at a parrilla is the meal to spend on — it is still cheaper than the equivalent anywhere in North America, and the difference in quality is not close.',
      ['h2', 'Sunday'],
      'The San Telmo market fills eleven blocks and you will not get through it. Go early, buy the leather thing you are going to buy, and be at La Boca by two. Caminito is a tourist set piece and worth exactly forty-five minutes. The last of the money goes on dinner, late, somewhere in Palermo, at an hour that will feel wrong for about two days and then stop feeling wrong at all.',
    ],
  },
  {
    type: 'dispatch',
    slug: 'seoul-doesnt-close',
    title: 'Seoul Doesn’t Close, and Neither Should Your Weekend',
    dek: 'The 24-hour cafés, night markets, and bathhouses that make two days feel like four.',
    format: 'feature',
    city: 'Seoul',
    places: ['asia'],
    reasons: ['bored-for-the-weekend'],
    author: 'theo-alvarado',
    publishedAt: '2026-04-23T09:00:00.000Z',
    featured: true,
    photo: {
      file: 'seoul-myeongdong-night.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Myeongdong_night_market_seoul_1.jpg',
      credit: 'Photo: Sgroey / Wikimedia Commons (CC BY-SA 4.0)',
    },
    body: [
      'The metro stops running around midnight, which sounds like the end of the evening and is actually the beginning of a different one. Everything a visitor needs between one and five in the morning is open, staffed, and busy, and the city has arranged itself around the assumption that you might not go home.',
      'The 24-hour café is the load-bearing institution here. Not a bar — a café, with fluorescent lighting and students doing coursework at three in the morning, where nobody will ask why you are there. The jjimjilbang does the same job with a floor to sleep on and costs less than a hostel bed. Between them you can hold a weekend open indefinitely.',
      'What this does to a two-day trip is hard to overstate. You are not choosing between the night market and a night of sleep, because the night market runs late and the sleep is optional and cheap to defer. Most people leave Seoul convinced they were there longer than they were.',
    ],
  },

  // ─── Signals ───────────────────────────────────────────────────────────
  {
    type: 'signal',
    slug: 'new-zealand-reopens-working-holiday-visas-to-us-students',
    title: 'New Zealand Reopens Working Holiday Visas to US Students Under 30',
    dek: 'The annual cap lifts in September, and the application window is shorter than it looks.',
    newsPeg:
      'Immigration New Zealand confirmed on August 4 that the US working holiday scheme reopens for the 2026–27 season with 2,000 additional places.',
    places: ['oceania'],
    reasons: ['stipend-just-dropped'],
    author: 'jordan-ruiz',
    publishedAt: '2026-08-07T09:00:00.000Z',
    informationAsOf: '2026-08-06',
    featured: false,
    photo: {
      file: 'queenstown-remarkables.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/The_Remarkables_from_Queenstown%2C_New_Zealand_04.jpg',
      credit: 'Photo: Σ64 / Wikimedia Commons (CC BY 4.0)',
    },
    body: [
      'The scheme allows twelve months of work and travel for applicants aged 18 to 30, and the places have gone in under a fortnight in each of the last three seasons. The cap is national, not rolling, so an application filed in October is competing against nothing — because there will be nothing left.',
      'Two requirements catch students out. The first is proof of roughly NZ$4,200 in available funds, which must be in the applicant’s own account. The second is onward travel or the funds to buy it, assessed separately. Neither is waived for anyone currently enrolled.',
    ],
  },
  {
    type: 'signal',
    slug: 'jordan-drops-the-petra-entry-fee-for-two-night-stays',
    title: 'Jordan Drops the Petra Entry Fee for Anyone Staying Two Nights',
    dek: 'The cheapest way into the Treasury is now to sleep in Wadi Musa first.',
    newsPeg:
      'The Jordan Tourism Board extended its two-night waiver through the end of the 2026 season in an announcement on July 30.',
    places: ['middle-east'],
    reasons: ['for-the-plot'],
    author: 'jordan-ruiz',
    publishedAt: '2026-08-02T09:00:00.000Z',
    informationAsOf: '2026-08-01',
    featured: true,
    photo: {
      file: 'petra-treasury.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Treasury_from_Siq%2C_Petra%2C_Jordan_%2816044613195%29.jpg',
      credit: 'Photo: Esin Üstün / Wikimedia Commons (CC BY 2.0)',
    },
    body: [
      'The waiver applies to visitors who book two consecutive nights in Jordan before entering the site, and it is claimed at the gate rather than in advance. Day-trippers arriving from Israel or from a cruise call at Aqaba pay the full rate, which is the point of the policy.',
      'For students already in the region on a program, the arithmetic is straightforward: two nights in a Wadi Musa hostel costs less than the single-day admission it replaces. Bring the booking confirmation on paper. Staff have been inconsistent about accepting a phone screen.',
    ],
  },
  {
    type: 'signal',
    slug: 'japans-rail-pass-goes-up-again-in-october',
    title: 'Japan’s Rail Pass Goes Up Again in October',
    dek: 'The seven-day pass stops paying for itself unless your itinerary crosses the country twice.',
    newsPeg: 'JR Group published new nationwide pass rates on July 15, effective October 1.',
    places: ['asia'],
    reasons: ['stipend-just-dropped'],
    author: 'jordan-ruiz',
    publishedAt: '2026-07-19T09:00:00.000Z',
    informationAsOf: '2026-07-18',
    featured: false,
    photo: {
      file: 'japan-shinkansen-platform.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Karuizawa_Station_Shinkansen_Platform.jpg',
      credit: 'Photo: Mochimoshi / Wikimedia Commons (CC BY-SA 4.0)',
    },
    body: [
      'The nationwide pass has now risen twice in three years, and the break-even point has moved with it. A Tokyo–Kyoto–Osaka trip, which used to be the standard case for buying one, no longer clears the cost on its own. A round trip that reaches Hiroshima or Kanazawa still does.',
      'The regional passes were not raised by the same margin and are worth pricing separately — the Kansai and JR East versions in particular. Point-to-point tickets bought through a station machine remain cheaper than either for anyone staying in one place.',
    ],
  },
  {
    type: 'signal',
    slug: 'kenya-extends-visa-free-entry-to-student-passport-holders',
    title: 'Kenya Extends Visa-Free Entry to Student Passport Holders',
    dek: 'The electronic travel authorisation still applies. The fee does not.',
    newsPeg:
      'Kenya’s Ministry of Interior announced the student exemption on June 24, effective immediately.',
    places: ['africa'],
    reasons: ['for-the-plot'],
    author: 'amara-osei',
    publishedAt: '2026-06-28T09:00:00.000Z',
    informationAsOf: '2026-06-27',
    featured: false,
    photo: {
      file: 'nairobi-skyline.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Nairobi_City_County_Skyline.jpg',
      credit: 'Photo: Antony Trivet / Wikimedia Commons (CC BY-SA 4.0)',
    },
    body: [
      'The exemption covers travellers enrolled full-time at an accredited institution and travelling for study, research, or a documented academic program. Tourism is not covered, and the declared purpose on the authorisation form is what determines which category you fall into.',
      'The authorisation itself is still mandatory and still takes up to three business days to clear. Apply with a letter from the registrar; several applicants have reported delays where the enrolment evidence was a student card alone.',
    ],
  },
  {
    type: 'signal',
    slug: 'amtraks-student-discount-is-back-with-a-catch',
    title: 'Amtrak’s Student Discount Is Back, With a Catch',
    dek: 'Fifteen percent off, and blackout dates on nearly every weekend you would actually travel.',
    newsPeg: 'Amtrak reinstated its student fare tier on May 12 after a two-year pause.',
    places: ['americas'],
    reasons: ['bored-for-the-weekend'],
    author: 'jordan-ruiz',
    publishedAt: '2026-05-16T09:00:00.000Z',
    informationAsOf: '2026-05-15',
    featured: false,
    photo: {
      file: 'amtrak-south-station.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Amtrak_Northeast_Regional_Train_177_at_South_Station_April_2024.jpg',
      credit: 'Photo: 4300streetcar / Wikimedia Commons (CC BY 4.0)',
    },
    body: [
      'The discount requires a verified student account and applies to Coach fares only, which excludes Acela and every business-class upgrade. Fifteen percent off a Northeast Regional fare between Boston and New York is real money, but only on the trains nobody is fighting over.',
      'The blackouts are the catch. Friday afternoons, Sunday evenings, and the fortnights around Thanksgiving and the winter holidays are all excluded — which is to say, the discount is unavailable on precisely the departures students use it for. Booking midweek is the only way to see the full reduction.',
    ],
  },
]
