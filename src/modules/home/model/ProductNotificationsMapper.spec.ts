import { ProductNotificationsMapper } from './ProductNotificationsMapper'
import { pendingRewievProductDto } from '../mocks/pending-review-product-dto'
import { newProductDto } from '../mocks/new-product-dto'
import { liveSoonProductDto } from '../mocks/live-soon-product-dto'
import { delistSoonProductDto } from '../mocks/delist-soon-product-dto'

describe('ProductNotificationsMapper', () => {
  it('properly maps pending review product DTO to model', () => {
    expect(ProductNotificationsMapper.singleToPendingReviewProduct(pendingRewievProductDto))
      .toMatchInlineSnapshot(`
      Object {
        "changesCount": 1,
        "countryCode": "UK",
        "imageUrl": "",
        "name": Object {
          "en-GB": "Test name-en-GB",
          "en-HK": "Test name-en-HK",
          "en-US": "Test name-en-US",
          "fr-FR": "Test name-fr-FR",
          "zh-HK": "Test name-zh-HK",
        },
        "sku": "UK123",
        "variants": Array [
          Object {
            "changesCount": 1,
            "countryCode": "UK",
            "imageUrl": "",
            "isMaster": true,
            "name": Object {
              "en-GB": "Test variant name-en-GB",
              "en-HK": "Test variant name-en-HK",
              "en-US": "Test variant name-en-US",
              "fr-FR": "Test variant name-fr-FR",
              "zh-HK": "Test variant name-zh-HK",
            },
            "recipeID": null,
            "sku": "UK123",
            "versionNumber": 1,
            "versions": Array [
              Object {
                "changesCount": 1,
                "countryCode": "UK",
                "imageUrl": "",
                "isMaster": true,
                "name": Object {
                  "en-GB": "Test version name-en-GB",
                  "en-HK": "Test version name-en-HK",
                  "en-US": "Test version name-en-US",
                  "fr-FR": "Test version name-fr-FR",
                  "zh-HK": "Test version name-zh-HK",
                },
                "recipeID": null,
                "sku": "UK123",
                "versionNumber": 1,
              },
            ],
          },
        ],
      }
    `)
  })

  it('properly maps new product DTO to model', () => {
    expect(ProductNotificationsMapper.singleToNewProduct(newProductDto)).toMatchInlineSnapshot(`
      Object {
        "countryCode": "UK",
        "imageUrl": "",
        "name": Object {
          "en-GB": "Test name-en-GB",
          "en-HK": "Test name-en-HK",
          "en-US": "Test name-en-US",
          "fr-FR": "Test name-fr-FR",
          "zh-HK": "Test name-zh-HK",
        },
        "sku": "UK123",
        "variants": Array [
          Object {
            "countryCode": "UK",
            "createdAt": "2020-04-09T17:18:53.589Z",
            "imageUrl": "",
            "isMaster": true,
            "name": Object {
              "en-GB": "Test variant name-en-GB",
              "en-HK": "Test variant name-en-HK",
              "en-US": "Test variant name-en-US",
              "fr-FR": "Test variant name-fr-FR",
              "zh-HK": "Test variant name-zh-HK",
            },
            "recipeID": null,
            "sku": "UK123",
            "versionNumber": 1,
            "versions": Array [
              Object {
                "countryCode": "UK",
                "createdAt": "2020-04-09T17:18:53.589Z",
                "imageUrl": "",
                "isMaster": true,
                "name": Object {
                  "en-GB": "Test version name-en-GB",
                  "en-HK": "Test version name-en-HK",
                  "en-US": "Test version name-en-US",
                  "fr-FR": "Test version name-fr-FR",
                  "zh-HK": "Test version name-zh-HK",
                },
                "recipeID": null,
                "sku": "UK123",
                "versionNumber": 1,
              },
            ],
          },
        ],
      }
    `)
  })

  it('properly maps live soon product DTO to model', () => {
    expect(ProductNotificationsMapper.singleToLiveSoonProduct(liveSoonProductDto))
      .toMatchInlineSnapshot(`
      Object {
        "countryCode": "UK",
        "imageUrl": "",
        "name": Object {
          "en-GB": "Test name-en-GB",
          "en-HK": "Test name-en-HK",
          "en-US": "Test name-en-US",
          "fr-FR": "Test name-fr-FR",
          "zh-HK": "Test name-zh-HK",
        },
        "sku": "UK123",
        "variants": Array [
          Object {
            "countryCode": "UK",
            "imageUrl": "",
            "isMaster": true,
            "liveFrom": "2020-04-09T17:18:53.589Z",
            "name": Object {
              "en-GB": "Test variant name-en-GB",
              "en-HK": "Test variant name-en-HK",
              "en-US": "Test variant name-en-US",
              "fr-FR": "Test variant name-fr-FR",
              "zh-HK": "Test variant name-zh-HK",
            },
            "recipeID": null,
            "sku": "UK123",
            "versionNumber": 1,
            "versions": Array [
              Object {
                "countryCode": "UK",
                "imageUrl": "",
                "isMaster": true,
                "liveFrom": "2020-04-09T17:18:53.589Z",
                "name": Object {
                  "en-GB": "Test version name-en-GB",
                  "en-HK": "Test version name-en-HK",
                  "en-US": "Test version name-en-US",
                  "fr-FR": "Test version name-fr-FR",
                  "zh-HK": "Test version name-zh-HK",
                },
                "recipeID": null,
                "sku": "UK123",
                "versionNumber": 1,
              },
            ],
          },
        ],
      }
    `)
  })

  it('properly maps delist soon product DTO to model', () => {
    expect(ProductNotificationsMapper.singleToDelistSoonProduct(delistSoonProductDto))
      .toMatchInlineSnapshot(`
      Object {
        "countryCode": "UK",
        "imageUrl": "",
        "name": Object {
          "en-GB": "Test name-en-GB",
          "en-HK": "Test name-en-HK",
          "en-US": "Test name-en-US",
          "fr-FR": "Test name-fr-FR",
          "zh-HK": "Test name-zh-HK",
        },
        "sku": "UK123",
        "variants": Array [
          Object {
            "countryCode": "UK",
            "imageUrl": "",
            "isMaster": true,
            "liveFrom": "2020-04-09T17:18:53.589Z",
            "liveTo": "2020-04-10T17:18:53.589Z",
            "name": Object {
              "en-GB": "Test variant name-en-GB",
              "en-HK": "Test variant name-en-HK",
              "en-US": "Test variant name-en-US",
              "fr-FR": "Test variant name-fr-FR",
              "zh-HK": "Test variant name-zh-HK",
            },
            "recipeID": null,
            "sku": "UK123",
            "versionNumber": 1,
            "versions": Array [
              Object {
                "countryCode": "UK",
                "imageUrl": "",
                "isMaster": true,
                "liveFrom": "2020-04-09T17:18:53.589Z",
                "liveTo": "2020-04-10T17:18:53.589Z",
                "name": Object {
                  "en-GB": "Test version name-en-GB",
                  "en-HK": "Test version name-en-HK",
                  "en-US": "Test version name-en-US",
                  "fr-FR": "Test version name-fr-FR",
                  "zh-HK": "Test version name-zh-HK",
                },
                "recipeID": null,
                "sku": "UK123",
                "versionNumber": 1,
              },
            ],
          },
        ],
      }
    `)
  })
})
