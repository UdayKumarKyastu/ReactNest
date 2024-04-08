import React from 'react'
import tw from 'twin.macro'
import { Alert } from '@pretamanger/component-library'
import { TabNavigationStyles } from './TabNavigation.styles'
import { Critical } from '../../../../icons/Critical'

export declare namespace TabNavigation {
  export interface NavLinkProps {
    label: string | React.ReactElement
    href: string
    isActive: boolean
    withNotice?: boolean
    withWarning?: boolean
    numberBadge?: number
  }

  export interface Props {
    items: NavLinkProps[]
  }
}

const { Badge, StyledNavLink, Wrapper } = TabNavigationStyles

export const TabNavigation = ({ items }: TabNavigation.Props) => {
  return (
    <Wrapper data-cy="left-side-navigation">
      {items.map(
        (
          {
            label,
            href,
            isActive,
            withNotice,
            withWarning = false,
            numberBadge,
          }: TabNavigation.NavLinkProps,
          index,
        ) => {
          const isPreviousItem = !!items[index + 1]?.isActive

          return (
            <StyledNavLink
              key={href}
              to={href}
              css={isPreviousItem ? tw`border-transparent` : tw``}
            >
              {label}
              {withNotice && <Alert />}
              {withWarning && <Critical />}
              {!!numberBadge && <Badge aria-label={`+${numberBadge}`}>+{numberBadge}</Badge>}
            </StyledNavLink>
          )
        },
      )}
    </Wrapper>
  )
}
