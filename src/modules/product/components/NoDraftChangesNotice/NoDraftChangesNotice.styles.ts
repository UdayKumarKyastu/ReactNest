import styled from '@emotion/styled'
import tw, { css } from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`flex flex-wrap items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}

  max-width: 300px;
`

const IconWrapper = styled('div')<{ withTopSpace?: boolean }>`
  ${tw`w-full mb-3`}

  ${({ withTopSpace }) =>
    withTopSpace &&
    css`
      margin-top: 150px;
    `}

  svg {
    ${tw`m-auto`}
  }
`

const Title = styled('span')`
  ${tw`text-grey-500 text-lg text-center mb-3`}
`

const Description = styled('span')`
  ${tw`text-grey-600 text-sm text-center`}
`

export const NoDraftChangesNoticeStyles = {
  Wrapper,
  Title,
  Description,
  IconWrapper,
}
