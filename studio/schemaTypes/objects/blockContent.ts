import {defineArrayMember, defineType} from 'sanity'

/**
 * Article body copy. Used by both `dispatch` and `signal`.
 *
 * Kept deliberately plain: paragraphs, two heading levels, quotes, lists,
 * bold/italic/links, and full-width inline photos. Nothing that gives an
 * editor a way to hand-build layout the way a page-builder field would —
 * this site's photography and hierarchy come from the article template,
 * not from choices made inside the text.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bulleted list', value: 'bullet'},
        {title: 'Numbered list', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: () => '🔗',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({scheme: ['http', 'https', 'mailto']}),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'In-body photo',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Shown under the photo. Leave blank for none.',
        },
      ],
    }),
  ],
})
