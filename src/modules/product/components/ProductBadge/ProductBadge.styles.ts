import styled from '@emotion/styled'
import tw from 'twin.macro'
import { ProductBadge } from './ProductBadge'

const Wrapper = styled('span')<{ variant: ProductBadge.Variant }>`
  ${tw`h-6 px-3 py-1 text-sm mr-3.5 border whitespace-nowrap flex items-center w-min`}
  border-radius: 12px;

  :last-of-type {
    ${tw`mr-0`}
  }

  ${(props) => {
    switch (props.variant) {
      case 'dark-red': {
        return tw`text-errorRedText bg-errorRedTint border-pretRed-800`
      }
      case 'red': {
        return tw`text-errorRedText bg-errorRedTint border-pretRed-700`
      }
      case 'green': {
        return tw`text-successGreenText bg-successGreenTint border-successGreen`
      }
      /**
       * TODO: Color should be added to CL
       */
      case 'blue': {
        return tw`text-infoBlueText bg-infoBlueTint border-infoBlueText`
      }
      case 'yellow': {
        return tw`text-warningYellowText bg-warningYellowTint border-warningYellow`
      }
      case 'pink': {
        return tw`text-errorRedText bg-errorRed border-errorRed bg-opacity-10 border-opacity-20`
      }
      default:
        return tw`bg-white text-grey-700`
    }
  }}
`
export const ProductBadgeStyles = {
  Wrapper,
}
