import React from 'react'
import { render, within } from '@testing-library/react'
import { NewProductsTable } from './NewProductsTable'
import { NewProductGroup } from '../../model/new-product'
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
  sku: 'TestSKU',
  imageUrl: 'http://someimage.com/image.jpg',
  isMaster: true,
  recipeID: null,
  versionNumber: 2,
  createdAt: '2020-01-01',
  versions: [],
}

const mockProduct = {
  ...product,
  variants: [{ ...product, versions: [product] }],
}

const renderWrapper = (props?: object) => {
  return render(
    <NewProductsTable data={[mockProduct as NewProductGroup]} isLoading={false} {...props} />,
  )
}

jest.mock('../../../routing/Routes')

describe('NewProductsTable', () => {
  let navigateToProductMock: jest.Mock<any, any>
  beforeEach(() => {
    navigateToProductMock = jest.fn()
    ;(Routes.useNavigation as jest.Mock).mockReturnValue({
      navigateToProduct: navigateToProductMock,
      navigateToProductVariant: jest.fn(),
      navigateToProductVariantVersion: jest.fn(),
    })
  })
  it('shows the user how many variants a new product has', async () => {
    const { getByText } = renderWrapper()

    expect(getByText('1 variants')).toBeInTheDocument()
  })

  it('shows the user how many versions a new product has', async () => {
    const { getByText } = renderWrapper()

    expect(getByText('1 versions')).toBeInTheDocument()
  })

  it('shows the user when the variant was added', async () => {
    const component = renderWrapper()

    // Expand the main row to show the variant itself
    component.getByTestId('toggle-expand-row-0')?.click()

    const { getByText } = within(component.getByTestId('row_0.0'))
    expect(getByText('Wednesday 1 January 2020')).toBeInTheDocument()
  })

  it('takes the user to the product page when the product name is clicked', async () => {
    const component = renderWrapper()

    component.getByTestId('product-name-cell-Test-product-name')?.click()

    expect(navigateToProductMock).toHaveBeenCalledWith('TestSKU')
  })

  it('returns a informative message when there are no products pending review', async () => {
    const component = renderWrapper({ data: [] })

    expect(component.getByText('Nothing new')).toBeInTheDocument()
  })
})
