import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div<{ withPrefix?: boolean }>`
  ${tw`relative`}

  input {
    ${({ withPrefix }) => withPrefix && tw`pl-6`}
  }
`

const Prefix = styled.div`
  ${tw`absolute z-10`}
  left: 12px;
  bottom: 22px;
`

export const MaskedInputStyles = {
  Wrapper,
  Prefix,
}
