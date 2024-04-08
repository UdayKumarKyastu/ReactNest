import { useSetupSections } from '../sections/useSetupSections'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { Product } from '../model/product'
import { ProductStyles } from '../pages/styles'

export declare namespace SetupDraftView {
  export type Props = {
    product: Product
    tabRoute: string
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const SetupDraftView = ({ product, tabRoute, reloadProduct }: SetupDraftView.Props) => {
  const { translate } = Translation.useTranslation()
  const formFields = product.setUp
  const draftChangesFormFields = product.draftChanges.setUp
  const reviewStatuses = product.draftChanges.reviewStatuses?.setUp
  const { sections } = useSetupSections(
    formFields!,
    translate,
    draftChangesFormFields,
    false,
    { masterSku: product.sku },
    reviewStatuses,
  )
  const { sections: draftSections } = useSetupSections(
    draftChangesFormFields!,
    translate,
    formFields,
    true,
    { masterSku: product.sku },
    reviewStatuses,
    reloadProduct,
  )

  if (product.draftChanges.changesCount?.setUp! === 0) {
    return null
  }

  return (
    <FullWidthSection data-testid="setup-draft-view">
      <SectionHeading data-cy="section-heading">
        {translate('productPage.productSetup')}
      </SectionHeading>
      <AllDraftChangesSideBySideView
        sections={sections}
        draftSections={draftSections}
        sku={product.sku}
        isAllDraftChangesView
        route={tabRoute}
      />
    </FullWidthSection>
  )
}
