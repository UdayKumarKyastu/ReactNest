import styled from '@emotion/styled'
import tw from 'twin.macro'
import RejectIcon from '../../../../icons/RejectIcon'

const Root = styled.div`
  ${tw`flex items-center justify-center h-full flex-col`}
`

const Title = styled.h2`
  ${tw`text-2xl`}
`

const Icon = styled(RejectIcon)`
  ${tw`mb-6`}
`

export const NoPermissionsStyles = {
  Root,
  Title,
  Icon,
}
