import { Translation } from '../../../i18n/Translation'
import { ApprovedDraftChangesNoticeStyles } from './ApprovedDraftChangesNotice.styles'
import { ChangesApproved } from '../../../../icons/ChangesApproved'

export declare namespace ApprovedDraftChangesNotice {
  export type Props = {
    numberOfChanges: number
    withTopSpace?: boolean
  }
}

const { Wrapper, Title, Description, IconWrapper } = ApprovedDraftChangesNoticeStyles

export const ApprovedDraftChangesNotice = ({
  numberOfChanges,
  withTopSpace,
}: ApprovedDraftChangesNotice.Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <IconWrapper withTopSpace={withTopSpace}>
        <ChangesApproved />
      </IconWrapper>
      <Title>{translate('approvedDraftChangesNotice.title')}</Title>
      <Description>
        {translate('approvedDraftChangesNotice.description', {
          amount: numberOfChanges,
        })}
      </Description>
    </Wrapper>
  )
}
