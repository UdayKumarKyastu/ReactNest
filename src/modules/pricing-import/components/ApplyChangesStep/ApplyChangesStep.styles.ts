import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  ${tw`border-b w-full`}
  min-height: 300px;
`

const Message = styled.p`
  max-width: 415px;
`

const Footer = styled.footer`
  ${tw`flex justify-end pt-5`}

  button {
    ${tw`py-3 px-4`}
  }

  button:first-of-type {
    ${tw`mr-3`}
  }
`

const LoadingWrapper = styled.div`
  ${tw`flex items-center justify-center`}
  height: 300px;
`

export const ApplyChangesStepStyles = {
  Root,
  Message,
  Footer,
  LoadingWrapper,
}
