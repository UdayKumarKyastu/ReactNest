import tw, { styled } from 'twin.macro'

const RowHeading = styled.div`
  ${tw`flex justify-between mb-0.5`}

  &:first-of-type {
    ${tw`mt-3`}
  }
`

const RowValues = styled.div`
  ${tw`flex justify-between`}
  & > div {
    width: calc(50% - 40px);
  }
`

const ChangeWrapper = styled.div`
  ${tw`flex justify-between font-light`}
`

const Value = styled.p`
  ${tw`font-semibold`}
`

export const ReviewStatusRowStyles = {
  RowHeading,
  RowValues,
  ChangeWrapper,
  Value,
}
