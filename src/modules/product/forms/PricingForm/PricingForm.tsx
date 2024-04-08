import { EditForm } from '../EditForm/EditForm'
import { ChannelPrice } from '../../model/price'
import { PricingFormWithoutContext } from '../../../../modules/product/forms/PricingFormWithoutContext/PricingFormWithoutContext'
import { usePricingFormFields } from './usePricingFormFields'

export declare namespace PricingForm {
  export type FormFields = {
    prices: ChannelPrice[]
    takeawayTax?: number
  }

  export type Props = {
    formFields: FormFields
    onSubmit(values: FormFields): void
    sku: string
    takeAwayTaxDisabled?: boolean
  }
}

export const PricingForm = ({
  formFields,
  onSubmit,
  sku,
  takeAwayTaxDisabled,
}: PricingForm.Props) => {
  const pricingFormFields = usePricingFormFields(formFields.prices)

  return (
    <EditForm
      formFields={formFields}
      onSubmit={onSubmit}
      sku={sku}
      initialValues={{
        prices: pricingFormFields,
        takeawayTax: formFields.takeawayTax,
      }}
    >
      <PricingFormWithoutContext takeAwayTaxDisabled={takeAwayTaxDisabled} />
    </EditForm>
  )
}
