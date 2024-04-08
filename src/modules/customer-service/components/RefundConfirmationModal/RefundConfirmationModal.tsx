import React, { useCallback, useState } from 'react'
import { Button, Modal } from '@pretamanger/component-library'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'
import { RefundConfirmationModalStyles } from './RefundConfirmationModal.styles'
import { Translation } from '../../../i18n/Translation'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'
import { useInvoice } from '../../api/useInvoice'
import { NotificationsState } from '../../../notifications/state/NotificationsState'
import { StringParam, useQueryParam } from 'use-query-params'
import { useCustomer } from '../../api/useCustomer'

const { Title, InputWrapper, ModalFooter } = RefundConfirmationModalStyles

const RefundConfirmationModal = () => {
  const { translate } = Translation.useTranslation()
  const {
    actions: { toggleRefundConfirmationModal, fetchInvoices, setLoading },
    state: { selectedInvoice, refundReason, refundAmount },
  } = CustomerDetailsState.useState()
  const [comment, setComment] = useState('')
  const { refundInvoice } = useInvoice()
  const { getInvoices } = useCustomer()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()
  const [pretId] = useQueryParam('pretId', StringParam)

  const onConfirm = useCallback(async () => {
    try {
      setLoading(true)
      await refundInvoice(pretId!, selectedInvoice!.id, refundAmount!, refundReason!, comment)
      addNotification(translate('customerDetails.refundConfirmationModal.success'), '', 'success')
      const invoices = await getInvoices(pretId!)
      fetchInvoices(invoices)
    } catch (error: unknown) {
      const errorMessage = (error as Error).message
      addNotification(errorMessage, '', 'critical')
    } finally {
      setLoading(false)
      toggleRefundConfirmationModal(false)
    }
  }, [
    addNotification,
    comment,
    fetchInvoices,
    getInvoices,
    pretId,
    refundAmount,
    refundInvoice,
    refundReason,
    selectedInvoice,
    setLoading,
    toggleRefundConfirmationModal,
    translate,
  ])

  return (
    <Modal open onClose={() => toggleRefundConfirmationModal(false)}>
      <Title>{translate('customerDetails.refundConfirmationModal.title')}</Title>

      <InputWrapper>
        <MaskedInput
          label={translate('customerDetails.refundConfirmationModal.comment')}
          onChange={setComment}
        />
      </InputWrapper>

      <ModalFooter>
        <Button onClick={() => toggleRefundConfirmationModal(false)} styleType="secondary">
          {translate('customerDetails.refundConfirmationModal.cancel')}
        </Button>
        <Button onClick={onConfirm}>
          {translate('customerDetails.refundConfirmationModal.confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default RefundConfirmationModal
