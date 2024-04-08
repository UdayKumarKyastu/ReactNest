import tw from 'twin.macro'
import styled from '@emotion/styled'

const Row = styled('div')`
  ${tw`grid grid-cols-2 gap-32`}

  &:not(:first-of-type) {
    > div {
      > div {
        ${tw`pb-3 pt-6`}
      }
    }
  }

  &:last-of-type {
    > div {
      > div {
        border-bottom: none;
      }
    }
  }
`

const ColumnWrapper = styled('div')`
  > div {
    height: 100%;
    border-bottom: 1px solid #e7e4e4;
  }

  a {
    ${tw`absolute text-sm`}
    right: 0;
    top: 0;
  }
`

const TableWrapper = styled('div')`
  ${tw`relative mt-6 overflow-x-auto`}
`

export const SideBySideTableStyles = {
  Row,
  ColumnWrapper,
  TableWrapper,
}
