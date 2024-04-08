import styled from '@emotion/styled'
import tw from 'twin.macro'
import { AccordionItem } from '@pretamanger/component-library'

const Wrapper = styled('div')`
  ${tw`grid gap-y-4 gap-x-14`}
`

const AccordionHeader = styled('div')`
  ${tw`grid border-t border-b border-grey-200`}
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 6px;
`

const AccordionItemHeader = styled('div')`
  ${tw`grid`}
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 6px;
`

const HeaderCell = styled('span')<{ centered?: boolean }>`
  ${tw`text-grey-700 text-sm font-semibold`}

  ${({ centered }) => centered && tw`text-center`}
`

const AccordionCell = styled('span')<{ centered?: boolean }>`
  ${tw`text-grey-500 text-sm flex items-center flex-wrap`}

  ${({ centered }) => centered && tw`justify-center`}

  svg {
    height: 14px;
    margin-right: 4px;
  }

  span {
    ${tw`flex items-center`}
  }
`

const ProductDetails = styled('div')`
  ${tw`flex`}
  margin-top: 10px;

  span {
    ${tw`border-r border-grey-300 whitespace-nowrap text-grey-500 text-sm`}
    padding: 0 8px;

    &:first-of-type {
      ${tw`pl-0`}
    }

    &:last-of-type {
      ${tw`border-0`}
    }
  }
`

const StyledAccordionItem = styled(AccordionItem)`
  ${tw`p-0 w-full m-auto`}

  summary {
    ${tw`bg-white pb-0 pt-0`}
    list-style-type: none;

    div {
      ${tw`w-full`}
    }

    > svg {
      ${tw`mr-2`}
      width: 24px;
      height: 12px;
      position: absolute;
    }
      
      path {
        stroke-width: 2px;
      }
    }
  }
`

const ItemWrapper = styled('div')`
  ${tw`pl-4 pr-4 pt-6`}

  h3 {
    ${tw`text-base`}
  }

  span,
  h4 {
    ${tw`text-sm`}
  }

  h2 {
    ${tw`text-base mb-6 mt-6`}

    &:after {
      height: 2px;
    }
  }

  ${'TableWrapper'} {
    background-color: #000;
  }
`

const StyledAccordionContainer = styled('div')`
  > div {
    ${tw`mb-0`}
  }
`

const FormButtonsWrapper = styled('div')`
  ${tw`flex flex-row justify-end mt-10`};
`

export const ProdutAllDraftChangesStyles = {
  Wrapper,
  AccordionHeader,
  AccordionItemHeader,
  HeaderCell,
  AccordionCell,
  ProductDetails,
  StyledAccordionItem,
  ItemWrapper,
  StyledAccordionContainer,
  FormButtonsWrapper,
}
