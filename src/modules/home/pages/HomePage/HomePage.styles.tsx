import tw, { styled } from 'twin.macro'

const OuterWrapper = styled('div')`
  ${tw``}
`

const RoleContainer = styled('div')`
  ${tw`flex justify-end`}
`

const Wrapper = styled('div')`
  ${tw`flex items-center flex-col`}
`

const Cards = styled('div')`
  max-width: 773px;
  ${tw`flex flex-wrap justify-center items-center flex-row w-2/3 place-content-evenly`}
`

const Heading = styled('h2')`
  height: 61px;
  ${tw`text-4xl font-bold text-gray-600`};
`

const Hr = styled('hr')`
  ${tw`border-t-2 border-pretRed-700 w-10 mt-4 mb-6`}
`

const Info = styled('p')`
  ${tw`text-lg text-gray-500`}
  margin-bottom: 80px;
`

const LogoWrapper = styled('div')`
  ${tw`mb-12`}
`

export const HomePageStyles = {
  LogoWrapper,
  Info,
  Hr,
  Heading,
  Cards,
  Wrapper,
  OuterWrapper,
  RoleContainer,
}
