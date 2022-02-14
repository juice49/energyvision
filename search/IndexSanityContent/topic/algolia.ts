import { Settings } from '@algolia/client-search'

export type TopicIndex = {
  slug: string
  objectID: string
  type: string
  title: string
  ingress: string
  text: string
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress', 'text'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}