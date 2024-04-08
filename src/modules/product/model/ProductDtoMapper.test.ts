import { ProductDtoMapper } from './ProductDtoMapper'
import { ProductSetupMock } from './product-setup'
import { SearchProductsDto } from '../../search/dto/search-products.dto'
import { GetProductDto } from '../dto/get-product.dto'
import { LocaleMock } from '../../i18n/LocaleMock'
import { ProductType } from './product-type'
import { CountryCode } from '../../../shared/model/country-code'

const createMultiLandMock = LocaleMock.createMultiLangMock

// todo use mock builder
const variantBaseMock: GetProductDto.ProductVariant = {
  pluPrimaryCategoryID: null,
  pluReportingName: null,
  pluSecondaryCategoryID: null,
  starKisProductCategoryID: null,
  starKisProductSubCategoryID: null,
  productRange: [],
  howToDisplay: ['ATC', 'ABT'],
  versions: [],
  name: LocaleMock.createMultiLangMock('Mock product name'),
  sku: 'UK12345',
  status: GetProductDto.LiveStatus.ACTIVE,
  image: {
    default: 'default-image-url',
    thumbnail: 'thumb-image-url',
  },
  parentProductSku: '',
  createdAt: '2020-01-01T10:00:00Z',
  published: true,
  posID: 'Pos',
  hamiltonGrant: {
    cuisine: { isVegan: true, isVegetarian: true },
    lastSyncedAt: '2020-01-01T10:00:00Z',
    ingredients: LocaleMock.createMultiLangMock('ingredients'),
    productCode: 'HG12345',
    nutrition: [
      {
        name: 'Protein',
        per100g: 0,
        perServing: 0,
        localisedLabel: LocaleMock.createMultiLangMock('Protein'),
      },
    ],
    allergens: [
      {
        name: 'Milk',
        label: LocaleMock.createMultiLangMock('Milk'),
      },
    ],
    constituentHGCodes: [],
    hgRecipeStatus: null,
    recipeTypes: [],
  },
  description: {
    standard: LocaleMock.createMultiLangMock('description standard'),
  },
  attributes: {
    withOatMilk: true,
    withSemiSkimmedMilk: false,
    withDecafPods: false,
    withoutMilk: false,
    withRiceCoconutMilk: false,
    withSkimmedMilk: false,
    withSoyMilk: false,
  },
  prices: [],
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
  availability: {
    availableForClickAndCollect: false,
    availableForOutposts: false,
    availableForPretDelivers: false,
    displayAsNew: { isDisplayed: false, until: null },
    isChefsSpecial: false,
    isLive: false,
    liveSchedule: { off: null, on: null },
    visibleOnDeliveryWebsite: false,
    availableForLunch: true,
    availableAllDay: true,
  },
  size: 300,
  isMaster: true,
  version: 1,
}

