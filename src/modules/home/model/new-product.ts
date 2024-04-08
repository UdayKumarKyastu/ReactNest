import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export interface BaseMeta {
  name: Locale.MultilangString
  countryCode: CountryCode
  imageUrl: string
  sku: string
}

export interface NewVariantVersion extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  createdAt: string
}

export interface NewVariant extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  createdAt: string
  versions: NewVariantVersion[]
}

export interface NewProductGroup extends BaseMeta {
  variants: NewVariant[]
}
