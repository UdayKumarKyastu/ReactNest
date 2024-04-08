import tw, { styled } from 'twin.macro'
import { NavLink } from 'react-router-dom'

const LogoNavLink = styled(NavLink)`
  ${tw`flex absolute left-7 items-center no-underline`}
`

const Heading = styled('div')`
  ${tw`flex flex-wrap items-end`};

  span {
    ${tw`text-pretRed-700 ml-2 flex w-full`};
    font-size: 18px;
  }

  strong {
    ${tw`text-xl block text-pretRed-700 ml-2 w-full`};
    line-height: 12px;
  }
`

export const PageLogoStyles = {
  LogoNavLink,
  Heading,
}
