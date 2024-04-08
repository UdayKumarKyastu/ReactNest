import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Root = styled.div`
  ${tw`p-4 border rounded-default w-1/2`}
  max-width: 550px;
`

const ProgressBar = styled.div`
  ${tw`w-full bg-gray-200 mt-5`}
  height: 4px;
`

const ProgressIndicator = styled.div<{ progress: number }>`
  ${tw`bg-pretRed-700 h-1`}
  width: ${({ progress }) => progress}%;
  transition: 5s width linear;
`

const Wrapper = styled.div`
  ${tw`flex justify-between items-center`}
`

const Spinner = styled.div`
  ${tw`flex justify-between items-center`}
`

const Filename = styled.p`
  ${tw`ml-2`}
`

const CancelButton = styled(Button)`
  ${tw`rounded-default`}
`

export const UploadStatusStyles = {
  Root,
  ProgressBar,
  ProgressIndicator,
  Wrapper,
  Spinner,
  Filename,
  CancelButton,
}
