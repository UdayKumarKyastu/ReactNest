import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export namespace GetPendingReviewProductsDto {
  export interface BaseMeta {
    name: Locale.MultilangString
    countryCode: CountryCode
    changesCount: number
    sku: string
    imageUrl: string
  }

  export interface VariantVersion extends BaseMeta {
    isMaster: boolean
    recipeID: string | null
    sku: string
    versionNumber: number
  }

  export interface Variant extends BaseMeta {
    isMaster: boolean
    recipeID: string | null
    sku: string
    versionNumber: number
    versions: VariantVersion[]
  }

  export interface ProductGroup extends BaseMeta {
    variants: Variant[]
  }

  export interface PendingReviewProductsResponse {
    productGroups: ProductGroup[]
  }
}
