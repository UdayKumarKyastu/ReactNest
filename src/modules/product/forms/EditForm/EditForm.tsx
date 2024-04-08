import React, { useCallback, MouseEvent } from 'react'
import { isEqual } from 'lodash'
import { Formik } from 'formik'
import { useParams } from 'react-router-dom'
import { Routes } from '../../../routing/Routes'
import { Button, Cross } from '@pretamanger/component-library'
import { ProductStyles } from '../../pages/styles'
import { Translation } from '../../../i18n/Translation'
import { EditDiscardConfirmationModal } from '../../components/EditDiscardConfirmationModal/EditDiscardConfirmationModal'
import { EditSaveConfirmationModal } from '../../components/EditSaveConfirmationModal/EditSaveConfirmationModal'
import { ProductEditState } from '../../ProductEditState'
import { ProductApi } from '../../api/product.api'
import { SingleProductState } from '../../SingleProductState'

export enum FormStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}
export declare namespace EditForm {
  export type Props<T> = {
    formFields: T
    onSubmit(values: T): void
    sku: string
    children?: React.ReactNode
    initialValues?: T
  }

  export type Status = FormStatus
}

const { TabWrapper, CloseButton, FormButtonsWrapper } = ProductStyles

export const EditForm = <T,>({
  children,
  formFields,
  initialValues,
  onSubmit,
  sku,
}: EditForm.Props<T>) => {
  const { translate } = Translation.useTranslation()

  const {
    action: {
      userRequestDiscardEdit,
      userCancelSaveChanges,
      userCancelDiscardEdit,
      userRequestSaveChanges,
      userConfirmDiscardEdit,
      setApiSubmitting,
      setApiSubmittingSuccess,
      setApiSubmittingFail,
    },
    state,
    selector: { isEditConfirmModalOpen },
  } = ProductEditState.useState()

  const { fetchProduct } = ProductApi.useGetProduct()
  const { fetchSingleProductVariantVersion } = ProductApi.useGetProductVariantVersions()
  const { setProduct } = SingleProductState.useActiveProduct()
  const {
    variantSku,
    masterSku,
    version: routeVersion,
  } = useParams() as Routes.ProductVariantVersionRouteParams

  const handleEditSubmit = useCallback(
    async (values) => {
      setApiSubmitting()
      try {
        await onSubmit(values)
        const newProduct = await fetchProduct(sku)
        if (routeVersion) {
          const currentVariant = [newProduct.masterVariant, ...newProduct.variants].find(
            ({ sku }) => sku === variantSku,
          )

          const currentVersion = currentVariant?.versions.find(
            ({ version }) => version?.toString() === routeVersion,
          )!
          const version = await fetchSingleProductVariantVersion(
            masterSku,
            variantSku,
            currentVersion.key,
          )

          setProduct({
            ...newProduct,
            currentVersion: {
              ...version,
              masterSku: newProduct.sku,
              draft: {
                ...version.draft!,
                masterSku: newProduct.sku,
              },
            },
          })
        } else {
          setProduct(newProduct)
        }
        setApiSubmittingSuccess()
      } catch (e: unknown) {
        setApiSubmittingFail(e as Error)
      }
    },
    [
      setApiSubmitting,
      onSubmit,
      fetchProduct,
      sku,
      routeVersion,
      setApiSubmittingSuccess,
      fetchSingleProductVariantVersion,
      masterSku,
      variantSku,
      setProduct,
      setApiSubmittingFail,
    ],
  )

  return (
    <Formik initialValues={initialValues || formFields} onSubmit={handleEditSubmit}>
      {(formikProps) => {
        const thereAreNoChanges = isEqual(formikProps.values, formikProps.initialValues)

        const isFormDisabled =
          // thereAreNoChanges ||
          formikProps.status === FormStatus.INVALID || Object.keys(formikProps.errors).length > 0

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
              isSubmitting={formikProps.isSubmitting}
              onConfirm={formikProps.handleSubmit}
              onClose={userCancelSaveChanges}
              open={isEditConfirmModalOpen}
            />
            <TabWrapper>
              <CloseButton type="button" onClick={handleDiscard} data-testid="cross-button">
                <Cross colour="grey-700" width="15px" height="15px" />
              </CloseButton>
              {children}
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
                disabled={isFormDisabled}
                data-testid="save-button"
              >
                {translate('editTabCommon.saveButton')}
              </Button>
            </FormButtonsWrapper>
          </form>
        )
      }}
    </Formik>
  )
}
