import React, { FC, useCallback, useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Cross, LoadingIndicator, Notice } from '@pretamanger/component-library'
import { isEqual, isNumber } from 'lodash'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { Locale } from '../../../i18n/Locale'
import { ProductMenuCategorisationPageStyles } from './ProductMenuCategorisationPage.style'
import { ProductEditState } from '../../ProductEditState'
import { EditDiscardConfirmationModal } from '../../components/EditDiscardConfirmationModal/EditDiscardConfirmationModal'
import { EditSaveConfirmationModal } from '../../components/EditSaveConfirmationModal/EditSaveConfirmationModal'
import { EditMenuCategoryModal } from '../../components/EditMenuCategoryModal/EditMenuCategoryModal'
import { SingleProductState } from '../../SingleProductState'
import { ProductApi } from '../../api/product.api'
import { Product } from '../../model/product'
import { RemoveIcon } from '../../../../icons/Remove'
import { DraftChangesExistNotice } from '../../components/DraftChangesExistNotice/DraftChangesExistNotice'
import {
  SideBySideTable,
  SideBySideTableColumn,
  SideBySideTableRow,
  TableSectionHeadline,
} from '../../../common/components/SideBySideTable/SideBySideTable'
import { SavedDraftChangesConfirmation } from '../../components/SavedDraftChangesConfirmation/SavedDraftChangesConfirmation'
import { ProductCategory } from '../../model/product-category'
import { DiscardIcon } from '../../../../icons/Discard'
import { useMenuCategorisationSections } from '../../sections/useMenuCategorisationSections'
import { NoInformationAvailableMessage } from '../../components/NoInformationAvailableMessage/NoInformationAvailableMessage'

export declare namespace ProductMenuCategorisationPage {
  export type Props = {
    categories: Category[][]
  }

  export type Category = {
    id: string
    name: Locale.MultilangString
    key: string
  }

  export type FormFields = {
    categories: Category[][]
  }

  export type EditingViewProps = {
    formFields: FormFields
    sku: string
    onSubmit(values: FormFields): void
    countryCode: Product['countryCode']
  }

  export type SideBySideProps = {
    product: Product
    fromEdit: boolean
  }
}

const {
  TabWrapper,
  SectionHeading,
  EditButton,
  StyledInput,
  CloseButton,
  FormButtonsWrapper,
  InputWrapper,
  Section,
  FullWidthSection,
  DiscardButton,
} = ProductStyles

const { RemoveButton, AddCategoryButton } = ProductMenuCategorisationPageStyles

