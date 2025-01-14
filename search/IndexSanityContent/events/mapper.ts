import { Event } from './sanity'
import { EventIndex } from './algolia'

type MapDataType = (event: Event) => EventIndex
export const mapData: MapDataType = (event) => ({
  ...event.content,
  slug: event.slug,
  objectID: event._id,
  type: 'event',
})
