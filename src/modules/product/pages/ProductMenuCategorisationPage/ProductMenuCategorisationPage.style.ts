import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const CategoryItemWrapper = styled('div')<{ isHidden?: boolean }>`
  ${tw`mb-3 relative`}
  ${(props) => props.isHidden && tw`invisible`}

  > svg {
    ${tw`absolute top-1/2 -left-10`}
  }
`

const MissingCategoryNameLabel = styled('span')`
  ${tw`text-errorRedText bg-errorRedTint italic`}
`

const AddCategoryButton = styled('a')`
  grid-column: 1;
  cursor: pointer;
`

const RemoveButton = styled(Button)`
  ${tw`absolute bg-transparent text-pretRed-800 p-0`}
  position: absolute;
  right: -30px;
  bottom: 0;
  transform: translateY(-50%);
  background-color: transparent;

  path {
    ${tw`text-pretRed-700`}
  }

  :hover,
  :active {
    ${tw`bg-transparent`}
  }
`

export const ProductMenuCategorisationPageStyles = {
  CategoryItemWrapper,
  MissingCategoryNameLabel,
  RemoveButton,
  AddCategoryButton,
}
