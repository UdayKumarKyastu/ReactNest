import { Locale } from '../../i18n/Locale'
import { ChannelPrice } from '../model/price'

export declare namespace EditProductVariantDto {
  export type UpdateVariantMarketing = {
    name: Locale.MultilangString
    description: Locale.MultilangString
    availableForClickAndCollect: boolean
    availableForOutposts: boolean
    availableForPretDelivers: boolean
    visibleOnDeliveryWebsite: boolean
    isLive: boolean
    isChefsSpecial: boolean
    displayAsNew: {
      isDisplayed: boolean
      until: string | null
    }
    liveSchedule: {
      on: string | null
      off: string | null
    }
    howToDisplay: string[]
    availableForLunch: boolean
    availableAllDay: boolean
  }

  export type UpdateVariantReporting = {
    pluReportingName: string | null
    pluPrimaryCategoryID: string | null
    pluSecondaryCategoryID: string | null
    starKisProductCategoryID: string | null
    starKisProductSubCategoryID: string | null
  }

  export type UpdateVariantAttributes = {
    withDecafPods: boolean
    withoutMilk: boolean
    withSemiSkimmedMilk: boolean
    withSkimmedMilk: boolean
    withOatMilk: boolean
    withRiceCoconutMilk: boolean
    withSoyMilk: boolean
  }

  export type UpdateVariantPricing = {
    prices: Omit<ChannelPrice, 'channelLabel'>[]
  }

  export type UpdateVariantLabelling = {
    legalTitle: string | null
    storageConditions: string | null
    includeAverageWeightOnLabel: boolean
    includeNutritionalInformationOnLabel: boolean
    countryOfOriginDescription: string | null
    ean13Code: string | null
    useBy: string | null
    sellBy: string | null
    productServes: string | null
    canBeCookedInTurboChef: boolean
    useByTurboChef: string | null
    sellByTurboChef: string | null
  }
}
