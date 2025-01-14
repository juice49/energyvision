import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
import { Heading, FormattedDateTime } from '@components'
import styled from 'styled-components'
import NewsBlockContent from '../../common/NewsBlockContent'
import HeroImage from '../../pageComponents/shared/HeroImage'
import Lead from '../../pageComponents/shared/Lead'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import LatestNews from '../../pageComponents/news/LatestNews'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import type { CardData, NewsSchema } from '../../types/types'
import BasicIFrame from '../../pageComponents/shared/iframe/BasicIFrame'
import { getFullUrl } from '../../common/helpers/getFullUrl'

const NewsLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);

  /*  @TODO: Revisit when finalizing news article */
  & h2,
  & h3 {
    margin: var(--space-small) 0;
  }
`

const Header = styled.div`
  background: var(--slate-blue-95);
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium);
`

const HeaderInner = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(Heading)`
  margin: 0;
`

const DateWrapper = styled.div`
  color: var(--white-100);
  margin-top: var(--space-xxLarge);
  margin-bottom: var(--space-xxLarge);
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: var(--space-small);
`

const DateContainer = styled.div`
  overflow-wrap: break-word;
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-3);
`

const LastModifiedLabel = styled.span`
  margin: 0 var(--space-small);
  text-transform: uppercase;
  &:after {
    content: ':';
  }
  &:before {
    content: '|';
    margin-right: var(--space-small);
  }
`

const Image = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--banner-paddingVertical) * -1);
  & > figure {
    margin: 0;
  }
`

const LeadParagraph = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  margin-top: var(--space-xLarge);
  margin-bottom: var(--space-3xLarge);

  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /* Side effect of change yesterday :/ */
  & > p {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  /* The max-width makes things easier with 50% floating images */
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /** Remove the bottom margin of the last element inside the rich text editor/content
  Sanity add a div container for the rich text editor */
  > div > aside:last-child,
  > div > div:last-child {
    margin-bottom: 0;
    p:last-child {
      margin-bottom: 0;
    }
  }
  &:after {
    content: '.';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  /*   Clear floats if two left or right aligned images are adjacent siblings
 */
  .float-left + .float-left,
  .float-right + .float-right {
    clear: both;
  }
`

const Related = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

const Latest = styled.div`
  padding: 0 var(--space-medium);
  margin: var(--space-4xLarge) auto;
  max-width: 1700px;
`

const StyledBasicIFrame = styled(BasicIFrame)`
  margin-top: var(--space-3xLarge);
`

const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}

type ArticleProps = {
  data: {
    news: NewsSchema
    latestNews: CardData[]
  }
}

const NewsPage = ({ data }: ArticleProps) => {
  const router = useRouter()
  /*  const appInsights = useAppInsightsContext() */
  const slug = data?.news?.slug

  // @TODO: Since data can be undefined, the rules of hooks fails. Why is data undefined
  // Temp. disable the preview hook due to serious performance issues
  /*   const {
    data: { news, latestNews },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePreviewSubscription(newsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview || router.query.preview !== null,
  }) */
  const newsData = data.news
  const { latestNews } = data
  const { pathname } = router

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrl = getFullUrl(pathname, slug)

  const {
    publishDateTime,
    updatedAt,
    documentTitle,
    title,
    metaDescription,
    openGraphImage,
    heroImage,
    ingress,
    content,
    iframe,
    relatedLinks,
  } = newsData

  const modifiedDate = isDateAfter(publishDateTime, updatedAt) ? publishDateTime : updatedAt

  /*   appInsights.trackPageView({ name: slug, uri: fullUrl }) */
  return (
    <>
      <NextSeo
        title={documentTitle || title}
        description={metaDescription}
        openGraph={{
          title: title,
          description: metaDescription,
          type: 'article',
          article: {
            publishedTime: publishDateTime,
            modifiedTime: modifiedDate,
          },
          url: fullUrl,
          images: getOpenGraphImages((openGraphImage?.asset ? openGraphImage : null) || heroImage?.image),
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      ></NextSeo>

      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <main>
          <article>
            <NewsLayout>
              <Header>
                <HeaderInner>
                  <StyledHeading level="h1" size="2xl" inverted>
                    {title}
                  </StyledHeading>
                  <DateWrapper>
                    <Icon data={calendar} />
                    <DateContainer>
                      <FormattedDateTime uppercase datetime={publishDateTime} />
                      {isDateAfter(modifiedDate, publishDateTime) && (
                        <>
                          <LastModifiedLabel>Last modified</LastModifiedLabel>
                          <FormattedDateTime uppercase datetime={modifiedDate} />
                        </>
                      )}
                    </DateContainer>
                  </DateWrapper>
                </HeaderInner>
              </Header>
              <Image>{heroImage && <HeroImage data={heroImage} />}</Image>
              {ingress && (
                <LeadParagraph>
                  <Lead blocks={ingress} />
                </LeadParagraph>
              )}
              {content && (
                <Content>
                  <NewsBlockContent blocks={content}></NewsBlockContent>
                </Content>
              )}

              {iframe && <StyledBasicIFrame data={iframe} />}

              {relatedLinks?.links && relatedLinks.links.length > 0 && (
                <Related>
                  <RelatedContent data={relatedLinks} />
                </Related>
              )}

              {latestNews.length > 0 && (
                <Latest>
                  <LatestNews data={latestNews} />
                </Latest>
              )}
            </NewsLayout>
          </article>
        </main>
      )}
    </>
  )
}

export default NewsPage
