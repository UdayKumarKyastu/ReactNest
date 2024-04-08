import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Root = styled.div``

const Title = styled.h1`
  ${tw`text-2xl font-bold text-gray-700`}
`

const TitleWrapper = styled.div`
  ${tw`flex items-center mb-2 justify-between`}
`

const TitleUnderline = styled.div`
  ${tw`bg-pretRed-800 mb-5`}
  height: 4px;
  width: 64px;
`

const ActionsWrapper = styled.div`
  ${tw`flex`}
`

const ActionButton = styled(Button)`
  &:not(:last-of-type) {
    ${tw`mr-2`}
  }
`

export const SectionHeaderStyles = {
  Root,
  Title,
  TitleUnderline,
  TitleWrapper,
  ActionsWrapper,
  ActionButton,
}
