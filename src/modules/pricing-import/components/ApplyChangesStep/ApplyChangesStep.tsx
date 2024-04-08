import React, { useCallback, useState } from 'react'
import ConfirmImportModal from '../ConfirmImportModal/ConfirmImportModal'
import { ApplyChangesStepStyles } from './ApplyChangesStep.styles'
import { Translation } from '../../../i18n/Translation'
import { Button } from '@pretamanger/component-library'
import { PricingImporterApi } from '../../api/pricingImporter.api'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'
import { ImportState } from '../../model/ImportStatus'
import { ImporterError } from '../../model/UploadResponse'

const { Root, Message, Footer, LoadingWrapper } = ApplyChangesStepStyles

interface Props {
  productsNumber: number
  onCancel: () => void
  filename: string
  importId: string
  onCompleted: (errors: ImporterError[]) => void
}

const ApplyChangesStep = ({ productsNumber, onCancel, importId, onCompleted }: Props) => {
  const { translate } = Translation.useTranslation()
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { triggerImport, getImportStatus } = PricingImporterApi.usePricesImport()

  const waitForImport = useCallback(async () => {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

    while (true) {
      const { status, errors } = await getImportStatus(importId)
      if (status === ImportState.Completed) {
        return errors
      }
      await delay()
    }
  }, [getImportStatus, importId])

  const startImport = useCallback(async () => {
    try {
      setIsLoading(true)
      await triggerImport(importId)
      const errors = await waitForImport()
      onCompleted(errors)
    } finally {
      setIsLoading(false)
    }
  }, [importId, onCompleted, triggerImport, waitForImport])

  const onModalClose = useCallback(
    (confirmed: boolean) => {
      if (confirmed) {
        startImport()
      }
      setIsConfirmModalVisible(false)
    },
    [startImport],
  )

  return (
    <>
      <Root>
        {isLoading && (
          <LoadingWrapper>
            <LoadingSpinner />
          </LoadingWrapper>
        )}

        {!isLoading && (
          <Message>{translate('pricingImport.applyInfo', { number: productsNumber })}</Message>
        )}
        {isConfirmModalVisible && (
          <ConfirmImportModal productsNumber={productsNumber} onClose={onModalClose} />
        )}
      </Root>

      <Footer>
        <Button onClick={onCancel} styleType="secondary">
          {translate('pricingImport.cancel')}
        </Button>
        <Button
          data-testid="apply-changes-button"
          onClick={() => setIsConfirmModalVisible(true)}
          disabled={isLoading}
        >
          {translate('pricingImport.applyChanges')}
        </Button>
      </Footer>
    </>
  )
}

export default ApplyChangesStep
