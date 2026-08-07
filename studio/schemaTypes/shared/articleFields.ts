import {defineArrayMember, defineField} from 'sanity'

/**
 * Field definitions shared between `dispatch` and `signal`. Both are
 * articles first and differ only in length and a handful of metadata
 * fields — see docs/content-model.md. Written as functions (not shared
 * object references) so each document type gets its own field instance.
 */

export const titleField = () =>
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    group: 'content',
    description: 'The headline as it will run.',
    validation: (rule) => rule.required(),
  })

export const slugField = () =>
  defineField({
    name: 'slug',
    title: 'URL slug',
    type: 'slug',
    group: 'content',
    description: 'The web address for this piece. Generate it from the title, then leave it alone.',
    options: {source: 'title', maxLength: 96},
    validation: (rule) => rule.required(),
  })

export const dekField = () =>
  defineField({
    name: 'dek',
    title: 'Dek',
    type: 'text',
    rows: 2,
    group: 'content',
    description:
      'One sentence that sums up the piece. Runs under the headline and doubles as the card summary on Stories and Journeys.',
    validation: (rule) => rule.required(),
  })

export const heroImageField = () =>
  defineField({
    name: 'heroImage',
    title: 'Hero image',
    type: 'image',
    group: 'media',
    description: 'The big photo at the top of the article. Crop the focal point after upload.',
    options: {hotspot: true},
    validation: (rule) => rule.required(),
  })

export const heroCaptionField = () =>
  defineField({
    name: 'heroCaption',
    title: 'Hero caption',
    type: 'string',
    group: 'media',
    description: 'Credit or context for the hero photo. Leave blank if none.',
  })

export const authorField = () =>
  defineField({
    name: 'author',
    title: 'Author',
    type: 'reference',
    to: [{type: 'author'}],
    group: 'publishing',
    description: 'Who wrote this.',
    validation: (rule) => rule.required(),
  })

export const publishedAtField = () =>
  defineField({
    name: 'publishedAt',
    title: 'Published date',
    type: 'datetime',
    group: 'publishing',
    description: 'When this goes live. Controls sort order on Stories and Journeys.',
    validation: (rule) => rule.required(),
  })

export const featuredField = () =>
  defineField({
    name: 'featured',
    title: 'Featured on homepage',
    type: 'boolean',
    group: 'publishing',
    description: 'Turn this on to surface the piece on the homepage. Keep it to a handful at a time.',
    initialValue: false,
  })

export const placesField = () =>
  defineField({
    name: 'places',
    title: 'Places',
    type: 'array',
    group: 'tags',
    description: 'Which regions does this piece cover? Pick all that apply — this drives the Journeys → Places to go page.',
    of: [defineArrayMember({type: 'reference', to: [{type: 'place'}]})],
    validation: (rule) => rule.required().min(1),
  })

export const reasonsField = () =>
  defineField({
    name: 'reasons',
    title: 'Reasons',
    type: 'array',
    group: 'tags',
    description:
      'Which "reasons to go" fit this piece? Optional — this drives the Journeys → Reasons to go page.',
    of: [defineArrayMember({type: 'reference', to: [{type: 'reason'}]})],
  })

export const productsField = () =>
  defineField({
    name: 'products',
    title: 'Products mentioned',
    type: 'array',
    group: 'tags',
    description:
      'Any gear, apps, or services mentioned in this piece. Link them here so they show up on the Resources page — do not just name-drop them in the text.',
    of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
  })

export const bodyField = () =>
  defineField({
    name: 'body',
    title: 'Body',
    type: 'blockContent',
    group: 'content',
    description: 'The article text.',
    validation: (rule) => rule.required(),
  })
