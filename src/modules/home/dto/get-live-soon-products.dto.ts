import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export namespace GetLiveSoonProductsDto {
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
    liveFrom: string
  }

  export interface Variant extends BaseMeta {
    isMaster: boolean
    recipeID: string | null
    sku: string
    versionNumber: number
    liveFrom: string
    versions: Version[]
  }

  export interface ProductGroup extends BaseMeta {
    variants: Variant[]
  }

  export interface LiveSoonProductsResponse {
    productGroups: ProductGroup[]
  }
}
