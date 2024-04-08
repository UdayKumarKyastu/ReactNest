import React from 'react'
import { NavLink } from 'react-router-dom'
import { Chevron } from '@pretamanger/component-library'
import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'

export declare namespace ProductFooterNavigation {
  export type Props = {
    previousItem: TabNavigation.NavLinkProps | null
    nextItem: TabNavigation.NavLinkProps | null
  }
}

export const ProductFooterNavigation = ({
  previousItem,
  nextItem,
}: ProductFooterNavigation.Props) => {
  return (
    <>
      <div>
        {previousItem && (
          <NavLink to={previousItem.href}>
            <Chevron type="left" />
            <span>{previousItem.label}</span>
          </NavLink>
        )}
      </div>
      <div>
        {nextItem && (
          <NavLink to={nextItem.href}>
            <span>{nextItem.label}</span>
            <Chevron type="right" />
          </NavLink>
        )}
      </div>
    </>
  )
}
