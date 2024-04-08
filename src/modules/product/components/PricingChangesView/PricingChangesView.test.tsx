import { render } from '@testing-library/react'
import { ChangeStatus } from '../../model/review-status'
import PricingChangesView from './PricingChangesView'
import { LocaleMock } from '../../../i18n/LocaleMock'
import { withCurrency } from '../../../../util/withCurrency'
import { convertFromCents } from '../../../../util/convertFromCents'
import { withPercentage } from '../../../../util/withPercentage'
import { BrowserRouter } from 'react-router-dom'

const CHANNEL_PRICE_MOCK = [
  {
    channelName: 'pl_warsaw',
    channelLabel: LocaleMock.createMultiLangMock('label'),
    takeAwayPrice: { centAmount: 200, currencyCode: 'usd' },
    eatInPrice: { centAmount: 300, currencyCode: 'usd' },
    eatInTax: 30,
    deliveryPrice: { centAmount: 300, currencyCode: 'usd' },
    deliveryTax: 30,
    takeAwayClubPret: { centAmount: 200, currencyCode: 'usd' },
    eatInClubPret: { centAmount: 300, currencyCode: 'usd' },
  },
]

const CHANNEL_PRICE_DRAFT_MOCK = [
  {
    channelName: 'pl_warsaw',
    channelLabel: LocaleMock.createMultiLangMock('label'),
    takeAwayPrice: { centAmount: 250, currencyCode: 'usd' },
    eatInPrice: { centAmount: 350, currencyCode: 'usd' },
    eatInTax: 500,
    deliveryPrice: { centAmount: 300, currencyCode: 'usd' },
    deliveryTax: 30,
    takeAwayClubPret: { centAmount: 240, currencyCode: 'usd' },
    eatInClubPret: { centAmount: 340, currencyCode: 'usd' },
  },
]

const REVIEW_STATUSES_MOCK = [
  {
    status: ChangeStatus.Pending,
    value: {
      channelName: 'pl_warsaw',
      field: 'takeAwayPrice' as const,
    },
  },

  {
    status: ChangeStatus.Pending,
    value: {
      channelName: 'pl_warsaw',
      field: 'eatInPrice' as const,
    },
  },

  {
    status: ChangeStatus.Pending,
    value: {
      channelName: 'pl_warsaw',
      field: 'eatInTax' as const,
    },
  },
  {
    status: ChangeStatus.Pending,
    value: {
      channelName: 'pl_warsaw',
      field: 'deliveryPrice' as const,
    },
  },
  {
    status: ChangeStatus.Pending,
    value: {
      channelName: 'pl_warsaw',
      field: 'deliveryTax' as const,
    },
  },
]
const RESOURCE_SKUS_MOCK = { masterSku: 'sku123', variantSku: '123' }

describe('PricingChangesView component', () => {
  it('properly compare and displays changes', () => {
    const { container } = render(
      <BrowserRouter>
        <PricingChangesView
          pricingFormFields={CHANNEL_PRICE_MOCK}
          pricingDraftChanges={CHANNEL_PRICE_DRAFT_MOCK}
          reviewStatuses={REVIEW_STATUSES_MOCK}
          resourceSkus={RESOURCE_SKUS_MOCK}
        />
      </BrowserRouter>,
    )
    const rows = container.querySelectorAll('[data-testid=pricing-row]')
    const acceptRejectButtons = container.querySelectorAll('[data-testid=accept-reject-buttons]')
    expect(rows).toHaveLength(5)
    expect(acceptRejectButtons).toHaveLength(3)
  })

  it('renders edit button', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PricingChangesView
          pricingFormFields={CHANNEL_PRICE_MOCK}
          pricingDraftChanges={CHANNEL_PRICE_DRAFT_MOCK}
          reviewStatuses={REVIEW_STATUSES_MOCK}
          resourceSkus={RESOURCE_SKUS_MOCK}
        />
      </BrowserRouter>,
    )
    expect(getByTestId('edit-button')).toBeInTheDocument()
  })

  it('renders proper values', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PricingChangesView
          pricingFormFields={CHANNEL_PRICE_MOCK}
          pricingDraftChanges={CHANNEL_PRICE_DRAFT_MOCK}
          reviewStatuses={REVIEW_STATUSES_MOCK}
          resourceSkus={RESOURCE_SKUS_MOCK}
        />
      </BrowserRouter>,
    )

    const takeAwayPrice = CHANNEL_PRICE_MOCK[0].takeAwayPrice
    const takeAwayPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: takeAwayPrice.currencyCode,
        value: convertFromCents(takeAwayPrice.centAmount),
      }),
    )
    expect(takeAwayPriceValue).toBeTruthy()

    const takeAwayClubPret = CHANNEL_PRICE_MOCK[0].takeAwayClubPret
    const takeAwayClubPretValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: takeAwayClubPret.currencyCode,
        value: convertFromCents(takeAwayClubPret.centAmount),
      }),
    )
    expect(takeAwayClubPretValue).toBeTruthy()

    const eatInPrice = CHANNEL_PRICE_MOCK[0].eatInPrice
    const eatInPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: eatInPrice.currencyCode,
        value: convertFromCents(eatInPrice.centAmount),
      }),
    )
    expect(eatInPriceValue).toBeTruthy()

    const eatInClubPret = CHANNEL_PRICE_MOCK[0].eatInClubPret
    const eatInClubPretValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: eatInClubPret.currencyCode,
        value: convertFromCents(eatInClubPret.centAmount),
      }),
    )
    expect(eatInClubPretValue).toBeTruthy()

    const deliveryPrice = CHANNEL_PRICE_MOCK[0].deliveryPrice
    const deliveryPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: deliveryPrice.currencyCode,
        value: convertFromCents(deliveryPrice.centAmount),
      }),
    )
    expect(deliveryPriceValue).toBeTruthy()
  })

  it('renders proper draft values', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PricingChangesView
          pricingFormFields={CHANNEL_PRICE_MOCK}
          pricingDraftChanges={CHANNEL_PRICE_DRAFT_MOCK}
          reviewStatuses={REVIEW_STATUSES_MOCK}
          resourceSkus={RESOURCE_SKUS_MOCK}
        />
      </BrowserRouter>,
    )

    const percentage = withPercentage({
      locale: 'en-GB',
      value: CHANNEL_PRICE_DRAFT_MOCK[0].eatInTax,
    })
    expect(getByText(percentage)).toBeTruthy()

    const deliveryPercentage = withPercentage({
      locale: 'en-GB',
      value: CHANNEL_PRICE_MOCK[0].deliveryTax,
    })
    expect(getByText(deliveryPercentage)).toBeTruthy()

    const eatInPrice = CHANNEL_PRICE_DRAFT_MOCK[0].eatInPrice
    const eatInPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: eatInPrice.currencyCode,
        value: convertFromCents(eatInPrice.centAmount),
      }),
    )
    expect(eatInPriceValue).toBeTruthy()

    const takeAwayPrice = CHANNEL_PRICE_DRAFT_MOCK[0].takeAwayPrice
    const takeAwayPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: takeAwayPrice.currencyCode,
        value: convertFromCents(takeAwayPrice.centAmount),
      }),
    )
    expect(takeAwayPriceValue).toBeTruthy()

    const deliveryPrice = CHANNEL_PRICE_DRAFT_MOCK[0].deliveryPrice
    const deliveryPriceValue = getByText(
      withCurrency({
        locale: 'en-GB',
        currency: deliveryPrice.currencyCode,
        value: convertFromCents(deliveryPrice.centAmount),
      }),
    )
    expect(deliveryPriceValue).toBeTruthy()
  })
})
