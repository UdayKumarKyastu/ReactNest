import { Fragment, useCallback, useMemo } from 'react'
import { isEqual } from 'lodash'
import { Translation } from '../../i18n/Translation'
import { ProductStyles } from '../pages/styles'
import { Locale } from '../../i18n/Locale'
import { ProductMenuCategorisationPage } from '../pages/ProductMenuCategorisationPage/ProductMenuCategorisationPage'
import { ProductMenuCategorisationPageStyles } from '../pages/ProductMenuCategorisationPage/ProductMenuCategorisationPage.style'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { ResourceSkus } from 'src/shared/model/resourceSkus'
import { MenuCategoriesReviewStatus } from '../model/review-status'
import { useUserPermissions } from '../../auth/useUserPermissions'
import { LocaleMock } from '../../i18n/LocaleMock'

const { Section } = ProductStyles

const { CategoryItemWrapper, MissingCategoryNameLabel } = ProductMenuCategorisationPageStyles

export const useMenuCategorisationSections = ({
  formFields,
  translate,
  pageLocale,
  fieldsToCompare,
  sectionWithChanges,
  reviewStatuses,
  resourceSkus,
  reloadProduct,
}: {
  formFields: ProductMenuCategorisationPage.FormFields
  translate: Translation.TranslationFunc
  pageLocale: Locale.Lang
  fieldsToCompare: ProductMenuCategorisationPage.FormFields
  sectionWithChanges?: boolean
  resourceSkus?: ResourceSkus
  reviewStatuses?: MenuCategoriesReviewStatus[]
  reloadProduct?: () => void
}) => {
  const { canReviewMenuCategorisation } = useUserPermissions()
  const isFieldChanged = (
    field: ProductMenuCategorisationPage.Category[],
    toCompare: ProductMenuCategorisationPage.Category[],
  ) => {
    return !isEqual(field, toCompare)
  }

  const getReviewStatus = useCallback(
    (category: ProductMenuCategorisationPage.Category[]) => {
      const categoryIds = category.map(({ id }) => id)
      return reviewStatuses?.find(({ value }) => value.every((id) => categoryIds.includes(id)))
    },
    [reviewStatuses],
  )

  const categories = useMemo(() => {
    return !formFields.categories.length && reviewStatuses?.length && sectionWithChanges
      ? reviewStatuses.map(({ value }) => [
          { id: value[0], name: LocaleMock.createMultiLangMock(' ', true), key: '' },
        ])
      : formFields.categories
  }, [formFields.categories, reviewStatuses, sectionWithChanges])

  const sections = [
    <Section key="menu-categories">
      {categories.map((category, index) => {
        const id = `category-${index}`
        const reviewStatus = getReviewStatus(category)
        const hasFieldChanged = isFieldChanged(fieldsToCompare?.categories[index]!, category)

        return (
          <CategoryItemWrapper key={id + index}>
            <ReadonlyFieldWrapper
              showArrow={sectionWithChanges && hasFieldChanged}
              presentChange={hasFieldChanged}
              label={`${translate('productPage.fields.menuCategory')} ${index + 1}`}
              resourceSkus={resourceSkus}
              reviewStatus={reviewStatus}
              fieldName="category"
              hideButtons={!!(!sectionWithChanges && reviewStatus)}
              isHidden={sectionWithChanges && !hasFieldChanged}
              fieldValue={reviewStatus?.value}
              reloadProduct={reloadProduct}
              tabName="categories"
              canApproveChanges={canReviewMenuCategorisation}
            >
              {category.map((cat, index) => {
                const categoryName = cat.name[pageLocale]
                const isLast = index === category.length - 1

                if (!categoryName) {
                  return (
                    <Fragment key={cat.key + index}>
                      <MissingCategoryNameLabel>
                        {translate('menuCategorisationPage.missingCategoryName')}
                      </MissingCategoryNameLabel>
                      {!isLast && <span>{' > '}</span>}
                    </Fragment>
                  )
                }

                return (
                  <Fragment key={cat.key + index}>
                    <span>{categoryName}</span>
                    {!isLast && <span>{' > '}</span>}
                  </Fragment>
                )
              })}
            </ReadonlyFieldWrapper>
          </CategoryItemWrapper>
        )
      })}
    </Section>,
  ]

  return {
    sections,
  }
}
