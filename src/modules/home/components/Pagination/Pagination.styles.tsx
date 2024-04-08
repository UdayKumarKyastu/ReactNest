import styled from '@emotion/styled'
import tw from 'twin.macro'

const PaginationWrapper = styled('div')`
  ${tw`flex mt-4 justify-between`}
`

const ControlsWrapper = styled('div')`
  ${tw`flex items-center`}
`

const Control = styled('button')`
  ${tw`flex mr-6 cursor-pointer`}
`

const PagesCount = styled('span')`
  ${tw`block text-grey-700 text-base leading-base mr-6`}
`

const DropdownWrapper = styled('div')`
  div {
    ${tw`text-grey-700 mb-0`}
  }

  > div {
    ${tw`flex items-center`}

    > div {
      ${tw`border-0`}
    }
  }

  label {
    ${tw`text-grey-700 text-base leading-base`}
  }

  input {
    min-width: 10px;
  }
`

export const PaginationStyles = {
  PaginationWrapper,
  DropdownWrapper,
  ControlsWrapper,
  Control,
  PagesCount,
}
