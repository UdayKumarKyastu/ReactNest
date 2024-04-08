import React from 'react'
import { PricingTableStyles } from './PricingTable.styles'
import { Translation } from '../../../i18n/Translation'

const { LabelCell, StyledTooltip, StyledCircleQuestion } = PricingTableStyles

interface Props {
  showTooltip?: boolean
}

const TableHead = ({ showTooltip }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <thead>
      <tr>
        <LabelCell />
        <LabelCell colSpan={3} aria-label={translate('productVariantPricing.takeAway')}>
          {translate('productVariantPricing.takeAway')}
        </LabelCell>
        <LabelCell colSpan={3} aria-label={translate('productVariantPricing.eatIn')}>
          {translate('productVariantPricing.eatIn')}
        </LabelCell>
        <LabelCell colSpan={2} aria-label={translate('productVariantPricing.delivery')}>
          {translate('productVariantPricing.delivery')}
        </LabelCell>
      </tr>
      <tr>
        <LabelCell />
        <LabelCell
          className="no-right-border"
          aria-label={translate('productVariantPricing.price')}
        >
          {translate('productVariantPricing.price')}
        </LabelCell>
        <LabelCell className="no-border" aria-label={translate('productVariantPricing.clubPret')}>
          {translate('productVariantPricing.clubPret')}
        </LabelCell>
        <LabelCell className="no-left-border" aria-label={translate('productVariantPricing.vat')}>
          {translate('productVariantPricing.vat')}
          {showTooltip && (
            <StyledTooltip text={translate('productVariantPricing.takeAwayTaxHelper')}>
              <StyledCircleQuestion
                height={'14px'}
                aria-label={translate('productVariantPricing.takeAwayTaxHelper')}
                data-testid="tax-tooltip-icon"
              />
            </StyledTooltip>
          )}
        </LabelCell>
        <LabelCell
          className="no-right-border"
          aria-label={translate('productVariantPricing.price')}
        >
          {translate('productVariantPricing.price')}
        </LabelCell>
        <LabelCell className="no-border" aria-label={translate('productVariantPricing.clubPret')}>
          {translate('productVariantPricing.clubPret')}
        </LabelCell>
        <LabelCell className="no-left-border" aria-label={translate('productVariantPricing.vat')}>
          {translate('productVariantPricing.vat')}
        </LabelCell>
        <LabelCell
          className="no-right-border"
          aria-label={translate('productVariantPricing.price')}
        >
          {translate('productVariantPricing.price')}
        </LabelCell>
        <LabelCell className="no-left-border" aria-label={translate('productVariantPricing.vat')}>
          {translate('productVariantPricing.vat')}
        </LabelCell>
      </tr>
    </thead>
  )
}

export default TableHead
