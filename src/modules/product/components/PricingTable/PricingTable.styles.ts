import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Input, Tooltip } from '@pretamanger/component-library'
import CircleQuestion from '../../../../icons/CircleQuestion'

const StyledTable = styled.table<{ isFullView: boolean }>`
  ${tw`border-collapse`}
  ${({ isFullView }) => (isFullView ? tw`w-6/12` : tw`w-full`)}
`

const LabelCell = styled.td`
  ${tw`px-1 py-0.5 border border-gray-200 whitespace-nowrap text-xs`}
  span {
    ${tw`w-6/12 pr-2`}
  }
  &.no-right-border {
    ${tw`border-r-0`}
  }
  &.no-left-border {
    ${tw`border-l-0`}
  }
  &.no-border {
    ${tw`border-l-0 border-r-0`}
  }
`

const StyledValueCell = styled.td`
  ${tw`px-1 py-0.5 align-middle text-xs`}
  svg {
    ${tw`inline ml-1 mb-1`}
  }
`

const SingleValueWrapper = styled.span`
  &:first-of-type {
    ${tw`pr-2`}
  }
`

const TableRow = styled.tr`
  ${tw`border border-gray-200`}

  td:nth-of-type(4) {
    ${tw`border-r border-gray-200`}
  }

  td:nth-of-type(7) {
    ${tw`border-r border-gray-200`}
  }

  &:nth-of-type(odd) td:not(:first-of-type) {
    ${tw`bg-gray-100`}
  }
`

const EditTableRow = styled.tr`
  ${tw`border border-gray-200`}

  td:nth-of-type(3) {
    ${tw`border-r border-gray-200`}
  }
`

const StyledTooltip = styled(Tooltip)`
  ${tw`mt-3 ml-0.5 whitespace-normal`}
  min-width: 240px;
`

const StyledCircleQuestion = styled(CircleQuestion)`
  ${tw`ml-1`}
`

const StyledInput = styled(Input)`
  ${tw`font-normal text-base text-grey-700 m-0 ml-0.5`}
  min-width: 50px;
  div:first-of-type {
    display: none;
  }
  &.percentage {
    ${tw`mr-0.5`}
  }
  &.money {
    ${tw`ml-0.5`}
  }
`

const FlexBoxWrapper = styled.div`
  ${tw`flex items-center`}
`

export const PricingTableStyles = {
  StyledTable,
  LabelCell,
  StyledValueCell,
  TableRow,
  SingleValueWrapper,
  StyledCircleQuestion,
  StyledTooltip,
  EditTableRow,
  StyledInput,
  FlexBoxWrapper,
}
