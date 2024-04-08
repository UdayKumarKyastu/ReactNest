import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled('div')`
  ${tw`whitespace-nowrap`}

  span, a {
    ${tw`text-sm`}
    text-underline-offset: 2px;
  }

  span {
    ${tw`mr-1 text-grey-500`}
  }
`

export const VariantsCounterStyles = {
  Root,
}
