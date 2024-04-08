import tw, { styled } from 'twin.macro'

const Title = styled.h2`
  ${tw`font-bold pt-10 pb-8 text-xl`}
`

const Table = styled.table`
  ${tw`w-full`}
`

const TableRow = styled.tr`
  border-bottom: 1px solid;
  ${tw`border-gray-200`}

  &:first-of-type {
    ${tw`border-gray-200`}
    border-top: 1px solid;
  }

  td {
    ${tw`py-4`}
  }

  td:first-of-type {
    ${tw`pl-4`}
  }
`

const ButtonsCell = styled.td`
  ${tw`text-right mr-4`}
  & * {
    ${tw`inline-flex items-end`}
  }

  svg {
    ${tw`cursor-pointer`}
  }
`

const SelectedBadge = styled.div`
  ${tw`text-white inline-flex items-center rounded-default px-2.5 py-1.5 mr-3 font-normal bg-successGreen`}

  svg {
    ${tw`ml-1.5 cursor-pointer`}
  }
`

export const SelectedGoodsTableStyles = {
  Title,
  Table,
  TableRow,
  SelectedBadge,
  ButtonsCell,
}
