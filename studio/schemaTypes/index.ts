import {blockContent} from './objects/blockContent'
import {author} from './documents/author'
import {dispatch} from './documents/dispatch'
import {place} from './documents/place'
import {policy} from './documents/policy'
import {product} from './documents/product'
import {reason} from './documents/reason'
import {signal} from './documents/signal'
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [
  // Documents
  dispatch,
  signal,
  product,
  author,
  place,
  reason,
  policy,
  siteSettings,
  // Objects
  blockContent,
]
