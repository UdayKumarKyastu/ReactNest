import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  ${tw`pb-8 border-b`}
  min-height: 400px
`

const Message = styled.p`
  ${tw`mt-8`}
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

export const CsvValidationStepStyles = {
  Root,
  Message,
  Footer,
}
