import styled from '@emotion/styled'
import tw from 'twin.macro'

const Table = styled.table`
  ${tw`w-full`}

  td {
    ${tw`py-2`}
  }
`

const TableHeader = styled.thead`
  td {
    ${tw`bg-gray-50`}
  }
`

const TableBody = styled.tbody`
  ${tw`overflow-auto`}
  max-height: 400px;
`

const TableRow = styled.tr<{ notClickable?: boolean; resultRow?: boolean }>`
  ${tw`border-gray-200 border-b`}
  ${({ resultRow }) => resultRow && tw`cursor-pointer`}
  ${({ notClickable }) => notClickable && tw`cursor-not-allowed`}

  td:first-of-type {
    ${tw`pl-4`}
  }
`
const CustomerNameWrapper = styled.div`
  ${tw`flex items-center`}
`

const CustomerName = styled.p`
  ${tw`font-medium`}
`

const CustomerImage = styled('img')`
  ${tw`bg-gray-100 col-span-1 mr-3`}
  width: 48px;
  height: 48px;
`

export const CustomersTableStyles = {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  CustomerNameWrapper,
  CustomerName,
  CustomerImage,
}
