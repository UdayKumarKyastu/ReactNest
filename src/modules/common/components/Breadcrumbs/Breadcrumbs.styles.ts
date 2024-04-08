import styled from '@emotion/styled'
import tw from 'twin.macro'
import { NavLink } from 'react-router-dom'
import { Chevron } from '@pretamanger/component-library'

const Wrapper = styled('nav')`
  ${tw`text-sm tracking-sm text-grey-500 flex items-center`}

  a {
    ${tw`text-sm tracking-sm text-grey-500 no-underline`}
    text-underline-offset: 2px;

    &:hover {
      ${tw`underline`}
    }
  }
`

const StyledNavLink = styled(NavLink)`
  ${tw`mr-2`}

  :not(:first-of-type) {
    ${tw`ml-2`}
  }
`

const BreadcrumbArrow = styled(Chevron)`
  path {
    stroke-width: 2;
  }
`

export const BreadcrumbsStyles = {
  Wrapper,
  StyledNavLink,
  BreadcrumbArrow,
}
