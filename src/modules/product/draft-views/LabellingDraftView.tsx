import { useLabellingSections } from '../sections/useLabellingSections/useLabellingSections'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { ProductVariant } from '../model/product-variant'
import { ProductStyles } from '../pages/styles'
import { LabellingReviewStatus } from '../model/review-statuses/labelling-review-status'
import { ResourceSkus } from '../../../shared/model/resourceSkus'

export declare namespace LabellingDraftView {
  export type Props = {
    productVariant: ProductVariant
    draftVariant: ProductVariant
    tabRoute: string
    reviewStatuses?: LabellingReviewStatus
    resourceSkus?: ResourceSkus
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const LabellingDraftView = ({
  productVariant,
  draftVariant,
  tabRoute,
  resourceSkus,
  reviewStatuses,
  reloadProduct,
}: LabellingDraftView.Props) => {
  const { translate } = Translation.useTranslation()
  const { sections } = useLabellingSections(
    productVariant,
    translate,
    draftVariant,
    false,
    true,
    resourceSkus,
    reviewStatuses,
  )
  const { sections: draftSections } = useLabellingSections(
    draftVariant,
    translate,
    productVariant,
    true,
    true,
    resourceSkus,
    reviewStatuses,
    reloadProduct,
  )

  if (draftVariant?.changesCount?.labelling! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantLabelling.variantLabelling')}
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
