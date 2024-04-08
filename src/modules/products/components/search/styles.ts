import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button, Input } from '@pretamanger/component-library'

const SearchForm = styled('form')`
  ${tw`flex justify-center w-full bg-white mt-5`}
  height: 53px;
  width: 75%;
`

const SearchInput = styled(Input)`
  ${tw`w-full h-full m-0 border-0 flex justify-center`}
  & > div:nth-of-type(2) {
    ${tw`h-full my-2`}
  }

  & div > input {
    ${tw`border-0 text-lg pr-8`}
  }

  & label {
    ${tw`hidden`}
  }
`

const IconContainer = styled('div')`
  ${tw`flex mx-3`}
  svg {
    width: 18px;
    ${tw`h-auto`}
  }
`

const SearchButton = styled(Button)`
  ${tw`py-0 px-12`}
  & > span {
    ${tw`flex items-center justify-center`}
    width: 53px;
    height: 53px;
  }
`

const ClearSearchButton = styled('button')`
  ${tw`absolute right-4 p-2 top-1/2 -mt-4`}
  svg {
    ${tw`w-4 h-auto`}
  }
`

const InputWrapper = styled('div')`
  ${tw`flex relative w-full mr-3 border`}
  border-color: #575354
`

const PropertySelectWrapper = styled('div')`
  > div {
    ${tw`border-0 mb-0 m-px mr-3`}
    height: calc(100% - 2px);
    width: 160px;

    > div {
      ${tw`border-0 w-full h-full flex items-center`}

      .select__control {
        ${tw`w-full h-full`}
      }

      .select__indicator {
        ${tw`border-r border-gray-200`}
      }
    }
  }
`

export const SearchStyles = {
  SearchForm,
  SearchInput,
  IconContainer,
  SearchButton,
  ClearSearchButton,
  InputWrapper,
  PropertySelectWrapper,
}
