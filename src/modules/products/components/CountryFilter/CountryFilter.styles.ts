import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  ${tw`flex items-center`}
`

const Label = styled.p`
  ${tw`pr-2`}
`

const SelectWrapper = styled.div`
  [class*='SelectWrapper'] {
    ${tw`mb-0`}
    width: 100px;
  }
`

export const CountryFilterStyles = {
  Root,
  Label,
  SelectWrapper,
}
