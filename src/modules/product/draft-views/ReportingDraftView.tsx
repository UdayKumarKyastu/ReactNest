import { FC } from 'react'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { ProductVariant } from '../model/product-variant'
import { ProductStyles } from '../pages/styles'
import { getFormFieldsFromProduct } from '../pages/ProductVariantReportingPage/ProductVariantReportingPage'
import { useReportingSections } from '../sections/useReportingSections'
import { ProductType } from '../model/product-type'
import { ReportingReviewStatus } from '../model/review-statuses/reporting-review-status'
import { ResourceSkus } from '../../../shared/model/resourceSkus'

export declare namespace ReportingDraftView {
  export type Props = {
    productVariant: ProductVariant
    draftVariant: ProductVariant
    productType: ProductType
    tabRoute: string
    reviewStatuses?: ReportingReviewStatus
    resourceSkus?: ResourceSkus
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const ReportingDraftView: FC<ReportingDraftView.Props> = ({
  productVariant,
  draftVariant,
  productType,
  tabRoute,
  resourceSkus,
  reviewStatuses,
  reloadProduct,
}) => {
  const { translate } = Translation.useTranslation()
  const formFields = getFormFieldsFromProduct(productVariant)
  const draftChangesFormFields = getFormFieldsFromProduct(draftVariant)

  const { sections } = useReportingSections(
    formFields,
    translate,
    productType,
    draftChangesFormFields,
    false,
    true,
    resourceSkus,
    reviewStatuses,
  )
  const { sections: draftSections } = useReportingSections(
    draftChangesFormFields,
    translate,
    productType,
    formFields,
    true,
    true,
    resourceSkus,
    reviewStatuses,
    reloadProduct,
  )

  if (draftVariant?.changesCount?.reporting! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productPage.variantReporting')}
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
