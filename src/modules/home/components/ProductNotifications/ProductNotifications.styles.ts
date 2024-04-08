import styled from '@emotion/styled'
import tw, { css } from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`w-full`}

  padding: 80px 160px;
`

const Title = styled('h3')`
  ${tw`text-4xl leading-4xl text-grey-700 font-bold mb-6`}
`

const ProductNameCellWrapper = styled('div')`
  ${tw`flex`}
`

const Image = styled('img')`
  ${tw`bg-gray-100 col-span-1 mr-3`}
  width: 48px;
  height: 48px;
`

const CountryWrapper = styled('div')`
  ${tw`flex flex-nowrap items-center whitespace-nowrap mr-2`}

  span {
    ${tw`ml-1 text-sm text-grey-500 pr-2 border-r border-grey-300`}
    line-height: 16px;
  }
`

const ProductName = styled('span')`
  ${tw`text-grey-700 text-base leading-base block mb-1`}
`

const VariantsCountWrapper = styled('span')`
  ${tw`text-grey-500 text-sm leading-sm block ml-1`}
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

const TableSwitchContainer = styled('div')`
  ${tw`pt-4 flex`}
`

const TopBar = styled('div')`
  ${tw`flex justify-between relative`}
`

const TableSwitch = styled('div')<{ active?: boolean }>`
  ${tw`flex justify-between mb-12 w-max text-base leading-base text-grey-700 p-3 cursor-pointer ml-4 bg-transparent`}
  border-radius: 4px;

  ${({ active }) =>
    active &&
    css`
      background-color: #fbeff1;
    `}}

  ${({ active }) => !active && tw`border border-grey-200`}


  &:first-of-type {
    ${tw`ml-0`}
  }

  .results-count {
    ${tw`text-grey-500 text-sm leading-base text-white bg-pretRed-700 border border-pretRed-700 ml-6`}
    padding: 0 6px;
    border-radius: 4px;
  }
`

const CountryOptionLabel = styled('div')`
  ${tw`flex items-center`}

  svg {
    ${tw`mr-2`}
  }
`

const CountryDropdownWrapper = styled('div')`
  ${tw`absolute`}
  right: 0;
  width: 175px;
`

const LoaderWrapper = styled('div')`
  ${tw`ml-1`}
`

export const ProductNotificationsStyles = {
  Title,
  Wrapper,
  ProductNameCellWrapper,
  Image,
  CountryWrapper,
  ProductName,
  VariantsCountWrapper,
  DetailsWrapper,
  DraftChangesCell,
  TableSwitchContainer,
  TableSwitch,
  CountryOptionLabel,
  TopBar,
  CountryDropdownWrapper,
  LoaderWrapper,
}
