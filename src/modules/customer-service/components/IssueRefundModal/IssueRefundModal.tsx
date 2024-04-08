import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal } from '@pretamanger/component-library'
import { IssueRefundModalStyles } from './IssueRefundModal.styles'
import { Translation } from '../../../i18n/Translation'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'
import { useInvoice } from '../../api/useInvoice'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { RefundReason } from '../../model/RefundReason'
import { DECIMAL_REGEX } from '../../../common/constants'

const { Title, ModalFooter, ModalWrapper, FormWrapper, StyledInput } = IssueRefundModalStyles

const IssueRefundModal = () => {
  const { translate } = Translation.useTranslation()
  const [reasonsList, setReasonsList] = useState<RefundReason[]>([])
  const [reason, setReason] = useState<{ key: string; label: string }>()
  const [amount, setAmount] = useState('')
  const {
    state: { selectedInvoice },
    actions: { toggleRefundModal, toggleRefundConfirmationModal },
  } = CustomerDetailsState.useState()
  const { getRefundReasons } = useInvoice()

  useEffect(() => {
    getRefundReasons().then((reasons) => setReasonsList(reasons))
  }, [getRefundReasons])

  const onConfirm = useCallback(() => {
    const parsedAmount = parseFloat((parseFloat(amount) * 100).toFixed(0))
    toggleRefundConfirmationModal(true, reason!.key, parsedAmount)
  }, [amount, reason, toggleRefundConfirmationModal])

  const validationMessage = useMemo(() => {
    const leftToRefund =
      (selectedInvoice?.amount_paid! - (selectedInvoice?.amount_refunded || 0)) / 100
    return leftToRefund < parseFloat(amount)
      ? translate('customerDetails.refundConfirmationModal.amountToHigh')
      : undefined
  }, [amount, selectedInvoice, translate])

  return (
    <ModalWrapper>
      <Modal open onClose={() => toggleRefundModal(false)}>
        <Title>{translate('customerDetails.issueRefundModal.title')}</Title>

        <FormWrapper>
          <Dropdown
            id="invoice-refund-reason"
            label={translate('customerDetails.issueRefundModal.reasonLabel')}
            value={reason}
            options={reasonsList}
            onChange={(option: { key: string; label: string }) => setReason(option)}
          />

          <StyledInput
            label={translate('customerDetails.issueRefundModal.refundAmount')}
            mask={DECIMAL_REGEX}
            onChange={(value) => setAmount(value)}
            value={amount.toString()}
            adornment={validationMessage}
          />
        </FormWrapper>

        <ModalFooter>
          <Button onClick={onConfirm} disabled={!reason || !amount || validationMessage}>
            {translate('customerDetails.issueRefundModal.refund')}
          </Button>
        </ModalFooter>
      </Modal>
    </ModalWrapper>
  )
}

export default IssueRefundModal
