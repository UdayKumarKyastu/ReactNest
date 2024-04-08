import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div`
  ${tw`flex mb-8 border-b`}
`

const Step = styled.div<{ isActive?: boolean }>`
  ${tw`flex items-center justify-between pb-4 `}
  ${({ isActive }) => isActive && tw`border-b-2 border-pretRed-700`}
  margin-bottom: -1px;

  &:not(:last-of-type) {
    ${tw`mr-12`}
  }
`

const Badge = styled.div<{ isActive?: boolean }>`
  ${tw`flex items-center justify-center mr-2 bg-gray-300 text-sm text-white`}
  ${({ isActive }) => isActive && tw`bg-pretRed-700`}
  height: 20px;
  width: 20px;
  border-radius: 50%;
`

export const PricingImporterBreadcrumbsStyles = {
  Wrapper,
  Step,
  Badge,
}
