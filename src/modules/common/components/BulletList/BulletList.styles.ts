import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('ul')`
  ${tw`pl-4`}

  li {
    ${tw`text-sm text-grey-500 relative`}
    &:before {
      ${tw`text-grey-500 mr-3 absolute`}
      content: '•';
      left: -12px;
      top: -2px;
    }
  }
`

export const BulletListStyles = {
  Wrapper,
}
