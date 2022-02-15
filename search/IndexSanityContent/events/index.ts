import { flow, pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { ap } from 'fp-ts/lib/Identity'
import * as TE from 'fp-ts/lib/TaskEither'
import {
  update,
  sanityClient,
  generateIndexName,
  getEnvironment,
  languageFromIso,
  languageOrDefault,
} from '../../common'
import { fetchData } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'

const indexIdentifier = 'EVENTS'
// TODO: From where to get language?
const language = pipe(languageFromIso('en-GB'), languageOrDefault)

const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
//const updateAlgolia = flow(indexName, E.map(update(indexSettings)))
const updateAlgolia = pipe(indexName(), TE.fromEither, TE.chain(update(indexSettings)))

export const indexEvents = pipe(
  fetchData(sanityClient)(language),
  TE.map((events) => events.map(mapData)),
  //T.map(E.map((indexes) => pipe(updateAlgolia(), E.map((f) => f(indexes))))),

  //T.map((c) => E.flattenW(c)),

  //T.map(E.fold(console.error, console.log)),
)
