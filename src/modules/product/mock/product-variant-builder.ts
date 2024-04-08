import { ChangesCount, ProductVariant } from '../model/product-variant'

const MULTI_LANG_NAME_MOCK = {
  'en-GB': '',
  'en-US': '',
  'fr-FR': '',
  'en-HK': '',
  'zh-HK': '',
}

export class ProductVariantBuilder {
  private readonly variant: Partial<ProductVariant> = {
    sku: 'UK000003',
    masterSku: 'UK000003',
    versions: [],
    name: MULTI_LANG_NAME_MOCK,
    hamiltonGrant: {
      productCode: 'code123',
      cuisine: {
        isVegan: false,
        isVegetarian: false,
      },
      lastSyncedAt: '',
      nutrition: [],
      allergens: [],
      ingredients: MULTI_LANG_NAME_MOCK,
      constituentHGCodes: [],
      hgRecipeStatus: null,
      recipeTypes: [],
    },
    description: {
      standard: MULTI_LANG_NAME_MOCK,
    },
    prices: [
      {
        channelName: '',
        eatInPrice: { currencyCode: '', centAmount: 1 },
        eatInClubPret: { currencyCode: '', centAmount: 1 },
        eatInTax: 1,
        takeAwayPrice: { currencyCode: '', centAmount: 1 },
        takeAwayClubPret: { currencyCode: '', centAmount: 1 },
        takeAwayTax: 1,
        channelLabel: MULTI_LANG_NAME_MOCK,
        deliveryPrice: { currencyCode: '', centAmount: 1 },
        deliveryTax: 1,
      },
    ],
    availability: {
      isChefsSpecial: false,
      isLive: false,
      availableAllDay: false,
      availableForClickAndCollect: false,
      availableForLunch: false,
      availableForOutposts: false,
      availableForPretDelivers: false,
      visibleOnDeliveryWebsite: false,
      liveSchedule: {
        off: '',
        on: '',
      },
      displayAsNew: {} as any,
    },
  }

  withSku(sku: string) {
    this.variant.sku = sku
    return this
  }

  asMaster(isMaster: boolean) {
    this.variant.isMaster = isMaster
    return this
  }

  withChangesCount(changesCount: ChangesCount) {
    this.variant.changesCount = changesCount
    return this
  }

  build() {
    return { ...this.variant } as ProductVariant
  }
}
