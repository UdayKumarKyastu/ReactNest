import styled from '@emotion/styled'
import tw, { TwStyle } from 'twin.macro'
import { NavLink } from 'react-router-dom'

const StyledNavLink = styled(NavLink)<{ css?: TwStyle }>`
  ${tw`block relative text-grey-700 text-lg leading-xl flex no-underline box-border items-center tracking-lg border-b border-b-2 border-grey-100 cursor-pointer pl-4 flex justify-between pr-2`}
  padding-top: 10px;
  padding-bottom: 10px;
  height: 48px;

  ${({ css }) => css}

  &.active {
    ${tw`text-grey-700 font-medium bg-pretRed-700 bg-opacity-5`}

    &:after {
      ${tw`block bg-pretRed-700 absolute left-0 top-0`}
      content: '';
      width: 3px;
      height: calc(100% + 2px);
    }
  }
`
const Wrapper = styled('nav')`
  ${tw`sticky top-0`}
`

const Badge = styled('span')`
  ${tw`px-2 text-white text-base leading-6`}
  background-color: #F2CF15;
  border-radius: 12px;
`

export const TabNavigationStyles = {
  StyledNavLink,
  Wrapper,
  Badge,
}
