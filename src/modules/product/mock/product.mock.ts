import { Product } from '../model/product'
import { CountryCode } from '../../../shared/model/country-code'
import { LiveStatus } from '../model/live-status'
import { ProductVariant } from '../model/product-variant'
import { Locale } from '../../i18n/Locale'
import { LocaleMock } from '../../i18n/LocaleMock'
import { ProductType } from '../model/product-type'

const MASTER_SKU_1 = 'UK000001'
const MASTER_SKU_2 = 'UK000002'
const VARIANT_1_SKU = 'UK000003'

/**
 * @deprecated use ProductDtoMockBuilder + mapper
 */
const productWithNoVariants: Product = {
  availableTaxCategories: [
    {
      name: '5%',
      id: 'tax-food-5-percent',
      amount: 0.05,
    },
  ],
  type: ProductType.BaristaBeverage,
  takeAwayTaxDisabled: true,
  draftChanges: {
    taxCategory: {
      id: 'tax-food-5-percent',
      name: '5%',
      amount: 0.05,
    },
    name: Locale.MultilangString.generateFrom('Americano'),
    description: Locale.MultilangString.generateFrom('desc'),
    lastEdit: new Date(2020, 1, 1),
    variants: [],
    type: ProductType.BaristaBeverage,
    changesCount: {
      marketing: 0,
      setUp: 5,
      categories: 5,
      total: 10,
    },
    categories: [],
    setUp: {
      blenderRequired: false,
      canAddExtraCoffeeShot: true,
      canAddSyrup: true,
      canAddWhippedCream: true,
      canBeDecaf: false,
      canBeWithOatMilk: true,
      canBeWithoutMilk: true,
      canBeWithRiceCoconutMilk: true,
      canBeWithSemiSkimmedMilk: true,
      canBeWithSkimmedMilk: true,
      canBeWithSoyMilk: true,
      canHaveVariants: true,
      iceMachineRequired: false,
    },
  },
  description: {
    'zh-HK': 'desc',
    'fr-FR': 'desc',
    'en-US': 'desc',
    'en-GB': 'desc',
    'en-HK': 'desc',
  },
  name: {
    'zh-HK': 'Americano',
    'fr-FR': 'Americano',
    'en-US': 'Americano',
    'en-GB': 'Americano',
    'en-HK': 'Americano',
  },
  taxCategory: {
    name: '5%',
    id: 'tax-food-5-percent',
    amount: 0.05,
  },
  version: 5,
  country: 'UK',
  countryCode: CountryCode.UK,
  sku: MASTER_SKU_1,
  createdAt: null,
  published: true,
  categories: [
    [
      {
        name: LocaleMock.createMultiLangMock('cat-1-name'),
        id: '1234-1234-4321',
        key: 'cat-1',
      },
      {
        name: LocaleMock.createMultiLangMock('cat-2-name'),
        id: '1234-1234-4322',
        key: 'cat-2',
      },
    ],
  ],
  setUp: {
    blenderRequired: false,
    canAddExtraCoffeeShot: true,
    canAddSyrup: true,
    canAddWhippedCream: true,
    canBeDecaf: false,
    canBeWithOatMilk: true,
    canBeWithoutMilk: true,
    canBeWithRiceCoconutMilk: true,
    canBeWithSemiSkimmedMilk: true,
    canBeWithSkimmedMilk: true,
    canBeWithSoyMilk: true,
    canHaveVariants: true,
    iceMachineRequired: false,
  },
  masterVariant: {
    name: {
      'zh-HK': 'Americano',
      'fr-FR': 'Americano',
      'en-US': 'Americano',
      'en-GB': 'Americano',
      'en-HK': 'Americano',
    },
    sku: MASTER_SKU_1,
    masterSku: MASTER_SKU_1,
    pluReportingName: 'Americano',
    pluPrimaryCategoryID: 'HOT DRINKS',
    pluSecondaryCategoryID: 'COFFEE',
    starKisProductCategoryID: '',
    starKisProductSubCategoryID: '',
    productRange: [],
    labelling: {
      legalTitle: null,
      storageConditions: null,
      includeAverageWeightOnLabel: true,
      includeNutritionalInformationOnLabel: true,
      countryOfOriginDescription: null,
      ean13Code: null,
      useBy: null,
      sellBy: null,
      canBeCookedInTurboChef: false,
      useByTurboChef: null,
      sellByTurboChef: null,
      productServes: null,
      howToCard: {
        fileName: 'QR_CODE',
        qrPng: '',
        qrSvg: '<svg/>',
      },
    },
    productionCategories: {
      category: '',
      subcategory: '',
    },
    parentProductSku: '',
    pos: 'pos-id-1',
    isMaster: true,
    size: '350ml',
    status: LiveStatus.ACTIVE,
    createdAt: null,
    published: true,
    version: 1,
    versions: [],
    image: {
      default:
        'https://images.ctfassets.net/4zu8gvmtwqss/UK006642-Americano/62681e2d2db4921c8ce958a9dff58383/UK006642_-americano-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
      thumbnail:
        'https://images.ctfassets.net/4zu8gvmtwqss/UK006642-Americano/62681e2d2db4921c8ce958a9dff58383/UK006642_-americano-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
    },
    description: {
      standard: {
        'zh-HK': 'Standard americano description',
        'fr-FR': 'Standard americano description',
        'en-US': 'Standard americano description',
        'en-GB': 'Standard americano description',
        'en-HK': 'Standard americano description',
      },
    },
    availability: {
      availableForClickAndCollect: true,
      availableForOutposts: true,
      availableForPretDelivers: true,
      visibleOnDeliveryWebsite: true,
      isChefsSpecial: true,
      isLive: true,
      displayAsNew: {
        isDisplayed: true,
        until: new Date('2021-06-01T00:00:00Z'),
      },
      liveSchedule: {
        on: null,
        off: null,
      },
      availableForLunch: true,
      availableAllDay: true,
    },
    prices: [
      {
        channelName: 'uk_london',
        channelLabel: Locale.MultilangString.generateFrom('UK London'),
        eatInPrice: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        eatInClubPret: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        eatInTax: 0.2,
        takeAwayPrice: {
          currencyCode: 'GBP',
          centAmount: 1000,
        },
        takeAwayClubPret: {
          currencyCode: 'GBP',
          centAmount: 1000,
        },
        deliveryPrice: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        deliveryTax: 0.2,
      },
    ],
    hamiltonGrant: {
      cuisine: {
        isVegan: true,
        isVegetarian: true,
      },
      allergens: [
        {
          name: 'Milk',
          label: LocaleMock.createMultiLangMock('Milk'),
        },
      ],
      lastSyncedAt: new Date('2021-04-20T10:15:00Z').toISOString(),
      nutrition: [
        {
          name: 'Calories',
          localisedLabel: LocaleMock.createMultiLangMock('Calories'),
          per100g: 100,
          perServing: 1000,
        },
      ],
      productCode: 'HG00001',
      ingredients: {
        'zh-HK': 'Water, Espresso, Oat milk',
        'fr-FR': 'Water, Espresso, Oat milk',
        'en-US': 'Water, Espresso, Oat milk',
        'en-GB': 'Water, Espresso, Oat milk',
        'en-HK': 'Water, Espresso, Oat milk',
      },
      constituentHGCodes: [],
      hgRecipeStatus: null,
      recipeTypes: [],
    },
    attributes: {
      withDecafPods: false,
      withoutMilk: false,
      withOatMilk: false,
      withRiceCoconutMilk: false,
      withSemiSkimmedMilk: false,
      withSkimmedMilk: false,
      withSoyMilk: false,
    },
    howToDisplay: [],
  },
  variants: [],
}

