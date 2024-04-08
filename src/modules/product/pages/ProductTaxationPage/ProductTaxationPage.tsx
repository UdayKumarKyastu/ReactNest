import React, { FC, useCallback } from 'react'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { TaxCategory } from '../../model/tax-category'
import { useFormik } from 'formik'
import isEqual from 'lodash/isEqual'
import { ApproveAllDraftChangesModal } from '../../components/ApproveAllDraftChangesModal/ApproveAllDraftChangesModal'
import { Button, Cross } from '@pretamanger/component-library'
import { ProductEditState } from '../../ProductEditState'
import { SingleProductState } from '../../SingleProductState'
import { Product } from '../../model/product'
import { SavedDraftChangesConfirmation } from '../../components/SavedDraftChangesConfirmation/SavedDraftChangesConfirmation'
import { ProductApi } from '../../api/product.api'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { DiscardIcon } from '../../../../icons/Discard'
import { AuthPermission } from '../../../auth/AuthPermission'
import { TaxationDraftView } from '../../draft-views/TaxationDraftView'

export declare namespace ProductTaxationPage {
  export type Props = {}

  export type FormFields = {
    taxCategoryID: string | null
  }

  export type EditViewProps = {
    taxCategories: TaxCategory[]
    taxCategory: TaxCategory
    onSubmit(values: FormFields): void
    product: Product
  }
}

const {
  TabWrapper,
  SectionHeading,
  CloseButton,
  EditButton,
  FormButtonsWrapper,
  InputWrapper,
  DiscardButton,
  FieldLabel,
  FieldValue,
  FullWidthSection,
  SubsectionHeading,
} = ProductStyles

const EditingView = ({
  taxCategory,
  taxCategories,
  onSubmit,
}: ProductTaxationPage.EditViewProps) => {
  const {
    action: {
      userCancelSaveChanges,
      userRequestSaveChanges,
      userConfirmDiscardEdit,
      userRequestDiscardEdit,
    },
    state,
    selector: { isEditConfirmModalOpen },
  } = ProductEditState.useState()

  const { translate } = Translation.useTranslation()

  const { values, handleReset, handleSubmit, initialValues, submitForm, setFieldValue } =
    useFormik<ProductTaxationPage.FormFields>({
      onSubmit(values) {
        onSubmit({
          taxCategoryID: values.taxCategoryID,
        })
      },
      initialValues: {
        taxCategoryID:
          taxCategory?.id && taxCategories.map((tc) => tc.id).includes(taxCategory.id)
            ? taxCategory.id
            : null,
      },
    })

  const thereAreNoChanges = isEqual(values, initialValues)

  const handleDiscard = () => {
    if (thereAreNoChanges) {
      userConfirmDiscardEdit()
    } else {
      userRequestDiscardEdit()
    }
  }

  const taxCategoryValue = taxCategories.find((category) => category.id === values.taxCategoryID)!

  return (
    <form onSubmit={handleSubmit}>
      <ApproveAllDraftChangesModal
        isSubmitting={state.type === 'during-api-submitting'}
        onConfirm={submitForm}
        onClose={userCancelSaveChanges}
        open={isEditConfirmModalOpen}
        modalContent={
          <TaxationDraftView
            taxCategory={taxCategory}
            draftTaxCategory={taxCategoryValue}
            availableTaxCategories={taxCategories}
          />
        }
      />
      <TabWrapper>
        <CloseButton type="button" onClick={handleDiscard} data-testid="cross-button">
          <Cross colour="grey-700" width="15px" height="15px" />
        </CloseButton>
        <div>
          <SectionHeading data-cy="section-heading">
            {translate('taxationPage.headline')}
          </SectionHeading>
          <SubsectionHeading>
            {translate('taxationPage.percentageOfTaxAppliedTo')}
          </SubsectionHeading>
          <InputWrapper>
            <Dropdown
              id="taxCategoryID"
              label={translate('taxationPage.categoryLabel')}
              value={{ key: taxCategoryValue?.id || '', label: taxCategoryValue?.name || '' }}
              options={taxCategories.map((category) => ({
                key: category.id,
                label: category.name,
              }))}
              onChange={(option: { key: string; label: string }) => {
                setFieldValue('taxCategoryID', option?.key)
              }}
            />
            {!isEqual(initialValues.taxCategoryID, values.taxCategoryID) && (
              <DiscardButton type="button" onClick={handleReset}>
                <DiscardIcon size={18} />
              </DiscardButton>
            )}
          </InputWrapper>
        </div>
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

const ProductTaxationPageWithoutContext: FC<ProductTaxationPage.Props> = () => {
  const { product, fetch } = SingleProductState.useActiveProduct()

  const {
    selector: { isAfterEdit },
    state,
    action: { userRequestEdit, setApiSubmitting, setApiSubmittingSuccess, setApiSubmittingFail },
  } = ProductEditState.useState()

  const { editProductTaxation } = ProductApi.useEditProduct(product!.sku)

  const { translate } = Translation.useTranslation()

  const handleEditSubmit = useCallback(
    async (values: ProductTaxationPage.FormFields) => {
      setApiSubmitting()

      try {
        await editProductTaxation({
          taxCategoryId: values.taxCategoryID!,
        })

        await fetch(product!.sku)

        setApiSubmittingSuccess()
      } catch (error) {
        setApiSubmittingFail(error as Error)
      }
    },
    [
      setApiSubmitting,
      editProductTaxation,
      setApiSubmittingFail,
      fetch,
      product,
      setApiSubmittingSuccess,
    ],
  )

  const headline = (
    <SectionHeading data-cy="section-heading">{translate('taxationPage.headline')}</SectionHeading>
  )

  const readView = (
    <TabWrapper>
      <EditButton
        permissionToCheck={AuthPermission.CAN_APPROVE_CHANGES}
        onClick={userRequestEdit}
        isHidden={!product?.published}
        data-testid="edit-button"
      >
        {translate('taxationPage.editButton')}
      </EditButton>
      <FullWidthSection>
        {headline}
        {state.type === 'after-edit-failed' && <p>TODO Edit failed</p>}
        {isAfterEdit && <SavedDraftChangesConfirmation numberOfChanges={1} sku={product?.sku!} />}
        <SubsectionHeading>{translate('taxationPage.percentageOfTaxAppliedTo')}</SubsectionHeading>
        <FieldLabel>{translate('taxationPage.categoryLabel')}</FieldLabel>
        <FieldValue>
          {product!.taxCategory?.name || translate('taxationPage.noCategoryFallbackLabel')}
        </FieldValue>
      </FullWidthSection>
    </TabWrapper>
  )

  switch (state.type) {
    case 'initial':
    case 'after-edit-failed':
    case 'after-edit-successful':
      return readView
    case 'during-edit':
    case 'during-edit-discarding':
    case 'during-edit-confirming':
    case 'during-api-submitting':
      return (
        <EditingView
          onSubmit={handleEditSubmit}
          taxCategories={product!.availableTaxCategories}
          taxCategory={product!.draftChanges.taxCategory}
          product={product!}
        />
      )
  }
}

export const ProductTaxationPage = (props: ProductTaxationPage.Props) => (
  <ProductEditState.Provider>
    <ProductTaxationPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
