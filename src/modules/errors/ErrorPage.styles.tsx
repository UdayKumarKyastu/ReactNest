import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`h-screen flex items-center flex-col mt-16`}
`

const LogoWrapper = styled('div')`
  ${tw`mb-6`}
`

const Heading = styled('h2')`
  ${tw`text-4xl font-bold text-gray-600`};
`

const Hr = styled('hr')`
  ${tw`border-t-2 border-pretRed-700 w-10 mt-4 mb-6`}
`
export const ErrorPageStyles = {
  Hr,
  Heading,
  LogoWrapper,
  Wrapper,
}
