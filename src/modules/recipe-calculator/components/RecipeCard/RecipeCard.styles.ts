import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div`
  ${tw`border border-gray-100 flex`}
  border-width: 5px;
`

const IconBox = styled.div`
  ${tw`bg-gray-100 flex items-center justify-center`}
  width: 120px;
  height: 120px;
`

const DescriptionWrapper = styled.div`
  ${tw`px-4 py-5 grid w-full`}
  grid-template-columns: 50% 50%;
  grid-row-gap: 4px;
`

const TextGroup = styled.div`
  ${tw`flex font-normal`}
`

const TextLabel = styled.p`
  ${tw`mr-2`}
`

export const RecipeCardStyles = {
  Wrapper,
  IconBox,
  DescriptionWrapper,
  TextGroup,
  TextLabel,
}
