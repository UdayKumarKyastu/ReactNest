import styled from '@emotion/styled'
import { Checkbox } from '@pretamanger/component-library'
import tw from 'twin.macro'

const StyledCheckbox = styled(Checkbox)<{ isHidden?: boolean }>`
  ${tw`flex mb-3 text-gray-500`}

  ${({ isHidden }) => isHidden && tw`invisible`}

  span {
    ${tw`font-normal text-grey-500 text-base`}
  }

  div {
    ${tw`mr-4`}
  }
`

export const CheckboxWithApproveStyles = {
  StyledCheckbox,
}
