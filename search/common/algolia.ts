import algoliasearch, { SearchIndex } from 'algoliasearch'
import { Settings } from '@algolia/client-search'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { GetProcessEnvType } from './types'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

const getAlgoliaAppId: GetProcessEnvType = () => E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
const getAlgoliaApiKey: GetProcessEnvType = () => E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)

// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = (indexName: string) => E.Either<string, SearchIndex>
const init: InitType = (indexName) =>
  pipe(
    getAlgoliaAppId(),
    E.map(algoliaSearchCurried),
    E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
    E.map((client) => client.initIndex(indexName)),
  )

// Push to Algolia index
type UpdateIndexType = (
  data: readonly Readonly<Record<string, string>>[],
) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
const updateIndex: UpdateIndexType = (data) => (index) =>
  pipe(
    TE.tryCatch(() => index.saveObjects(data), E.toError),
    //TE.map((response) => `Number of objects updated: ${response.objectIDs.length}`),
    TE.map(() => index),
  )

type UpdateSettingsType = (settings: Settings) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
export const updateSettings: UpdateSettingsType = (settings) => (index) =>
  pipe(
    TE.tryCatch(() => index.setSettings(settings), E.toError),
    TE.map(() => index),
  )

type UpdateType = (
  indexName: string,
) => (
  indexSettings: Settings,
) => (mappedData: Readonly<Record<string, string>>[]) => TE.TaskEither<string | Error, string>
export const update: UpdateType =
  (indexName) => (indexSettings) => (mappedData: Readonly<Record<string, string>>[]) =>
    pipe(
      init(indexName),
      TE.fromEither,
      TE.chainW(updateIndex(mappedData)),
      TE.chainW(updateSettings(indexSettings)),
      TE.map(() => 'Halleluja'),
    )