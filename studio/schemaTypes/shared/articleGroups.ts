/**
 * Tab layout shared by `dispatch` and `signal` in the Studio form.
 * Matches the grouping specified in docs/content-model.md: editors think
 * in terms of "the words," "the pictures," "the tags," and "when/who."
 */
export const articleGroups = [
  {name: 'content', title: 'Content', default: true},
  {name: 'media', title: 'Media'},
  {name: 'tags', title: 'Tags'},
  {name: 'publishing', title: 'Publishing'},
]
