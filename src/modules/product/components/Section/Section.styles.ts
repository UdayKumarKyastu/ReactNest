import styled from '@emotion/styled'
import tw from 'twin.macro'

const SectionRoot = styled.div<{ isHidden?: boolean; marginTop?: boolean }>`
  ${({ isHidden }) => isHidden && tw`hidden`}
  ${({ marginTop }) => marginTop && tw`mt-8`}
  ${tw`relative`}
  grid-column: 1;

  & > svg {
    ${tw`absolute top-12 -left-10 `}
  }
`

export const SectionStyles = {
  SectionRoot,
}