const EditingView: FC<ProductMenuCategorisationPage.EditingViewProps> = ({
  formFields,
  sku,
  onSubmit,
  countryCode,
}) => {
  const {
    action: {
      userRequestDiscardEdit,
      userCancelSaveChanges,
      userCancelDiscardEdit,
      userRequestSaveChanges,
      userConfirmDiscardEdit,
    },
    state,
    selector: { isEditConfirmModalOpen },
  } = ProductEditState.useState()

  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [categoriesTree, setCategoriesTree] = useState<ProductCategory[]>()
  const [removedCategories, setRemovedCategories] = useState<
    ProductMenuCategorisationPage.Category[][]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const isRendered = useRef(false)

  const { fetchProductCategories } = ProductApi.useGetProductCategories()

  useEffect(() => {
    setIsLoading(true)
    fetchProductCategories(sku).then((data) => {
      setCategoriesTree(data.categories)
      setIsLoading(false)
    })
  }, [fetchProductCategories, sku])

  const { values, handleSubmit, initialValues, submitForm, setFieldValue } =
    useFormik<ProductMenuCategorisationPage.FormFields>({
      onSubmit(values) {
        onSubmit({
          categories: values.categories,
        })
      },
      initialValues: {
        categories: formFields.categories,
      },
    })

  const thereAreNoChanges = isEqual(values, initialValues)

  const [currentCategory, setCurrentCategory] = useState<{
    category: ProductMenuCategorisationPage.Category[] | null
    index: number
  } | null>()

  const handleDiscard = () => {
    if (thereAreNoChanges) {
      userConfirmDiscardEdit()
    } else {
      userRequestDiscardEdit()
    }
  }

  const handleRemoveCategory = (categoryIndex: number) => {
    const categoryToRemove = values.categories.find((category, index) => index === categoryIndex)!
    const filteredCategories = values.categories.map((category, index) =>
      categoryIndex === index ? null : category,
    )
    setRemovedCategories((prev) => {
      const newRemovedCategories = [...prev]
      newRemovedCategories[categoryIndex] = categoryToRemove

      return newRemovedCategories
    })
    setFieldValue('categories', filteredCategories)
  }

  const handleRevertCategoryRemove = (categoryIndex: number) => {
    const revertedCategories = [...values.categories]
    revertedCategories[categoryIndex] = removedCategories[categoryIndex]
    setFieldValue('categories', revertedCategories)
  }

  const handleEditCategory = (categories: ProductCategory[], index?: number) => {
    const newCategories = [...values.categories]
    const mappedCategories = categories.map((category) => ({
      id: category.categoryID,
      name: category.categoryName,
      key: category.key,
    }))

    if (isNumber(index) && categories) {
      newCategories[index] = mappedCategories
      setFieldValue('categories', newCategories)
    } else {
      setFieldValue('categories', [...values.categories, mappedCategories])
    }

    setIsEditModalOpen(false)
  }

  const handleEditCategoryModalOpen = (
    category: ProductMenuCategorisationPage.Category[] | null,
    index: number,
  ) => {
    setCurrentCategory({
      category,
      index,
    })
  }

  const handleAddCategoryModalOpen = () => {
    setCurrentCategory(null)
    setIsEditModalOpen(true)
  }

  useEffect(() => {
    isRendered.current && setIsEditModalOpen(true)
  }, [currentCategory])

  useEffect(() => {
    isRendered.current = true
  }, [])

  if (isLoading) {
    return (
      <TabWrapper>
        <FullWidthSection>
          <SectionHeading data-cy="section-heading">
            {translate('productPage.menuCategorisation')}
          </SectionHeading>
          <LoadingIndicator size="medium" on>
            <LoadingIndicator.On />
          </LoadingIndicator>
        </FullWidthSection>
      </TabWrapper>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <EditDiscardConfirmationModal
        onConfirm={userConfirmDiscardEdit}
        onClose={userCancelDiscardEdit}
        open={state.type === 'during-edit-discarding'}
      />
      <EditSaveConfirmationModal
        isSubmitting={state.type === 'during-api-submitting'}
        onConfirm={submitForm}
        onClose={userCancelSaveChanges}
        open={isEditConfirmModalOpen}
      />
      {isEditModalOpen && (
        <EditMenuCategoryModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={handleEditCategory}
          categoryIndex={currentCategory?.index}
          categories={currentCategory?.category!}
          categoriesTree={categoriesTree!}
          countryCode={countryCode}
        />
      )}
      <TabWrapper>
        <SectionHeading data-cy="section-heading">
          {translate('productPage.menuCategorisation')}
        </SectionHeading>
        <CloseButton type="button" onClick={handleDiscard} data-testid="cross-button">
          <Cross colour="grey-700" width="15px" height="15px" />
        </CloseButton>
        <Section>
          {values.categories.map((category, index) => {
            if (!category) {
              return (
                <InputWrapper>
                  <Notice
                    title={translate('menuCategorisationPage.categoryRemoved')}
                    variant="warning"
                    key={index}
                  />
                  <DiscardButton type="button" onClick={() => handleRevertCategoryRemove(index)}>
                    <DiscardIcon size={18} />
                  </DiscardButton>
                </InputWrapper>
              )
            }
            const id = `category-${index}`
            const categoryValue = category.map((cat, index) => {
              const categoryName = cat.name[locale]
              const isLast = index === category.length - 1

              if (!categoryName) {
                return `${translate('menuCategorisationPage.missingCategoryName')} ${
                  !isLast ? ' > ' : ''
                }`
              }

              return `${categoryName!} ${!isLast ? ' > ' : ''}`
            })

            return (
              <InputWrapper key={id}>
                <StyledInput
                  id={id}
                  name={id}
                  label={`${translate('productPage.fields.menuCategory')} ${index + 1}`}
                  value={categoryValue.join('')}
                  type="text"
                  onClick={() => handleEditCategoryModalOpen(category, index)}
                  data-cy="category-input"
                />
                <RemoveButton type="button" onClick={() => handleRemoveCategory(index)}>
                  <RemoveIcon size={18} />
                </RemoveButton>
              </InputWrapper>
            )
          })}
          <AddCategoryButton onClick={handleAddCategoryModalOpen}>
            {`+ ${translate('menuCategorisationPage.addNewCategory')}`}
          </AddCategoryButton>
        </Section>
      </TabWrapper>
      <FormButtonsWrapper>
        <Button onClick={handleDiscard} styleType="secondary" data-testid="cancel-button">
          {translate('editTabCommon.cancelButton')}
        </Button>
        <Button
          type="submit"
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            userRequestSaveChanges()
          }}
          disabled={thereAreNoChanges}
          data-testid="save-button"
        >
          {translate('editTabCommon.saveButton')}
        </Button>
      </FormButtonsWrapper>
    </form>
  )
}

const ReadonlyView: FC<ProductMenuCategorisationPage.Props> = ({ categories }) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { sections } = useMenuCategorisationSections({
    formFields: { categories },
    translate,
    pageLocale: locale,
    fieldsToCompare: { categories: [] },
  })

  if (categories.length === 0) {
    return (
      <>
        <SectionHeading data-cy="section-heading">
          {translate('productPage.menuCategorisation')}
        </SectionHeading>
        <NoInformationAvailableMessage />
      </>
    )
  }

  return (
    <>
      <SectionHeading data-cy="section-heading">
        {translate('productPage.menuCategorisation')}
      </SectionHeading>
      {sections.map((section) => {
        return section
      })}
    </>
  )
}

