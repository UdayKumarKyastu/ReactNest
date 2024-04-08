import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`mx-auto pt-16 pl-24 pr-24 mb-20`}
`

const Heading = styled('h2')`
  ${tw`font-body mb-6 font-medium text-3xl text-gray-700`}
`

export const ProductsPageStyles = {
  Wrapper,
  Heading,
}
