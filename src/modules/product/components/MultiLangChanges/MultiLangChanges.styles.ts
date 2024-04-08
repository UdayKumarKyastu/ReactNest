import tw, { styled } from 'twin.macro'

const ChangeWrapper = styled.div`
  ${tw`flex justify-between`}
`

const Value = styled.div`
  ${tw`font-semibold`}
`

export const MultiLangChangesStyles = {
  ChangeWrapper,
  Value,
}
