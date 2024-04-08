import styled from '@emotion/styled'
import tw from 'twin.macro'

const ModalWrapper = styled.div<{ extended: boolean }>`
  & [class*='ModalBody'] {
    ${tw`overflow-visible`}
    ${(props) => props.extended && tw`overflow-auto max-h-screen`}
  }
`

const Title = styled.h2`
  ${tw`flex text-2xl font-bold relative mb-8`}
`

const SearchWrapper = styled.div`
  ${tw`flex mb-8`}

  form {
    width: calc(100% - 40px);
  }
`

const ResultsLabel = styled.p`
  ${tw`mb-6`}
`

export const RecipeSearchModalStyles = {
  Title,
  SearchWrapper,
  ResultsLabel,
  ModalWrapper,
}
