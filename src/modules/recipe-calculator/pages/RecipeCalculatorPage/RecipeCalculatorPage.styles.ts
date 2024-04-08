import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.main`
  ${tw`p-10 grid gap-32`}
  grid-template-columns: max-content auto;
`

const BackToSearchButton = styled('button')`
  ${tw`flex items-center text-lg tracking-base no-underline text-pretRed-700`}

  svg {
    ${tw`mr-2`}
    height: 7.5px;
    width: 13px;
  }
`

const Title = styled.h1`
  ${tw`text-3xl font-bold mb-6`}
`

const ContentWrapper = styled.div`
  ${tw`bg-white px-7 p-6 relative mt-2`}
  border: 5px solid #F6F4F5;
`

export const RecipeCalculatorPageStyles = {
  BackToSearchButton,
  Wrapper,
  ContentWrapper,
  Title,
}
