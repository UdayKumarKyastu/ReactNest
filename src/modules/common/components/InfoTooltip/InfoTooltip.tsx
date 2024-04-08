import CircleQuestion from '../../../../icons/CircleQuestion'
import { InfoTooltipStyles } from './InfoTooltip.styles'

interface Props {
  text: string
}

const { TooltipWrapper, StyledTooltip } = InfoTooltipStyles

const InfoTooltip = ({ text }: Props) => (
  <TooltipWrapper>
    <StyledTooltip text={text}>
      <CircleQuestion />
    </StyledTooltip>
  </TooltipWrapper>
)

export default InfoTooltip
