import styled from '@emotion/styled'
import tw from 'twin.macro'

const TableHeader = styled('thead')`
  ${tw`bg-grey-50 text-grey-700`}
  pointer-events: none;
`

const TableBody = styled('tbody')``

const TableRow = styled('tr')<{ marginLeft?: string; isExpanded?: boolean; cellsNumber: number }>`
  ${tw`cursor-pointer`}
  transition: all 0.2s ease;
  border: 1px solid transparent;
  border-bottom: 1px solid #e7e4e4;
  box-sizing: border-box;
  border-radius: 4px;
  display: grid;
  ${({ cellsNumber }) => `grid-template-columns: 64px 40% repeat(${cellsNumber - 2}, 1fr);`}
  ${({ marginLeft }) => `margin-left: ${marginLeft};`}
  ${({ isExpanded }) => isExpanded && `background-color: #FAF4F5;`}

  &:hover {
    border: 1px solid #e7e4e4;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`

const TableCell = styled('td')`
  ${tw`text-base text-grey-500 p-2 flex items-center`}
`

const TableHeaderCell = styled('th')`
  ${tw`text-base text-grey-700 p-2 text-left`}
`

const TableWrapper = styled('table')`
  ${tw`w-full mb-10`}
`

const ToggleArrow = styled('div')<{ marginLeft?: string }>`
  ${tw`flex w-full h-full items-center justify-center`}

  svg {
    path {
      stroke-width: 2px;
    }
  }
`

const CellWithIcon = styled('div')`
  ${tw`flex items-center text-grey-500 text-sm leading-base whitespace-pre`}

  svg {
    ${tw`mr-2`}
  }
`

const CrossIconWrapper = styled('div')`
  ${tw`bg-pretRed-700 flex items-center justify-center`}
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;

  svg {
    ${tw`m-0`}
  }
`

const BrandSiteWrapper = styled('div')`
  span {
    ${tw`text-xs leading-xs p-0`}
    padding: 0 9px;
  }
`

export const ProductsTableStyles = {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableWrapper,
  ToggleArrow,
  CellWithIcon,
  CrossIconWrapper,
  BrandSiteWrapper,
}
