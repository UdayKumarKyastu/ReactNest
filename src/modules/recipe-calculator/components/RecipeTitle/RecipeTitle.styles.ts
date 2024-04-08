import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Input } from '@pretamanger/component-library'

const Title = styled.h2`
  ${tw`flex text-2xl font-bold relative mb-10`}

  svg {
    ${tw`ml-2 cursor-pointer`}
  }
`

const Underline = styled.span`
  ${tw`bg-red-800 absolute`}
  height: 4px;
  width: 64px;
  bottom: -12px;
`

const StyledInput = styled(Input)`
  ${tw`border border-gray-200`}

  & [class*=Label] {
    display: none;
  }
`

export const RecipeTitleStyles = {
  Title,
  Underline,
  StyledInput,
}
