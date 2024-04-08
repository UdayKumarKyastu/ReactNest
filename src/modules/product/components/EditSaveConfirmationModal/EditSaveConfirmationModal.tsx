import React from 'react'
import { Button, LoadingIndicator, Modal } from '@pretamanger/component-library'
import { EditSaveConfirmationModalStyles } from './EditSaveConfirmationModal.styles'
import { Translation } from '../../../i18n/Translation'

export declare namespace EditDiscardConfirmationModal {
  export type Props = {
    onClose(): void
    onConfirm(): void
    open: boolean
    isSubmitting: boolean
  }
}

const { FormButtonsWrapper, Headline, SubHeadline, Text, SubmitButton, ModalWrapper } =
  EditSaveConfirmationModalStyles

/**
 * TODO Consider creating reusable modal templates
 */
export const EditSaveConfirmationModal = ({
  onClose,
  onConfirm,
  open,
  isSubmitting,
}: EditDiscardConfirmationModal.Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <ModalWrapper>
      <Modal onClose={onClose} open={open}>
        <Headline data-cy="save-changes-modal-headline" data-testid="save-changes-modal-headline">
          {translate('editSaveModal.headline')}
        </Headline>
        <SubHeadline>{translate('editSaveModal.subHeadline')}</SubHeadline>
        <Text>{translate('editSaveModal.text')}</Text>
        <FormButtonsWrapper>
          <Button styleType="secondary" onClick={onClose} data-cy="cancel-button">
            {translate('editSaveModal.cancelButtonText')}
          </Button>
          <SubmitButton onClick={onConfirm} data-cy="approve-button" data-testid="approve-button">
            <LoadingIndicator colour="white" size="small" on={isSubmitting}>
              <LoadingIndicator.On />
              <LoadingIndicator.Off>
                {translate('editSaveModal.confirmButtonText')}
              </LoadingIndicator.Off>
            </LoadingIndicator>
          </SubmitButton>
        </FormButtonsWrapper>
      </Modal>
    </ModalWrapper>
  )
}
