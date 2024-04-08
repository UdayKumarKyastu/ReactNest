import styled from '@emotion/styled'
import tw from 'twin.macro'
import { NavLink } from 'react-router-dom'

const NoVersionsMessageWrapper = styled('div')<{ withGrayBackground?: boolean }>`
  ${tw`flex items-center border-t border-b border-grey-200 p-3 pt-1 pb-1 text-grey-500 text-sm mb-8`}

  ${({ withGrayBackground }) => withGrayBackground && tw`bg-grey-50`}

  svg {
    ${tw`mr-2`}
  }
`

const StyledNavLink = styled(NavLink)`
  text-underline-offset: 2px;
`

export const ProductVariantVersionsHistoryPageStyles = {
  NoVersionsMessageWrapper,
  StyledNavLink,
}
