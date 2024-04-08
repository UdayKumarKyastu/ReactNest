import { Translation } from '../../../i18n/Translation'
import { NoDataNoticeStyles } from './NoDataNotice.styles'
import { NoChangesPending } from '../../../../icons/NoChangesPending'

const { Wrapper, Title, Description, IconWrapper } = NoDataNoticeStyles

interface Props {
  title: string
  description?: string
  icon?: JSX.Element
}

export const NoDataNotice = ({ title, icon, description }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <IconWrapper>{icon || <NoChangesPending />}</IconWrapper>
      <Title>{title}</Title>
      <Description>
        {description || translate('productNotifications.noDataNoticeDescription')}
      </Description>
    </Wrapper>
  )
}
