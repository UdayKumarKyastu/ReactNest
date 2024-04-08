import React from 'react'
import { Button, Modal, LoadingIndicator } from '@pretamanger/component-library'
import { ApproveAllDraftChangesModalStyles } from './ApproveAllDraftChangesModal.styles'
import { Translation } from '../../../i18n/Translation'

export declare namespace ApproveAllDraftChangesModal {
  export type Props = {
    onClose(): void
    onConfirm(): void
    open: boolean
    isSubmitting: boolean
    modalContent?: React.ReactElement
    reject?: boolean
  }
}

const { FormButtonsWrapper, Headline, Text, ModalWrapper, SubmitButton } =
  ApproveAllDraftChangesModalStyles

export const ApproveAllDraftChangesModal = ({
  onClose,
  onConfirm,
  open,
  isSubmitting,
  modalContent,
  reject,
}: ApproveAllDraftChangesModal.Props) => {
  const { translate } = Translation.useTranslation()

  const title = translate(`publishDraftChangesModal.${reject ? `rejectTitle` : `publishTitle`}`)
  const text = translate(`publishDraftChangesModal.${reject ? `rejectText` : `publishText`}`)
  const buttonText = translate(
    `publishDraftChangesModal.${reject ? `rejectButtonText` : `publishButtonText`}`,
  )

  return (
    <ModalWrapper>
      <Modal onClose={onClose} open={open}>
        <Headline data-cy="save-changes-modal-headline">{title}</Headline>
        <Text>{text}</Text>

        {modalContent}

        <FormButtonsWrapper>
          <Button styleType="secondary" onClick={onClose} data-cy="cancel-button">
            {translate('publishDraftChangesModal.cancelButtonText')}
          </Button>
          <SubmitButton onClick={onConfirm} data-cy="approve-button">
            <LoadingIndicator colour="white" size="small" on={isSubmitting}>
              <LoadingIndicator.On />
              <LoadingIndicator.Off>{buttonText}</LoadingIndicator.Off>
            </LoadingIndicator>
          </SubmitButton>
        </FormButtonsWrapper>
      </Modal>
    </ModalWrapper>
  )
}
