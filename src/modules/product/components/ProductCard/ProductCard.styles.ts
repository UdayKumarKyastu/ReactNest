import styled from '@emotion/styled'
import tw from 'twin.macro'

const imageSize = 117

const Wrapper = styled('div')`
  ${tw`bg-white pr-8 grid gap-x-7 mb-3.5`}
  grid-template-columns: 117px 1fr 1fr 105px;
  border: 5px solid #f6f4f5;
`

const Image = styled('img')`
  ${tw`object-cover`}
  border-right: 5px solid #f6f4f5;
  width: ${imageSize}px;
  height: 100%;
`

const Column = styled('div')`
  ${tw`flex flex-col py-3`}

  div {
    ${tw`flex items-center`}
  }

  :last-of-type {
    ${tw`items-start`}
  }
`

const AttributeLabel = styled('span')`
  ${tw`text-sm tracking-base block leading-sm mr-2 mb-1 text-grey-500`}
`

const AttributeValue = styled('span')`
  ${tw`text-sm leading-sm tracking-base text-grey-700 block mb-1`}
`
const CountryWrapper = styled('div')`
  ${tw`flex flex-nowrap items-center whitespace-nowrap mr-2`}

  span {
    ${tw`ml-2 text-sm pr-2 border-r border-grey-300 text-grey-500 leading-xs`}
  }
`

const AdditionalInfo = styled('div')`
  ${tw`flex mt-6 flex-wrap`}
`

const IconWithText = styled('div')`
  ${tw`flex items-center text-sm text-grey-500 mr-8 whitespace-nowrap w-full`}

  div {
    ${tw`mr-2`}
  }

  svg {
    ${tw`mr-1`}
  }
`

const BrandSiteWrapper = styled('div')`
  span {
    ${tw`text-xs leading-xs p-0`}
    padding: 0 9px;
  }
`

/**
 * @TODO
 * !important should be removed after updating component-library version
 * component's margin should be controlled by prop
 */
const StyledNotice = styled.div`
  & > * {
    margin-bottom: 0 !important;
  }
`

export const ProductCardStyles = {
  Wrapper,
  Image,
  Column,
  AttributeLabel,
  AttributeValue,
  CountryWrapper,
  AdditionalInfo,
  IconWithText,
  BrandSiteWrapper,
  StyledNotice,
}
