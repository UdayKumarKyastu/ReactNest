import tw, { styled } from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Wrapper = styled.div`
  ${tw`pt-10 pb-8 flex items-center justify-center flex-col border border-gray-200`}
`

const Title = styled.h3`
  ${tw`text-lg my-4`}
`

const Description = styled.p`
  ${tw`mb-8`}
`

const StyledButton = styled(Button)`
  ${tw`rounded-default text-base`}
`

export const RecipeCalculatorNoResultsStyles = {
  Wrapper,
  Title,
  Description,
  StyledButton,
}
