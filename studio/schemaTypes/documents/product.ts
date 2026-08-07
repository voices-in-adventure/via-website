import {PackageIcon} from '@sanity/icons/Package'
import {defineField, defineType} from 'sanity'

/**
 * A gear, app, service, or booking mentioned inside an article. Its own
 * document type — not a tag — specifically so the Resources page can show
 * a description, image, and link, and so multiple articles can point at
 * the same record. See "The principle" in docs/content-model.md.
 */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'What it’s called.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this product’s entry on the Resources page.',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'What kind of thing is this? Sorts it on the Resources page.',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Gear', value: 'gear'},
          {title: 'App', value: 'app'},
          {title: 'Service', value: 'service'},
          {title: 'Booking', value: 'booking'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences — what it is and why it’s useful.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A product photo or logo.',
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'Where the "learn more" link on the Resources page should go.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
