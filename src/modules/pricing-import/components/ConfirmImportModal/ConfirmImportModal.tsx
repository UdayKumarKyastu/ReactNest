import React, { useState } from 'react'
import { ConfirmImportModalStyles } from './ConfirmImportModal.styles'
import { Button, Checkbox, Modal } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'

const { ModalWrapper, Title, Message, ModalFooter } = ConfirmImportModalStyles

interface Props {
  productsNumber: number
  onClose: (confirmed: boolean) => void
}

const ConfirmImportModal = ({ productsNumber, onClose }: Props) => {
  const { translate } = Translation.useTranslation()
  const [confirmed, setConfirmed] = useState(false)

  return (
    <ModalWrapper data-testid="confirmation-modal">
      <Modal open onClose={() => onClose(false)}>
        <Title>{translate('pricingImport.confirmationModal.title')}</Title>
        <Message>
          {translate('pricingImport.confirmationModal.message', { number: productsNumber })}
        </Message>

        <Checkbox
          id="import-confirmation"
          data-testid="import-confirmation"
          label={translate('pricingImport.confirmationModal.checkboxLabel')}
          onChange={() => setConfirmed(!confirmed)}
        />

        <ModalFooter>
          <Button styleType="secondary" onClick={() => onClose(false)}>
            {translate('pricingImport.confirmationModal.cancel')}
          </Button>
          <Button disabled={!confirmed} onClick={() => onClose(true)} data-testid="confirm-button">
            {translate('pricingImport.confirmationModal.confirm')}
          </Button>
        </ModalFooter>
      </Modal>
    </ModalWrapper>
  )
}

export default ConfirmImportModal
