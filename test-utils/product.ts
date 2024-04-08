import merge from 'lodash/merge'

/**
 * @deprecated
 */
export const testProduct = (overrides = {}) =>
  merge(
    {
      hasStagedChanges: false,
      live: {
        masterProduct: {
          name: {
            'en-US': 'Cappuccino',
            en: 'Cappuccino',
            'en-GB': 'Cappuccino',
          },
          description: {
            'en-US':
              'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
            en: 'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
            'en-GB':
              'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
          },
          categories: [
            {
              key: 'UK0009',
              name: 'Coffee',
            },
          ],
          taxCategory: {
            key: 'five-rated-vat',
            name: 'VAT (5%)',
          },
          variants: [
            {
              name: '',
              sku: 'UK007427',
              posId: '8267427',
              size: 265,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK007428',
              posId: '8267428',
              size: 280,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK007404',
              posId: '8267404',
              size: 280,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK006881',
              posId: '8266881',
              size: 180,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: 'Soya Cappuccino',
              sku: 'UK006899',
              posId: '8266899',
              size: 212,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK005446',
              posId: '8265446',
              size: null,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: 'Cappuccino with Oat Milk',
              sku: 'UK006874',
              posId: '8266874',
              size: 280,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK007801',
              posId: '8267801',
              size: 180,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK007342',
              posId: '8267342',
              size: 212,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK007343',
              posId: '8267343',
              size: 212,
              active: false,
              country: 'United Kingdom',
            },
            {
              name: '',
              sku: 'UK005163',
              posId: '8265163',
              size: 280,
              active: false,
              country: 'United Kingdom',
            },
          ],
          beverage: [],
        },
        masterVariant: true,
        variantName: {
          'en-US': 'Cappuccino',
          en: 'Cappuccino',
          'en-GB': 'Cappuccino',
        },
        variantDescription: {
          'en-US':
            'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
          en: 'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
          'en-GB':
            'Pret’s signature organic espresso combined with silky steamed milk, finished with a dense layer of foam and a dusting of chocolate powder. Served as a 12oz drink \r\n\r\nAll our Barista prepared drinks are also available decaffeinated. Both skimmed and semi-skimmed milks are available, as well as milk alternatives',
        },
        image:
          '//images.ctfassets.net/4zu8gvmtwqss/UK006555-Cappuccino/4d83773aadcb00bca14855a60eae65fa/UK006555-cappucino-coffee-2000x2000.jpg',
        country: 'United Kingdom',
        masterSku: 'UK006555',
        sku: 'UK006555',
        posId: '8266555',
        hgCode: null,
        suitableForVegetarians: true,
        suitableForVegans: false,
        averageWeight: 280,
        visible: true,
        newUntil: '2020-09-08',
        availableForCollection: true,
        availableForOutpost: null,
        language: null,
        liveOnWebsiteFrom: null,
        liveOnWebsiteTo: null,
        chefSpecial: null,
        new: null,
        food: [],
        beverage: [],
        salesPriceBand: [
          {
            key: 'uk_london',
            priceValue: 2.75,
            priceCurrency: 'GBP',
          },
          {
            key: 'uk_core',
            priceValue: 2.65,
            priceCurrency: 'GBP',
          },
          {
            key: 'uk_premium',
            priceValue: 2.85,
            priceCurrency: 'GBP',
          },
        ],
        ingredients: null,
      },
      staged: null,
    },
    overrides,
  )