const variant1: ProductVariant = {
  sku: VARIANT_1_SKU,
  masterSku: MASTER_SKU_2,
  name: {
    'zh-HK': 'Americano with milk',
    'fr-FR': 'Americano with milk',
    'en-US': 'Americano with milk',
    'en-GB': 'Americano with milk',
    'en-HK': 'Americano with milk',
  },
  pluReportingName: 'Americano',
  pluPrimaryCategoryID: 'HOT DRINKS',
  pluSecondaryCategoryID: 'COFFEE',
  starKisProductCategoryID: '',
  starKisProductSubCategoryID: '',
  productRange: [],
  labelling: {
    legalTitle: null,
    storageConditions: null,
    includeAverageWeightOnLabel: true,
    includeNutritionalInformationOnLabel: true,
    countryOfOriginDescription: null,
    ean13Code: null,
    useBy: null,
    sellBy: null,
    canBeCookedInTurboChef: false,
    useByTurboChef: null,
    sellByTurboChef: null,
    productServes: null,
    howToCard: {
      fileName: 'QR_CODE',
      qrPng: '',
      qrSvg: '<svg/>',
    },
  },
  changesCount: {
    marketing: 0,
    pricing: 0,
    labelling: 0,
    reporting: 0,
    attributes: 0,
    total: 1,
  },
  productionCategories: {
    category: '',
    subcategory: '',
  },
  parentProductSku: '',
  pos: 'pos-id-3',
  isMaster: false,
  size: '1050ml',
  status: LiveStatus.ACTIVE,
  createdAt: null,
  published: true,
  image: {
    default:
      'https://images.ctfassets.net/4zu8gvmtwqss/UK006555-Cappuccino/4d83773aadcb00bca14855a60eae65fa/UK006555-cappucino-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
    thumbnail:
      'https://images.ctfassets.net/4zu8gvmtwqss/UK006555-Cappuccino/4d83773aadcb00bca14855a60eae65fa/UK006555-cappucino-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
  },
  description: {
    standard: {
      'zh-HK': 'Standard americano with milk description',
      'fr-FR': 'Standard americano with milk description',
      'en-US': 'Standard americano with milk description',
      'en-GB': 'Standard americano with milk description',
      'en-HK': 'Standard americano with milk description',
    },
  },
  availability: {
    availableForClickAndCollect: true,
    availableForOutposts: true,
    availableForPretDelivers: true,
    visibleOnDeliveryWebsite: true,
    isChefsSpecial: true,
    isLive: true,
    displayAsNew: {
      isDisplayed: true,
      until: new Date('2021-06-01T00:00:00Z'),
    },
    liveSchedule: {
      on: null,
      off: new Date('2021-06-01T00:00:00Z').toISOString(),
    },
    availableAllDay: true,
    availableForLunch: true,
  },
  prices: [
    {
      channelName: 'uk_london',
      channelLabel: Locale.MultilangString.generateFrom('UK London'),
      eatInPrice: {
        currencyCode: 'GBP',
        centAmount: 2000,
      },
      eatInClubPret: {
        currencyCode: 'GBP',
        centAmount: 2000,
      },
      eatInTax: 0.2,
      takeAwayPrice: {
        currencyCode: 'GBP',
        centAmount: 1000,
      },
      takeAwayClubPret: {
        currencyCode: 'GBP',
        centAmount: 1000,
      },
      deliveryPrice: {
        currencyCode: 'GBP',
        centAmount: 2000,
      },
      deliveryTax: 0.2,
    },
  ],
  hamiltonGrant: {
    cuisine: {
      isVegan: false,
      isVegetarian: true,
    },
    allergens: [
      {
        name: 'Milk',
        label: LocaleMock.createMultiLangMock('Milk'),
      },
    ],
    lastSyncedAt: new Date('2021-04-20T10:15:00Z').toISOString(),
    nutrition: [
      {
        name: 'Calories',
        localisedLabel: LocaleMock.createMultiLangMock('Calories'),
        per100g: 25,
        perServing: 10,
      },
    ],
    productCode: 'HG12349',
    ingredients: {
      'zh-HK': 'Water, Espresso, Oat milk',
      'fr-FR': 'Water, Espresso, Oat milk',
      'en-US': 'Water, Espresso, Oat milk',
      'en-GB': 'Water, Espresso, Oat milk',
      'en-HK': 'Water, Espresso, Oat milk',
    },
    constituentHGCodes: [],
    hgRecipeStatus: null,
    recipeTypes: [],
  },
  attributes: {
    withDecafPods: false,
    withoutMilk: false,
    withOatMilk: false,
    withRiceCoconutMilk: false,
    withSemiSkimmedMilk: false,
    withSkimmedMilk: false,
    withSoyMilk: false,
  },
  howToDisplay: [],
  version: 1,
  versions: [],
}

