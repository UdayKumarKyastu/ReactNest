import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Input } from '@pretamanger/component-library'

const StyledInput = styled(Input)`
  ${tw`flex items-center flex-row w-1/2 mb-0`}

  label {
    ${tw`w-1/2`}
  }

  input[disabled] {
    ${tw`border-none bg-transparent text-grey-500 w-1/2`}
  }
`

export const ProductVariantPricingPageStyles = {
  StyledInput,
}
