import styled from '@emotion/styled'
import tw from 'twin.macro'

const ProductNameCellWrapper = styled('div')`
  ${tw`flex`}
`

const Image = styled('img')`
  ${tw`bg-gray-100 col-span-1 mr-3`}
  width: 48px;
  height: 48px;
`

const CountryWrapper = styled('div')`
  ${tw`flex flex-nowrap items-center whitespace-nowrap`}

  span {
    ${tw`ml-1 text-sm text-grey-500 pr-2`}
    line-height: 16px;
  }
`

const ProductName = styled('a')`
  ${tw`text-grey-700 text-base leading-base block mb-1 no-underline`}

  &:hover {
    ${tw`text-pretRed-700 font-medium`}
  }
`

const VariantsCountWrapper = styled('div')`
  ${tw`text-grey-500 text-sm leading-sm flex ml-1 items-center justify-center`}

  svg {
    ${tw`mr-1`}
    margin-bottom: 1px;
  }
`

const TextWithIcon = styled('div')<{ withBorder?: boolean }>`
  ${tw`flex items-center text-grey-500 text-sm leading-sm pl-2 pr-2 whitespace-nowrap`}

  ${({ withBorder }) => withBorder && tw`border-l border-grey-300`}
`

const DetailsWrapper = styled('div')`
  ${tw`flex`}
`

const DraftChangesCell = styled('div')`
  ${tw`flex items-center text-grey-500 text-base leading-base`}

  svg {
    ${tw`mr-4`}
  }
`

export const ProductNameCellStyles = {
  ProductNameCellWrapper,
  Image,
  CountryWrapper,
  ProductName,
  VariantsCountWrapper,
  DetailsWrapper,
  DraftChangesCell,
  TextWithIcon,
}
