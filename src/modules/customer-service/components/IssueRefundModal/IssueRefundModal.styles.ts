import styled from '@emotion/styled'
import tw from 'twin.macro'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'

const ModalWrapper = styled.div`
  & [class*='ModalBody'] {
    ${tw`overflow-visible`}
  }
`

const Title = styled.h2`
  ${tw`flex text-2xl font-bold relative mb-8`}
`

const ModalFooter = styled.footer`
  ${tw`flex justify-end`}
`

const StyledInput = styled(MaskedInput)`
  ${tw`mt-2 text-red-500`}

  [class*="LabelWrapper"],
  input {
    ${tw`text-black`}
  }
`

const FormWrapper = styled.div`
  max-width: 350px;
`

export const IssueRefundModalStyles = {
  ModalWrapper,
  Title,
  ModalFooter,
  StyledInput,
  FormWrapper,
}
