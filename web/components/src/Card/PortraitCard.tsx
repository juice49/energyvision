import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'

export type CardProps = {
  /** What kind of card is this (we'll probably add more options to this list) */
  type?: 'news' | 'promo'
  textOnly?: boolean
} & HTMLAttributes<HTMLDivElement>

export const StyledPortraitCard = styled.div`
  height: var(--card-height, auto);
  display: flex;
  flex-direction: column;
  box-shadow: var(--card-shadow, none);
  background-color: var(--card-background, transparent);
  gap: var(--card-gap, var(--space-large));
  padding: var(--card-padding, 0 0 var(--space-xLarge) 0);

  &:hover {
    cursor: inherit;
  }
`

export const PortraitCard = forwardRef<HTMLDivElement, CardProps>(function Card(
  { type = 'news', textOnly = false, style, children, ...rest },
  ref,
) {
  return (
    <>
      {type === 'news' ? (
        <StyledPortraitCard
          ref={ref}
          style={
            {
              '--card-shadow': '0px 6px 20px rgba(0, 0, 0, 0.2)',
              '--card-background': 'var(--ui-background-default)',
              '--card-padding': '0 0 var(--space-small) 0',
              ...style,
            } as CSSProperties
          }
          {...rest}
        >
          {children}
        </StyledPortraitCard>
      ) : (
        <StyledPortraitCard
          ref={ref}
          style={
            {
              ...style,
              '--card-gap': textOnly ? 'var(--space-3xLarge)' : 'var(--space-large)',
              '--card-padding': textOnly ? 'var(--space-3xLarge) 0 var(--space-xLarge) 0' : '0 0 var(--space-xLarge) 0',
            } as CSSProperties
          }
          {...rest}
        >
          {children}
        </StyledPortraitCard>
      )}
    </>
  )
})
