import { Tooltip } from '@pretamanger/component-library'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const StyledTooltip = styled(Tooltip)`
  margin-top: 12px;
  min-width: 240px;
`

const TooltipWrapper = styled('span')`
  ${tw`ml-1 align-middle`}
`

export const InfoTooltipStyles = {
  StyledTooltip,
  TooltipWrapper,
}
