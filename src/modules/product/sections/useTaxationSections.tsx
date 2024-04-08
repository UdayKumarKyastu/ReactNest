import { Translation } from '../../i18n/Translation'
import { ProductStyles } from '../pages/styles'
import { TaxCategory } from '../model/tax-category'
import { useMemo } from 'react'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'

const { Section, SubsectionHeading } = ProductStyles

export const useTaxationSections = ({
  formFields,
  fieldsToCompare,
  availableTaxCategories,
  sectionWithChanges,
}: {
  formFields: { taxCategory: TaxCategory | null }
  fieldsToCompare: { taxCategory: TaxCategory | null }
  availableTaxCategories: TaxCategory[]
  sectionWithChanges?: boolean
}) => {
  const { translate } = Translation.useTranslation()

  const hasFieldChanged = useMemo(() => {
    return formFields?.taxCategory?.id !== fieldsToCompare?.taxCategory?.id
  }, [fieldsToCompare, formFields])

  const sections = [
    <Section key="menu-categories">
      <SubsectionHeading>{translate('taxationPage.percentageOfTaxAppliedTo')}</SubsectionHeading>
      <ReadonlyFieldWrapper
        showArrow={sectionWithChanges && hasFieldChanged}
        presentChange={hasFieldChanged}
        label={translate('taxationFieldLabelage.categoryLabel')}
      >
        {availableTaxCategories.find((cat) => cat.id === formFields?.taxCategory?.id)?.name ||
          translate('taxationPage.noCategoryFallbackLabel')}
      </ReadonlyFieldWrapper>
    </Section>,
  ]

  return {
    sections,
  }
}
