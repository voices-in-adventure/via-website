/**
 * Copy and settings for the Engage page.
 *
 * Transcribed from the client's "VIA Website Text Edits" document, except
 * where noted. Written into Sanity by scripts/seed-engage.mjs.
 *
 * The prose on the page itself lives in src/pages/engage.astro, the same way
 * every other page's standfirsts do. What is here is only the part editors
 * need to change without a developer: where the forms send, what the buttons
 * link to, and which roles are open.
 */

/*
 * ⚠️ PLACEHOLDER ADDRESSES. The client has not supplied real ones, and the
 * domain is inferred from voicesinadventure.com. Confirm these before launch
 * — every form on Engage opens a mail client addressed to one of them.
 */
export const addresses = {
  contributeEmail: 'submissions@voicesinadventure.com',
  connectEmail: 'hello@voicesinadventure.com',
  joinEmail: 'join@voicesinadventure.com',
}

/*
 * ⚠️ Not supplied either. The contributor packet is a real document the
 * client refers to ("Our contributor package outlines everything you need to
 * know before submitting") but has not sent. Left empty on purpose: the page
 * hides the button rather than linking to a file that does not exist.
 */
export const contributorPacketUrl = null
export const applicationFormUrl = null

/*
 * The client listed the five roles but no descriptions ("In floating bubbles:
 * Travel writers, editors, social media producers, web designers, artists").
 * The descriptions below are written from what VIA actually publishes, so the
 * review build reads as the real thing — they are the first thing the client
 * should rewrite in Studio.
 */
export const openRoles = [
  {
    title: 'Travel writers',
    description:
      'Dispatches and Destination Guides from places you have actually been. You bring the trip and the honesty about what it cost; we bring the editing.',
  },
  {
    title: 'Editors',
    description:
      'Work with contributors from pitch to publication — line editing, checking claims against our standards, and helping a first-time writer sound like themselves.',
  },
  {
    title: 'Social media producers',
    description:
      'Turn published work into something that travels. You decide what a guide looks like when it leaves the site.',
  },
  {
    title: 'Web designers',
    description:
      'The site itself: how a story is read, how a region is chosen, and how someone finds the one piece they came for.',
  },
  {
    title: 'Artists',
    description:
      'Illustration, photography, and maps for stories that photographs alone cannot carry.',
  },
]
