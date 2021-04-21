import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { Layout, Heading, FormattedDateTime } from '@components'
import styled from 'styled-components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import NewsBlockContent from '../../common/NewsBlockContent'
import HeroImage from '../../tempcomponents/news/HeroImage'
import Lead from '../../tempcomponents/news/Lead'
import RelatedContent from '../../tempcomponents/news/RelatedContent'
import LatestNews from '../../tempcomponents/news/LatestNews'
import type { NewsCardData, NewsSchema } from '../../types/types'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'

const { publicRuntimeConfig } = getConfig()

const NewsLayoutAlt = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);
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

const StyledHeadingAlt = styled(Heading)`
  margin: 0;
`

const DateAlt = styled.div`
  color: var(--white-100);
  margin-top: var(--space-xxLarge);
  margin-bottom: var(--space-xxLarge);
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: var(--space-small);
`

const DateContainer = styled.div`
  overflow-wrap: break-word;
  line-height: var(--lineHeight-3);
`

const LastModifiedLabel = styled.span`
  margin: 0 var(--space-small);

  &:before {
    content: '|';
    margin-right: var(--space-small);
  }
`

const ImageAlt = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--banner-paddingVertical) * -1);
  & > figure {
    margin: 0;
  }
`

const LeadParagraphAlt = styled.div`
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

const ContentAlt = styled.div`
  /** I don't think we need this? */
  /* but it makes things a bit easier… */
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

const RelatedAlt = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

const Latest = styled.div`
  padding: 0 var(--space-medium);
  margin: var(--space-4xLarge) auto;
  max-width: 1700px;
`

type ArticleProps = {
  data: {
    news: NewsSchema
    latestNews: NewsCardData[]
  }
  preview: boolean
}

export default function News({ data, preview }: ArticleProps): JSX.Element {
  /** TODO: Find out why the first time News is called it is without data */
  if (!data) {
    return <ErrorPage statusCode={418} />
  }
  const router = useRouter()
  const { pathname } = useRouter()

  const slug = data?.news?.slug
  const {
    data: { news, latestNews },
  } = usePreviewSubscription(newsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview || router.query.preview !== null,
    //enabled: true,
    //enabled: false,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)
  console.log('Urls', fullUrl, publicRuntimeConfig.domain)
  return (
    <>
      <NextSeo
        title={news.documentTitle || news.title}
        description={news.metaDescription}
        openGraph={{
          title: news.title,
          description: news.metaDescription,
          type: 'article',
          article: {
            publishedTime: news.publishDateTime,
            modifiedTime: news.updatedAt,
          },
          url: fullUrl,
          images: getOpenGraphImages(news.openGraphImage || news.heroImage?.image),
        }}
      ></NextSeo>
      <Layout preview={preview}>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article>
              <NewsLayoutAlt>
                <Header>
                  <HeaderInner>
                    <StyledHeadingAlt level="h1" size="2xl" inverted>
                      {news.title}
                    </StyledHeadingAlt>
                    <DateAlt>
                      <Icon data={calendar} />
                      <DateContainer>
                        <FormattedDateTime datetime={news.publishDateTime} />
                        <LastModifiedLabel>LAST MODIFIED:</LastModifiedLabel>
                        <FormattedDateTime datetime={news.updatedAt} />
                      </DateContainer>
                    </DateAlt>
                  </HeaderInner>
                </Header>
                <ImageAlt>{news.heroImage && <HeroImage data={news.heroImage} />}</ImageAlt>
                {news.ingress && (
                  <LeadParagraphAlt>
                    <Lead blocks={news.ingress} />
                  </LeadParagraphAlt>
                )}

                {/*<StyledHeading level="h1" size="2xl" inverted>
                {news.title}
              </StyledHeading>
              <Date>
                <FormattedDateTime datetime={news.publishDateTime} />
              </Date>
              <Image>{news.heroImage && <HeroImage data={news.heroImage} />}</Image>*/}
                {/*     {news.ingress && (
                <LeadParagraph>
                  <Lead blocks={news.ingress} />
                </LeadParagraph>
              )} */}
                {news.content && (
                  <ContentAlt>
                    <NewsBlockContent blocks={news.content}></NewsBlockContent>
                  </ContentAlt>
                )}

                {news.relatedLinks.links && news.relatedLinks.links.length > 0 && (
                  <RelatedAlt>
                    <RelatedContent data={news.relatedLinks} />
                  </RelatedAlt>
                )}

                {latestNews.length > 0 && (
                  <Latest>
                    <LatestNews data={latestNews} />
                  </Latest>
                )}
              </NewsLayoutAlt>
            </article>
          </>
        )}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const { news, latestNews } = await getClient(preview).fetch(newsQuery, {
    slug: params?.slug,
  })

  return {
    props: {
      preview,
      data: {
        news,
        latestNews,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(newsSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}
