/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Link, Heading } from '@components'
import { HTMLAttributes, forwardRef } from 'react'

import { Typography } from '@equinor/eds-core-react'

const StyledFooter = styled.footer`
  min-height: var(--space-4xLarge);
  clear: both;
  color: white;
  background-color: var(--slate-blue-95);
  padding: var(--space-medium) 0;
`
const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: var(--layout-maxContent-wide);
  justify-content: space-between;
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-medium);
  @media (max-width: 750px) {
    flex-direction: column;
  }
`

const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (max-width: 750px) {
    padding: var(--space-medium) 0;
    width: 70%;
  }
`
const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (max-width: 750px) {
    height: 5rem;
  }
`
const LinkHeader = styled(Heading)`
  font-size: var(--typeScale-2);
  color: white;
  padding: var(--space-small) 0;
`

const FooterLink = styled(Link)`
  font-size: var(--typeScale-0);
  padding: var(--space-xSmall) 0;
  color: white;
  text-decoration: none;

  &:hover {
    color: var(--moss-green-90);
  }
  @media (max-width: 750px) {
    flex: 0 0 40%;
    max-width: 5rem;
  }
`
const FooterBottom = styled.div`
  min-height: var(--space-large);
  padding: var(--space-small) var(--layout-paddingHorizontal-small);
`

const CompanyName = styled(Typography)`
  text-align: center;
  font-size: var(--typeScale-0);
  color: white;
  @media (max-width: 750px) {
    text-align: left;
  }
`

const placeHolderlinks = [
  {
    header: 'Explore',
    linkList: [
      { linkText: 'Investors', url: 'https://www.google.com/' },

      { linkText: 'Investors2', url: 'https://www.google.com/' },
      { linkText: 'Suppliers', url: 'https://www.google.com/' },
      { linkText: 'Contact us', url: 'https://www.google.com/' },
    ],
  },
  {
    header: 'Connect',
    linkList: [
      { linkText: 'Facebook', url: 'https://www.google.com/' },
      { linkText: 'Instagram', url: 'https://www.google.com/' },
      { linkText: 'LinkedIn', url: 'https://www.google.com/' },
      { linkText: 'Twitter', url: 'https://www.google.com/' },
      { linkText: 'Youtube', url: 'https://www.google.com/' },
    ],
  },
  {
    header: 'Site',
    linkList: [
      { linkText: 'Terms and conditions', url: 'https://www.google.com/' },
      { linkText: 'Site info', url: 'https://www.google.com/' },
      { linkText: 'Privacy policy', url: 'https://www.google.com/' },
      { linkText: 'Cookie policy', url: 'https://www.google.com/' },
    ],
  },
]

type LinkList = {
  url?: string
  linkText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
}

type LinkListObject = {
  header?: string
  linkList?: LinkList[] | null
}

type FooterProps = {
  links?: LinkListObject[] | null
}

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ links, ...rest }, ref) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        {placeHolderlinks.map(({ header, linkList }) => {
          return (
            <LinkWrapper key={header}>
              {' '}
              <LinkHeader>{header}</LinkHeader>
              <LinksList>
                {linkList.map(({ linkText, url }) => {
                  return (
                    <FooterLink key={linkText} href={url}>
                      {linkText}
                    </FooterLink>
                  )
                })}
              </LinksList>
            </LinkWrapper>
          )
        })}
      </FooterTop>
      <FooterBottom>
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})
