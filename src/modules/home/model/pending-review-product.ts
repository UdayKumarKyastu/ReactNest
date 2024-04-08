import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export interface BaseMeta {
  name: Locale.MultilangString
  countryCode: CountryCode
  sku: string
  changesCount: number
  imageUrl: string
}

export interface PendingReviewVariantVersion extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
}

export interface PendingReviewVariant extends BaseMeta {
  isMaster: boolean
  recipeID: string | null
  sku: string
  versionNumber: number
  versions: PendingReviewVariantVersion[]
}

export interface PendingReviewProductGroup extends BaseMeta {
  variants: PendingReviewVariant[]
}
