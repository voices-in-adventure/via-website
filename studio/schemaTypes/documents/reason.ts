import {HeartIcon} from '@sanity/icons/Heart'
import {defineField, defineType} from 'sanity'

/**
 * A thematic tag for Journeys → Reasons to go. Catchy and SEO-oriented:
 * "for the plot," "stipend just dropped." Same shape as `place`, minus
 * the color field. See docs/content-model.md.
 */
export const reason = defineType({
  name: 'reason',
  title: 'Reason',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The reason, in the reader’s voice, e.g. "for the plot" or "table for one."',
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this reason’s page under Journeys.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Shown at the top of this reason’s archive page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
