import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  position: relative;
`

const Wrapper = styled.div`
  .customer-card,
  .details-section {
    ${tw`mb-5`}
  }
`

const Title = styled.h1`
  ${tw`text-3xl font-bold mb-6 mt-8`}
`

const BreadcrumbItem = styled.a`
  ${tw`mr-2 text-gray-500`}

  &:not(:first-of-type) {
    ${tw`ml-2`}
  }
`

const LoadingCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`

export const CustomerDetailsStyles = {
  Root,
  Title,
  Wrapper,
  BreadcrumbItem,
  LoadingCover,
}
