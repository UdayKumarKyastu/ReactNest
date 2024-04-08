import React, { useCallback, useMemo } from 'react'
import DetailsSection from '../../DetailsSection/DetailsSection'
import { Translation } from '../../../../i18n/Translation'
import SectionValue from '../../SectionValue/SectionValue'
import RewardHistory from './RewardHistory/RewardHistory'
import { Loyalty } from '../../../model/Loyalty'
import { StringParam, useQueryParam } from 'use-query-params'
import { CustomerDetailsState } from '../../../state/CustomerDetailsState'
import { useCustomer } from '../../../api/useCustomer'
import { NotificationsState } from '../../../../notifications/state/NotificationsState'

interface Props {
  loyalty: Loyalty
}

const LoyaltyAndPromotionDetails = ({ loyalty }: Props) => {
  const { translate } = Translation.useTranslation()
  const { totalNoOfStars, starsLeftToReward } = loyalty
  const [userId] = useQueryParam('userId', StringParam)
  const [walletId] = useQueryParam('walletId', StringParam)
  const {
    actions: { setLoading, fetchLoyalty },
  } = CustomerDetailsState.useState()
  const { issueNewReward, getLoyalty } = useCustomer()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()

  const onIssueNewReward = useCallback(async () => {
    try {
      setLoading(true)
      await issueNewReward(userId!, walletId!)
      const loyalty = await getLoyalty(userId!, walletId!)
      await fetchLoyalty(loyalty)
      addNotification(
        translate('customerDetails.loyaltyAndPromotionDetails.issueNewRewardSuccess'),
        '',
        'success',
      )
    } finally {
      setLoading(false)
    }
  }, [
    setLoading,
    issueNewReward,
    userId,
    walletId,
    getLoyalty,
    fetchLoyalty,
    addNotification,
    translate,
  ])

  const sectionActions = useMemo(
    () => [
      {
        label: translate('customerDetails.loyaltyAndPromotionDetails.issueNewReward'),
        callback: onIssueNewReward,
      },
    ],
    [translate, onIssueNewReward],
  )

  return (
    <DetailsSection
      title={translate('customerDetails.loyaltyAndPromotionDetails.title')}
      actions={sectionActions}
    >
      <SectionValue
        label={translate('customerDetails.loyaltyAndPromotionDetails.loyaltyStars')}
        value={translate('customerDetails.loyaltyAndPromotionDetails.starsNumber', {
          stars: totalNoOfStars,
          total: starsLeftToReward + totalNoOfStars,
        })}
      />
      <RewardHistory rewards={loyalty.rewards} />
    </DetailsSection>
  )
}

export default LoyaltyAndPromotionDetails
