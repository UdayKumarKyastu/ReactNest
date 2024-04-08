import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

const Wrapper = styled('div')`
  h3 {
    ${tw`text-lg`}
  }

  span,
  h4 {
    ${tw`text-base`}
  }

  h2 {
    ${tw`text-xl mb-6 mt-6`}

    &:after {
      height: 2px;
    }
  }
`

const StyledLink = styled(Link)`
  ${tw`block mt-3 text-grey-700 no-underline border border-gray-700 rounded-default w-max text-sm`}

  padding: 5px;
`

const DescriptionLine = styled('span')`
  ${tw`block`}

  &:first-of-type {
    ${tw`mt-1`}
  }
`

const ErrorMessage = styled('p')`
  ${tw`text-errorRedText bg-errorRedTint border-pretRed-700 mt-6`}
`

export const ProductVariantDraftChangesStyles = {
  Wrapper,
  StyledLink,
  DescriptionLine,
  ErrorMessage,
}
