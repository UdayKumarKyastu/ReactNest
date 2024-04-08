import { Locale } from '../../i18n/Locale'
import { Sku } from './sku'
import { LiveStatus } from './live-status'
import { Availability } from './product-availability'
import { BaristaVariantAttributes } from './barista-attributes'
import { HamiltonGrant } from './hamilton-grant'
import { ChannelPrice } from './price'
import { Labelling } from './labelling'
import { VariantVersionPublishState } from './variant-version-publish-state'
import { VariantVersionReviewStatuses } from './variant-version-review-statuses'
import { ProductRange } from './product-range'

export interface ProductVariantVersionPreview {
  name: Locale.MultilangString
  sku: string
  liveFrom: string
  publishState: VariantVersionPublishState
  hgCode: string
  version: number
  id: string
  key: string
}

export interface ChangesCount {
  marketing: number
  reporting: number
  attributes: number
  pricing: number
  labelling: number
  total: number
}

export interface ProductVariant {
  version: number
  versions: ProductVariantVersionPreview[]
  sku: Sku
  masterSku: Sku
  status: LiveStatus
  prices: ChannelPrice[]
  hamiltonGrant: HamiltonGrant
  description: {
    standard: Locale.MultilangString
  }
  name: Locale.MultilangString
  pos: string | null
  productionCategories: {
    category: string | null
    subcategory: string | null
  }
  image: null | {
    default: string
    thumbnail: string
  }
  availability: Availability
  isMaster: boolean
  size: string | number
  attributes: BaristaVariantAttributes | null
  howToDisplay: string[]
  starKisProductCategoryID: string | null
  pluReportingName: string | null
  starKisProductSubCategoryID: string | null
  pluPrimaryCategoryID: string | null
  pluSecondaryCategoryID: string | null
  productRange: ProductRange[]
  labelling: Labelling
  parentProductSku: string | null
  createdAt: string | null
  published: boolean
  changesCount?: ChangesCount
  reviewStatuses?: VariantVersionReviewStatuses
}

export interface ProductVariantVersion extends ProductVariant {
  versionKey: string
  publishState: VariantVersionPublishState
  draft?: Omit<ProductVariantVersion, 'approvedTabs' | 'draftTabs'>
  approvedTabs: {
    marketing: boolean
    labelling?: boolean
    pricing: boolean
    reporting: boolean
    baristaAttributes?: boolean
  }
  draftTabs: {
    marketing: boolean
    labelling?: boolean
    pricing: boolean
    reporting: boolean
    baristaAttributes?: boolean
  }
}
export interface MasterProductVariant extends ProductVariant {
  isMaster: true
}
