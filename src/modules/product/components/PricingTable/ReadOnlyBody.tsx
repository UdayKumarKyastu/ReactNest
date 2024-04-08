import React from 'react'
import { ChannelPriceWithChanges } from '../../model/price'
import { withPercentage } from '../../../../util/withPercentage'
import { withCurrency } from '../../../../util/withCurrency'
import { convertFromCents } from '../../../../util/convertFromCents'
import ValueCell from './ValueCell'
import { PricingTableStyles } from './PricingTable.styles'
import { Locale } from '../../../i18n/Locale'

const { LabelCell, TableRow } = PricingTableStyles

interface Props {
  formFields: ChannelPriceWithChanges[]
  takeAwayTaxDisabled?: boolean
  takeAwayTax?: number
}

const ReadOnlyBody = ({ formFields, takeAwayTax, takeAwayTaxDisabled }: Props) => {
  const { locale } = Locale.useLocale()

  return (
    <tbody>
      {formFields.map((field, index) => (
        <TableRow key={`pricing-row-${field.channelName}-${index}`}>
          <LabelCell aria-label={field.channelLabel[locale]}>
            {field.channelLabel[locale]}
          </LabelCell>
          <ValueCell
            hasChanges={field.takeAwayPriceHasChanged}
            dataSelector={`${field.channelName}-takeAwayPrice`}
          >
            {withCurrency({
              locale,
              value: convertFromCents(field.takeAwayPrice.centAmount),
              currency: field.takeAwayPrice.currencyCode,
            })}
          </ValueCell>
          <ValueCell
            hasChanges={field.takeAwayClubPretHasChanged}
            dataSelector={`${field.channelName}-takeAwayClubPret`}
          >
            {withCurrency({
              locale,
              value: convertFromCents(field.takeAwayClubPret.centAmount),
              currency: field.takeAwayClubPret.currencyCode,
            })}
          </ValueCell>

          <ValueCell
            hasChanges={field.takeAwayTaxHasChanged}
            dataSelector={`${field.channelName}-takeAwayTax`}
          >
            {withPercentage({ locale, value: takeAwayTax || field.takeAwayTax })}
          </ValueCell>
          <ValueCell
            hasChanges={field.eatInPriceHasChanged}
            dataSelector={`${field.channelName}-eatInPrice`}
          >
            {withCurrency({
              locale,
              value: convertFromCents(field.eatInPrice.centAmount),
              currency: field.eatInPrice.currencyCode,
            })}
          </ValueCell>
          <ValueCell
            hasChanges={field.eatInClubPretHasChanged}
            dataSelector={`${field.channelName}-eatInClubPret`}
          >
            {withCurrency({
              locale,
              value: convertFromCents(field.eatInClubPret.centAmount),
              currency: field.eatInClubPret.currencyCode,
            })}
          </ValueCell>
          <ValueCell
            hasChanges={field.eatInTaxHasChanged}
            dataSelector={`${field.channelName}-eatInTaxRate`}
          >
            {withPercentage({ locale, value: field.eatInTax })}
          </ValueCell>
          <ValueCell
            hasChanges={field.deliveryPriceHasChanged}
            dataSelector={`${field.channelName}-deliveryPrice`}
          >
            {withCurrency({
              locale,
              value: convertFromCents(field.deliveryPrice.centAmount),
              currency: field.deliveryPrice.currencyCode,
            })}
          </ValueCell>
          <ValueCell
            hasChanges={field.deliveryTaxHasChanged}
            dataSelector={`${field.channelName}-deliveryTaxRate`}
          >
            {withPercentage({ locale, value: field.deliveryTax })}
          </ValueCell>
        </TableRow>
      ))}
    </tbody>
  )
}

export default ReadOnlyBody
