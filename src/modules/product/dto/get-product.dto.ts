import { ChannelPrice } from '../model/price'
import { Labelling } from '../model/labelling'
import { ProductType } from '../model/product-type'
import { CountryCode } from '../../../shared/model/country-code'
import { VariantVersionPublishState } from '../model/variant-version-publish-state'
import { RecipeStatus } from '../../../shared/model/recipe-status'
import { ProductRange } from '../model/product-range'

export namespace GetProductDto {
  namespace Locale {
    export type Lang = 'en-GB' | 'en-US' | 'fr-FR' | 'en-HK' | 'zh-HK'
    export type MultilangString = Record<Lang, string>
  }

  type Sku = string

  type HGProductCode = string

  export enum LiveStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  interface Cuisine {
    isVegan: boolean
    isVegetarian: boolean
  }

  interface NutritionItem {
    name: string
    localisedLabel: Locale.MultilangString
    per100g: number | null
    perServing: number | null
  }

  export type ProductCategoryTree = { key: string; id: string; name: Locale.MultilangString }[]

  export interface TaxCategory {
    id: string
    name: string
    amount: number
  }

  interface Availability {
    isLive: boolean
    visibleOnDeliveryWebsite: boolean
    availableForPretDelivers: boolean
    availableForClickAndCollect: boolean
    availableForOutposts: boolean
    isChefsSpecial: boolean
    displayAsNew:
      | {
          isDisplayed: true
          until: string
        }
      | {
          isDisplayed: false
          until: null
        }
    liveSchedule: {
      on: string | null
      off: string | null
    }
    availableForLunch: boolean
    availableAllDay: boolean
  }

  export interface BaristaSetup {
    canHaveVariants: boolean
    iceMachineRequired: boolean
    blenderRequired: boolean
    canBeDecaf: boolean
    canAddSyrup: boolean
    canAddExtraCoffeeShot: boolean
    canAddWhippedCream: boolean
    canBeWithoutMilk: boolean
    canBeWithSemiSkimmedMilk: boolean
    canBeWithSkimmedMilk: boolean
    canBeWithOatMilk: boolean
    canBeWithRiceCoconutMilk: boolean
    canBeWithSoyMilk: boolean
  }

  export interface BaristaVariantAttributes {
    withDecafPods: boolean
    withoutMilk: boolean
    withSemiSkimmedMilk: boolean
    withSkimmedMilk: boolean
    withOatMilk: boolean
    withRiceCoconutMilk: boolean
    withSoyMilk: boolean
  }

  interface ProductGroupChangesCount {
    marketing: number
    setUp: number
    categories: number
    total: number
  }

  export interface ProductVariantChangesCount {
    marketing: number
    reporting: number
    attributes: number
    pricing: number
    total: number
    labelling: number
  }

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

  enum ChangeStatus {
    Pending = 'PENDING',
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
  }

  interface ReviewStatusResponse {
    status: ChangeStatus
    modifiedAt: string
    user: {
      name: string
      id: string
    }
  }

  export interface Product {
    name: Locale.MultilangString
    description: Locale.MultilangString
    country: string
    countryCode: CountryCode
    categories: ProductCategoryTree[]
    taxCategory: null | TaxCategory
    variants: ProductVariant[]
    setUp: BaristaSetup | null
    createdAt: string | null
    published: boolean
    type: ProductType
    takeAwayTaxDisabled: boolean
  }

  // todo
  // DTO can NOT be using model! dto must be mapped to model. Change in API cant break entire app
  export interface ProductVariant {
    starKisProductCategoryID: string | null
    pluReportingName: string | null
    starKisProductSubCategoryID: string | null
    pluPrimaryCategoryID: string | null
    pluSecondaryCategoryID: string | null
    parentProductSku: string | null
    productRange: ProductRange[]
    posID: string | null
    sku: Sku
    status: LiveStatus
    prices: ChannelPrice[]
    labelling: Labelling
    hamiltonGrant: {
      cuisine: Cuisine
      productCode: HGProductCode | null
      lastSyncedAt: string | null
      nutrition: NutritionItem[]
      allergens: Array<{
        name: string
        label: Locale.MultilangString
      }>
      ingredients: Locale.MultilangString
      constituentHGCodes: string[]
      hgRecipeStatus: RecipeStatus | null
      recipeTypes: string[] | null
    }
    description: {
      standard: Locale.MultilangString
    }
    name: Locale.MultilangString
    image: null | {
      default: string
      thumbnail: string
    }
    changesCount?: {
      marketing: number
      reporting: number
      attributes: number
      pricing: number
      labelling: number
      total: number
    }
    createdAt: string | null
    published: boolean
    availability: Availability
    isMaster: boolean
    size: string | number
    attributes: BaristaVariantAttributes | null
    howToDisplay: string[]
    version: number
    versions: ProductVariantVersionPreview[]
    reviewStatuses?: any
  }

  interface ReviewStatuses {
    categories: any
    setUp: {
      iceMachineRequired?: ReviewStatusResponse
      blenderRequired?: ReviewStatusResponse
      canHaveVariants?: ReviewStatusResponse
      canBeDecaf?: ReviewStatusResponse
      canAddSyrup?: ReviewStatusResponse
      canAddExtraCoffeeShot?: ReviewStatusResponse
      canAddWhippedCream?: ReviewStatusResponse
      canBeWithoutMilk?: ReviewStatusResponse
      canBeWithSemiSkimmedMilk?: ReviewStatusResponse
      canBeWithSkimmedMilk?: ReviewStatusResponse
      canBeWithOatMilk?: ReviewStatusResponse
      canBeWithRiceCoconutMilk?: ReviewStatusResponse
      canBeWithSoyMilk?: ReviewStatusResponse
      ingredients?: ReviewStatusResponse
    }
    statusCount?: {
      accepted: number
      rejected: number
      pending: number
    }
  }

  export type ProductResponse = {
    product: Product
    taxCategories: TaxCategory[]
    draftChanges: {
      name: Locale.MultilangString
      description: Locale.MultilangString
      lastEdit: string // iso
      taxCategory: TaxCategory
      variants: Array<ProductVariant & { changesCount: ProductVariantChangesCount }>
      categories: { key: string; id: string; name: Locale.MultilangString }[][]
      changesCount: ProductGroupChangesCount
      setUp: BaristaSetup | null
      reviewStatuses?: ReviewStatuses
    }
    version: number
    categories: { key: string; id: string; name: Locale.MultilangString }[][]
  }
}
