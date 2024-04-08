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

const ModalWrapper = styled('div')`
  div {
    backdrop-filter: none;
  }

  div[aria-modal] {
    overflow: visible;
  }
`

const SubmitButton = styled(Button)`
  & > span > div {
    color: white;
  }
`

export const EditMenuCategoryModalStyles = {
  FormButtonsWrapper,
  Text,
  SubHeadline,
  Headline,
  ModalWrapper,
  SubmitButton,
}
