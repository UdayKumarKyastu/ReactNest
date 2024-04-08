import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('button')`
  ${tw`flex items-center text-lg tracking-base no-underline text-pretRed-700`}

  svg {
    ${tw`mr-2`}
    height: 7.5px;
    width: 13px;
  }
`

export const ProductBackButtonStyles = {
  Wrapper,
}
