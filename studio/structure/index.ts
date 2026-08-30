import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureResolver} from 'sanity/structure'

/**
 * Desk structure per docs/content-model.md: Dispatches and Signals sit at
 * the top level since editors publish those every day. Products, Authors,
 * and Tags (Places/Reasons) are supporting records, grouped below.
 * Site Settings is a singleton, locked to one document via `documentId`.
 * Standards & Ethics sits with them and is listed in section order, not by
 * title, because the six sections read as one document.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('VIA')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),

      S.divider(),

      S.documentTypeListItem('dispatch').title('Dispatches'),
      S.documentTypeListItem('signal').title('Signals'),

      S.divider(),

      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('author').title('Authors'),

      S.listItem()
        .title('Standards & Ethics')
        .icon(BookIcon)
        .child(
          S.documentTypeList('policy')
            .title('Standards & Ethics')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Tags')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Tags')
            .items([
              S.documentTypeListItem('place').title('Places'),
              S.documentTypeListItem('reason').title('Reasons'),
            ]),
        ),
    ])
