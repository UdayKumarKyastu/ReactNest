import { ProductVariantVersion } from './product-variant'
import { VariantVersionPublishState } from './variant-version-publish-state'

export type ProductVariantVersionResponse = {
  draft: ProductVariantVersion
  id: string
  key: string
  publishState: VariantVersionPublishState
  variant: ProductVariantVersion
  variantVersion: number
}
