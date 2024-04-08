import React from 'react'
import { Button, Modal } from '@pretamanger/component-library'
import { EditDiscardConfirmationModalStyles } from './EditDiscardConfirmationModal.styles'
import { Translation } from '../../../i18n/Translation'

export declare namespace EditDiscardConfirmationModal {
  export type Props = {
    onClose(): void
    onConfirm(): void
    open: boolean
  }
}

const { FormButtonsWrapper, Headline, SubHeadline, Text, ModalWrapper } =
  EditDiscardConfirmationModalStyles

export const EditDiscardConfirmationModal = ({
  onClose,
  onConfirm,
  open,
}: EditDiscardConfirmationModal.Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <ModalWrapper>
      <Modal onClose={onClose} open={open}>
        <Headline data-cy="discard-changes-modal-headline">
          {translate('editDiscardModal.headline')}
        </Headline>
        <SubHeadline>{translate('editDiscardModal.subHeadline')}</SubHeadline>
        <Text>{translate('editDiscardModal.text')}</Text>
        <FormButtonsWrapper>
          <Button styleType="secondary" onClick={onClose} data-cy="cancel-button">
            {translate('editDiscardModal.cancelButtonText')}
          </Button>
          <Button onClick={onConfirm} data-cy="confirm-button">
            {translate('editDiscardModal.confirmButtonText')}
          </Button>
        </FormButtonsWrapper>
      </Modal>
    </ModalWrapper>
  )
}
