import styled from '@emotion/styled'
import tw from 'twin.macro'

const TableHeader = styled('thead')`
  background: #f6f4f5;
  pointer-events: none;
`

const TableBody = styled('tbody')``

const TableRow = styled('tr')`
  ${tw`cursor-pointer`}
  transition: all 0.2s ease;
  border: 1px solid transparent;
  border-bottom: 1px solid #e7e4e4;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    border: 1px solid #e7e4e4;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`

const TableCell = styled('td')`
  padding: 12px;
`

const TableHeaderCell = styled('th')`
  padding: 12px;
  text-align: left;
`

const TableWrapper = styled('table')`
  width: 100%;
`

export const VariantsTableStyles = {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableWrapper,
}
