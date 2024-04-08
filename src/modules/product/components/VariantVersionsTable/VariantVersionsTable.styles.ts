import styled from '@emotion/styled'
import tw from 'twin.macro'

const TableHeader = styled('thead')`
  pointer-events: none;
`

const TableBody = styled('tbody')<{ withGrayBackground?: boolean }>`
  ${({ withGrayBackground }) => withGrayBackground && tw`bg-grey-50`}
`

const TableRow = styled('tr')`
  ${tw`cursor-pointer`}
  transition: all 0.2s ease;
  border: 1px solid transparent;
  border-bottom: 1px solid #e7e4e4;
  box-sizing: border-box;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 10% 20% repeat(4, 1fr);

  &:hover {
    border: 1px solid #e7e4e4;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`

const TableCell = styled('td')`
  ${tw`text-sm text-grey-500`}
  padding: 8px;
`

const TableHeaderCell = styled('th')`
  ${tw`text-sm text-grey-700`}
  padding: 8px;
  text-align: left;
`

const TableWrapper = styled('table')`
  ${tw`w-full mb-10`}
`

const CellWithIcon = styled('div')`
  ${tw`flex items-center text-sm text-grey-500`}

  > svg {
    margin-right: 8px;
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

export const VariantVersionsTableStyles = {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableWrapper,
  CellWithIcon,
  CrossIconWrapper,
}
