import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`p-10 grid gap-32`}
  grid-template-columns: max-content auto;
`

const BackToSearchButton = styled('button')`
  ${tw`flex items-center text-lg tracking-base no-underline text-pretRed-700`}

  svg {
    ${tw`mr-2`}
    height: 7px;
    width: 13px;
  }
`

export const CustomerDetailsPageStyles = {
  Wrapper,
  BackToSearchButton,
}
