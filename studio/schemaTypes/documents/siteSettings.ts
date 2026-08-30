import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
    {name: 'engage', title: 'Engage page'},
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
      name: 'heroLines',
      title: 'Homepage hero lines',
      type: 'array',
      group: 'hero',
      of: [{type: 'string'}],
      description:
        'The lines that run over the homepage photo, in the order they should read down the page. The first one is set apart as the tagline; the rest read as one paragraph beneath it. Leave this empty to fall back to the mission statement below.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'homeIntro',
      title: 'Homepage introduction',
      type: 'array',
      group: 'hero',
      of: [{type: 'text', rows: 4}],
      description:
        'The paragraphs in the band below the homepage photo, one row per paragraph. Leave empty to hide the band entirely.',
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission statement',
      type: 'text',
      group: 'mission',
      rows: 4,
      description:
        'One or two sentences describing VIA. Used for search results and link previews, and shown over the homepage photo if the hero lines above are empty.',
    }),
    defineField({
      name: 'founderQuote',
      title: 'Founder quote',
      type: 'text',
      group: 'mission',
      rows: 6,
      description:
        'The pull quote at the top of the About page. Type it without quotation marks — the page draws those.',
    }),
    defineField({
      name: 'founderAttribution',
      title: 'Founder quote attribution',
      type: 'string',
      group: 'mission',
      description: 'Who said it, and their role. For example: "Nhan Phan, Founder".',
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

    /*
      The Engage page. The three forms on it open the reader's email app with
      the fields already filled in, so what the page needs from here is the
      address each one sends to — change an address here and the form follows,
      with no code change.
    */
    defineField({
      name: 'contributeEmail',
      title: 'Submissions address',
      type: 'string',
      group: 'engage',
      description: 'Where the "Write for VIA" form sends a submission. An email address, e.g. submissions@voicesinadventure.com.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'connectEmail',
      title: 'Contact address',
      type: 'string',
      group: 'engage',
      description: 'Where the "Connect with VIA" form sends a message, including site ratings.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'joinEmail',
      title: 'Applications address',
      type: 'string',
      group: 'engage',
      description: 'Where an application from "Join VIA" is sent, when no application form URL is set below.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contributorPacketUrl',
      title: 'Contributor packet URL',
      type: 'url',
      group: 'engage',
      description: 'The contributor packet the button on Engage opens. Upload the PDF somewhere it can be linked to, then paste the link here. Leave empty and the button is hidden.',
    }),
    defineField({
      name: 'applicationFormUrl',
      title: 'Application form URL',
      type: 'url',
      group: 'engage',
      description: 'The questionnaire people applying to join fill in — a Google Form works. Leave empty and the page falls back to the applications address above.',
    }),
    defineField({
      name: 'openRoles',
      title: 'Open roles',
      type: 'array',
      group: 'engage',
      description: 'The roles shown on Engage. Each one opens to show its description when a reader hovers or taps it. Remove a role when it is filled.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'openRole',
          fields: [
            defineField({
              name: 'title',
              title: 'Role',
              type: 'string',
              description: 'e.g. "Travel writers."',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'What the role involves',
              type: 'text',
              rows: 3,
              description: 'A sentence or two, shown when the role is opened.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
