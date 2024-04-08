import { Locale } from '../../i18n/Locale'
import { TaxCategory } from './tax-category'
import { ProductVariant } from './product-variant'
import { ProductType } from './product-type'
import { BaristaSetup } from './product-setup'
import { ProductGroupReviewStatuses } from './review-statuses'

export interface DraftChanges {
  lastEdit: Date
  name: Locale.MultilangString
  description: Locale.MultilangString
  taxCategory: TaxCategory
  variants: ProductVariant[]
  type: ProductType
  changesCount: {
    marketing: number
    setUp: number
    categories: number
    total: number
  }
  categories: { key: string; id: string; name: Locale.MultilangString }[][]
  setUp: BaristaSetup | null
  reviewStatuses?: ProductGroupReviewStatuses
}
