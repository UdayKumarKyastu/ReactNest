import styled from '@emotion/styled'
import tw from 'twin.macro'

const AcceptRejectButtonsRoot = styled.div<{ hideButtons?: boolean }>`
  ${tw`flex justify-between items-center`}
  height: 50px;
  & * {
    ${({ hideButtons }) => hideButtons && tw`invisible`}
  }
`

const ButtonsWrapper = styled.div`
  ${tw`flex items-center`}

  button {
    ${tw`mr-3`}
  }

  .action-button {
    height: 32px;
    width: 65px;
  }
`

const StatusBadge = styled.div<{ accepted: boolean }>`
  ${tw`text-white flex items-center rounded-default px-2.5 py-1.5 mr-3 font-normal`}
  ${(props) => (props.accepted ? tw`bg-successGreen` : tw`bg-pretRed-700`)} 

  svg {
    ${tw`ml-1.5`}
  }
`

const StatusInfo = styled.p`
  ${tw`text-gray-700 font-light text-sm`}
  max-width: 220px;
`

export const AcceptRejectButtonStyles = {
  AcceptRejectButtonsRoot,
  ButtonsWrapper,
  StatusInfo,
  StatusBadge,
}
