import tw, { styled } from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Root = styled.div`
  ${tw`overflow-auto`}
  max-height: 400px;
`

const Table = styled.table`
  ${tw`w-full`}
`

const TableHeader = styled.thead`
  ${tw`bg-gray-50`}

  td {
    ${tw`py-2`}
  }
`

const TableRow = styled.tr`
  border-bottom: 1px solid;
  ${tw`border-gray-200`}

  td {
    ${tw`py-4`}
  }

  td:first-of-type {
    ${tw`pl-4`}
  }
`

const SelectButton = styled(Button)`
  ${tw`rounded-default`}
`

export const SearchGoodsTableStyles = {
  Root,
  Table,
  TableHeader,
  TableRow,
  SelectButton,
}
