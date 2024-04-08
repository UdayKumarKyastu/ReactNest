import React, { useRef, useCallback } from 'react'
import { isEqual } from 'lodash'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, Cross } from '@pretamanger/component-library'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { BaristaSetup } from '../../model/product-setup'
import { ProductEditState } from '../../ProductEditState'
import { SingleProductState } from '../../SingleProductState'
import { ProductApi } from '../../api/product.api'
import { Product } from '../../model/product'
import { DraftChangesExistNotice } from '../../components/DraftChangesExistNotice/DraftChangesExistNotice'
import { EditDiscardConfirmationModal } from '../../components/EditDiscardConfirmationModal/EditDiscardConfirmationModal'
import { EditSaveConfirmationModal } from '../../components/EditSaveConfirmationModal/EditSaveConfirmationModal'
import {
  SideBySideTable,
  SideBySideTableColumn,
  SideBySideTableRow,
  TableSectionHeadline,
} from '../../../common/components/SideBySideTable/SideBySideTable'
import { SavedDraftChangesConfirmation } from '../../components/SavedDraftChangesConfirmation/SavedDraftChangesConfirmation'
import { Routes } from '../../../routing/Routes'
import { EditProductDto } from '../../dto/edit-product.dto'
import { useSetupSections } from '../../sections/useSetupSections'

const mapFormFieldsToDto = (formFields: BaristaSetup): EditProductDto.UpdateSetup => {
  return {
    iceMachineRequired: formFields.iceMachineRequired,
    blenderRequired: formFields.blenderRequired,
    canHaveVariants: formFields.canHaveVariants,
    canAddSyrup: formFields.canAddSyrup,
    canAddExtraCoffeeShot: formFields.canAddExtraCoffeeShot,
    canAddWhippedCream: formFields.canAddWhippedCream,
  }
}

export declare namespace ProductSetupPage {
  export type Props = {
    setUp: BaristaSetup
  }

  export type FormFields = BaristaSetup

  export type SideBySideProps = {
    product: Product
    fromEdit: boolean
    isAllDraftChangesView?: boolean
  }

  export type EditViewProps = {
    formFields: BaristaSetup
    onSubmit(values: FormFields): void
  }

  export type ReadonlyViewProps = {
    formFields: BaristaSetup
    draftFormFields: BaristaSetup
  }
}

const {
  TabWrapper,
  SectionHeading,
  Section,
  StyledCheckbox,
  SectionDivider,
  SubsectionHeading,
  ParagraphBold,
  EditButton,
  FullWidthSection,
  FormButtonsWrapper,
  CloseButton,
} = ProductStyles

export const ReadonlyView = ({
  formFields,
  draftFormFields,
}: ProductSetupPage.ReadonlyViewProps) => {
  const { translate } = Translation.useTranslation()
  const { sections } = useSetupSections(formFields, translate, draftFormFields)

  return (
    <>
      {sections.map((section, index) => {
        return (
          <React.Fragment key={index}>
            {section}
            {index === 0 && <SectionDivider />}
          </React.Fragment>
        )
      })}
    </>
  )
}

