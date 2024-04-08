import styled from '@emotion/styled'
import tw from 'twin.macro'

const WrapperWithArrowRoot = styled.div`
  ${tw`relative`}

  & > svg {
    ${tw`absolute inset-1/2 -left-3 `}
  }
`

export const WrapperWithArrowStyles = {
  WrapperWithArrowRoot,
}
