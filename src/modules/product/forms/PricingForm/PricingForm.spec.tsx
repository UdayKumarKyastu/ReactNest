import { usePricingFormFields } from './usePricingFormFields'
import { ChannelPrice } from '../../model/price'

const prices: Partial<ChannelPrice>[] = [
  {
    eatInPrice: {
      currencyCode: 'GBP',
      centAmount: 360,
    },
    eatInClubPret: {
      currencyCode: 'GBP',
      centAmount: 360,
    },
    eatInTax: 0.06,
    takeAwayPrice: {
      currencyCode: 'GBP',
      centAmount: 345,
    },
    takeAwayClubPret: {
      currencyCode: 'GBP',
      centAmount: 345,
    },
    takeAwayTax: 0.05,
    deliveryPrice: {
      currencyCode: 'GBP',
      centAmount: 360,
    },
    deliveryTax: 0.06,
  },
]

const formFields: Partial<ChannelPrice>[] = [
  {
    eatInPrice: {
      currencyCode: 'GBP',
      centAmount: 3.6,
    },
    eatInClubPret: {
      currencyCode: 'GBP',
      centAmount: 3.6,
    },
    eatInTax: 6,
    takeAwayPrice: {
      currencyCode: 'GBP',
      centAmount: 3.45,
    },
    takeAwayClubPret: {
      currencyCode: 'GBP',
      centAmount: 3.45,
    },
    takeAwayTax: 5,
    deliveryPrice: {
      currencyCode: 'GBP',
      centAmount: 3.6,
    },
    deliveryTax: 6,
  },
]

describe('PricingForm', () => {
  it('properly maps API prices to form fields', () => {
    const pricingFormFields = usePricingFormFields(prices as ChannelPrice[])
    expect(pricingFormFields).toEqual(formFields)
  })
})
