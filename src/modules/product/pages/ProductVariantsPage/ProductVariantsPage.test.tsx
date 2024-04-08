import { render } from '@testing-library/react'
import { Routes } from '../../../routing/Routes'
import { ProductVariantsPage } from './ProductVariantsPage'
import { ProductVariantBuilder } from '../../mock/product-variant-builder'

jest.mock('../../../routing/Routes')

describe('ProductVariantsPage', () => {
  let navigateToProductVariantMock: jest.Mock<any, any>

  beforeEach(() => {
    navigateToProductVariantMock = jest.fn()
    ;(Routes.useNavigation as jest.Mock).mockReturnValue({
      navigateToProduct: jest.fn(),
      navigateToProductVariant: navigateToProductVariantMock,
      navigateToProductVariantVersion: jest.fn(),
    })
  })

  it('called navigate action with master SKU', () => {
    const masterSku = 'sku123'
    const variantSku = 'sku124'
    const variant = new ProductVariantBuilder().withSku(variantSku).build()
    const { getByTestId } = render(
      <ProductVariantsPage masterSku={masterSku} variants={[variant]} />,
    )
    getByTestId('variant-table-row').click()
    expect(navigateToProductVariantMock).toHaveBeenCalledWith(masterSku, variantSku)
  })
})
