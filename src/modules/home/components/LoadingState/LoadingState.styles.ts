import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`w-full flex flex-wrap items-center justify-center flex-col`}

  border: 5px solid #F6F4F5;
  height: 400px;
`

const Info = styled('div')`
  ${tw`text-grey-500 text-lg leading-lg text-center mt-3`}
`

export const LoadingStateStyles = {
  Wrapper,
  Info,
}
