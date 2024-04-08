import styled from '@emotion/styled'
import { Button } from '@pretamanger/component-library'
import tw from 'twin.macro'

const Root = styled.section`
  ${tw`border-4 border-gray-100 flex`}
`

const AvatarPlaceholder = styled.div`
  ${tw`bg-gray-100 h-full flex items-center justify-center`}
  width: 125px;
  height: 160px;
`

const Content = styled.div`
  ${tw`grid py-5 px-4 w-full`}
  grid-template-columns: auto auto;
`

const Column = styled.div`
  ${tw`flex flex-col px-2`}
`

const Item = styled.div<{ gutterBottom?: boolean }>`
  ${tw`flex`}
  ${({ gutterBottom }) => gutterBottom && tw`mb-6`}
`

const StatusWrapper = styled.div`
  ${tw`text-right mb-2`}
`

const Label = styled.label`
  ${tw`text-sm mr-1 text-gray-500`}
`

const Value = styled.p`
  ${tw`text-sm text-gray-700`}
`

const BlockButton = styled(Button)`
  ${tw`self-end`}
`

export const CustomerCardStyles = {
  Root,
  AvatarPlaceholder,
  Content,
  Column,
  Label,
  Value,
  Item,
  StatusWrapper,
  BlockButton,
}
