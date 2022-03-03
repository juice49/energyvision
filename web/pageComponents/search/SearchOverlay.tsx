import { useState } from 'react'
import styled from 'styled-components'
/* import { useRouter, NextRouter } from 'next/router' */
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { Button } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { search, close } from '@equinor/eds-icons'
import Search from './Search'

/** @TODO Move and refactor */
import { TopbarDropdown } from '../shared/siteMenu/TopbarDropdown'
import { NavTopbar } from '../shared/siteMenu/NavTopbar'

import { LogoLink } from '../shared/LogoLink'

const StyledButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

const InvertedButton = styled(Button)`
  color: var(--white-100);
  &:hover {
    color: var(--slate-blue-95);
    background-color: var(--moss-green-60);
  }
  &:focus-visible,
  &[data-focus-visible-added]:focus {
    outline-color: var(--mist-blue-100);
  }
`

const DarkTopbarDropdown = styled(TopbarDropdown)`
  background-color: var(--slate-blue-95);
  color: var(--inverted-text);
`

const SearchContainer = styled.div`
  padding: var(--space-large);
  max-width: 700px;
  margin: 0 auto;
`

const SiteMenu = () => {
  /* const router = useRouter() */
  const [isOpen, setIsOpen] = useState(false)

  /* const searchState = getSearchState(router) */

  function onCloseButtonClick() {
    setIsOpen(!isOpen)
  }

  // @TODO Lot's of todo
  /* const setSearchState = ( newSearchState ) => {
    //_setSearchState(newSearchState, router);
  } */
  return (
    <>
      <StyledButton variant="ghost_icon" aria-expanded={isOpen} onClick={onCloseButtonClick} aria-label="Search">
        <Icon size={32} data={search} />
      </StyledButton>
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <DarkTopbarDropdown isOpen={isOpen}>
            <NavTopbar>
              <LogoLink onClick={onCloseButtonClick} inverted />
              <InvertedButton
                variant="ghost_icon"
                aria-expanded={isOpen}
                onClick={onCloseButtonClick}
                aria-label="Search"
              >
                <Icon size={32} data={close} />
              </InvertedButton>
            </NavTopbar>
            <SearchContainer>{isOpen && <Search setIsOpen={setIsOpen} />}</SearchContainer>
          </DarkTopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default SiteMenu
