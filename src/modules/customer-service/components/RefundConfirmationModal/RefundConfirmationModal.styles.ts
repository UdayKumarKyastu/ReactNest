import styled from '@emotion/styled'
import tw from 'twin.macro'

const Title = styled.h2`
  ${tw`flex text-2xl font-bold relative mb-8`}
`

const InputWrapper = styled.div`
  max-width: 350px;
`

const ModalFooter = styled.footer`
  ${tw`flex justify-end`}

  & button:not(:last-of-type) {
    ${tw`mr-2`}
  }
`

export const RefundConfirmationModalStyles = {
  Title,
  InputWrapper,
  ModalFooter,
}