const SideBySideView: FC<ProductMenuCategorisationPage.SideBySideProps> = ({
  product,
  fromEdit,
}) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { sections } = useMenuCategorisationSections({
    formFields: { categories: product.categories },
    translate,
    pageLocale: locale,
    fieldsToCompare: { categories: product.draftChanges.categories || [] },
  })

  const { sections: draftSections } = useMenuCategorisationSections({
    formFields: { categories: product.draftChanges.categories || [] },
    translate,
    pageLocale: locale,
    fieldsToCompare: { categories: product.categories },
    sectionWithChanges: true,
  })

  const numberOfChanges = product.draftChanges.changesCount.categories

  return (
    <FullWidthSection>
      {numberOfChanges > 0 && (
        <FullWidthSection>
          <SectionHeading data-cy="section-heading">
            {translate('productPage.menuCategorisation')}
          </SectionHeading>
          {fromEdit ? (
            <SavedDraftChangesConfirmation numberOfChanges={numberOfChanges} sku={product.sku} />
          ) : (
            <DraftChangesExistNotice numberOfChanges={numberOfChanges} sku={product.sku} />
          )}
          <SideBySideTable>
            <SideBySideTableRow>
              <SideBySideTableColumn>
                <TableSectionHeadline marginTop={false}>
                  {translate('productGroupMarketingPage.currentColumnHeadline')}
                </TableSectionHeadline>
              </SideBySideTableColumn>
              <SideBySideTableColumn>
                <TableSectionHeadline marginTop={false}>
                  {translate('productGroupMarketingPage.draftColumnHeadline')}
                </TableSectionHeadline>
              </SideBySideTableColumn>
            </SideBySideTableRow>
            {sections.map((section, index) => {
              return (
                <SideBySideTableRow key={index}>
                  <SideBySideTableColumn>{section}</SideBySideTableColumn>
                  <SideBySideTableColumn>{draftSections[index]}</SideBySideTableColumn>
                </SideBySideTableRow>
              )
            })}
          </SideBySideTable>
        </FullWidthSection>
      )}
    </FullWidthSection>
  )
}

const ProductMenuCategorisationPageWithoutContext: FC<ProductMenuCategorisationPage.Props> = () => {
  const { product, setProduct } = SingleProductState.useActiveProduct()
  const fromEdit = useRef(false)

  const {
    selector: { isAfterEdit },
    state,
    action: { userRequestEdit, setApiSubmitting, setApiSubmittingSuccess, setApiSubmittingFail },
  } = ProductEditState.useState()

  const { editProductCategories } = ProductApi.useEditProduct(product!.sku)
  const { fetchProduct } = ProductApi.useGetProduct()

  const { translate } = Translation.useTranslation()

  const handleEditSubmit = useCallback(
    async (values: ProductMenuCategorisationPage.FormFields) => {
      setApiSubmitting()
      try {
        const categoriesIDs = values.categories.reduce((ids: string[], category) => {
          if (category) {
            const id = category[category.length - 1].id

            return [...ids, id]
          }

          return ids
        }, [])

        await editProductCategories({ categoriesIDs })
        fromEdit.current = true
        const newProduct = await fetchProduct(product?.sku!)
        setProduct(newProduct)
        setApiSubmittingSuccess()
      } catch (error) {
        setApiSubmittingFail(error as Error)
      }
    },
    [
      editProductCategories,
      fetchProduct,
      product?.sku,
      setApiSubmitting,
      setApiSubmittingFail,
      setApiSubmittingSuccess,
      setProduct,
    ],
  )

  const readView = (
    <TabWrapper>
      <EditButton
        onClick={userRequestEdit}
        isHidden={!product?.published}
        data-testid="edit-button"
      >
        {translate('menuCategorisationPage.editButton')}
      </EditButton>
      <ReadonlyView categories={product?.categories!} />
    </TabWrapper>
  )

  const hasChanges = !isEqual(product?.categories, product?.draftChanges.categories)

  const sideBySide = (
    <TabWrapper>
      <EditButton onClick={userRequestEdit}>
        {translate('menuCategorisationPage.editButton')}
      </EditButton>
      <SideBySideView product={product!} fromEdit={isAfterEdit} />
    </TabWrapper>
  )

  switch (state.type) {
    case 'initial':
    case 'after-edit-failed':
    case 'after-edit-successful':
      return hasChanges ? sideBySide : readView
    case 'during-edit':
    case 'during-edit-discarding':
    case 'during-edit-confirming':
    case 'during-api-submitting':
      return (
        <EditingView
          onSubmit={handleEditSubmit}
          formFields={{
            categories: product?.draftChanges.categories!,
          }}
          sku={product?.sku!}
          countryCode={product?.countryCode!}
        />
      )
  }
}

export const ProductMenuCategorisationPage = (props: ProductMenuCategorisationPage.Props) => {
  return (
    <ProductEditState.Provider>
      <ProductMenuCategorisationPageWithoutContext {...props} />
    </ProductEditState.Provider>
  )
}
