import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

/**
 * Singleton. Homepage hero media, mission statement, social links, and the
 * two newsletter subscribe URLs. Locked to a single document via desk
 * structure (see studio/structure/index.ts) — there is only ever one.
 * See docs/content-model.md.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'hero', title: 'Homepage hero', default: true},
    {name: 'mission', title: 'Mission'},
    {name: 'social', title: 'Social & subscribe'},
  ],
  fields: [
    defineField({
      name: 'heroType',
      title: 'Hero type',
      type: 'string',
      group: 'hero',
      description: 'Is the homepage hero a photo or a video?',
      options: {
        layout: 'radio',
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      description: 'The full-bleed homepage photo. Crop the focal point after upload.',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.heroType !== 'image',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero video URL',
      type: 'url',
      group: 'hero',
      description:
        'A link to the hosted video (e.g. YouTube or Vimeo) to play in the homepage hero. Video is not uploaded directly to Sanity.',
      hidden: ({parent}) => parent?.heroType !== 'video',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission statement',
      type: 'text',
      group: 'mission',
      rows: 4,
      description: 'The statement that runs over the homepage hero. Keep it to a sentence or two.',
    }),
    defineField({
      name: 'aboutMission',
      title: 'Extended mission',
      type: 'blockContent',
      group: 'mission',
      description:
        'The longer mission, shown at the top of the About page. The short statement above is what appears over the homepage photo. If you leave this empty, About falls back to that short statement.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'social',
      description: 'Links shown in the site footer and About page. Add one row per platform.',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'X / Twitter', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'dispatchSubscribeUrl',
      title: 'Dispatch subscribe URL',
      type: 'url',
      group: 'social',
      description: 'Where the "Subscribe to Dispatches" link on Stories should go.',
    }),
    defineField({
      name: 'signalsSubscribeUrl',
      title: 'Signals subscribe URL',
      type: 'url',
      group: 'social',
      description: 'Where the "Subscribe to Signals" link on Stories should go.',
    }),
    defineField({
      name: 'pitchUsUrl',
      title: 'Pitch us URL',
      type: 'url',
      group: 'social',
      description:
        'Where the "Pitch us" link in the site footer should go — a form, or a mailto: link.',
    }),
    defineField({
      name: 'feedbackUrl',
      title: 'Community feedback URL',
      type: 'url',
      group: 'social',
      description:
        'Where the community feedback link in the site footer should go — a form, or a mailto: link.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
