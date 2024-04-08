import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

const StyledLink = styled(Link)`
  ${tw`block mt-3 text-grey-700 no-underline focus:bg-grey-700 hover:bg-grey-700 hover:text-white focus:text-white border border-gray-700 rounded-default w-max text-sm`}

  padding: 5px;
`

const DescriptionLine = styled('span')`
  ${tw`block`}

  &:first-of-type {
    ${tw`mt-1`}
  }
`

const ItalicParagraph = styled('span')`
  ${tw`italic mr-1`}
`

export const SavedDraftChangesConfirmationStyle = {
  StyledLink,
  DescriptionLine,
  ItalicParagraph,
}
