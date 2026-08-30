import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

/**
 * A VIA writer or editor. Powers both article bylines and the About page
 * team grid. See docs/content-model.md.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this person’s author page.',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'How they’re credited, e.g. "Staff Writer" or "Managing Editor."',
    }),
    defineField({
      name: 'hometown',
      title: 'Hometown',
      type: 'string',
      description: 'Where they’re from. Shown on the About page, e.g. "Ho Chi Minh City."',
    }),
    defineField({
      name: 'travelMustHave',
      title: 'Travel must-have',
      type: 'string',
      description:
        'The one thing they never travel without. Shown on the About page — keep it to a few words, e.g. "A fully charged power bank."',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      description: 'A short bio for the About page team grid.',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      description: 'Crop the focal point after upload.',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'headshot',
    },
  },
})
