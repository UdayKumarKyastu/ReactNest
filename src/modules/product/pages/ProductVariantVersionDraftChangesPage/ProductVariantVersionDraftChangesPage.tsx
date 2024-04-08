import { useRef, useCallback, useMemo } from 'react'
import { Notice, Button } from '@pretamanger/component-library'
import { ProductStyles } from '../styles'
import { Product } from '../../model/product'
import { ProductVariantVersion } from '../../model/product-variant'
import { Translation } from '../../../i18n/Translation'
import { ProductVariantDraftChangesStyles } from '../ProductVariantDraftChangesPage/ProductVariantDraftChangesPage.styles'
import { Routes } from '../../../routing/Routes'
import { AttributesDraftView } from '../../draft-views/AttributesDraftView'
import { VariantMarketingDraftView } from '../../draft-views/VariantMarketingDraftView'
import { ReportingDraftView } from '../../draft-views/ReportingDraftView'
import { ApproveAllDraftChangesModal } from '../../components/ApproveAllDraftChangesModal/ApproveAllDraftChangesModal'
import { useApprovalPermissions } from '../../../product-approval/useApprovalPermissions'
import { ProductApprovalApi } from '../../../product-approval/api/product-approval.api'
import { SingleProductState } from '../../SingleProductState'
import { ProductEditState } from '../../ProductEditState'
import { ProductApi } from '../../api/product.api'
import { LabellingDraftView } from '../../draft-views/LabellingDraftView'
import { NoDraftChangesNotice } from '../../components/NoDraftChangesNotice/NoDraftChangesNotice'
import { ApprovedDraftChangesNotice } from '../../components/ApprovedDraftChangesNotice/ApprovedDraftChangesNotice'
import { AxiosError } from 'axios'
import { ProductVariantVersionDraftChangesPageStyles } from './ProductVariantVersionDraftChangesPage.styles'
import PricingChangesView from '../../components/PricingChangesView/PricingChangesView'

export declare namespace ProductVariantVersionDraftChangesPage {
  export type Props = {
    product: Product
    productVariant: ProductVariantVersion
    draftVariant: Omit<ProductVariantVersion, 'approvedTabs' | 'draftTabs'>
  }
}

const { TabWrapper, SectionHeading, FullWidthSection } = ProductStyles
const { FormButtonsWrapper } = ProductVariantVersionDraftChangesPageStyles

const { Wrapper } = ProductVariantDraftChangesStyles

