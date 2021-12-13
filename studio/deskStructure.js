import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { TopicDocuments, NewsDocuments, MenuIcon } from './icons'
import GreatBritain from './icons/GreatBritain'
import Norway from './icons/Norway'
import NewsPreview from './src/previews/news/NewsPreview'
import PagePreview from './src/previews/page/PagePreview'
import parentChild from './src/structure/parentChild'
import * as I18nS from 'sanity-plugin-intl-input/lib/structure'
import { i18n } from './schemas/documentTranslation'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { languages } from './schemas/languages'
// import Iframe from 'sanity-plugin-iframe-pane'

// import resolveProductionUrl from './resolveProductionUrl'

const menus = languages.map((lang) =>
  S.listItem({
    title: `${lang.title} menu`,
    id: `${lang.name}-menu`,
    child: () =>
      S.documentWithInitialValueTemplate('menu-with-locale', { isoCode: `${lang.name}` })
        .title(`${lang.title}site menu`)
        .views([S.view.form()]),
  }),
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [
    S.listItem()
      .title('News')
      .icon(NewsDocuments)
      .schemaType('news')
      .child(
        S.documentTypeList('news')
          .id('news')
          .title('News articles')
          .filter('_type == "news" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'news'
          }),
      ),
    S.listItem()
      .title('Topic content')
      .icon(TopicDocuments)
      .schemaType('page')
      .child(
        S.documentTypeList('page')
          .id('pages')
          .title('Topic content')
          .filter('_type == "page" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'page'
          }),
      ),
    S.listItem()
      .title('Landing page')
      .icon(TopicDocuments)
      .schemaType('landingPage')
      .child(
        S.documentTypeList('landingPage')
          .id('landingPages')
          .title('Landing page')
          .filter('_type == "landingPage" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'landingPage'
          }),
      ),
    S.listItem()
      .title('Event')
      .icon(TopicDocuments)
      .schemaType('event')
      .child(
        S.documentTypeList('event')
          .id('events')
          .title('Events')
          .filter('_type == "event" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'event'
          }),
      ),
    S.divider(),
    parentChild('route'),
    S.divider(),
    S.listItem().title('Menu').icon(MenuIcon).child(S.list('menu').id('menu').title('Menus').items(menus)),
    S.divider(),
    S.listItem()
      .title('Footer')
      .child(
        S.list('footer')
          .id('footer')
          .title('Footers')
          .items([
            S.listItem({
              title: 'English footer',
              id: 'footer-english',
              icon: GreatBritain,
              child: () =>
                S.documentWithInitialValueTemplate('footer-with-locale', { isoCode: 'en_GB' })
                  .id('english-footer')
                  .title('English footer')
                  .views([S.view.form()]),
            }),
            S.listItem({
              title: 'Norwegian footer',
              id: 'footer-norwegian',
              icon: Norway,
              child: () =>
                S.documentWithInitialValueTemplate('footer-with-locale', { isoCode: 'nb_NO' })
                  .title('Norwegian footer')
                  .id('norwegian-footer')
                  .views([S.view.form()]),
            }),
          ]),
      ),
    S.divider(),
    S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag').title('Tags')),
    S.listItem()
      .title('Country tags')
      .schemaType('countryTag')
      .child(S.documentTypeList('countryTag').title('Country tag')),
  ]

  return S.list().title('Content').items(listItems)
}

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props
  if (schemaType === 'news') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(NewsPreview).title('News preview'),
    ])
  } else if (schemaType === 'landingPage') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
    ])
  } else if (schemaType === 'event') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (schemaType === 'page') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      /* S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title('Preview'), */
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  }

  return S.document().views([S.view.form()])
}
