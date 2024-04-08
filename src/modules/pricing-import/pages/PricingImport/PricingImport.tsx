import React from 'react'
import { PricingImportStyles } from './PricingImport.styles'
import { Translation } from '../../../i18n/Translation'
import PricingImporter from '../../components/PricingImporter/PricingImporter'
import { useUserPermissions } from '../../../auth/useUserPermissions'
import PermissionDrivenPage from '../../../common/components/PermissionDrivenPage/PermissionDrivenPage'

const { Wrapper, Title } = PricingImportStyles

const PricingImport = () => {
  const { translate } = Translation.useTranslation()
  const { canUsePricingImporter } = useUserPermissions()

  return (
    <PermissionDrivenPage hasPermissions={canUsePricingImporter}>
      <Wrapper data-testid="pricing-importer-page">
        <Title>{translate('pricingImport.title')}</Title>

        <PricingImporter />
      </Wrapper>
    </PermissionDrivenPage>
  )
}

export default PricingImport
