import tw, { styled } from 'twin.macro'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'
import { Button } from '@pretamanger/component-library'

const ModalWrapper = styled.div`
  & [class*='ModalBody'] {
    ${tw`p-12`}
  }
`

const Title = styled.h2`
  ${tw`text-2xl font-bold mb-6`}
`

const StyledInput = styled(MaskedInput)`
  ${tw`mb-4`}
`

const RadioWrapper = styled.div`
  ${tw`mb-2`}

  & > * {
    ${tw`mb-2`}
  }
`

const InputRow = styled.div`
  ${tw`flex justify-between`}

  & > div {
    width: calc(50% - 12px);
  }
`

const ModalFooter = styled.div`
  ${tw`pt-8 mt-2 flex justify-between border-t border-solid border-gray-200`}
`

const StyledButton = styled(Button)`
  ${tw`rounded-default text-base`}
`

export const CreateGoodModalStyles = {
  Title,
  StyledInput,
  InputRow,
  ModalFooter,
  StyledButton,
  ModalWrapper,
  RadioWrapper,
}
