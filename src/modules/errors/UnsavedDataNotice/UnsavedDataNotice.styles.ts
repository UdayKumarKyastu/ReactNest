import tw, { styled } from 'twin.macro'

const DescriptionText = styled('span')`
  ${tw`block my-2 text-black`}
`

const ButtonsWrapper = styled('div')`
  ${tw`flex`}

  button {
    ${tw`mr-3 pl-3 pr-3`}
  }
`

export const UnsavedDataNoticeStyles = {
  DescriptionText,
  ButtonsWrapper,
}
