import { render } from '@testing-library/react'
import PricingTable from './PricingTable'
import { ChannelPriceWithChanges } from '../../model/price'
import { LocaleMock } from '../../../i18n/LocaleMock'

const formFields: ChannelPriceWithChanges[] = [
  {
    channelName: 'test_channel',
    channelLabel: LocaleMock.createMultiLangMock('Test channel'),
    eatInPrice: {
      currencyCode: 'GBP',
      centAmount: 360,
    },
    eatInClubPret: {
      currencyCode: 'GBP',
      centAmount: 340,
    },
    eatInTax: 0.06,
    takeAwayPrice: {
      currencyCode: 'GBP',
      centAmount: 345,
    },
    takeAwayClubPret: {
      currencyCode: 'GBP',
      centAmount: 335,
    },
    takeAwayTax: 0.05,
    deliveryPrice: {
      currencyCode: 'GBP',
      centAmount: 350,
    },
    deliveryTax: 0.08,
  },
]

describe('PricingTable', () => {
  describe('should display pricing data', () => {
    const formattedData = [
      'Test channel-en-GB',
      '6.00%',
      '5.00%',
      '£3.60',
      '£3.40',
      '£3.45',
      '£3.35',
      '£3.50',
      '8.00%',
    ]

    it.each(formattedData)('should display %s in table', (data) => {
      const { getByText } = render(<PricingTable formFields={formFields} isFullView={true} />)

      expect(getByText(data)).toBeInTheDocument()
    })
  })

  it('should display icon with tooltip if takeAwayTax field is disabled', () => {
    const { getByTestId } = render(
      <PricingTable formFields={formFields} isFullView={true} takeAwayTaxDisabled />,
    )

    expect(getByTestId('tax-tooltip-icon')).toBeInTheDocument()
  })

  it('should display takeAwayTax as readonly field if takeAwayTaxDisabled prop is passed', () => {
    const { getByText, getByTestId } = render(
      <PricingTable formFields={formFields} isFullView={true} isEditMode takeAwayTaxDisabled />,
    )

    expect(getByTestId('tax-tooltip-icon')).toBeInTheDocument()
    expect(getByText('5.00%')).toBeInTheDocument()
  })
})
