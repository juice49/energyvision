import styled from 'styled-components'
import { Card, ColorMapping } from '@components'
import type { PromoTileArrayData, PromoTileData } from '../../types/types'
import Image from '../shared/Image'
import { ButtonLink } from '../shared/ButtonLink'

const { Title, Header, Action, Media } = Card

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-medium);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`

// The EDS Card component has a hardcoded background color preventing us
// from using our colored BackgroundContainer component
// @TODO: refactor Card component to allow us to use BackgroundContainer
const StyledCard = styled(Card)`
  background: ${({ color }) => `var(${color})`};
`

const PromoTileArray = ({ data }: { data: PromoTileArrayData }) => {
  return (
    <Container>
      {data.group.map((tile: PromoTileData) => (
        <StyledCard
          key={tile.id}
          color={ColorMapping[tile.designOptions.background.toLowerCase()] || ColorMapping.default}
        >
          {tile.image && (
            <Media>
              <Image image={tile.image} alt={tile.image.alt} maxWidth={400} aspectRatio={0.56} layout="responsive" />
            </Media>
          )}
          <Header>
            <Title>{tile.title}</Title>
          </Header>
          <Action>
            <ButtonLink action={tile.action} />
          </Action>
        </StyledCard>
      ))}
    </Container>
  )
}

export default PromoTileArray