const productWithVariants: Product = {
  availableTaxCategories: [
    {
      name: '5%',
      id: 'tax-food-5-percent',
      amount: 0.05,
    },
  ],
  type: ProductType.BaristaBeverage,
  takeAwayTaxDisabled: true,
  draftChanges: {
    taxCategory: {
      id: 'tax-food-5-percent',
      name: '5%',
      amount: 0.05,
    },
    name: Locale.MultilangString.generateFrom('Americano'),
    description: Locale.MultilangString.generateFrom('desc'),
    lastEdit: new Date(2020, 1, 1),
    variants: [variant1],
    type: ProductType.BaristaBeverage,
    changesCount: {
      marketing: 0,
      setUp: 5,
      categories: 5,
      total: 0,
    },
    categories: [],
    setUp: {
      blenderRequired: false,
      canAddExtraCoffeeShot: true,
      canAddSyrup: true,
      canAddWhippedCream: true,
      canBeDecaf: false,
      canBeWithOatMilk: true,
      canBeWithoutMilk: true,
      canBeWithRiceCoconutMilk: true,
      canBeWithSemiSkimmedMilk: true,
      canBeWithSkimmedMilk: true,
      canBeWithSoyMilk: true,
      canHaveVariants: true,
      iceMachineRequired: false,
    },
  },
  version: 10,
  description: Locale.MultilangString.generateFrom('desc'),
  name: Locale.MultilangString.generateFrom('Americano'),
  createdAt: null,
  published: true,
  taxCategory: {
    name: '5%',
    id: 'tax-food-5-percent',
    amount: 0.05,
  },
  country: 'UK',
  countryCode: CountryCode.UK,
  sku: MASTER_SKU_2,
  categories: [
    [
      {
        name: LocaleMock.createMultiLangMock('cat-1-name'),
        id: '1234-1234-4321',
        key: 'cat-1',
      },
      {
        name: LocaleMock.createMultiLangMock('cat-2-name'),
        id: '1234-1234-4322',
        key: 'cat-2',
      },
    ],
  ],
  setUp: {
    blenderRequired: false,
    canAddExtraCoffeeShot: true,
    canAddSyrup: true,
    canAddWhippedCream: true,
    canBeDecaf: false,
    canBeWithOatMilk: true,
    canBeWithoutMilk: true,
    canBeWithRiceCoconutMilk: true,
    canBeWithSemiSkimmedMilk: true,
    canBeWithSkimmedMilk: true,
    canBeWithSoyMilk: true,
    canHaveVariants: true,
    iceMachineRequired: false,
  },
  masterVariant: {
    name: {
      'zh-HK': 'Latte',
      'fr-FR': 'Latte',
      'en-US': 'Latte',
      'en-GB': 'Latte',
      'en-HK': 'Latte',
    },
    sku: MASTER_SKU_2,
    masterSku: MASTER_SKU_2,
    pluReportingName: 'Americano',
    pluPrimaryCategoryID: 'HOT DRINKS',
    pluSecondaryCategoryID: 'COFFEE',
    starKisProductCategoryID: '',
    starKisProductSubCategoryID: '',
    productRange: [],
    labelling: {
      legalTitle: null,
      storageConditions: null,
      includeAverageWeightOnLabel: true,
      includeNutritionalInformationOnLabel: true,
      countryOfOriginDescription: null,
      ean13Code: null,
      useBy: null,
      sellBy: null,
      canBeCookedInTurboChef: false,
      useByTurboChef: null,
      sellByTurboChef: null,
      productServes: null,
      howToCard: {
        fileName: 'QR_CODE',
        qrPng: '',
        qrSvg: '<svg/>',
      },
    },
    productionCategories: {
      category: '',
      subcategory: '',
    },
    parentProductSku: '',
    pos: 'pos-id-2',
    isMaster: true,
    createdAt: null,
    published: true,
    size: '650ml',
    status: LiveStatus.INACTIVE,
    image: {
      default:
        'https://images.ctfassets.net/4zu8gvmtwqss/UK006642-Americano/62681e2d2db4921c8ce958a9dff58383/UK006642_-americano-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
      thumbnail:
        'https://images.ctfassets.net/4zu8gvmtwqss/UK006642-Americano/62681e2d2db4921c8ce958a9dff58383/UK006642_-americano-coffee-2000x2000.jpg?fm=jpg&fl=progressive&w=502',
    },
    description: {
      standard: {
        'zh-HK': 'Standard latte description',
        'fr-FR': 'Standard latte description',
        'en-US': 'Standard latte description',
        'en-GB': 'Standard latte description',
        'en-HK': 'Standard latte description',
      },
    },
    availability: {
      availableForClickAndCollect: true,
      availableForOutposts: true,
      availableForPretDelivers: true,
      visibleOnDeliveryWebsite: true,
      isChefsSpecial: true,
      isLive: true,
      displayAsNew: {
        isDisplayed: true,
        until: new Date('2021-06-01T00:00:00Z'),
      },
      liveSchedule: {
        on: null,
        off: null,
      },
      availableForLunch: true,
      availableAllDay: true,
    },
    prices: [
      {
        channelName: 'uk_london',
        channelLabel: Locale.MultilangString.generateFrom('UK London'),
        eatInPrice: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        eatInClubPret: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        eatInTax: 0.2,
        takeAwayPrice: {
          currencyCode: 'GBP',
          centAmount: 1000,
        },
        takeAwayClubPret: {
          currencyCode: 'GBP',
          centAmount: 1000,
        },
        deliveryPrice: {
          currencyCode: 'GBP',
          centAmount: 2000,
        },
        deliveryTax: 0.2,
      },
    ],
    hamiltonGrant: {
      cuisine: {
        isVegan: true,
        isVegetarian: true,
      },
      allergens: [
        {
          name: 'Milk',
          label: LocaleMock.createMultiLangMock('Milk'),
        },
      ],
      lastSyncedAt: new Date('2021-04-20T10:15:00Z').toISOString(),
      nutrition: [
        {
          name: 'Calories',
          localisedLabel: LocaleMock.createMultiLangMock('Calories'),
          per100g: 0,
          perServing: 0,
        },
      ],
      productCode: 'HG00002',
      ingredients: {
        'zh-HK': 'Water, Espresso, Oat milk',
        'fr-FR': 'Water, Espresso, Oat milk',
        'en-US': 'Water, Espresso, Oat milk',
        'en-GB': 'Water, Espresso, Oat milk',
        'en-HK': 'Water, Espresso, Oat milk',
      },
      constituentHGCodes: [],
      hgRecipeStatus: null,
      recipeTypes: [],
    },
    attributes: {
      withDecafPods: false,
      withoutMilk: false,
      withOatMilk: false,
      withRiceCoconutMilk: false,
      withSemiSkimmedMilk: false,
      withSkimmedMilk: false,
      withSoyMilk: false,
    },
    howToDisplay: [],
    version: 1,
    versions: [],
  },
  variants: [variant1],
}

export const ProductMock = {
  all: [productWithNoVariants, productWithVariants],
  withVariants: productWithVariants,
  noVariants: productWithNoVariants,
}
