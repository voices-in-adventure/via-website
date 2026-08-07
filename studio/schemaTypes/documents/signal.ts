import {BoltIcon} from '@sanity/icons/Bolt'
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
 * Short-form industry news, 150–500 words. Shares its shape with `dispatch`
 * minus the format/duration/city fields, plus two fields the editorial
 * standards require: a news peg and a freshness date. See
 * docs/content-model.md.
 */
export const signal = defineType({
  name: 'signal',
  title: 'Signal',
  type: 'document',
  icon: BoltIcon,
  groups: articleGroups,
  fields: [
    titleField(),
    slugField(),
    dekField(),
    defineField({
      name: 'newsPeg',
      title: 'News peg',
      type: 'text',
      rows: 2,
      group: 'content',
      description:
        'The specific development this piece is grounded in — what just happened that makes this news. Required by the editorial standards.',
      validation: (rule) => rule.required(),
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
      name: 'informationAsOf',
      title: 'Information as of',
      type: 'date',
      group: 'publishing',
      description:
        'The date the prices, visa rules, or entry requirements in this piece were last verified. Travel information goes stale fast — this date is shown on the article page so readers know how current it is.',
      validation: (rule) => rule.required(),
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
