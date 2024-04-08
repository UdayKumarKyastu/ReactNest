import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export namespace GetNewProductsDto {
  export interface BaseMeta {
    name: Locale.MultilangString
    countryCode: CountryCode
    imageUrl: string
    sku: string
  }

  export interface Version extends BaseMeta {
    isMaster: boolean
    recipeID: string | null
    sku: string
    versionNumber: number
    createdAt: string
  }

  export interface Variant extends BaseMeta {
    isMaster: boolean
    recipeID: string | null
    sku: string
    versionNumber: number
    createdAt: string
    versions: Version[]
  }

  export interface ProductGroup extends BaseMeta {
    variants: Variant[]
  }

  export interface NewProductsResponse {
    productGroups: ProductGroup[]
  }
}
