import styled from '@emotion/styled'
import { Button } from '@pretamanger/component-library'
import tw from 'twin.macro'
import RejectIconComp from '../../../../../icons/RejectIcon'

const StyledButton = styled(Button)`
  ${tw`rounded-default self-start py-1.5 px-3`}
`

const RejectIcon = styled(RejectIconComp)`
  ${tw`self-start cursor-pointer`}
`

export const EditModeToggleStyles = {
  StyledButton,
  RejectIcon,
}
