import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export interface BaseMeta {
  name: Locale.MultilangString
  countryCode: CountryCode
  imageUrl: string
  sku: string
}

export interface LiveSoonVariantVersion extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  liveFrom: string
}

export interface LiveSoonVariant extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  liveFrom: string
  versions: LiveSoonVariantVersion[]
}

export interface LiveSoonProductGroup extends BaseMeta {
  variants: LiveSoonVariant[]
}
