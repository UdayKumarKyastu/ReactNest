import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { EditMenuCategoryModalStyles } from './EditMenuCategoryModal.styles'
import { Locale } from '../../../i18n/Locale'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { ProductCategory } from '../../model/product-category'
import { CountryCode } from '../../../../shared/model/country-code'
import { ProductMenuCategorisationPage } from '../../pages/ProductMenuCategorisationPage/ProductMenuCategorisationPage'

export declare namespace EditMenuCategoryModal {
  export type Props = {
    onClose(): void
    onConfirm(categories: ProductCategory[], categoryIndex?: number | null): void
    open: boolean
    categories: Category[] | null
    countryCode: CountryCode
    categoryIndex?: number | null
    categoriesTree: ProductCategory[]
  }

  type Category = {
    id: string
    name: Locale.MultilangString
    key: string
  }
}

const { FormButtonsWrapper, Headline, ModalWrapper, SubmitButton } = EditMenuCategoryModalStyles

export const getSelectedCategoriesFromTree = (
  categories: EditMenuCategoryModal.Category[] | null,
  categoriesTree: ProductCategory[],
  countryCode: CountryCode,
) => {
  const selectedCategories = categories
    ? categories.reduce(
        (acc: ProductCategory[], curr: ProductMenuCategorisationPage.Category, index: number) => {
          let categoryFromTree
          if (index === 0) {
            categoryFromTree = categoriesTree.find((category) => category.categoryID === curr.id)
          } else {
            categoryFromTree = acc[index - 1]?.categories.find(
              (category) => category.categoryID === curr.id,
            )
          }

          return [...acc, categoryFromTree!]
        },
        [],
      )
    : [categoriesTree.find((category) => category.key === countryCode)!]

  return selectedCategories
}

const mapCategoryToDropdownOption = (option: ProductCategory, locale: Locale.Lang) => ({
  key: option.categoryID,
  label: option.categoryName[locale],
})

export const EditMenuCategoryModal = ({
  onClose,
  onConfirm,
  open,
  categoryIndex,
  categories,
  categoriesTree,
  countryCode,
}: EditMenuCategoryModal.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([])

  useEffect(() => {
    setSelectedCategories(getSelectedCategoriesFromTree(categories!, categoriesTree, countryCode))
  }, [categories, categoriesTree, countryCode])

  const renderDropdown = (items: ProductCategory[], index: number, disabled?: boolean) => {
    const renderLabel = () => {
      if (index === 0) {
        return translate('menuCategorisationPage.country')
      }

      if (index === 1) {
        return translate('menuCategorisationPage.category')
      }

      return translate('menuCategorisationPage.subcategory')
    }

    return (
      <Dropdown
        key={`category-${index}`}
        id={`category-${index}`}
        label={renderLabel()}
        value={
          selectedCategories[index]
            ? {
                key: selectedCategories[index].categoryID,
                label: selectedCategories[index].categoryName[locale],
              }
            : null
        }
        options={items.map((option) => mapCategoryToDropdownOption(option, locale))}
        onChange={(option: { key: string; label: string }) => {
          const selectedCategory = items.find((category) => category.categoryID === option?.key)

          const modifiedCategories = selectedCategories.filter(
            (category, currentIndex) => currentIndex <= index,
          )

          modifiedCategories[index] = selectedCategory!

          setSelectedCategories(modifiedCategories.filter((category) => Boolean(category)))
        }}
        disabled={disabled}
        isClearable
      />
    )
  }

  return (
    <ModalWrapper>
      <Modal onClose={onClose} open={open}>
        <Headline>{translate('menuCategorisationPage.editCategory')}</Headline>
        {renderDropdown(categoriesTree, 0, true)}
        {selectedCategories.map((category, index) => {
          if (category?.categories.length > 0) {
            return renderDropdown(category.categories, index + 1)
          }
          return null
        })}
        <FormButtonsWrapper>
          <Button styleType="secondary" onClick={onClose}>
            {translate('menuCategorisationPage.cancel')}
          </Button>
          <SubmitButton
            onClick={() => onConfirm(selectedCategories, categoryIndex)}
            data-cy="apply-category"
          >
            {translate('menuCategorisationPage.apply')}
          </SubmitButton>
        </FormButtonsWrapper>
      </Modal>
    </ModalWrapper>
  )
}
