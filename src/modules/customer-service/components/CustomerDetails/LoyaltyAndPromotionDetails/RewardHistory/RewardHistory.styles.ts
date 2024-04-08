import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Title = styled.h3`
  ${tw`text-xl mb-5`}
`

const Table = styled.table`
  ${tw`w-full`}
`

const Head = styled.thead`
  ${tw`bg-gray-50`}

  td {
    ${tw`py-2`}
  }
`

const Body = styled.tbody`
  td {
    ${tw`py-3`}
  }
`

const Row = styled.tr`
  ${tw`border-b border-gray-200`}
`

const Cell = styled.td`
  &:first-of-type {
    ${tw`pl-6`}
  }

  &.text-center {
    ${tw`text-center`}
  }
`
const ActionButton = styled(Button)``

export const RewardHistoryStyles = {
  Title,
  Table,
  Head,
  Body,
  Row,
  Cell,
  ActionButton,
}
