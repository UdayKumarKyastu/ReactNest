import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { ProductVariant } from '../model/product-variant'
import { ProductStyles } from '../pages/styles'
import { usePricingSections } from '../sections/usePricingSections'
import { ResourceSkus } from '../../../shared/model/resourceSkus'

export declare namespace PricingDraftView {
  export type Props = {
    productVariant: ProductVariant
    draftVariant: ProductVariant
    tabRoute: string
    resourceSkus?: ResourceSkus
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const PricingDraftView = ({
  productVariant,
  draftVariant,
  tabRoute,
}: PricingDraftView.Props) => {
  const { translate } = Translation.useTranslation()

  const formFields = productVariant.prices
  const draftChangesFormFields = draftVariant.prices

  const { section } = usePricingSections(formFields, undefined, true)

  const { section: draftSection } = usePricingSections(formFields!, draftChangesFormFields!, true)

  if (draftVariant?.changesCount?.pricing! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantPricing.variantPricing')}
      </SectionHeading>
      <AllDraftChangesSideBySideView
        sections={[section]}
        draftSections={[draftSection]}
        sku={productVariant.masterSku}
        isAllDraftChangesView
        route={tabRoute}
      />
    </FullWidthSection>
  )
}
