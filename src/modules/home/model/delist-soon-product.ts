import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export interface BaseMeta {
  name: Locale.MultilangString
  countryCode: CountryCode
  imageUrl: string
  sku: string
}

export interface DelistSoonVariantVersion extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  liveTo: string | null
  liveFrom: string
}

export interface DelistSoonVariant extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  liveTo: string | null
  liveFrom: string
  versions: DelistSoonVariantVersion[]
}

export interface DelistSoonProductGroup extends BaseMeta {
  variants: DelistSoonVariant[]
}
