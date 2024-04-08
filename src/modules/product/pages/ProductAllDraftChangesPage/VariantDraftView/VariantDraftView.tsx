import { Fragment } from 'react'
import { ProductVariant } from '../../../model/product-variant'
import { Product } from '../../../model/product'
import { VariantMarketingDraftView } from '../../../draft-views/VariantMarketingDraftView'
import { Routes } from '../../../../routing/Routes'
import { ReportingDraftView } from '../../../draft-views/ReportingDraftView'
import { AttributesDraftView } from '../../../draft-views/AttributesDraftView'
import { LabellingDraftView } from '../../../draft-views/LabellingDraftView'
import PricingChangesView from '../../../components/PricingChangesView/PricingChangesView'
import { SingleProductState } from '../../../SingleProductState'

interface Props {
  variant: ProductVariant
  product: Product
}

export const VariantDraftView = ({ variant, product }: Props) => {
  const { reload: reloadProduct } = SingleProductState.useActiveProduct()
  const draftVariant = product.draftChanges.variants.find(
    (draftVariant) => draftVariant.sku === variant?.sku,
  )!
  const resourceSkus = {
    masterSku: product.sku,
    variantSku: draftVariant.sku,
  }

  return (
    <Fragment>
      <VariantMarketingDraftView
        productVariant={variant}
        draftVariant={draftVariant}
        countryCode={product.countryCode}
        tabRoute={Routes.resolveProductVariantRoute(
          Routes.ProductVariant.marketing,
          variant.masterSku,
          variant.sku,
          true,
        )}
        resourceSkus={resourceSkus}
        reviewStatuses={draftVariant.reviewStatuses?.marketing}
        reloadProduct={reloadProduct}
      />
      <ReportingDraftView
        productVariant={variant}
        draftVariant={draftVariant}
        productType={product.type}
        tabRoute={Routes.resolveProductVariantRoute(
          Routes.ProductVariant.reporting,
          variant.masterSku,
          variant.sku,
          true,
        )}
        resourceSkus={resourceSkus}
        reviewStatuses={draftVariant.reviewStatuses?.reporting}
        reloadProduct={reloadProduct}
      />
      {variant.attributes && (
        <AttributesDraftView
          productVariant={variant}
          draftVariant={draftVariant}
          resourceSkus={resourceSkus}
          reviewStatuses={draftVariant.reviewStatuses?.attributes}
          tabRoute={Routes.resolveProductVariantRoute(
            Routes.ProductVariant.attributes,
            variant.masterSku,
            variant.sku,
            true,
          )}
          reloadProduct={reloadProduct}
        />
      )}

      <PricingChangesView
        draftVariant={draftVariant}
        reviewStatuses={draftVariant.reviewStatuses?.prices}
        pricingFormFields={variant.prices}
        pricingDraftChanges={draftVariant.prices}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
      />

      {variant.labelling && (
        <LabellingDraftView
          productVariant={variant}
          draftVariant={draftVariant}
          resourceSkus={resourceSkus}
          reviewStatuses={draftVariant.reviewStatuses?.labelling}
          tabRoute={Routes.resolveProductVariantRoute(
            Routes.ProductVariant.labelling,
            variant.masterSku,
            variant.sku,
            true,
          )}
          reloadProduct={reloadProduct}
        />
      )}
    </Fragment>
  )
}