export const ProductVariantVersionDraftChangesPageWithoutContext = ({
  product,
  productVariant,
  draftVariant,
}: ProductVariantVersionDraftChangesPage.Props) => {
  const { translate } = Translation.useTranslation()
  const { canApprove } = useApprovalPermissions()
  const { approve } = ProductApprovalApi.useProductVariantVersionApproval()
  const { fetchSingleProductVariantVersion } = ProductApi.useGetProductVariantVersions()
  const { setProduct } = SingleProductState.useActiveProduct()
  const resourceSkus = {
    masterSku: productVariant.masterSku,
    variantSku: productVariant.sku,
    versionKey: productVariant.versionKey,
  }
  const { reloadVersion: reloadProduct } = SingleProductState.useActiveProduct()

  const numberOfChanges = draftVariant?.changesCount?.total || 0
  const cachedNumberOfChanges = useRef(numberOfChanges)

  const editingType = useRef<null | 'rejection' | 'approval'>(null)
  const thereAreNoChanges = numberOfChanges === 0

  const isThereAnyPendingStatus = useMemo(() => {
    return productVariant.draft?.reviewStatuses?.statusCount?.pending
  }, [productVariant])

  const accepted = productVariant.draft?.reviewStatuses?.statusCount?.accepted

  const rejected = productVariant.draft?.reviewStatuses?.statusCount?.rejected

  const buttonLabel = useMemo(() => {
    return isThereAnyPendingStatus || productVariant.draft?.reviewStatuses?.statusCount?.accepted
      ? translate('productAllDraftChangesPage.publishAcceptedChanges')
      : translate('productAllDraftChangesPage.deleteRejectedChanges')
  }, [translate, isThereAnyPendingStatus, productVariant])

  const {
    action: {
      userRequestSaveChanges,
      userCancelSaveChanges,
      setApiSubmitting,
      setApiSubmittingSuccess,
      setApiSubmittingFail,
    },
    state,
    selector: { isEditConfirmModalOpen },
  } = ProductEditState.useState()

  const fromEdit = useRef(false)

  const setProductWithVersion = useCallback(
    (product: Product, version: ProductVariantVersion) => {
      setProduct({
        ...product,
        currentVersion: {
          ...version,
          masterSku: product.sku,
          draft: {
            ...version.draft!,
            masterSku: product.sku,
          },
        },
      })
    },
    [setProduct],
  )

  const handleApprove = useCallback(async () => {
    editingType.current = 'approval'
    setApiSubmitting()
    try {
      await approve(productVariant.masterSku, productVariant.sku, productVariant.versionKey)
      fromEdit.current = true
      const version = await fetchSingleProductVariantVersion(
        productVariant.masterSku,
        productVariant.sku,
        productVariant.versionKey,
      )
      setProductWithVersion(product, version)
      setApiSubmittingSuccess()
    } catch (e: unknown) {
      const error = e as AxiosError<{ error: string }>
      fromEdit.current = false
      setApiSubmittingFail(new Error(error.response?.data.error || 'UNKNOWN'))
    }
  }, [
    setApiSubmitting,
    approve,
    productVariant.masterSku,
    productVariant.sku,
    productVariant.versionKey,
    fetchSingleProductVariantVersion,
    setProductWithVersion,
    product,
    setApiSubmittingSuccess,
    setApiSubmittingFail,
  ])

  const DraftChangesNotice = () => {
    if (fromEdit.current) {
      if (editingType.current === 'approval') {
        return <ApprovedDraftChangesNotice numberOfChanges={cachedNumberOfChanges.current} />
      } else {
        return <NoDraftChangesNotice />
      }
    }

    if (numberOfChanges > 0) {
      return (
        <Notice
          title={translate('productAllDraftChangesPage.title', {
            amount: numberOfChanges,
          })}
          variant="warning"
        />
      )
    }

    return <NoDraftChangesNotice />
  }

  return (
    <form>
      <ApproveAllDraftChangesModal
        isSubmitting={state.type === 'during-api-submitting'}
        onConfirm={handleApprove}
        onClose={userCancelSaveChanges}
        open={isEditConfirmModalOpen}
        reject={!productVariant.draft?.reviewStatuses?.statusCount?.accepted}
      />
      <TabWrapper>
        <FullWidthSection>
          <SectionHeading data-cy="section-heading">
            {translate('productVariantDraftChangesPage.headline')}
          </SectionHeading>
          <DraftChangesNotice />
          {numberOfChanges > 0 && (
            <Wrapper>
              <VariantMarketingDraftView
                productVariant={productVariant}
                draftVariant={draftVariant}
                countryCode={product.countryCode}
                tabRoute={Routes.resolveProductVariantVersionRoute(
                  Routes.ProductVariantVersion.marketing,
                  productVariant.masterSku,
                  productVariant.sku,
                  productVariant.version.toString(),
                  true,
                )}
                resourceSkus={resourceSkus}
                reviewStatuses={productVariant.draft?.reviewStatuses?.marketing}
                reloadProduct={reloadProduct}
              />
              <ReportingDraftView
                productVariant={productVariant}
                draftVariant={draftVariant}
                productType={product.type}
                tabRoute={Routes.resolveProductVariantVersionRoute(
                  Routes.ProductVariantVersion.reporting,
                  productVariant.masterSku,
                  productVariant.sku,
                  productVariant.version.toString(),
                  true,
                )}
                resourceSkus={resourceSkus}
                reviewStatuses={productVariant.draft?.reviewStatuses?.reporting}
                reloadProduct={reloadProduct}
              />
              {productVariant.attributes && (
                <AttributesDraftView
                  productVariant={productVariant}
                  draftVariant={draftVariant}
                  tabRoute={Routes.resolveProductVariantVersionRoute(
                    Routes.ProductVariantVersion.attributes,
                    productVariant.masterSku,
                    productVariant.sku,
                    productVariant.version.toString(),
                    true,
                  )}
                  resourceSkus={resourceSkus}
                  reviewStatuses={productVariant.draft?.reviewStatuses?.attributes}
                  reloadProduct={reloadProduct}
                />
              )}
              <PricingChangesView
                draftVariant={draftVariant}
                reviewStatuses={draftVariant.reviewStatuses?.prices}
                pricingFormFields={productVariant.prices}
                pricingDraftChanges={draftVariant.prices}
                resourceSkus={resourceSkus}
                reloadProduct={reloadProduct}
              />
              {productVariant.labelling && (
                <LabellingDraftView
                  productVariant={productVariant}
                  draftVariant={draftVariant!}
                  tabRoute={Routes.resolveProductVariantVersionRoute(
                    Routes.ProductVariantVersion.labelling,
                    productVariant.masterSku,
                    productVariant.sku,
                    productVariant.version.toString(),
                    true,
                  )}
                  reloadProduct={reloadProduct}
                  resourceSkus={resourceSkus}
                  reviewStatuses={draftVariant.reviewStatuses?.labelling}
                />
              )}
            </Wrapper>
          )}
        </FullWidthSection>
      </TabWrapper>
      {!thereAreNoChanges && (
        <FormButtonsWrapper>
          <Button
            data-testid="save-button"
            type="submit"
            onClick={(e: MouseEvent) => {
              e.preventDefault()
              userRequestSaveChanges()
            }}
            disabled={
              !canApprove ||
              (isThereAnyPendingStatus && numberOfChanges !== (accepted || 0) + (rejected || 0))
            }
          >
            {buttonLabel}
          </Button>
        </FormButtonsWrapper>
      )}
    </form>
  )
}

export const ProductVariantVersionDraftChangesPage = (
  props: ProductVariantVersionDraftChangesPage.Props,
) => (
  <ProductEditState.Provider>
    <ProductVariantVersionDraftChangesPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
