import { useCallback, useMemo, useRef } from 'react'
import { ProductStyles } from '../styles'
import { Button, Notice } from '@pretamanger/component-library'
import { Product } from '../../model/product'
import { ProdutAllDraftChangesStyles } from './ProductAllDraftChanges.styles'
import { Translation } from '../../../i18n/Translation'
import { ApproveAllDraftChangesModal } from '../../components/ApproveAllDraftChangesModal/ApproveAllDraftChangesModal'
import { ProductEditState } from '../../ProductEditState'
import { useApprovalPermissions } from '../../../product-approval/useApprovalPermissions'
import { ProductApprovalApi } from '../../../product-approval/api/product-approval.api'
import { SingleProductState } from '../../SingleProductState'
import { ApprovedDraftChangesNotice } from '../../components/ApprovedDraftChangesNotice/ApprovedDraftChangesNotice'
import { NoDraftChangesNotice } from '../../components/NoDraftChangesNotice/NoDraftChangesNotice'
import { AllDraftChangesView } from './AllDraftsChangesView/AllDraftsChangesView'

export declare namespace ProductAllDraftChangesPage {
  type Props = {
    product: Product
  }
}

const { TabWrapper, SectionHeading, FullWidthSection } = ProductStyles

const { FormButtonsWrapper } = ProdutAllDraftChangesStyles

const ProductAllDraftChangesPageWithoutContext = ({
  product,
}: ProductAllDraftChangesPage.Props) => {
  const editingType = useRef<null | 'rejection' | 'approval'>(null)
  const { fetch } = SingleProductState.useActiveProduct()
  const { translate } = Translation.useTranslation()
  const productNumberOfChanges = product.draftChanges.changesCount.total
  const variantsDraftChanges = product.draftChanges.variants.reduce(
    (acc, currentVariant) => acc + currentVariant.changesCount?.total! || 0,
    0,
  )
  const productAcceptedCount = product.draftChanges.reviewStatuses?.statusCount?.accepted || 0
  const productRejectedCount = product.draftChanges.reviewStatuses?.statusCount?.rejected || 0
  const variantAcceptedCount = product.draftChanges.variants.reduce(
    (acc, variant) => (acc += variant.reviewStatuses?.statusCount?.accepted || 0),
    0,
  )
  const variantRejectedCount = product.draftChanges.variants.reduce(
    (acc, variant) => (acc += variant.reviewStatuses?.statusCount?.rejected || 0),
    0,
  )

  const cachedNumberOfChanges = useRef(productNumberOfChanges + variantsDraftChanges)

  const { canApprove } = useApprovalPermissions()
  const { approve } = ProductApprovalApi.useProductApproval()

  const {
    action: {
      userRequestSaveChanges,
      userCancelSaveChanges,
      setApiSubmitting,
      setApiSubmittingSuccess,
      setApiSubmittingFail,
    },
    state,
    selector: { isAfterEdit },
  } = ProductEditState.useState()

  const fromEdit = useRef(false)

  const handleApprove = useCallback(async () => {
    editingType.current = 'approval'
    setApiSubmitting()
    approve(product.sku)
      .then(async () => {
        fromEdit.current = true
        await fetch(product.sku)
        setApiSubmittingSuccess()
      })
      .catch((e: Error) => {
        fromEdit.current = false
        setApiSubmittingFail(e)
      })
  }, [product.sku, approve, setApiSubmitting, setApiSubmittingSuccess, setApiSubmittingFail, fetch])

  const thereAreNoChanges = productNumberOfChanges + variantsDraftChanges === 0

  const isThereAnyPendingStatus = useMemo(() => {
    const variantCount = product.draftChanges.variants.reduce(
      (acc, variant) => (acc += variant.reviewStatuses?.statusCount?.pending || 0),
      0,
    )
    const productCount = product.draftChanges.reviewStatuses?.statusCount?.pending || 0
    return variantCount + productCount > 0
  }, [product])

  const areThereAnyAccepted = useMemo(() => {
    const productCount = product.draftChanges.reviewStatuses?.statusCount?.accepted || 0
    const variantCount = product.draftChanges.variants.reduce(
      (acc, variant) => (acc += variant.reviewStatuses?.statusCount?.accepted || 0),
      0,
    )
    return productCount + variantCount > 0
  }, [product])

  const buttonLabel = useMemo(() => {
    if (isThereAnyPendingStatus || areThereAnyAccepted) {
      return translate('productAllDraftChangesPage.publishAcceptedChanges')
    }
    return translate('productAllDraftChangesPage.deleteRejectedChanges')
  }, [areThereAnyAccepted, isThereAnyPendingStatus, translate])

  const DraftChangesNotice = () => {
    if (fromEdit.current) {
      if (editingType.current === 'approval') {
        return <ApprovedDraftChangesNotice numberOfChanges={cachedNumberOfChanges.current} />
      } else {
        return <NoDraftChangesNotice />
      }
    }

    if (thereAreNoChanges) {
      return <NoDraftChangesNotice />
    }

    return !fromEdit.current ? (
      <Notice
        title={translate('productAllDraftChangesPage.title', {
          amount: productNumberOfChanges + variantsDraftChanges,
        })}
        variant="warning"
      />
    ) : (
      <NoDraftChangesNotice />
    )
  }

  return (
    <form>
      <ApproveAllDraftChangesModal
        isSubmitting={state.type === 'during-api-submitting'}
        onConfirm={handleApprove}
        onClose={userCancelSaveChanges}
        open={
          state.type === 'during-edit-confirming' ||
          (editingType.current === 'approval' && !isAfterEdit)
        }
        reject={!(isThereAnyPendingStatus || areThereAnyAccepted)}
      />
      <TabWrapper>
        <SectionHeading data-cy="section-heading">
          {translate('productAllDraftChangesPage.headline')}
        </SectionHeading>
        <FullWidthSection>
          <DraftChangesNotice />
          {!fromEdit.current && !thereAreNoChanges && <AllDraftChangesView product={product} />}
        </FullWidthSection>
      </TabWrapper>
      {!thereAreNoChanges && !fromEdit.current && (
        <FormButtonsWrapper>
          <Button
            data-testid="save-button"
            type="submit"
            onClick={(e: MouseEvent) => {
              e.preventDefault()
              userRequestSaveChanges()
            }}
            disabled={
              thereAreNoChanges ||
              !canApprove ||
              (isThereAnyPendingStatus &&
                variantsDraftChanges !== variantAcceptedCount + variantRejectedCount) ||
              (isThereAnyPendingStatus &&
                productNumberOfChanges !== productAcceptedCount + productRejectedCount)
            }
          >
            {buttonLabel}
          </Button>
        </FormButtonsWrapper>
      )}
    </form>
  )
}

export const ProductAllDraftChangesPage = (props: ProductAllDraftChangesPage.Props) => (
  <ProductEditState.Provider>
    <ProductAllDraftChangesPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
