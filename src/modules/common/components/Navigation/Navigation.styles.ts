import tw, { styled } from 'twin.macro'
import { NavLink } from 'react-router-dom'
import { Logo as PretLogo } from '../../../../icons/logo'

const Wrapper = styled('div')`
  ${tw`flex items-center border-b border-b-2 border-grey-200 w-full px-24 relative`}
`

const Logo = styled(PretLogo)`
  ${tw`mr-2.5`}
`

const UserWrapper = styled('div')`
  ${tw`flex absolute right-7 flex items-center`}
`

const Nav = styled('nav')`
  ${tw`flex h-full ml-12`}
`

const UserName = styled('p')`
  ${tw`text-sm`}

  strong {
    ${tw`text-sm`}
  }
`

const Avatar = styled('img')`
  ${tw`rounded-full border-2 border-pretRed-700 ml-3`}
  width: 42px;
  height: 42px;
  cursor: help;
`

const StyledLink = styled(NavLink)`
  ${tw`text-lg text-grey-700 no-underline flex items-center px-3 mx-5 relative`};
`

const StyleLink = styled('div')`
  ${tw`text-lg text-grey-700 no-underline flex items-center px-3 mx-5 relative`};
`

export const NavigationStyles = {
  Wrapper,
  Logo,
  UserWrapper,
  Nav,
  UserName,
  Avatar,
  StyledLink,
  StyleLink,
}
