import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
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
 * `format: 'guide'` doubles as the itinerary type — Journeys' itineraries
 * page is just dispatches filtered on format. Do not add a separate
 * itinerary document type; that ambiguity is exactly what content-model.md
 * warns against.
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
