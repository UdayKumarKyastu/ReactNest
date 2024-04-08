import React from 'react'
import { render, within } from '@testing-library/react'
import { PendingReviewProductsTable } from './PendingReviewProductsTable'
import { PendingReviewProductGroup } from '../../model/pending-review-product'
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
  changesCount: 10,
  imageUrl: 'http://someimage.com/image.jpg',
  isMaster: true,
  recipeID: null,
  versionNumber: 2,
  versions: [],
}

const mockProduct = {
  ...product,
  variants: [product],
}

const renderWrapper = (props?: object) => {
  return render(
    <PendingReviewProductsTable
      data={[mockProduct as PendingReviewProductGroup]}
      isLoading={false}
      {...props}
    />,
  )
}

jest.mock('../../../routing/Routes')

describe('PendingReviewProductsTable', () => {
  let navigateToProductMock: jest.Mock<any, any>
  beforeEach(() => {
    navigateToProductMock = jest.fn()
    ;(Routes.useNavigation as jest.Mock).mockReturnValue({
      navigateToProduct: navigateToProductMock,
      navigateToProductVariant: jest.fn(),
      navigateToProductVariantVersion: jest.fn(),
    })
  })
  it('shows the user how many draft changes a product has', async () => {
    const { getByText } = renderWrapper()

    expect(getByText('10 changes')).toBeInTheDocument()
  })

  it('shows the user how many draft changes the individual variants have', async () => {
    const component = renderWrapper()

    // Expand the main row to show the variant itself
    component.getByTestId('toggle-expand-row-0')?.click()

    const { getByText } = within(component.getByTestId('row_0.0'))
    expect(getByText('10 changes')).toBeInTheDocument()
  })

  it('takes the user to the product page when the product name is clicked', async () => {
    const component = renderWrapper()

    component.getByTestId('product-name-cell-Test-product-name')?.click()

    expect(navigateToProductMock).toHaveBeenCalledWith('TestSKU')
  })

  it('returns a informative message when there are no products pending review', async () => {
    const component = renderWrapper({ data: [] })

    expect(component.getByText('Nothing pending review')).toBeInTheDocument()
  })
})
