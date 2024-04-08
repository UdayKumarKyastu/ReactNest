import { Locale } from '../../i18n/Locale'
import { Sku } from './sku'
import { MasterProductVariant, ProductVariant } from './product-variant'
import { BaristaSetup } from './product-setup'
import { TaxCategory } from './tax-category'
import { ProductType } from './product-type'
import { CountryCode } from '../../../shared/model/country-code'
import { DraftChanges } from './draft-changes'

type ProductCategoryTree = Array<{
  id: string
  name: Locale.MultilangString
  key: string
}>

type Option = {
  key: string
  label: string
  children?: Option[]
}
export interface VariantReportingOptions {
  pluCategoryOptions: Option[]
  starKisCategoryOptions: Option[]
}
export interface LabellingOptions {
  instructionsForUse: Option[]
  sellBy: Option[]
  useBy: Option[]
  productServes: Option[]
}

export interface Product {
  name: Locale.MultilangString
  description: Locale.MultilangString
  country: string
  countryCode: CountryCode
  sku: Sku
  categories: ProductCategoryTree[]
  /**
   * Not every product has a tax category
   */
  taxCategory: TaxCategory | null
  masterVariant: MasterProductVariant
  variants: ProductVariant[]
  setUp: BaristaSetup | null
  type: ProductType
  takeAwayTaxDisabled: boolean
  draftChanges: DraftChanges
  createdAt: string | null
  published: boolean
  availableTaxCategories: TaxCategory[]
  version: number
}
