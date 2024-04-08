import styled from '@emotion/styled'
import tw from 'twin.macro'

const ModalWrapper = styled.div`
  ${tw`p-12`}
`

const Title = styled.h2`
  ${tw`text-2xl`}
`

const Message = styled.p`
  ${tw`py-6`}
`

const ModalFooter = styled.div`
  ${tw`mt-6 pt-6 border-t flex justify-end`}

  button {
    ${tw`px-4 py-3 text-base`}

    &:first-of-type {
      ${tw`mr-3`}
    }
  }
`

export const ConfirmImportModalStyles = {
  ModalWrapper,
  Title,
  Message,
  ModalFooter,
}
