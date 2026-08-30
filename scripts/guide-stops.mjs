/**
 * Itineraries for the six Destination Guides.
 *
 * Placeholder content, in the sense that the client's own writers will
 * replace it — but real in every way that matters, per CLAUDE.md: real
 * places, real coordinates, and notes written in VIA's voice. A review build
 * full of "Stop 1 / Stop 2" would produce useless feedback, and a map pinned
 * to invented coordinates would look broken to anyone who knows the city.
 *
 * Coordinates are the places themselves, not approximations of the
 * neighbourhood.
 *
 * Keyed by the guide's slug.
 */
export const guideStops = {
  '48-hours-in-lisbon-without-once-paying-for-the-tram': [
    {
      title: 'Miradouro da Graça',
      note: 'Start high and walk down, which is the whole trick to Lisbon on foot. The climb up from Martim Moniz is steep for about ten minutes and then you are looking at the castle, the river, and most of the Alfama at once. Free, and emptiest before nine.',
      lat: 38.716,
      lng: -9.132,
    },
    {
      title: 'Miradouro de Santa Luzia',
      note: 'The second viewpoint is fifteen minutes downhill through the Alfama, and the route matters more than the destination. Tram 28 grinds past every few minutes with a queue of people who paid for the privilege of seeing what you are already walking through.',
      lat: 38.7118,
      lng: -9.13,
    },
    {
      title: 'Praça do Comércio',
      note: 'The bottom of the hill, and where the walking pays off. Sit on the steps into the river with everyone else. There is no ticket for this and there never has been.',
      lat: 38.7075,
      lng: -9.1364,
    },
    {
      title: 'Time Out Market',
      note: 'Lunch, and the one place a budget can quietly go wrong. Order from the counters at the back rather than the names you recognise at the front, and the difference is about eight euros for the same quality.',
      lat: 38.7067,
      lng: -9.1459,
    },
    {
      title: 'Cacilhas ferry from Cais do Sodré',
      note: 'The cheapest boat in Europe and the best view of Lisbon there is. About one euro thirty each way, ten minutes across, and the return leg at sunset is the photograph everyone else queued an hour for at the castle.',
      lat: 38.706,
      lng: -9.1447,
    },
    {
      title: 'LX Factory',
      note: 'Day two, and worth the walk west along the river rather than the bus. A print works turned into bookshops and cheap food under the bridge. Sunday brings a market and roughly triple the people.',
      lat: 38.7027,
      lng: -9.1786,
    },
    {
      title: 'Torre de Belém',
      note: 'The end of the river walk, about forty minutes on from LX Factory. Skip the queue to go inside, which costs six euros to climb a narrow staircase, and eat a pastel de nata on the grass instead.',
      lat: 38.6916,
      lng: -9.216,
    },
  ],

  '24-hours-in-berlin-when-you-landed-at-six-in-the-morning': [
    {
      title: 'Tempelhofer Feld',
      note: 'A decommissioned airport you are allowed to walk on, open at sunrise, and the correct place to be at seven in the morning with no hotel check-in for six hours. Runways, kite surfers on bikes, and nobody asking anything of you.',
      lat: 52.473,
      lng: 13.403,
    },
    {
      title: 'Markthalle Neun',
      note: 'Coffee and a second breakfast once the city is properly awake. Weekdays it is a working market hall and quiet; Thursday evenings it turns into a street food night that is worth planning a whole day around.',
      lat: 52.502,
      lng: 13.431,
    },
    {
      title: 'Maybachufer, along the Landwehrkanal',
      note: 'Walk the canal rather than taking the U-Bahn between these two. Tuesday and Friday there is a market on the bank; the rest of the week it is just the best hour of walking in Kreuzberg.',
      lat: 52.493,
      lng: 13.427,
    },
    {
      title: 'East Side Gallery',
      note: 'The longest surviving stretch of the Wall, painted end to end. Go now rather than at midday, when it fills up. It is free, outdoors, and takes about half an hour at a reading pace.',
      lat: 52.505,
      lng: 13.439,
    },
    {
      title: 'Oberbaumbrücke',
      note: 'The bridge at the end of the gallery, and the crossing back north. Worth stopping in the middle of, which everybody does and nobody regrets.',
      lat: 52.5019,
      lng: 13.4456,
    },
    {
      title: 'Museum Island',
      note: 'If jet lag has you upright into the evening, Thursday nights run late at several of the museums here. If it does not, the island is worth walking around at dusk without going into anything at all.',
      lat: 52.5169,
      lng: 13.402,
    },
  ],

  '24-hours-in-marrakech-when-youre-traveling-alone': [
    {
      title: 'Jemaa el-Fnaa',
      note: 'Arrive in the late afternoon rather than at midday, and walk one full circuit before stopping anywhere. Prices are quoted per person and the first number is never the number. Solo, the edges are more comfortable than the middle.',
      lat: 31.6258,
      lng: -7.9891,
    },
    {
      title: 'Koutoubia Mosque',
      note: 'Five minutes west and immediately calmer. Non-Muslims cannot go inside, but the gardens around it are open, free, and the easiest place in the medina to sit alone without being spoken to.',
      lat: 31.6236,
      lng: -7.9934,
    },
    {
      title: 'Souk Semmarine',
      note: 'The main artery north out of the square. Going alone, agree the price before anything is wrapped, and be comfortable walking away twice. Getting lost here is expected and the souk is smaller than it feels.',
      lat: 31.6295,
      lng: -7.988,
    },
    {
      title: 'Le Jardin Secret',
      note: 'A restored riad garden in the middle of the medina, and the single best eighty dirhams for anyone travelling on their own. Two courtyards, shade, a tower worth the extra ticket, and nobody selling anything.',
      lat: 31.6318,
      lng: -7.989,
    },
    {
      title: 'Bahia Palace',
      note: 'Twenty minutes south through the Mellah. Go early or late; the courtyards are the point and they photograph badly with a crowd in them. Seventy dirhams.',
      lat: 31.6216,
      lng: -7.9832,
    },
    {
      title: 'Jardin Majorelle',
      note: 'Outside the medina walls and the one stop worth booking ahead, because the queue is genuinely an hour otherwise. Go at opening. About a thirty minute walk north, or take a petit taxi and insist on the meter.',
      lat: 31.6417,
      lng: -8.003,
    },
  ],

  '36-hours-in-washington-on-an-interns-budget': [
    {
      title: 'Lincoln Memorial',
      note: 'Start at the west end at seven in the morning, when it is empty and cool and the light is behind you down the reflecting pool. Free, like nearly everything on this list, which is the entire reason this city works on an intern stipend.',
      lat: 38.8893,
      lng: -77.0502,
    },
    {
      title: 'The National Mall',
      note: 'Walk it east rather than taking the Circulator. It is about two miles end to end and it is the only way the scale of the thing lands. Water fountains at every museum entrance; refill rather than buy.',
      lat: 38.8899,
      lng: -77.0231,
    },
    {
      title: 'National Gallery of Art',
      note: 'Free, air conditioned, and open when the afternoon becomes unbearable, which between June and August is most days. The East Building is the better one and almost always the quieter one.',
      lat: 38.8913,
      lng: -77.0199,
    },
    {
      title: 'Eastern Market',
      note: 'Lunch off the Mall, where the prices stop being tourist prices. Saturday and Sunday bring the outdoor stalls; the indoor hall runs Tuesday to Sunday and the blue buck pancakes are the thing.',
      lat: 38.8869,
      lng: -76.9958,
    },
    {
      title: 'Georgetown Waterfront Park',
      note: 'Day two, and the walk out along the C and O Canal towpath from Foggy Bottom is free and shaded most of the way. The park at the end is where the city goes to sit down.',
      lat: 38.9026,
      lng: -77.0653,
    },
    {
      title: 'Union Station',
      note: 'Worth ten minutes for the main hall even if you are not catching anything. If you are leaving by bus, the cheap ones go from the deck upstairs and the signage does not make that obvious.',
      lat: 38.8977,
      lng: -77.0064,
    },
  ],

  '36-hours-in-buenos-aires-and-an-exchange-rate-to-match': [
    {
      title: 'Plaza de Mayo',
      note: 'Start where the city argues with itself. The Casa Rosada is at one end, the cathedral at the other, and there is a decent chance of a demonstration in between, which is not a reason to leave.',
      lat: -34.6081,
      lng: -58.372,
    },
    {
      title: 'Café Tortoni',
      note: 'A hundred and sixty years old and genuinely worth the queue for one coffee. Bring cash. The gap between the official rate and the blue rate is the single biggest factor in what this trip costs you, and it is a cash gap.',
      lat: -34.6086,
      lng: -58.378,
    },
    {
      title: 'Feria de San Telmo',
      note: 'Sundays, along Defensa, and it runs for about a kilometre. Weekdays the neighbourhood is quieter and better. Either way this is where the exchange rate stops being an abstraction and starts being lunch for three dollars.',
      lat: -34.6208,
      lng: -58.3717,
    },
    {
      title: 'Caminito, La Boca',
      note: 'Go in daylight, stay on the painted streets, and know that it is a tourist block rather than a neighbourhood tour. It is still worth an hour. Take the 29 bus down rather than a taxi.',
      lat: -34.6395,
      lng: -58.3627,
    },
    {
      title: 'Recoleta Cemetery',
      note: 'Day two, north, and free to walk. It is a city of mausoleums on a grid with street names, and it takes as long as you let it.',
      lat: -34.5875,
      lng: -58.3934,
    },
    {
      title: 'El Ateneo Grand Splendid',
      note: 'A 1919 theatre turned into a bookshop, boxes and all, five minutes from the cemetery. You can sit in the stalls and read without buying anything, and plenty of people spend an afternoon doing exactly that.',
      lat: -34.5957,
      lng: -58.3936,
    },
  ],

  '72-hours-in-osaka-on-the-money-that-just-cleared': [
    {
      title: 'Dotonbori',
      note: 'Arrive at night, because that is the version of this street everybody means. It is loud, over-lit, and completely unembarrassed about it. Eat standing up and do not sit down anywhere with a picture menu outside.',
      lat: 34.6687,
      lng: 135.5013,
    },
    {
      title: 'Kuromon Ichiba Market',
      note: 'Morning of day two, and go hungry. Four hundred metres of covered market where most stalls will grill what you point at. Cash, and earlier is better; by noon it is mostly other tourists.',
      lat: 34.6653,
      lng: 135.5062,
    },
    {
      title: 'Shinsekai and Tsutenkaku',
      note: 'A neighbourhood built in 1912 to look like the future and never updated, which is now the entire appeal. Kushikatsu is the local dish and the no-double-dipping rule is not a joke.',
      lat: 34.6524,
      lng: 135.5063,
    },
    {
      title: 'Osaka Castle',
      note: 'Day three, and the park around it is free and the better half. The keep is a reconstruction with a lift inside; six hundred yen if you want the view, nothing at all if you want the moat and the plum grove.',
      lat: 34.6873,
      lng: 135.5259,
    },
    {
      title: 'Nakazakicho',
      note: 'Ten minutes from Umeda and about forty years away from it. Wooden houses that survived the war, now coffee shops and second-hand clothes. The one stop on this list with no queue for anything.',
      lat: 34.7069,
      lng: 135.504,
    },
    {
      title: 'Umeda Sky Building',
      note: 'Finish here. The escalator across the gap between the two towers is the part people remember, and the open-air deck at the top is worth the fifteen hundred yen at dusk rather than in daylight.',
      lat: 34.7052,
      lng: 135.4903,
    },
  ],
}
