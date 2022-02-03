import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient } from "../../common"
import { mapData, fetchData } from '../sanity'

const indexName = 'EVENTS'

const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event"] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title),
    "ingress": pt::text(ingress)
  }
}
`
const queryParams = { lang: 'en_GB' }

const indexSettings = {
  searchableAttributes: ['title', 'ingress'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}

const updateAlgolia = update(indexName)(indexSettings)

export const indexEvents = pipe(
  fetchData(query)(queryParams)(sanityClient), // TODO: Make these parameters to make this function reusable
  TE.map((events) => events.map(mapData)),
  TE.chain(updateAlgolia),
  T.map(E.fold(console.error, console.log)),
)