describe('ProductDtoMapper', () => {
  describe('Search results DTO', () => {
    /**
     * TODO Move to some mocking class
     */
    const getVariantMock = (): SearchProductsDto.SearchedProductVariant => ({
      name: createMultiLandMock('Americano'),
      isMaster: true,
      hgCode: 'UK1111',
      sku: 'UK12345',
      imageUrl: null,
      masterSku: 'master sku',
      createdAt: '2020-01-01T10:00:00Z',
      visibleOnWebsite: true,
      countryCode: CountryCode.UK,
      published: true,
    })

    const getProductGroupMock = (): SearchProductsDto.SearchedProductGroup => ({
      sku: 'UK12345',
      name: createMultiLandMock('Americano'),
      variants: [],
      visibleOnWebsite: true,
      countryCode: CountryCode.UK,
      published: true,
      masterSku: 'master sku',
      createdAt: '2020-01-01T10:00:00Z',
      visibleOnWebsiteVariants: 1,
      hgCode: null,
    })

    it('Maps SearchProductsDto.SearchProductsResponse to ProductSearchResult', () => {
      const product1 = getProductGroupMock()
      const product2 = getProductGroupMock()

      product2.name = createMultiLandMock('Latte')

      const masterVariant1 = getVariantMock()
      const masterVariant2 = getVariantMock()

      masterVariant2.name = createMultiLandMock('Latte')
      masterVariant2.sku = 'GB101010'

      const variant = getVariantMock()
      variant.isMaster = false
      variant.sku = 'GB01000'
      variant.name = createMultiLandMock('Latte with milk')

      product1.variants.push(masterVariant1)
      product2.variants.push(masterVariant2)
      product2.variants.push(variant)

      const result = ProductDtoMapper.searchCollectionToProducts({
        products: [product1, product2],
        total: 2,
      })

      // At the moment, show only product groups and ignore variants on list.
      expect(result).toHaveLength(2)

      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "countryCode": "UK",
            "createdAt": "2020-01-01T10:00:00Z",
            "hgCode": "UK1111",
            "imageUrl": null,
            "isMaster": true,
            "masterSku": "UK12345",
            "name": _class2 {
              "en-GB": "Americano-en-GB",
              "en-HK": "Americano-en-HK",
              "en-US": "Americano-en-US",
              "fr-FR": "Americano-fr-FR",
              "zh-HK": "Americano-zh-HK",
            },
            "published": true,
            "sku": "UK12345",
            "status": true,
            "type": "group",
            "variants": Array [
              Object {
                "countryCode": "UK",
                "createdAt": "2020-01-01T10:00:00Z",
                "hgCode": "UK1111",
                "imageUrl": null,
                "isMaster": true,
                "masterSku": "UK12345",
                "name": _class2 {
                  "en-GB": "Americano-en-GB",
                  "en-HK": "Americano-en-HK",
                  "en-US": "Americano-en-US",
                  "fr-FR": "Americano-fr-FR",
                  "zh-HK": "Americano-zh-HK",
                },
                "published": true,
                "sku": "UK12345",
                "status": true,
                "type": "master-variant",
                "visibleOnWebsite": true,
              },
            ],
            "visibleOnWebsite": true,
            "visibleOnWebsiteVariants": 1,
          },
          Object {
            "countryCode": "UK",
            "createdAt": "2020-01-01T10:00:00Z",
            "hgCode": "UK1111",
            "imageUrl": null,
            "isMaster": true,
            "masterSku": "GB101010",
            "name": _class2 {
              "en-GB": "Latte-en-GB",
              "en-HK": "Latte-en-HK",
              "en-US": "Latte-en-US",
              "fr-FR": "Latte-fr-FR",
              "zh-HK": "Latte-zh-HK",
            },
            "published": true,
            "sku": "UK12345",
            "status": true,
            "type": "group",
            "variants": Array [
              Object {
                "countryCode": "UK",
                "createdAt": "2020-01-01T10:00:00Z",
                "hgCode": "UK1111",
                "imageUrl": null,
                "isMaster": true,
                "masterSku": "GB101010",
                "name": _class2 {
                  "en-GB": "Latte-en-GB",
                  "en-HK": "Latte-en-HK",
                  "en-US": "Latte-en-US",
                  "fr-FR": "Latte-fr-FR",
                  "zh-HK": "Latte-zh-HK",
                },
                "published": true,
                "sku": "GB101010",
                "status": true,
                "type": "master-variant",
                "visibleOnWebsite": true,
              },
              Object {
                "countryCode": "UK",
                "createdAt": "2020-01-01T10:00:00Z",
                "hgCode": "UK1111",
                "imageUrl": null,
                "isMaster": false,
                "masterSku": "GB01000",
                "name": _class2 {
                  "en-GB": "Latte with milk-en-GB",
                  "en-HK": "Latte with milk-en-HK",
                  "en-US": "Latte with milk-en-US",
                  "fr-FR": "Latte with milk-fr-FR",
                  "zh-HK": "Latte with milk-zh-HK",
                },
                "published": true,
                "sku": "GB01000",
                "status": true,
                "type": "variant",
                "visibleOnWebsite": true,
              },
            ],
            "visibleOnWebsite": true,
            "visibleOnWebsiteVariants": 1,
          },
        ]
      `)
    })
  })

  describe('Single product DTO to model', () => {
    it('Maps product properly', () => {
      /**
       * TODO create response builder mock
       */
      const dto: GetProductDto.ProductResponse = {
        product: {
          name: LocaleMock.createMultiLangMock('name'),
          description: LocaleMock.createMultiLangMock('desc'),
          setUp: ProductSetupMock.getMockBaristaSetup(),
          taxCategory: { id: 'tax-category-id', name: 'Category name', amount: 0.05 },
          country: 'GB',
          countryCode: CountryCode.UK,
          createdAt: '2020-01-01T10:00:00Z',
          published: true,
          type: ProductType.BaristaBeverage,
          takeAwayTaxDisabled: true,
          categories: [
            [
              {
                name: createMultiLandMock('cat-1-name'),
                id: '1234-1234-4321',
                key: 'cat-1',
              },
              {
                name: createMultiLandMock('cat-2-name'),
                id: '1234-1234-4322',
                key: 'cat-2',
              },
            ],
          ],
          variants: [variantBaseMock],
        },
        categories: [],
        taxCategories: [
          {
            name: 'tax-5',
            id: 'tax-5',
            amount: 0.05,
          },
        ],
        version: 1,
        draftChanges: {
          name: LocaleMock.createMultiLangMock('name'),
          description: LocaleMock.createMultiLangMock('desc'),
          lastEdit: '2020-01-01T10:10:00Z',
          variants: [
            {
              ...variantBaseMock,
              changesCount: {
                marketing: 1,
                reporting: 0,
                attributes: 0,
                pricing: 0,
                labelling: 0,
                total: 1,
              },
            },
          ],
          changesCount: {
            marketing: 0,
            setUp: 0,
            categories: 0,
            total: 0,
          },
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
          taxCategory: {
            id: 'tax-5',
            name: 'Vat 5%',
            amount: 0.05,
          },
          categories: [
            [
              {
                name: createMultiLandMock('cat-1-name'),
                id: '1234-1234-4321',
                key: 'cat-1',
              },
              {
                name: createMultiLandMock('cat-2-name'),
                id: '1234-1234-4322',
                key: 'cat-2',
              },
            ],
          ],
        },
      }

      expect(ProductDtoMapper.singleToProduct(dto)).toMatchInlineSnapshot(`
        Object {
          "availableTaxCategories": Array [
            Object {
              "amount": 0.05,
              "id": "tax-5",
              "name": "tax-5",
            },
          ],
          "categories": Array [
            Array [
              Object {
                "id": "1234-1234-4321",
                "key": "cat-1",
                "name": Object {
                  "en-GB": "cat-1-name-en-GB",
                  "en-HK": "cat-1-name-en-HK",
                  "en-US": "cat-1-name-en-US",
                  "fr-FR": "cat-1-name-fr-FR",
                  "zh-HK": "cat-1-name-zh-HK",
                },
              },
              Object {
                "id": "1234-1234-4322",
                "key": "cat-2",
                "name": Object {
                  "en-GB": "cat-2-name-en-GB",
                  "en-HK": "cat-2-name-en-HK",
                  "en-US": "cat-2-name-en-US",
                  "fr-FR": "cat-2-name-fr-FR",
                  "zh-HK": "cat-2-name-zh-HK",
                },
              },
            ],
          ],
          "country": "GB",
          "countryCode": "UK",
          "createdAt": "2020-01-01T10:00:00.000Z",
          "description": Object {
            "en-GB": "desc-en-GB",
            "en-HK": "desc-en-HK",
            "en-US": "desc-en-US",
            "fr-FR": "desc-fr-FR",
            "zh-HK": "desc-zh-HK",
          },
          "draftChanges": Object {
            "categories": Array [
              Array [
                Object {
                  "id": "1234-1234-4321",
                  "key": "cat-1",
                  "name": Object {
                    "en-GB": "cat-1-name-en-GB",
                    "en-HK": "cat-1-name-en-HK",
                    "en-US": "cat-1-name-en-US",
                    "fr-FR": "cat-1-name-fr-FR",
                    "zh-HK": "cat-1-name-zh-HK",
                  },
                },
                Object {
                  "id": "1234-1234-4322",
                  "key": "cat-2",
                  "name": Object {
                    "en-GB": "cat-2-name-en-GB",
                    "en-HK": "cat-2-name-en-HK",
                    "en-US": "cat-2-name-en-US",
                    "fr-FR": "cat-2-name-fr-FR",
                    "zh-HK": "cat-2-name-zh-HK",
                  },
                },
              ],
            ],
            "changesCount": Object {
              "categories": 0,
              "marketing": 0,
              "setUp": 0,
              "total": 0,
            },
            "description": Object {
              "en-GB": "desc-en-GB",
              "en-HK": "desc-en-HK",
              "en-US": "desc-en-US",
              "fr-FR": "desc-fr-FR",
              "zh-HK": "desc-zh-HK",
            },
            "lastEdit": 2020-01-01T10:10:00.000Z,
            "name": Object {
              "en-GB": "name-en-GB",
              "en-HK": "name-en-HK",
              "en-US": "name-en-US",
              "fr-FR": "name-fr-FR",
              "zh-HK": "name-zh-HK",
            },
            "reviewStatuses": undefined,
            "setUp": Object {
              "blenderRequired": false,
              "canAddExtraCoffeeShot": true,
              "canAddSyrup": true,
              "canAddWhippedCream": true,
              "canBeDecaf": false,
              "canBeWithOatMilk": true,
              "canBeWithRiceCoconutMilk": true,
              "canBeWithSemiSkimmedMilk": true,
              "canBeWithSkimmedMilk": true,
              "canBeWithSoyMilk": true,
              "canBeWithoutMilk": true,
              "canHaveVariants": true,
              "iceMachineRequired": false,
            },
            "taxCategory": Object {
              "amount": 0.05,
              "id": "tax-5",
              "name": "Vat 5%",
            },
            "type": "barista_beverage",
            "variants": Array [
              Object {
                "attributes": Object {
                  "withDecafPods": false,
                  "withOatMilk": true,
                  "withRiceCoconutMilk": false,
                  "withSemiSkimmedMilk": false,
                  "withSkimmedMilk": false,
                  "withSoyMilk": false,
                  "withoutMilk": false,
                },
                "availability": Availability {
                  "availableAllDay": true,
                  "availableForClickAndCollect": false,
                  "availableForLunch": true,
                  "availableForOutposts": false,
                  "availableForPretDelivers": false,
                  "displayAsNew": Object {
                    "isDisplayed": false,
                    "until": null,
                  },
                  "isChefsSpecial": false,
                  "isLive": false,
                  "liveSchedule": Object {
                    "off": null,
                    "on": null,
                  },
                  "visibleOnDeliveryWebsite": false,
                },
                "changesCount": Object {
                  "attributes": 0,
                  "labelling": 0,
                  "marketing": 1,
                  "pricing": 0,
                  "reporting": 0,
                  "total": 1,
                },
                "createdAt": "2020-01-01T10:00:00Z",
                "description": Object {
                  "standard": Object {
                    "en-GB": "description standard-en-GB",
                    "en-HK": "description standard-en-HK",
                    "en-US": "description standard-en-US",
                    "fr-FR": "description standard-fr-FR",
                    "zh-HK": "description standard-zh-HK",
                  },
                },
                "hamiltonGrant": HamiltonGrant {
                  "allergens": Array [
                    Object {
                      "label": Object {
                        "en-GB": "Milk-en-GB",
                        "en-HK": "Milk-en-HK",
                        "en-US": "Milk-en-US",
                        "fr-FR": "Milk-fr-FR",
                        "zh-HK": "Milk-zh-HK",
                      },
                      "name": "Milk",
                    },
                  ],
                  "constituentHGCodes": Array [],
                  "cuisine": Object {
                    "isVegan": true,
                    "isVegetarian": true,
                  },
                  "hgRecipeStatus": null,
                  "ingredients": Object {
                    "en-GB": "ingredients-en-GB",
                    "en-HK": "ingredients-en-HK",
                    "en-US": "ingredients-en-US",
                    "fr-FR": "ingredients-fr-FR",
                    "zh-HK": "ingredients-zh-HK",
                  },
                  "lastSyncedAt": "2020-01-01T10:00:00.000Z",
                  "nutrition": Array [
                    Object {
                      "localisedLabel": Object {
                        "en-GB": "Protein-en-GB",
                        "en-HK": "Protein-en-HK",
                        "en-US": "Protein-en-US",
                        "fr-FR": "Protein-fr-FR",
                        "zh-HK": "Protein-zh-HK",
                      },
                      "name": "Protein",
                      "per100g": 0,
                      "perServing": 0,
                    },
                  ],
                  "productCode": "HG12345",
                  "recipeTypes": Array [],
                },
                "howToDisplay": Array [
                  "ATC",
                  "ABT",
                ],
                "image": Object {
                  "default": "default-image-url",
                  "thumbnail": "thumb-image-url",
                },
                "isMaster": false,
                "labelling": Object {
                  "canBeCookedInTurboChef": false,
                  "countryOfOriginDescription": null,
                  "ean13Code": null,
                  "howToCard": Object {
                    "fileName": "QR_CODE",
                    "qrPng": "",
                    "qrSvg": "<svg/>",
                  },
                  "includeAverageWeightOnLabel": true,
                  "includeNutritionalInformationOnLabel": true,
                  "legalTitle": null,
                  "productServes": null,
                  "sellBy": null,
                  "sellByTurboChef": null,
                  "storageConditions": null,
                  "useBy": null,
                  "useByTurboChef": null,
                },
                "masterSku": "UK12345",
                "name": Object {
                  "en-GB": "Mock product name-en-GB",
                  "en-HK": "Mock product name-en-HK",
                  "en-US": "Mock product name-en-US",
                  "fr-FR": "Mock product name-fr-FR",
                  "zh-HK": "Mock product name-zh-HK",
                },
                "parentProductSku": "",
                "pluPrimaryCategoryID": null,
                "pluReportingName": null,
                "pluSecondaryCategoryID": null,
                "pos": "Pos",
                "posID": "Pos",
                "prices": Array [],
                "productRange": Array [],
                "productionCategories": Object {
                  "category": null,
                  "subcategory": null,
                },
                "published": true,
                "size": 300,
                "sku": "UK12345",
                "starKisProductCategoryID": null,
                "starKisProductSubCategoryID": null,
                "status": "ACTIVE",
                "version": 1,
                "versions": Array [],
              },
            ],
          },
          "masterVariant": Object {
            "attributes": Object {
              "withDecafPods": false,
              "withOatMilk": true,
              "withRiceCoconutMilk": false,
              "withSemiSkimmedMilk": false,
              "withSkimmedMilk": false,
              "withSoyMilk": false,
              "withoutMilk": false,
            },
            "availability": Availability {
              "availableAllDay": true,
              "availableForClickAndCollect": false,
              "availableForLunch": true,
              "availableForOutposts": false,
              "availableForPretDelivers": false,
              "displayAsNew": Object {
                "isDisplayed": false,
                "until": null,
              },
              "isChefsSpecial": false,
              "isLive": false,
              "liveSchedule": Object {
                "off": null,
                "on": null,
              },
              "visibleOnDeliveryWebsite": false,
            },
            "createdAt": "2020-01-01T10:00:00.000Z",
            "description": Object {
              "standard": Object {
                "en-GB": "description standard-en-GB",
                "en-HK": "description standard-en-HK",
                "en-US": "description standard-en-US",
                "fr-FR": "description standard-fr-FR",
                "zh-HK": "description standard-zh-HK",
              },
            },
            "hamiltonGrant": HamiltonGrant {
              "allergens": Array [
                Object {
                  "label": Object {
                    "en-GB": "Milk-en-GB",
                    "en-HK": "Milk-en-HK",
                    "en-US": "Milk-en-US",
                    "fr-FR": "Milk-fr-FR",
                    "zh-HK": "Milk-zh-HK",
                  },
                  "name": "Milk",
                },
              ],
              "constituentHGCodes": Array [],
              "cuisine": Object {
                "isVegan": true,
                "isVegetarian": true,
              },
              "hgRecipeStatus": null,
              "ingredients": Object {
                "en-GB": "ingredients-en-GB",
                "en-HK": "ingredients-en-HK",
                "en-US": "ingredients-en-US",
                "fr-FR": "ingredients-fr-FR",
                "zh-HK": "ingredients-zh-HK",
              },
              "lastSyncedAt": "2020-01-01T10:00:00.000Z",
              "nutrition": Array [
                Object {
                  "localisedLabel": Object {
                    "en-GB": "Protein-en-GB",
                    "en-HK": "Protein-en-HK",
                    "en-US": "Protein-en-US",
                    "fr-FR": "Protein-fr-FR",
                    "zh-HK": "Protein-zh-HK",
                  },
                  "name": "Protein",
                  "per100g": 0,
                  "perServing": 0,
                },
              ],
              "productCode": "HG12345",
              "recipeTypes": Array [],
            },
            "howToDisplay": Array [
              "ATC",
              "ABT",
            ],
            "image": Object {
              "default": "default-image-url",
              "thumbnail": "thumb-image-url",
            },
            "isMaster": true,
            "labelling": Object {
              "canBeCookedInTurboChef": false,
              "countryOfOriginDescription": null,
              "ean13Code": null,
              "howToCard": Object {
                "fileName": "QR_CODE",
                "qrPng": "",
                "qrSvg": "<svg/>",
              },
              "includeAverageWeightOnLabel": true,
              "includeNutritionalInformationOnLabel": true,
              "legalTitle": null,
              "productServes": null,
              "sellBy": null,
              "sellByTurboChef": null,
              "storageConditions": null,
              "useBy": null,
              "useByTurboChef": null,
            },
            "masterSku": "UK12345",
            "name": Object {
              "en-GB": "Mock product name-en-GB",
              "en-HK": "Mock product name-en-HK",
              "en-US": "Mock product name-en-US",
              "fr-FR": "Mock product name-fr-FR",
              "zh-HK": "Mock product name-zh-HK",
            },
            "parentProductSku": "",
            "pluPrimaryCategoryID": null,
            "pluReportingName": null,
            "pluSecondaryCategoryID": null,
            "pos": "Pos",
            "posID": "Pos",
            "prices": Array [],
            "productRange": Array [],
            "productionCategories": Object {
              "category": null,
              "subcategory": null,
            },
            "published": true,
            "size": 300,
            "sku": "UK12345",
            "starKisProductCategoryID": null,
            "starKisProductSubCategoryID": null,
            "status": "ACTIVE",
            "version": 1,
            "versions": Array [],
          },
          "name": Object {
            "en-GB": "name-en-GB",
            "en-HK": "name-en-HK",
            "en-US": "name-en-US",
            "fr-FR": "name-fr-FR",
            "zh-HK": "name-zh-HK",
          },
          "published": true,
          "setUp": Object {
            "blenderRequired": false,
            "canAddExtraCoffeeShot": false,
            "canAddSyrup": true,
            "canAddWhippedCream": false,
            "canBeDecaf": false,
            "canBeWithOatMilk": false,
            "canBeWithRiceCoconutMilk": false,
            "canBeWithSemiSkimmedMilk": false,
            "canBeWithSkimmedMilk": false,
            "canBeWithSoyMilk": false,
            "canBeWithoutMilk": false,
            "canHaveVariants": true,
            "iceMachineRequired": false,
          },
          "sku": "UK12345",
          "takeAwayTaxDisabled": true,
          "taxCategory": Object {
            "amount": 0.05,
            "id": "tax-category-id",
            "name": "Category name",
          },
          "type": "barista_beverage",
          "variants": Array [],
          "version": 1,
        }
      `)
    })
  })
})
