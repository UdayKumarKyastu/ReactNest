import React from 'react'
import { CsvValidationStepStyles } from './CsvValidationStep.styles'
import { Translation } from '../../../i18n/Translation'
import { Button } from '@pretamanger/component-library'
import UploadStatus from '../UploadStatus/UploadStatus'

const { Root, Message, Footer } = CsvValidationStepStyles

interface Props {
  productsNumber: number
  filename: string
  onCancel: () => void
  onContinue: () => void
}

const CsvValidationStep = ({ productsNumber, onCancel, onContinue, filename }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <>
      <Root>
        {filename && <UploadStatus filename={filename} progress={100} onCancel={onCancel} />}
        <Message>{translate('pricingImport.validationInfo', { number: productsNumber })}</Message>
      </Root>

      <Footer>
        <Button onClick={onCancel} styleType="secondary">
          {translate('pricingImport.cancel')}
        </Button>
        <Button onClick={onContinue}>{translate('pricingImport.continueWithImport')}</Button>
      </Footer>
    </>
  )
}

export default CsvValidationStep
