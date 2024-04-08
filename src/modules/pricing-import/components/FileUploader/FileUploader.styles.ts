import styled from '@emotion/styled'
import tw from 'twin.macro'

const Root = styled.div`
  .file-drop-target {
    ${tw`border border-dashed border-gray-300 p-12`}
  }

  .file-drop-target.file-drop-dragging-over-frame {
    ${tw`bg-pretRed-700 bg-opacity-10`}
  }

  .file-drop-target.file-drop-dragging-over-target {
    ${tw`border border-pretRed-700 border-2`}
  }

  svg {
    ${tw`mb-1`}
  }
`

const Wrapper = styled.div`
  ${tw`flex justify-center items-center flex-col`}
`

const Message = styled.p`
  ${tw`flex items-center text-center`}

  button {
    ${tw`text-base`}
  }
`

const HiddenFileInput = styled.input`
  ${tw`hidden`}
`

export const FileUploaderStyles = {
  Root,
  Wrapper,
  Message,
  HiddenFileInput,
}
