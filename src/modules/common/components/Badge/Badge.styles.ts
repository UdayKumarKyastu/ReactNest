import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  ${tw`inline px-2 py-1 text-xs border`}
  border-radius: 12px;

  &.green {
    ${tw`border-successGreen text-successGreen bg-successGreenTint`}
  }

  &.red {
    ${tw`border-errorRed text-errorRed bg-errorRedTint`}
  }

  &.yellow {
    ${tw`border-warningYellow text-warningYellow bg-warningYellowTint`}
  }

  &.black {
    ${tw`border-gray-700 text-gray-700 bg-gray-50`}
  }
`

export const BadgeStyles = {
  Root,
}
