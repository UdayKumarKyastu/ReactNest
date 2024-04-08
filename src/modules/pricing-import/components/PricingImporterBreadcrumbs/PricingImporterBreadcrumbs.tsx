import React from 'react'
import { PricingImporterBreadcrumbsStyles } from './PricingImporterBreadcrumbs.styles'
import { Translation } from '../../../i18n/Translation'

const { Wrapper, Step, Badge } = PricingImporterBreadcrumbsStyles

interface Props {
  step: 'upload' | 'validation' | 'apply' | 'completed'
}

const PricingImporterBreadcrumbs = ({ step }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <Step isActive={step === 'upload'}>
        <Badge isActive={step === 'upload'}>1</Badge>
        {translate('pricingImport.uploadCSV')}
      </Step>

      <Step isActive={step === 'validation'} data-testid="validation">
        <Badge isActive={step === 'validation'} data-testid="validation-badge">
          2
        </Badge>
        {translate('pricingImport.CSVValidation')}
      </Step>

      <Step isActive={step === 'apply'}>
        <Badge isActive={step === 'apply'}>3</Badge>
        {translate('pricingImport.applyChanges')}
      </Step>

      <Step isActive={step === 'completed'}>
        <Badge isActive={step === 'completed'}>4</Badge>
        {translate('pricingImport.importComplete')}
      </Step>
    </Wrapper>
  )
}

export default PricingImporterBreadcrumbs
