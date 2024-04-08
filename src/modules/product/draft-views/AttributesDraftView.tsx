import { FC } from 'react'
import { useAttributesSections } from '../sections/useAttributesSections'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { ProductVariant } from '../model/product-variant'
import { ProductStyles } from '../pages/styles'
import { ResourceSkus } from '../../../shared/model/resourceSkus'
import { AttributesReviewStatus } from '../model/review-statuses/attributes-review-status'

export declare namespace AttributesDraftView {
  export type Props = {
    productVariant: ProductVariant
    draftVariant: ProductVariant
    tabRoute: string
    resourceSkus?: ResourceSkus
    reviewStatuses?: AttributesReviewStatus
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const AttributesDraftView: FC<AttributesDraftView.Props> = ({
  productVariant,
  draftVariant,
  tabRoute,
  resourceSkus,
  reviewStatuses,
  reloadProduct,
}) => {
  const { translate } = Translation.useTranslation()
  const formFields = productVariant.attributes
  const draftChangesFormFields = draftVariant?.attributes
  const { sections } = useAttributesSections(
    formFields!,
    translate,
    draftChangesFormFields!,
    false,
    resourceSkus,
    reviewStatuses,
    true,
  )
  const { sections: draftSections } = useAttributesSections(
    draftChangesFormFields!,
    translate,
    formFields!,
    true,
    resourceSkus,
    reviewStatuses,
    true,
    reloadProduct,
  )

  if (draftVariant?.changesCount?.attributes! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantAttributes.variantAttributes')}
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
