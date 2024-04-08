import { useVariantMarketingSections } from '../sections/useVariantMarketingSections'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { ProductVariant } from '../model/product-variant'
import { ProductStyles } from '../pages/styles'
import { CountryCode } from '../../../shared/model/country-code'
import { getFormFieldsFromProduct } from '../../../util/getFormFieldsFromProduct'
import { MarketingReviewStatus } from '../model/review-statuses/marketing-review-status'
import { ResourceSkus } from '../../../shared/model/resourceSkus'

export declare namespace VariantMarketingDraftView {
  export type Props = {
    productVariant: ProductVariant
    draftVariant: ProductVariant
    tabRoute: string
    countryCode: CountryCode
    reviewStatuses?: MarketingReviewStatus
    resourceSkus?: ResourceSkus
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const VariantMarketingDraftView = ({
  productVariant,
  draftVariant,
  tabRoute,
  countryCode,
  reviewStatuses,
  resourceSkus,
  reloadProduct,
}: VariantMarketingDraftView.Props) => {
  const { translate } = Translation.useTranslation()
  const formFields = getFormFieldsFromProduct(productVariant)
  const draftChangesFormFields = getFormFieldsFromProduct(draftVariant)

  const { sections } = useVariantMarketingSections({
    formFields,
    countryCode,
    fieldsToCompare: draftChangesFormFields,
    isSideBySide: true,
    resourceSkus: resourceSkus,
    reviewStatuses,
    isDraftView: true,
  })

  const { sections: draftSections } = useVariantMarketingSections({
    formFields: draftChangesFormFields,
    countryCode,
    fieldsToCompare: formFields,
    isSideBySide: true,
    sectionWithChanges: true,
    resourceSkus: resourceSkus,
    reviewStatuses,
    isDraftView: true,
    reloadProduct,
  })

  if (draftVariant?.changesCount?.marketing! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productPage.variantMarketing')}
      </SectionHeading>
      <AllDraftChangesSideBySideView
        sections={sections}
        draftSections={draftSections}
        sku={productVariant.masterSku}
        isAllDraftChangesView
        route={tabRoute}
      />
    </FullWidthSection>
  )
}
