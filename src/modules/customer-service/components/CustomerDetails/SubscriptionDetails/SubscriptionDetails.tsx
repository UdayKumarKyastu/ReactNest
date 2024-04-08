import React, { useCallback, useMemo } from 'react'
import SectionValue from '../../SectionValue/SectionValue'
import DetailsSection from '../../DetailsSection/DetailsSection'
import { Translation } from '../../../../i18n/Translation'
import { format } from 'date-fns'
import Badge from '../../../../common/components/Badge/Badge'
import { Subscription, SubscriptionStatus } from '../../../model/Subscription'
import { CustomerDetailsState } from '../../../state/CustomerDetailsState'
import { NotificationsState } from '../../../../notifications/state/NotificationsState'
import { useCustomer } from '../../../api/useCustomer'
import { StringParam, useQueryParam } from 'use-query-params'
import CancelSubscriptionModal from '../../CancelSubscriptionModal/CancelSubscriptionModal'

interface Props {
  subscription: Subscription
}

const SubscriptionDetails = ({ subscription }: Props) => {
  const { translate } = Translation.useTranslation()
  const { actions, state } = CustomerDetailsState.useState()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()
  const { pauseSubscription, getSubscriptions, restartSubscription, resumeSubscription } =
    useCustomer()
  const [pretId] = useQueryParam('pretId', StringParam)

  const statusMap = {
    active: 'green',
    in_trial: 'yellow',
    future: 'green',
    non_renewing: 'yellow',
    paused: 'yellow',
    cancelled: 'black',
  } as const

  const reloadSubscription = useCallback(async () => {
    const response = await getSubscriptions(pretId!)
    actions.fetchSubscription(response[0])
  }, [actions, getSubscriptions, pretId])

  const onPauseSubscription = useCallback(async () => {
    actions.setLoading(true)
    await pauseSubscription(pretId!, subscription.id)
    reloadSubscription()
    addNotification(translate('customerDetails.subscriptionDetails.pauseSuccess'), '', 'success')
    actions.setLoading(false)
  }, [
    actions,
    addNotification,
    pauseSubscription,
    pretId,
    reloadSubscription,
    subscription.id,
    translate,
  ])

  const onResumeSubscription = useCallback(async () => {
    actions.setLoading(true)
    await resumeSubscription(pretId!, subscription.id)
    reloadSubscription()
    addNotification(translate('customerDetails.subscriptionDetails.resumeSuccess'), '', 'success')
    actions.setLoading(false)
  }, [
    actions,
    addNotification,
    resumeSubscription,
    pretId,
    reloadSubscription,
    subscription.id,
    translate,
  ])

  const onRestartSubscription = useCallback(async () => {
    actions.setLoading(true)
    await restartSubscription(pretId!, subscription.id)
    reloadSubscription()
    addNotification(translate('customerDetails.subscriptionDetails.restartSuccess'), '', 'success')
    actions.setLoading(false)
  }, [
    actions,
    addNotification,
    pretId,
    reloadSubscription,
    restartSubscription,
    subscription.id,
    translate,
  ])

  const navigateToChargebee = useCallback(() => {
    window.open(
      `${process.env.CHARGEBEE_DOMAIN}/subscriptions?Subscriptions.search=${subscription.id}`,
      '_blank',
    )
  }, [subscription])

  const sectionActions = useMemo(() => {
    const goToChargeBee = {
      label: translate('customerDetails.subscriptionDetails.chargebeeLink'),
      callback: navigateToChargebee,
      styleType: 'tertiary',
      testSelector: 'show-chargebee-action',
    }
    if (subscription.status === SubscriptionStatus.Paused) {
      return [
        goToChargeBee,
        {
          label: translate('customerDetails.subscriptionDetails.resumeSubscription'),
          callback: onResumeSubscription,
          testSelector: 'resume-subscription-action',
        },
      ]
    }
    if (
      [SubscriptionStatus.Cancelled, SubscriptionStatus.NonRenewing].includes(subscription.status)
    ) {
      return [
        goToChargeBee,
        {
          label: translate('customerDetails.subscriptionDetails.restartSubscription'),
          callback: onRestartSubscription,
          testSelector: 'restart-subscription-action',
        },
      ]
    }

    return subscription.status === SubscriptionStatus.Active
      ? [
          goToChargeBee,
          {
            label: translate('customerDetails.subscriptionDetails.pauseSubscription'),
            callback: onPauseSubscription,
            testSelector: 'pause-subscription-action',
          },
          {
            label: translate('customerDetails.subscriptionDetails.cancelSubscription'),
            callback: () => actions.toggleCancelSubscriptionModal(true),
            testSelector: 'cancel-subscription-action',
          },
        ]
      : []
  }, [
    actions,
    navigateToChargebee,
    onPauseSubscription,
    onRestartSubscription,
    onResumeSubscription,
    subscription.status,
    translate,
  ])

  return (
    <>
      <DetailsSection
        title={translate('customerDetails.subscriptionDetails.title')}
        actions={sectionActions}
      >
        <SectionValue
          label={translate('customerDetails.subscriptionDetails.coffeeSubscriptionStatus')}
          value={
            <Badge
              label={translate(`customerDetails.subscriptionDetails.${subscription!.status}`)}
              color={statusMap[subscription!.status!]}
            />
          }
        />
        <SectionValue
          label={translate('customerDetails.subscriptionDetails.subscriptionStartDate')}
          value={
            subscription!.started_at
              ? format(new Date(subscription!.started_at!), 'dd MMMM yyyy')
              : '-'
          }
        />
        <SectionValue
          label={translate('customerDetails.subscriptionDetails.nextBillingDate')}
          value={
            subscription?.next_billing_at
              ? format(new Date(subscription!.next_billing_at!), 'dd MMMM yyyy')
              : '-'
          }
        />
        <SectionValue
          label={translate('customerDetails.subscriptionDetails.planName')}
          value={subscription!.plan_name}
        />

        {!!subscription!.preferred_state && (
          <SectionValue
            label={translate('customerDetails.subscriptionDetails.preferredState')}
            value={subscription!.preferred_state || ''}
          />
        )}
      </DetailsSection>
      {state.isCancelSubscriptionModalOpen && <CancelSubscriptionModal />}
    </>
  )
}

export default SubscriptionDetails
