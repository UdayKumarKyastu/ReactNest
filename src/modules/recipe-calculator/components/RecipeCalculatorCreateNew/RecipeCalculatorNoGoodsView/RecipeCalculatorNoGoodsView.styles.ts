import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div`
${tw`p-8 border border-solid border-gray-200 mt-6 flex flex-col justify-center items-center`}
min-height: 250px;

  svg {
    ${tw`mb-4`}
  }

  button {
    ${tw`self-center`}
`

export const RecipeCalculatorNoGoodsViewStyles = {
  Wrapper,
}
