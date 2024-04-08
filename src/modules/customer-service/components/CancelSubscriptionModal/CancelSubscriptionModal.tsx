import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pretamanger/component-library'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'
import { Translation } from '../../../i18n/Translation'
import { CancelSubscriptionModalStyles } from './CancelSubscriptionModal.styles'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { StringParam, useQueryParam } from 'use-query-params'
import { NotificationsState } from '../../../notifications/state/NotificationsState'
import { useCustomer } from '../../api/useCustomer'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'

const { Title, FormWrapper, ModalFooter } = CancelSubscriptionModalStyles

const CancelSubscriptionModal = () => {
  const { translate } = Translation.useTranslation()
  const {
    actions: { toggleCancelSubscriptionModal, setLoading, fetchSubscription },
    state: { subscription },
  } = CustomerDetailsState.useState()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()
  const [pretId] = useQueryParam('pretId', StringParam)
  const { getSubscriptions, cancelSubscription } = useCustomer()

  const cancellationReasons = useMemo(() => {
    return [
      {
        key: 'immediately',
        label: translate('customerDetails.cancelSubscriptionModal.immediateCancellation'),
      },
      { key: 'end_of_term', label: translate('customerDetails.cancelSubscriptionModal.endOfTerm') },
    ]
  }, [translate])

  const [reason, setReason] = useState(cancellationReasons[0])
  const [comment, setComment] = useState('')

  const reloadSubscription = useCallback(async () => {
    const response = await getSubscriptions(pretId!)
    fetchSubscription(response[0])
  }, [fetchSubscription, getSubscriptions, pretId])

  const onConfirm = useCallback(async () => {
    setLoading(true)
    await cancelSubscription(
      pretId!,
      subscription!.id,
      reason.key === cancellationReasons[1].key,
      comment,
    )
    await reloadSubscription()
    addNotification(translate('customerDetails.subscriptionDetails.cancelSuccess'), '', 'success')
    setLoading(false)
    toggleCancelSubscriptionModal(false)
  }, [
    setLoading,
    cancelSubscription,
    pretId,
    subscription,
    reason.key,
    cancellationReasons,
    comment,
    reloadSubscription,
    addNotification,
    translate,
    toggleCancelSubscriptionModal,
  ])

  return (
    <Modal open onClose={() => toggleCancelSubscriptionModal(false)}>
      <Title>{translate('customerDetails.cancelSubscriptionModal.title')}</Title>

      <FormWrapper>
        <Dropdown
          id="cancel-subscription-reason"
          label={translate('customerDetails.cancelSubscriptionModal.selectReason')}
          value={reason}
          options={cancellationReasons}
          onChange={(option: { key: string; label: string }) => setReason(option)}
        />
        <MaskedInput
          label={translate('customerDetails.cancelSubscriptionModal.comment')}
          onChange={setComment}
        />
      </FormWrapper>

      <ModalFooter>
        <Button onClick={() => toggleCancelSubscriptionModal(false)} styleType="secondary">
          {translate('customerDetails.cancelSubscriptionModal.cancel')}
        </Button>
        <Button onClick={onConfirm}>
          {translate('customerDetails.cancelSubscriptionModal.confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CancelSubscriptionModal
