import { useMenuCategorisationSections } from '../sections/useMenuCategorisationSections'
import { AllDraftChangesSideBySideView } from '../components/AllDraftChangesSideBySideView/AllDraftChangesSideBySideView'
import { Translation } from '../../i18n/Translation'
import { Product } from '../model/product'
import { ProductStyles } from '../pages/styles'
import { Locale } from '../../i18n/Locale'

export declare namespace MenuCategorisationDraftView {
  export type Props = {
    product: Product
    tabRoute: string
    reloadProduct?: () => void
  }
}

const { FullWidthSection, SectionHeading } = ProductStyles

export const MenuCategorisationDraftView = ({
  product,
  tabRoute,
  reloadProduct,
}: MenuCategorisationDraftView.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const reviewStatuses = product.draftChanges.reviewStatuses?.categories
  const resourceSkus = { masterSku: product.sku }
  const { sections } = useMenuCategorisationSections({
    formFields: { categories: product.categories },
    translate,
    pageLocale: locale,
    fieldsToCompare: { categories: product.draftChanges.categories || [] },
    reviewStatuses,
    resourceSkus,
  })

  const { sections: draftSections } = useMenuCategorisationSections({
    formFields: { categories: product.draftChanges.categories || [] },
    translate,
    pageLocale: locale,
    fieldsToCompare: { categories: product.categories },
    sectionWithChanges: true,
    reviewStatuses,
    resourceSkus,
    reloadProduct,
  })

  if (product.draftChanges.changesCount?.categories! === 0) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productPage.menuCategorisation')}
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
