import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`relative`}

  img {
    ${tw`w-full`}
  }
`

const InnerWrapper = styled('div')`
  ${tw`bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
  padding: 65px 125px;
  width: calc(100% - 320px);
  max-width: 1000px;

  & > form {
    ${tw`w-full`}
  }
`

const Title = styled('h2')`
  ${tw`text-grey-700 text-5xl leading-5xl mb-8 text-center font-bold`}
`

export const CustomerSearchStyles = {
  Wrapper,
  InnerWrapper,
  Title,
}
