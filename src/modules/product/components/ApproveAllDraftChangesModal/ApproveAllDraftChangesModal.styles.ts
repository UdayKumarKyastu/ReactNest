import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const FormButtonsWrapper = styled('div')`
  ${tw`flex flex-row justify-end mt-10 whitespace-nowrap`};

  button {
    ${tw`px-2`}

    &:first-of-type {
      ${tw`mr-3`}
    }
  }
`

const Headline = styled('h2')`
  ${tw`font-bold mb-6 text-2xl`}
`

const Text = styled('p')`
  ${tw`text-sm`}
  max-width: 480px;
`

const ModalWrapper = styled('div')`
  div {
    backdrop-filter: none;
  }

  div[aria-modal] {
    ${tw`p-12`}
  }
`

const SubmitButton = styled(Button)`
  & > span > div {
    color: white;
  }
`

export const ApproveAllDraftChangesModalStyles = {
  FormButtonsWrapper,
  Text,
  Headline,
  ModalWrapper,
  SubmitButton,
}
