import { GetProductDto } from './get-product.dto'
import { VariantVersionPublishState } from '../model/variant-version-publish-state'

export type GetProductVariantVersionDto = {
  draft: GetProductDto.ProductVariant
  id: string
  key: string
  publishState: VariantVersionPublishState
  variant: GetProductDto.ProductVariant
  variantVersion: number
  approvedTabs: {
    marketing: boolean
    labelling?: boolean
    pricing: boolean
    reporting: boolean
    baristaAttributes?: boolean
  }
  draftTabs: {
    marketing: boolean
    labelling?: boolean
    pricing: boolean
    reporting: boolean
    baristaAttributes?: boolean
  }
}
