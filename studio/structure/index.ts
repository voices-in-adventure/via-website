import {CogIcon} from '@sanity/icons/Cog'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureResolver} from 'sanity/structure'

/**
 * Desk structure per docs/content-model.md: Dispatches and Signals sit at
 * the top level since editors publish those every day. Products, Authors,
 * and Tags (Places/Reasons) are supporting records, grouped below.
 * Site Settings is a singleton, locked to one document via `documentId`.
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
