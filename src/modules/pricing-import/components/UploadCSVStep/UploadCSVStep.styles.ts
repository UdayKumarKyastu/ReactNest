import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled.div`
  .template-file-info {
    ${tw`mb-8`}
  }
`

const Error = styled.p`
  ${tw`text-sm`}
`

export const UploadCSVStepStyles = {
  Wrapper,
  Error,
}
