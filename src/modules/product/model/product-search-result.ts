import { Locale } from '../../i18n/Locale'
import { CountryCode } from '../../../shared/model/country-code'

export interface ProductSearchItem {
  name: Locale.MultilangString
  sku: string
  masterSku: string
  hgCode: string | null
  type: 'master-variant' | 'variant' | 'group'
  imageUrl: string | null
  countryCode: CountryCode
  createdAt: string
  visibleOnWebsite: boolean
  published: boolean
  isMaster?: boolean
  visibleOnWebsiteVariants?: number
  variants?: ProductSearchItem[]
}

export interface ProductSearchResult {
  products: ProductSearchItem[]
  total: number
}
