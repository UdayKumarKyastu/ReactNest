import React, { FC, ReactElement } from 'react'
import { BreadcrumbsStyles } from './Breadcrumbs.styles'

export declare namespace Breadcrumbs {
  export interface Props {
    children: React.ReactElement[]
    separator?: React.ReactElement | string
  }

  export interface BreadcrumbItemProps {
    href: string
    children: React.ReactElement | string
  }
}

const { StyledNavLink, Wrapper, BreadcrumbArrow } = BreadcrumbsStyles

export const BreadcrumbItem: FC<Breadcrumbs.BreadcrumbItemProps> = ({ href, children }) => {
  return (
    <StyledNavLink key={href} to={href}>
      {children}
    </StyledNavLink>
  )
}

const DefaultSeparator = <BreadcrumbArrow type="right" colour="grey-500" height="8px" />

export const Breadcrumbs: FC<Breadcrumbs.Props> = ({ children, separator = DefaultSeparator }) => {
  return (
    <Wrapper data-cy="breadcrumb">
      {React.Children.map(children, (child: ReactElement, index: number) => {
        if (index === children.length - 1) {
          return child
        }

        return [child, separator]
      })}
    </Wrapper>
  )
}
