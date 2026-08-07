import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineField, defineType} from 'sanity'

/**
 * A regional tag for Journeys → Places to go. Deliberately broad — the
 * client wants curiosity, not precision. See docs/content-model.md.
 */
export const place = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The region name, e.g. "Europe" or "Southeast Asia."',
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this region’s page under Journeys.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Tag color',
      type: 'string',
      description: 'The color this region’s tag renders in across the site. Matches the palette in via-design.md.',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Europe', value: 'europe'},
          {title: 'Asia', value: 'asia'},
          {title: 'Americas', value: 'americas'},
          {title: 'Africa', value: 'africa'},
          {title: 'Oceania', value: 'oceania'},
          {title: 'Middle East', value: 'mideast'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Shown at the top of this region’s archive page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
