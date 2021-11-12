import pageContentFields from './common/pageContentFields'

// Or "topLevelGroups": group[reference._ref == ^.^._id]
const landingPageContentFields = /* groq */ `
  "ingress": content->ingress,
  "id": _id,

  "groupsWithReference": *[_type == "siteMenu" && references(^._id)]{

    "topLevelGroups": group[reference->.slug.current match $slug]{
      "topicPageGroups": group,
    }
 }[0]
`
const localizedSlugsFromEnglish = /* groq */ `
  "allSlugs": {
    "en_GB": slug.current,
    "nb_NO": *[_type == "route_nb_NO" && content._ref == ^.content._ref + "__i18n_nb_NO"][0].slug.current,
  }
`

const localizedSlugsFromNorwegian = /* groq */ `
  "allSlugs": {
    "en_GB": *[_type == "route_en_GB" && content._ref + "__i18n_nb_NO" == ^.content._ref][0].slug.current,
    "nb_NO": slug.current,
  }
`

export const pageQuery = /* groq */ ` 
  *[_type == "route_" + $lang && slug.current == $slug][0] {
    "slug": slug.current,
    $lang == "en_GB" => {
      ${localizedSlugsFromEnglish}
    },
    $lang == "nb_NO" => {
      ${localizedSlugsFromNorwegian}
    },
    "title": content->title,
    "seoAndSome": content->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content->heroFigure,
    "template": content->_type,
     content->_type == "landingPage"=>{
        ${landingPageContentFields}
    },
    content->_type == "page"=>{
      "content": content->content[]{
          ${pageContentFields}
      },
    },
  }
`
