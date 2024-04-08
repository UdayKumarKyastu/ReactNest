import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('span')`
  ${tw`grid`}
  grid-template-columns: auto 1fr;

  span {
    ${tw`text-grey-500 `}
  }

  svg {
    margin-top: 2px;
  }
`

export const FlagWithTextStyles = {
  Wrapper,
}
