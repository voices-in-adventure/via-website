import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {defineArrayMember} from 'sanity'
import {articleGroups} from '../shared/articleGroups'
import {
  authorField,
  bodyField,
  dekField,
  featuredField,
  heroCaptionField,
  heroImageField,
  placesField,
  productsField,
  publishedAtField,
  reasonsField,
  slugField,
  titleField,
} from '../shared/articleFields'

/**
 * Long-form article, 1,000–1,500 words. See docs/content-model.md.
 *
 * `format: 'guide'` doubles as the itinerary type — Journeys' guides are just
 * dispatches filtered on format. Do not add a separate itinerary document
 * type; that ambiguity is exactly what content-model.md warns against.
 *
 * Guides are presented as their own thing: they live at /journeys/guides/,
 * they are left out of the Dispatches stream on Stories, and they render
 * with an itinerary and a map instead of a plain article body. All of that
 * is routing and presentation — one field still decides it, and an editor
 * changing `format` moves the piece without anything else to remember.
 */
export const dispatch = defineType({
  name: 'dispatch',
  title: 'Dispatch',
  type: 'document',
  icon: DocumentTextIcon,
  groups: articleGroups,
  fields: [
    titleField(),
    slugField(),
    dekField(),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      group: 'content',
      description:
        'What kind of piece is this? A Destination Guide is also how this piece appears on Journeys → Itineraries.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Destination Guide', value: 'guide'},
          {title: 'Feature', value: 'feature'},
          {title: 'Essay', value: 'essay'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Guide length',
      type: 'number',
      group: 'content',
      description: 'How many hours does this itinerary cover?',
      options: {
        list: [
          {title: '24 hours', value: 24},
          {title: '36 hours', value: 36},
          {title: '48 hours', value: 48},
          {title: '72 hours', value: 72},
        ],
      },
      hidden: ({parent}) => parent?.format !== 'guide',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {format?: string} | undefined
          if (parent?.format === 'guide' && !value) {
            return 'Pick a length for the itinerary.'
          }
          return true
        }),
    }),
    defineField({
      name: 'stops',
      title: 'Itinerary stops',
      type: 'array',
      group: 'content',
      description:
        'The places this guide sends people, in the order they should visit them. Each one drops a numbered pin on the map beside the guide, and the map follows the reader down the page. Only Destination Guides use this.',
      hidden: ({parent}) => parent?.format !== 'guide',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stop',
          fields: [
            defineField({
              name: 'title',
              title: 'Name',
              type: 'string',
              description: 'What this place is called, e.g. "Miradouro da Graça."',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'note',
              title: 'What to do here',
              type: 'text',
              rows: 4,
              description:
                'A short paragraph: what it is, why go, what it costs. This is the guide’s actual writing.',
            }),
            defineField({
              name: 'lat',
              title: 'Latitude',
              type: 'number',
              description:
                'Find the place on Google Maps, right-click the pin, and click the pair of numbers at the top. The first number is the latitude.',
              validation: (rule) => rule.required().min(-90).max(90),
            }),
            defineField({
              name: 'lng',
              title: 'Longitude',
              type: 'number',
              description: 'The second of the two numbers Google Maps copies.',
              validation: (rule) => rule.required().min(-180).max(180),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'note'},
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {format?: string} | undefined
          if (parent?.format === 'guide' && (!value || value.length === 0)) {
            return 'A Destination Guide needs at least one stop — that is what puts it on the map.'
          }
          return true
        }),
    }),
    bodyField(),
    heroImageField(),
    heroCaptionField(),
    placesField(),
    reasonsField(),
    productsField(),
    authorField(),
    publishedAtField(),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'publishing',
      description:
        'The single place this piece is about, e.g. "Lisbon." Feeds the homepage world-clock ticker — leave it blank if the piece is not tied to one city.',
    }),
    featuredField(),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dek',
      media: 'heroImage',
    },
  },
})
