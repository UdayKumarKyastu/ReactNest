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

  tr:hover {
    ${tw`bg-gray-100 cursor-pointer`}
  }
`

const TableRow = styled.tr`
  ${tw`border-gray-200 border-b`}

  td:first-of-type {
    ${tw`pl-4`}
  }
`
const RecipeNameWrapper = styled.div`
  ${tw`flex`}
`

const RecipeName = styled.p`
  ${tw`font-medium`}
`

const RecipeNameIcon = styled.div`
  ${tw`flex items-center justify-center bg-gray-100 mr-3`}
  height: 48px;
  width: 48px;
`

export const SearchRecipeTableStyles = {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  RecipeNameWrapper,
  RecipeNameIcon,
  RecipeName,
}
