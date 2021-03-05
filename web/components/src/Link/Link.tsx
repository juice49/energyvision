/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, HTMLAttributes } from 'react'
import { default as NextLink } from 'next/link'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward, external_link } from '@equinor/eds-icons'
import styled from 'styled-components'

export type LinkProps = {
  variant?: 'regular' | 'contentLink' | 'readMore'
  href: string
  external?: boolean
} & HTMLAttributes<HTMLAnchorElement>

// TODO: Get colours and other constants from theme with css variables
const BaseLink = styled.a`
  display: flex;
  align-items: center;
  color: rgba(0, 112, 121, 1);

  & > svg {
    flex-shrink: 0;
    box-sizing: content-box;
    padding: 0 0.5em;
  }
`

// TODO: should part of this styling be moved to a list item instead?
const ContentLink = styled(BaseLink)`
  border-bottom: 0.5px solid #b4bbc0;
  text-decoration: none;
  padding: 1em 0;

  & > svg {
    margin-left: auto;
  }
`

const ReadMoreLink = styled(BaseLink)`
  display: inline-flex;
  max-width: max-content;
  color: rgba(235, 0, 55, 1);
  justify-content: center;
  text-decoration: none;
  position: relative;

  & > svg {
    padding-right: 0;
    transition: 0.3s;
  }

  &:hover svg {
    padding-left: 1em;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 0%;
    border-bottom: solid 0.5px rgba(235, 0, 55, 1);
    transition: 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, href, variant = 'regular', external = false, ...rest },
  ref,
) {
  if (variant === 'contentLink') {
    return (
      <NextLink href={href} {...rest} passHref>
        <ContentLink ref={ref}>
          {children} <Icon data={external ? external_link : arrow_forward} />
        </ContentLink>
      </NextLink>
    )
  } else if (variant === 'readMore') {
    return (
      <NextLink href={href} {...rest} passHref>
        <ReadMoreLink ref={ref}>
          {children} <Icon data={arrow_forward} />
        </ReadMoreLink>
      </NextLink>
    )
  }

  // TODO: design not final
  return (
    <NextLink href={href} {...rest} passHref>
      <BaseLink ref={ref}>
        {children} {external ? <Icon data={external_link} size={16} /> : null}
      </BaseLink>
    </NextLink>
  )
})
