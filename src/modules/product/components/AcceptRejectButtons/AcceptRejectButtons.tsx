import React, { useMemo } from 'react'
import { AcceptRejectButtonStyles } from './AcceptRejectButtons.styles'
import { Button } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { ReviewStatus, ChangeStatus } from '../../model/review-status'
import RejectIcon from '../../../../icons/RejectIcon'
import AcceptIcon from '../../../../icons/AcceptIcon'
import { formatDateToLocale } from '../../../../util/formatDateToLocale'
import { Locale } from '../../../i18n/Locale'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import { ReviewStatusesApi } from '../../api/reviewStatuses.api'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'

const { AcceptRejectButtonsRoot, ButtonsWrapper, StatusInfo, StatusBadge } =
  AcceptRejectButtonStyles

interface Props {
  changeStatus: ReviewStatus
  canApproveChanges: boolean
  fieldName: string
  resourceSkus: ResourceSkus
  hideButtons?: boolean
  reloadProduct?: () => void
  fieldValue?: any
  tabName: string
}

const AcceptRejectButtons = ({
  changeStatus,
  canApproveChanges,
  resourceSkus,
  fieldName,
  reloadProduct,
  hideButtons,
  fieldValue,
  tabName,
}: Props) => {
  const { translate } = Translation.useTranslation()
  const { accept, reject, reset, isLoading } =
    ReviewStatusesApi.useAcceptRejectChanges(reloadProduct)
  const { locale } = Locale.useLocale()

  const isAccepted = changeStatus.status === ChangeStatus.Accepted
  const isRejected = changeStatus.status === ChangeStatus.Rejected
  const noChangesDone = changeStatus.status === ChangeStatus.Pending

  const statusInfo = useMemo(() => {
    if (!canApproveChanges) {
      return translate('productAllDraftChangesPage.notAuthorized')
    }

    switch (changeStatus.status) {
      case ChangeStatus.Accepted:
        return translate('productAllDraftChangesPage.acceptedBy', {
          author: changeStatus?.user?.name || '',
          date: formatDateToLocale(changeStatus.modifiedAt!, locale),
        })
      case ChangeStatus.Rejected:
        return translate('productAllDraftChangesPage.rejectedBy', {
          author: changeStatus?.user?.name || '',
          date: formatDateToLocale(changeStatus.modifiedAt!, locale),
        })
      default:
        return ''
    }
  }, [canApproveChanges, changeStatus, locale, translate])

  if (!changeStatus.status) {
    return null
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <AcceptRejectButtonsRoot hideButtons={hideButtons} data-testid="accept-reject-buttons">
      <StatusInfo>{statusInfo}</StatusInfo>

      <ButtonsWrapper>
        {noChangesDone && (
          <>
            <Button
              className="action-button"
              styleType="secondary"
              onClick={() => reject(resourceSkus, fieldName, tabName, fieldValue)}
              disabled={!canApproveChanges}
              data-testid="reject-button"
            >
              {translate('productAllDraftChangesPage.reject')}
            </Button>

            <Button
              className="action-button"
              styleType="primary"
              onClick={() => accept(resourceSkus, fieldName, tabName, fieldValue)}
              disabled={!canApproveChanges}
              data-testid="approve-button"
            >
              {translate('productAllDraftChangesPage.accept')}
            </Button>
          </>
        )}

        {!noChangesDone && (
          <StatusBadge accepted={isAccepted}>
            {isAccepted && (
              <>
                {translate('productAllDraftChangesPage.accepted')}
                <AcceptIcon />
              </>
            )}

            {isRejected && (
              <>
                {translate('productAllDraftChangesPage.rejected')}
                <RejectIcon height={12} width={12} />
              </>
            )}
          </StatusBadge>
        )}

        {!noChangesDone && canApproveChanges && (
          <Button
            styleType="tertiary"
            icon={<RejectIcon height={16} width={16} stroke="#575354" />}
            onClick={() => reset(resourceSkus, fieldName, tabName, fieldValue)}
            data-testid="reset-button"
          />
        )}
      </ButtonsWrapper>
    </AcceptRejectButtonsRoot>
  )
}

export default AcceptRejectButtons
