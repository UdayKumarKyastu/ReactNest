import React from 'react'
import { render, within } from '@testing-library/react'
import { LiveSoonProductsTable } from './LiveSoonProductsTable'
import { LiveSoonProductGroup } from '../../model/live-soon-product'
import { Routes } from '../../../routing/Routes'

const product = {
  name: {
    'en-GB': 'Test product name',
    'en-US': '',
    'fr-FR': '',
    'en-HK': '',
    'zh-HK': '',
  },
  countryCode: 'UK',
  imageUrl: 'http://someimage.com/image.jpg',
  sku: 'TestSKU',
  isMaster: true,
  recipeID: null,
  versionNumber: 2,
  liveFrom: '2020-01-01',
  versions: [],
}

const mockProduct = {
  ...product,
  variants: [product],
}

const renderWrapper = (props?: object) => {
  return render(
    <LiveSoonProductsTable
      data={[mockProduct as LiveSoonProductGroup]}
      isLoading={false}
      onRowClick={() => {}}
      {...props}
    />,
  )
}

jest.mock('../../../routing/Routes')

describe('LiveSoonProductsTable', () => {
  let navigateToProductMock: jest.Mock<any, any>
  beforeEach(() => {
    navigateToProductMock = jest.fn()
    ;(Routes.useNavigation as jest.Mock).mockReturnValue({
      navigateToProduct: navigateToProductMock,
      navigateToProductVariant: jest.fn(),
      navigateToProductVariantVersion: jest.fn(),
    })
  })
  it('shows the user when a product is due to go live', async () => {
    const component = renderWrapper()

    // Expand the main row to show the variant itself
    component.getByTestId('toggle-expand-row-0')?.click()

    const { getByText } = within(component.getByTestId('row_0.0'))
    expect(getByText('Wednesday 1 January 2020')).toBeInTheDocument()
  })

  it('tells the user how many variants a product contains', async () => {
    const component = renderWrapper()

    const { getByText } = within(component.getByTestId('row_0'))
    expect(getByText('1 variants')).toBeInTheDocument()
  })

  it('takes the user to the product page when the product name is clicked', async () => {
    const component = renderWrapper()

    component.getByTestId('product-name-cell-Test-product-name')?.click()

    expect(navigateToProductMock).toHaveBeenCalledWith('TestSKU')
  })

  it('returns a informative message when there are no products going live soon', async () => {
    const component = renderWrapper({ data: [] })

    expect(component.getByText('Nothing live soon')).toBeInTheDocument()
  })
})
