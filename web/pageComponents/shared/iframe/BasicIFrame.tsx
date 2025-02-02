import styled from 'styled-components'
import type { IFrameData } from '../../../types/types'
import { BackgroundContainer } from '@components'
import SimpleBlockContent from '../../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../../common/serializers'
import IFrame from './IFrame'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const BasicIFrame = ({
  data: { title, frameTitle, url, cookiePolicy = 'none', designOptions },
  ...rest
}: {
  data: IFrameData
}) => {
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        <IFrame
          frameTitle={frameTitle}
          url={url}
          cookiePolicy={cookiePolicy}
          aspectRatio={aspectRatio}
          height={height}
          hasSectionTitle={!!title}
        />
      </Container>
    </BackgroundContainer>
  )
}

export default BasicIFrame
