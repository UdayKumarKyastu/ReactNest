import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`w-full flex flex-wrap items-center justify-center`}

  border: 5px solid #F6F4F5;
  padding: 110px 0;
`

const IconWrapper = styled('div')`
  ${tw`w-full mb-3`}
  svg {
    ${tw`m-auto`}
  }
`

const Title = styled('span')`
  ${tw`text-grey-500 text-lg leading-lg text-center mb-3 w-full`}
`

const Description = styled('span')`
  ${tw`text-grey-600 text-sm text-center w-full`}
  max-width: 275px
`

export const NoDataNoticeStyles = {
  Wrapper,
  Title,
  Description,
  IconWrapper,
}
