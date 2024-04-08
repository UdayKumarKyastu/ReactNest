import styled from '@emotion/styled'
import tw, { css } from 'twin.macro'

const ReadOnlyFieldWrapperRoot = styled.div<{
  fullWidth?: boolean
  noMargin?: boolean
  isHidden?: boolean
  isNotDisplayed?: boolean
  fixedSize?: boolean
}>`
  ${tw`text-sm text-grey-500 mb-6`};
  ${(props) => props.fullWidth && tw`w-full pr-8`}
  ${(props) => props.noMargin && tw`mb-0`}
  ${(props) => props.isHidden && tw`invisible`}
  ${(props) => props.isNotDisplayed && tw`hidden`}
  ${(props) =>
    props.fixedSize &&
    css`
      height: 106px;
    `}
`

const Content = styled.div<{
  presentChange?: boolean
  crossOut?: boolean
}>`
  ${tw`relative`};
  ${(props) => props.presentChange && tw`bg-gray-50 p-2 mb-3`}
  ${(props) => props.crossOut && tw`line-through`}
  min-height: 40px;

  & > div:last-of-type {
    ${tw`mb-0`}
  }

  > svg {
    ${tw`absolute top-3 -left-10`};
  }
`

const FieldLabel = styled('span')`
  ${tw`block text-base text-grey-700 font-normal mb-1`};
`

export const ReadonlyFieldWrapperStyles = {
  ReadOnlyFieldWrapperRoot,
  Content,
  FieldLabel,
}
