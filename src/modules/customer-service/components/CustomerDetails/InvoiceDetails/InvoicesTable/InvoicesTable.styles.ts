import styled from '@emotion/styled'
import { Button } from '@pretamanger/component-library'
import tw from 'twin.macro'

const Table = styled.table`
  ${tw`w-full`}
`

const Header = styled.thead`
  tr {
    ${tw`bg-gray-50`}
  }
  td {
    ${tw`py-2`}
  }
`

const Body = styled.tbody`
  tr:nth-of-type(even) {
    ${tw`bg-gray-50`}
  }
  td {
    ${tw`py-4`}
  }
`

const Row = styled.tr``

const Cell = styled.td`
  &:first-of-type {
    ${tw`pl-6`}
  }
`

const ButtonsWrapper = styled.div`
  ${tw`flex`}
`

const InvoiceButton = styled(Button)`
  ${tw`mr-8`}
`

const ActionButton = styled(Button)`
  ${tw`mr-2`}
`

const Hour = styled.p`
  ${tw`text-xs text-gray-500`}
`

export const InvoicesTableStyles = {
  Table,
  Header,
  Body,
  Row,
  Cell,
  InvoiceButton,
  ActionButton,
  ButtonsWrapper,
  Hour,
}
