import { fireEvent, render, within } from '@testing-library/react'
import PriceCalculator from './PriceCalculator'
import { withCurrency } from '../../../../util/withCurrency'
import { DEFAULT_CURRENCY_CODE } from '../../../common/constants'
import { withPercentage } from '../../../../util/withPercentage'

describe('Price calculator', () => {
  it('disabling reset button', () => {
    const { getByTestId } = render(
      <PriceCalculator recipeName="" totalCost={0} editMode recipeGoods={[]} />,
    )
    expect(getByTestId('reset-button')).toBeDisabled()

    fireEvent.change(getByTestId('selling-price1'), { target: { value: '1' } })
    expect(getByTestId('reset-button')).not.toBeDisabled()
  })

  it('inputs are disabled in non edit mode', () => {
    const { getByTestId } = render(
      <PriceCalculator recipeName="" totalCost={0} editMode={false} recipeGoods={[]} />,
    )

    expect(getByTestId('selling-price1')).toBeDisabled()
    expect(getByTestId('selling-price2')).toBeDisabled()
    expect(getByTestId('selling-price3')).toBeDisabled()
  })

  it('calculating price with VAT', () => {
    const { getByTestId } = render(
      <PriceCalculator recipeName="" totalCost={0} editMode recipeGoods={[]} />,
    )
    fireEvent.change(getByTestId('vat-input'), { target: { value: '20' } })
    fireEvent.change(getByTestId('selling-price1'), { target: { value: '100' } })

    const { getByText } = within(getByTestId('with-vat-1'))
    const expectedWithVat = withCurrency({
      locale: 'en-GB',
      currency: DEFAULT_CURRENCY_CODE,
      value: 120,
    })
    expect(getByText(expectedWithVat)).toBeInTheDocument()
  })

  it('TCOF and contribution values', () => {
    const totalCost = 10000
    const sellingPrice = 150
    const { getByTestId } = render(
      <PriceCalculator recipeName="" totalCost={totalCost} editMode recipeGoods={[]} />,
    )
    fireEvent.change(getByTestId('selling-price1'), { target: { value: sellingPrice } })

    const { getByText: getByTextContribution } = within(getByTestId('contribution-1'))
    const expectedContribution = withCurrency({
      locale: 'en-GB',
      currency: DEFAULT_CURRENCY_CODE,
      value: sellingPrice - totalCost,
    })
    expect(getByTextContribution(expectedContribution)).toBeInTheDocument()

    const { getByText: getByTextTCOF } = within(getByTestId('tcof-1'))
    const expectedTCOF = withPercentage({
      locale: 'en-GB',
      value: totalCost / sellingPrice,
    })
    expect(getByTextTCOF(expectedTCOF)).toBeInTheDocument()
  })

  it('export to CSV', () => {
    const { getByTestId } = render(
      <PriceCalculator recipeName="" totalCost={0} editMode recipeGoods={[]} />,
    )
    const button = getByTestId('export-to-csv-button')
    expect(button).toBeInTheDocument()
  })
})
