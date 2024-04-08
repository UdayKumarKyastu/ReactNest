import { ProductStyles } from '../pages/styles'
import { useTaxationSections } from '../sections/useTaxationSections'
import { TaxCategory } from '../model/tax-category'
import { SideBySideView } from '../components/SideBySideView/SideBySideView'

const { FullWidthSection, TabWrapper } = ProductStyles

export declare namespace TaxationDraftView {
  export type Props = {
    taxCategory: TaxCategory
    draftTaxCategory: TaxCategory
    availableTaxCategories: TaxCategory[]
  }
}

export const TaxationDraftView = ({
  taxCategory,
  draftTaxCategory,
  availableTaxCategories,
}: TaxationDraftView.Props) => {
  const { sections } = useTaxationSections({
    formFields: {
      taxCategory: taxCategory,
    },
    availableTaxCategories: availableTaxCategories,
    fieldsToCompare: {
      taxCategory: draftTaxCategory,
    },
  })

  const { sections: draftSection } = useTaxationSections({
    formFields: {
      taxCategory: draftTaxCategory,
    },
    fieldsToCompare: {
      taxCategory: taxCategory,
    },
    availableTaxCategories: availableTaxCategories,
    sectionWithChanges: true,
  })

  return (
    <TabWrapper inModal>
      <FullWidthSection>
        <SideBySideView sections={sections} draftSections={draftSection} numberOfChanges={1} />
      </FullWidthSection>
    </TabWrapper>
  )
}
