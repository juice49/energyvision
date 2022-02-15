import { flow, pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient, generateIndexName, getEnvironment, languageFromIso, languageOrDefault } from '../../common'
import { fetchData } from './sanity'
import { indexSettings } from './algolia'
import { mapData } from './mapper'

const indexIdentifier = 'TOPICS'
// TODO: From where to get language?
const language = pipe(languageFromIso('en-GB'), languageOrDefault)

// TODO: Make lazy
const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
// TODO: Fail if no proper name instead
//const updateAlgolia = update(E.getOrElse(() => indexIdentifier)(indexName()))(indexSettings)
const updateAlgolia = flow(indexName, E.map(update(indexSettings)))

export const indexTopic = pipe(
  fetchData(sanityClient)(language),
  TE.map((pages) => pipe(pages.map(mapData), flatten)),
  T.map(E.map((indexes) => pipe(updateAlgolia(), E.map((f) => f(indexes))))),
  T.map(E.fold(console.error, console.log)),
)
