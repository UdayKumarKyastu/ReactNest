import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div`
  ${tw`py-5 px-4 border-4 border-gray-100`}
`

const Title = styled.h1`
  ${tw`text-2xl font-bold mb-2 text-gray-700`}
`

const TitleUnderline = styled.div`
  ${tw`bg-pretRed-800 mb-5`}
  height: 4px;
  width: 64px;
`

const Separator = styled.hr`
  ${tw`w-full h-px bg-gray-200 my-5`}
`

export const DetailsSectionStyles = {
  Title,
  TitleUnderline,
  Wrapper,
  Separator,
}
