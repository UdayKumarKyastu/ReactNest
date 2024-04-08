import { Translation } from '../../../../modules/i18n/Translation'
import { ProductStyles } from '../../pages/styles'
import PricingTable from '../../components/PricingTable/PricingTable'
import { useFormikContext } from 'formik'
import { PricingForm } from '../../forms/PricingForm/PricingForm'

const { SectionHeading, Section } = ProductStyles

interface Props {
  takeAwayTaxDisabled?: boolean
}

export const PricingFormWithoutContext = ({ takeAwayTaxDisabled }: Props) => {
  const { translate } = Translation.useTranslation()
  const { values } = useFormikContext<PricingForm.FormFields>()

  return (
    <Section>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantPricing.variantPricing')}
      </SectionHeading>

      <PricingTable
        formFields={values.prices}
        takeAwayTax={values.takeawayTax}
        isFullView={true}
        isEditMode={true}
        takeAwayTaxDisabled={takeAwayTaxDisabled}
      />
    </Section>
  )
}