export const EditingView = ({ formFields, onSubmit }: ProductSetupPage.EditViewProps) => {
  const { translate } = Translation.useTranslation()

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

  const { values, setFieldValue, initialValues, submitForm } =
    useFormik<ProductSetupPage.FormFields>({
      onSubmit(values) {
        onSubmit({
          ...values,
        })
      },
      initialValues: formFields,
    })

  const thereAreNoChanges = isEqual(values, initialValues)

  const handleDiscard = () => {
    if (thereAreNoChanges) {
      userConfirmDiscardEdit()
    } else {
      userRequestDiscardEdit()
    }
  }

  return (
    <form>
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
      <TabWrapper>
        <CloseButton type="button" onClick={handleDiscard} data-testid="cross-button">
          <Cross colour="grey-700" width="15px" height="15px" />
        </CloseButton>
        <SectionHeading data-cy="section-heading">
          {translate('productPage.productSetup')}
        </SectionHeading>
        <Section data-cy="equipment-section">
          <SubsectionHeading>{translate('productPage.equipment')}</SubsectionHeading>
          <StyledCheckbox
            id="iceMachineRequired"
            label={translate('productPage.fields.iceMachineRequired')}
            name="iceMachineRequired"
            isSelected={values.iceMachineRequired}
            defaultChecked={values.iceMachineRequired}
            onChange={() => setFieldValue('iceMachineRequired', !values.iceMachineRequired)}
          />
          <StyledCheckbox
            id="blenderRequired"
            label={translate('productPage.fields.blenderRequired')}
            name="blenderRequired"
            isSelected={values.blenderRequired}
            defaultChecked={values.blenderRequired}
            onChange={() => setFieldValue('blenderRequired', !values.blenderRequired)}
          />
          <StyledCheckbox
            id="canHaveVariants"
            label={translate('productPage.fields.canHaveVariants')}
            name="canHaveVariants"
            isSelected={values.canHaveVariants}
            defaultChecked={values.canHaveVariants}
            onChange={() => setFieldValue('canHaveVariants', !values.canHaveVariants)}
          />
          <StyledCheckbox
            id="canBeDecaf"
            label={translate('productPage.fields.canBeDecaf')}
            name="canBeDecaf"
            isSelected={values.canBeDecaf}
            defaultChecked={values.canBeDecaf}
            disabled
          />
        </Section>

        <SectionDivider />

        <Section data-cy="can-customer-add-following-section">
          <SubsectionHeading>{translate('productPage.ingredientVariations')}</SubsectionHeading>
          <ParagraphBold>{`${translate('productPage.canCustomerAddFollowing')}:`}</ParagraphBold>
          <StyledCheckbox
            id="canAddSyrup"
            label={translate('productPage.fields.syrup')}
            name="canAddSyrup"
            isSelected={values.canAddSyrup}
            defaultChecked={values.canAddSyrup}
            onChange={() => setFieldValue('canAddSyrup', !values.canAddSyrup)}
          />
          <StyledCheckbox
            id="canAddExtraCoffeeShot"
            label={translate('productPage.fields.extraCoffeeShot')}
            name="canAddExtraCoffeeShot"
            isSelected={values.canAddExtraCoffeeShot}
            defaultChecked={values.canAddExtraCoffeeShot}
            onChange={() => setFieldValue('canAddExtraCoffeeShot', !values.canAddExtraCoffeeShot)}
          />
          <StyledCheckbox
            id="canAddWhippedCream"
            label={translate('productPage.fields.whippedCream')}
            name="canAddWhippedCream"
            isSelected={values.canAddWhippedCream}
            defaultChecked={values.canAddWhippedCream}
            onChange={() => setFieldValue('canAddWhippedCream', !values.canAddWhippedCream)}
          />
        </Section>

        <Section data-cy="can-drink-be-made-section">
          <ParagraphBold>{`${translate('productPage.canDrinkBeMade')}:`}</ParagraphBold>
          <StyledCheckbox
            id="canBeWithoutMilk"
            label={translate('productPage.fields.withoutMilk')}
            name="canBeWithoutMilk"
            isSelected={values.canBeWithoutMilk}
            defaultChecked={values.canBeWithoutMilk}
            disabled
          />
          <StyledCheckbox
            id="canBeWithSemiSkimmedMilk"
            label={translate('productPage.fields.withSemiSkimmedMilk')}
            name="canBeWithSemiSkimmedMilk"
            isSelected={values.canBeWithSemiSkimmedMilk}
            defaultChecked={values.canBeWithSemiSkimmedMilk}
            disabled
          />
          <StyledCheckbox
            id="canBeWithSkimmedMilk"
            label={translate('productPage.fields.withSkimmedMilk')}
            name="canBeWithSkimmedMilk"
            isSelected={values.canBeWithSkimmedMilk}
            defaultChecked={values.canBeWithSkimmedMilk}
            disabled
          />
          <StyledCheckbox
            id="canBeWithOatMilk"
            label={translate('productPage.fields.withOatMilk')}
            name="canBeWithOatMilk"
            isSelected={values.canBeWithOatMilk}
            defaultChecked={values.canBeWithOatMilk}
            disabled
          />
          <StyledCheckbox
            id="canBeWithRiceCoconutMilk"
            label={translate('productPage.fields.withRiceCoconutMilk')}
            name="canBeWithRiceCoconutMilk"
            isSelected={values.canBeWithRiceCoconutMilk}
            defaultChecked={values.canBeWithRiceCoconutMilk}
            disabled
          />
          <StyledCheckbox
            id="canBeWithSoyMilk"
            label={translate('productPage.fields.withSoyMilk')}
            name="canBeWithSoyMilk"
            isSelected={values.canBeWithSoyMilk}
            defaultChecked={values.canBeWithSoyMilk}
            disabled
          />
        </Section>
      </TabWrapper>
      <FormButtonsWrapper>
        <Button data-testid="cancel-button" onClick={handleDiscard} styleType="secondary">
          {translate('editTabCommon.cancelButton')}
        </Button>
        <Button
          data-testid="save-button"
          type="submit"
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            userRequestSaveChanges()
          }}
          disabled={thereAreNoChanges}
        >
          {translate('editTabCommon.saveButton')}
        </Button>
      </FormButtonsWrapper>
    </form>
  )
}

