import { FlagWithText } from '../FlagWithText/FlagWithText'
import tw, { styled } from 'twin.macro'

const ShowLanguagesButton = styled('button')`
  ${tw`block text-base tracking-base text-successGreen mt-2 text-pretRed-700 mb-4 underline`}
  text-underline-offset: 2px;

  &:hover {
    ${tw`no-underline`}
  }
`

const FlagWithTextBlock = styled(FlagWithText)<{ noBorder?: boolean }>`
  ${tw`grid p-2 pr-6 border-t border-grey-200 text-base relative`};
  grid-template-columns: auto 1fr;

  &:last-of-type {
    ${tw`border-b`};
  }

  &:first-of-type {
    ${tw`border-b-0`};
  }

  span > svg {
    ${tw`absolute top-1/2 right-0`};
    transform: translateY(-50%);
  }

  ${({ noBorder }: { noBorder: boolean }) => noBorder && tw`border-t-0`}
`

export const MultiLangTextStyles = {
  ShowLanguagesButton,
  FlagWithTextBlock,
}
