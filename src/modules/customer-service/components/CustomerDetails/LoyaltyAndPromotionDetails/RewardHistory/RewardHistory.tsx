import React, { useCallback, useMemo } from 'react'
import { Translation } from '../../../../../i18n/Translation'
import { RewardHistoryStyles } from './RewardHistory.styles'
import Badge from '../../../../../common/components/Badge/Badge'
import { format } from 'date-fns'
import { Reward, RewardStatus } from '../../../../model/Loyalty'
import { CustomerDetailsState } from '../../../../state/CustomerDetailsState'
import { useCustomer } from '../../../../api/useCustomer'
import { StringParam, useQueryParam } from 'use-query-params'
import { NotificationsState } from '../../../../../notifications/state/NotificationsState'

const { Title, Cell, Table, Row, Head, Body, ActionButton } = RewardHistoryStyles

interface Props {
  rewards: Reward[]
}

const RewardHistory = ({ rewards }: Props) => {
  const { translate } = Translation.useTranslation()
  const { actions } = CustomerDetailsState.useState()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()
  const { getLoyalty, reactivateReward } = useCustomer()
  const [userId] = useQueryParam('userId', StringParam)
  const [walletId] = useQueryParam('walletId', StringParam)

  const badgeColorMap = useMemo(() => {
    return {
      active: 'green',
      redeemed: 'yellow',
      expired: 'yellow',
      used: 'red',
    } as Record<string, 'green' | 'yellow' | 'red'>
  }, [])

  const badgeLabelMap = useMemo(() => {
    return {
      ACTIVE: translate('customerDetails.loyaltyAndPromotionDetails.active'),
      REDEEMED: translate('customerDetails.loyaltyAndPromotionDetails.redeemed'),
      EXPIRED: translate('customerDetails.loyaltyAndPromotionDetails.expired'),
      USED: translate('customerDetails.loyaltyAndPromotionDetails.used'),
    }
  }, [translate])

  const onReactivate = useCallback(
    async (rewardId: number) => {
      await reactivateReward(userId!, walletId!, rewardId!)
      addNotification('customerDetails.loyaltyAndPromotionDetails.reactivateSuccess', '', 'success')
      const loyalty = await getLoyalty(userId!, walletId!)
      actions.fetchLoyalty(loyalty)
    },
    [actions, addNotification, getLoyalty, reactivateReward, userId, walletId],
  )

  return (
    <>
      <Title>{translate('customerDetails.loyaltyAndPromotionDetails.rewardHistory')}</Title>

      <Table>
        <Head>
          <Row>
            <Cell>{translate('customerDetails.loyaltyAndPromotionDetails.name')}</Cell>
            <Cell>{translate('customerDetails.loyaltyAndPromotionDetails.status')}</Cell>
            <Cell>{translate('customerDetails.loyaltyAndPromotionDetails.expiryDate')}</Cell>
            <Cell />
          </Row>
        </Head>

        <Body>
          {!rewards.length && (
            <Row>
              <Cell className="text-center" colSpan={4}>
                {translate('customerDetails.loyaltyAndPromotionDetails.noRecordsSoFar')}
              </Cell>
            </Row>
          )}
          {rewards.map((item, index) => (
            <Row key={`reward-history-${index}`}>
              <Cell>{item.name}</Cell>
              <Cell>
                <Badge label={badgeLabelMap[item.status]} color={badgeColorMap[item.status]} />
              </Cell>
              <Cell>{format(new Date(item.expiryDate), 'dd MMM yyyy')}</Cell>
              <Cell>
                {/* TEMPORARY SOLUTION - false to be removed in the future */}
                {item.status === RewardStatus.Expired && false && (
                  <ActionButton
                    styleType="secondary"
                    compact
                    onClick={() => onReactivate(item.accountId)}
                  >
                    {translate('customerDetails.loyaltyAndPromotionDetails.reactivate')}
                  </ActionButton>
                )}
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </>
  )
}

export default RewardHistory
