import { Translation } from '../../../i18n/Translation'
import { NoDraftChangesNoticeStyles } from './NoDraftChangesNotice.styles'
import { NoChangesPending } from '../../../../icons/NoChangesPending'

const { Wrapper, Title, Description, IconWrapper } = NoDraftChangesNoticeStyles

export const NoDraftChangesNotice = ({ withTopSpace }: { withTopSpace?: boolean }) => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <IconWrapper withTopSpace={withTopSpace}>
        <NoChangesPending />
      </IconWrapper>
      <Title>{translate('noDraftChangesNotice.title')}</Title>
      <Description>{translate('noDraftChangesNotice.description')}</Description>
    </Wrapper>
  )
}
