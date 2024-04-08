import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const FormButtonsWrapper = styled('div')`
  ${tw`flex flex-row justify-between mt-10`};
`

const Headline = styled('h2')`
  ${tw`font-bold mb-6 text-2xl`}
`

const SubHeadline = styled('h3')`
  ${tw`text-lg font-normal mb-6`}
`

const Text = styled('p')`
  ${tw`text-sm`}
`

const SubmitButton = styled(Button)`
  /**
    Temporary - hardcode width for english translation,
    so loading indicator will not shrink it
   */
  width: 210px;

  & > span > div {
    color: white; // TODO bug in CL
  }
`

const ModalWrapper = styled('div')`
  div {
    backdrop-filter: none;
  }

  div[aria-modal] {
    ${tw`p-12`}
  }
`

export const EditSaveConfirmationModalStyles = {
  FormButtonsWrapper,
  Text,
  SubHeadline,
  Headline,
  SubmitButton,
  ModalWrapper,
}
