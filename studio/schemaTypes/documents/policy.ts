import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

/**
 * One section of VIA's Standards and Ethics, published at /standards.
 *
 * Six of these exist, transcribed from the client's Code of Ethics. They are
 * a slow-moving reference document rather than something editors publish
 * against, which is why they sit with the supporting records in the desk
 * rather than beside Dispatches. See docs/content-model.md.
 */
export const policy = defineType({
  name: 'policy',
  title: 'Standards & Ethics section',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The section name, e.g. "Editorial Integrity and Accuracy." Used as the link text on the About page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this section, under /standards.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Where this section falls in the sequence, from 1. The six sections read as one document, so this is also the order of the previous and next links.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences, shown beneath the link on the About page and on the Standards index. Not shown on the section’s own page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The full text of the section.',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Section order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      order: 'order',
    },
    prepare: ({title, subtitle, order}) => ({
      title: order ? `${order}. ${title}` : title,
      subtitle,
    }),
  },
})
