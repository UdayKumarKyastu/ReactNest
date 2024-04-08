import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`mt-12`}
`

const Toolbar = styled('div')`
  ${tw`flex mb-4 px-2`}
`

const ResultsCount = styled('p')`
  ${tw`text-base font-medium leading-none text-grey-700`}
`

const ResultsList = styled('ul')``

const ProductImage = styled('div')`
  ${tw`bg-gray-100 col-span-1`}
  width: 125px;
  height: 110px;
`

const ProductContent = styled('div')`
  ${tw`py-3 col-span-3 pb-4 flex flex-col`}
`

const ProductValue = styled('p')`
  ${tw`truncate text-base leading-lg text-grey-700 leading-lg`}
`

export const CustomersListStyles = {
  Wrapper,
  Toolbar,
  ResultsCount,
  ResultsList,
  ProductImage,
  ProductContent,
  ProductValue,
}
