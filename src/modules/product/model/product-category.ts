import { Locale } from '../../i18n/Locale'

export interface ProductCategory {
  categoryID: string
  categoryName: Locale.MultilangString
  key: string
  categories: ProductCategory[]
  parentID: string | null
}
