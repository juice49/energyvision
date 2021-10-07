import { CSSProperties, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { MenuGroup } from './MenuGroup'
import { Menu as EnvisMenu, MenuButton } from '@components'
import { RemoveScroll } from 'react-remove-scroll'
import { Icon, Button, ButtonProps } from '@equinor/eds-core-react'
import { clear } from '@equinor/eds-icons'
/* import { useMenu } from './MenuProvider' */
import useWindowSize from './hooks/useWindowSize'
import type { MenuData, SubMenuData } from '../../../types/types'

const TopbarDropdown = styled.div`
  position: fixed;
  background: var(--ui-background-default);
  overflow: auto;
  display: var(--display);
  z-index: 200;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  @media (min-width: 1300px) {
    display: block;
    height: auto;
    position: static;
  }
`

const StyledIcon = styled(Icon)`
  fill: var(--default-text);
`

const NavTopbar = styled.div`
  height: var(--topbar-height);
  padding: var(--space-small) var(--space-medium);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: 1300px) {
    display: none;
  }
`

export type MenuProps = {
  data?: MenuData
}

const Menu = ({ data }: MenuProps) => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
    setIndices([])
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  function toggleItem(toggledIndex: number) {
    // @TODO No fancy code optimization yet :D

    // @TODO Mobile or desktop first

    if (windowSize.width && windowSize.width > 1300) {
      // This menu item is  open, so let's close the menu by removing it from the list
      if (indices[0] === toggledIndex) {
        return setIndices([])
      }
      // Otherwise let's swap the current one with the new
      setIndices([toggledIndex])
    } else {
      if (indices.includes(toggledIndex)) {
        // This menu item is already open, so let's close it by removing it from the list
        const expandedItems = indices.filter((currentIndex) => currentIndex !== toggledIndex)
        return setIndices(expandedItems)
      }
      // Otherwise add it to the list
      setIndices([...indices, toggledIndex])
    }
  }

  const menuItems = (data && data.subMenus) || []

  return (
    <>
      {/* @TODO: Do we want to remove scroll? */}
      <MenuButton title="Menu" ariaExpanded={isOpen} onClick={onMenuButtonClick} />
      <RemoveScroll enabled={isOpen}>
        <TopbarDropdown
          style={
            {
              '--display': isOpen ? 'block' : 'none',
            } as CSSProperties
          }
        >
          <nav>
            <NavTopbar>
              {/*     @TODO: Translations for strings */}
              <Button variant="ghost_icon" aria-label="Close menu" onClick={() => setIsOpen(false)}>
                <StyledIcon size={24} data={clear} />
              </Button>
            </NavTopbar>
            <EnvisMenu index={indices} onChange={toggleItem}>
              {menuItems.map((topLevelItem: SubMenuData) => {
                if (topLevelItem?.topLevelLink.isDisabled) return null
                return <MenuGroup key={topLevelItem.id} {...topLevelItem} />
              })}
            </EnvisMenu>
          </nav>
        </TopbarDropdown>
      </RemoveScroll>
    </>
  )
}
export default Menu
