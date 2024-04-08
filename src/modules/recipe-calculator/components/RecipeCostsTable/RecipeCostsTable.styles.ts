import tw, { css } from 'twin.macro'
import { Button as ButtonComp } from '@pretamanger/component-library'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'
import styled from '@emotion/styled'
import CostInputComp from './CostInput/CostInput'

const Root = styled.div`
  ${tw`mb-8`}
`

const Title = styled.h2`
  ${tw`my-8 text-lg text-gray-700`}
`

const Table = styled.table`
  ${tw`my-8 w-full table-fixed`}

  td {
    ${tw`border-r border-gray-200 px-3`}
    svg {
      ${tw`inline-flex pr-2 cursor-pointer`}
    }
  }
`

const CellWrapper = styled.div`
  ${tw`flex items-center`}
`

const TableHeader = styled.thead`
  tr {
    border-bottom-width: 2px;
  }
`

const UnitCurrencyWrapper = styled.span`
  ${tw`mr-3 inline-block`}
  width: 30px;
`

const TableBody = styled.tbody`
  & tr:nth-of-type(even) {
    ${tw`bg-gray-50`}
  }
`

const TableRow = styled.tr`
  ${tw`border border-gray-200`}
  height: 35px;

  td:first-of-type {
    ${tw`px-4`}
  }

  &.removed-row td {
    ${tw`line-through`}

    input {
      ${tw`border-transparent line-through`}
    }
  }
`
const inputStyles = css`
  ${tw`inline-flex mb-0 mr-1.5`}
  width: 125px;

  & [class*='LabelWrapper'] {
    display: none;
  }

  input {
    ${tw`bg-transparent`}
  }

  input:disabled {
    ${tw`border-0`}
  }
`

const StyledInput = styled(MaskedInput)`
  ${inputStyles}
`
const CostInput = styled(CostInputComp)`
  ${inputStyles}
`

const TotalCostCell = styled.div`
  ${tw`flex justify-between pr-14 font-medium`}
`

const TableFooter = styled.tfoot`
  tr {
    border-top-width: 2px;
  }
`

const Button = styled(ButtonComp)<{ visible?: boolean }>`
  ${tw`rounded-default invisible`}
  ${(props) => props.visible && tw`visible`}
`

export const RecipeCostsTableStyles = {
  Root,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableFooter,
  Button,
  TableBody,
  StyledInput,
  CellWrapper,
  CostInput,
  UnitCurrencyWrapper,
  TotalCostCell,
}