export const SideBySideView = ({
  product,
  fromEdit,
  isAllDraftChangesView = false,
}: ProductSetupPage.SideBySideProps) => {
  const { translate } = Translation.useTranslation()
  const formFields = product.setUp
  const draftChangesFormFields = product.draftChanges.setUp
  const { sections } = useSetupSections(formFields!, translate, draftChangesFormFields!)
  const { sections: draftSections } = useSetupSections(
    draftChangesFormFields!,
    translate,
    formFields!,
    true,
    { masterSku: product.sku },
  )
  const numberOfChanges = product.draftChanges.changesCount.setUp

  return (
    <FullWidthSection>
      {numberOfChanges > 0 && (
        <FullWidthSection>
          <SectionHeading data-cy="section-heading">
            {translate('productPage.productSetup')}
          </SectionHeading>
          {!isAllDraftChangesView &&
            (fromEdit ? (
              <SavedDraftChangesConfirmation numberOfChanges={numberOfChanges} sku={product.sku} />
            ) : (
              <DraftChangesExistNotice numberOfChanges={numberOfChanges} sku={product.sku} />
            ))}
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
                {isAllDraftChangesView && (
                  <NavLink to={Routes.resolveProductRoute(Routes.Product.setUp, product.sku)}>
                    {translate('productVariantReporting.editButton')}
                  </NavLink>
                )}
              </SideBySideTableColumn>
            </SideBySideTableRow>
            {sections.map((section, index) => {
              if (isAllDraftChangesView && draftSections[index]?.props.isHidden) {
                return null
              }

              const noBorder = index !== 0

              return (
                <SideBySideTableRow key={index}>
                  <SideBySideTableColumn noBorder={noBorder}>{section}</SideBySideTableColumn>
                  <SideBySideTableColumn noBorder={noBorder}>
                    {draftSections[index]}
                  </SideBySideTableColumn>
                </SideBySideTableRow>
              )
            })}
          </SideBySideTable>
        </FullWidthSection>
      )}
    </FullWidthSection>
  )
}

const ProductSetupPageWithoutContext = (props: ProductSetupPage.Props) => {
  const { product, setProduct } = SingleProductState.useActiveProduct()

  const { editProductSetup } = ProductApi.useEditProduct(product!.sku)
  const { fetchProduct } = ProductApi.useGetProduct()

  const {
    action: { setApiSubmittingSuccess, setApiSubmitting, userRequestEdit },
    state,
  } = ProductEditState.useState()

  const { translate } = Translation.useTranslation()

  const fromEdit = useRef(false)

  const handleEditSubmit = useCallback(
    async (values: ProductSetupPage.FormFields) => {
      setApiSubmitting()

      await editProductSetup(mapFormFieldsToDto(values))
      fromEdit.current = true
      const newProduct = await fetchProduct(product?.sku!)
      setProduct(newProduct)
      setApiSubmittingSuccess()
    },
    [
      setApiSubmitting,
      editProductSetup,
      fetchProduct,
      product?.sku,
      setProduct,
      setApiSubmittingSuccess,
    ],
  )

  const formFields = product?.setUp
  const draftChangesFormFields = product?.draftChanges.setUp

  const hasChanges = !isEqual(formFields, draftChangesFormFields)

  const headline = (
    <SectionHeading data-cy="section-heading">
      {translate('productPage.productSetup')}
    </SectionHeading>
  )

  const readView = (
    <TabWrapper>
      {headline}
      <EditButton
        onClick={userRequestEdit}
        isHidden={!product?.published}
        data-testid="edit-button"
      >
        {translate('taxationPage.editButton')}
      </EditButton>
      <ReadonlyView formFields={formFields!} draftFormFields={draftChangesFormFields!} />
    </TabWrapper>
  )

  const sideBySide = (
    <TabWrapper>
      <EditButton onClick={userRequestEdit}>{translate('taxationPage.editButton')}</EditButton>
      <SideBySideView product={product!} fromEdit={fromEdit.current} />
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
      return <EditingView onSubmit={handleEditSubmit} formFields={draftChangesFormFields!} />
  }
}

export const ProductSetupPage = (props: ProductSetupPage.Props) => (
  <ProductEditState.Provider>
    <ProductSetupPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
