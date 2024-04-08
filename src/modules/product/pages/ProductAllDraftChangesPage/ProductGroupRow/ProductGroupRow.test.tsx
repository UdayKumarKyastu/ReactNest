import { render } from '@testing-library/react'
import { ProductGroupRow } from './ProductGroupRow'
import { ProductMock } from '../../../mock/product.mock'
import { ProductType } from '../../../model/product-type'
import { BrowserRouter } from 'react-router-dom'

describe('ProductGroupRow', () => {
  it('returns nothing in case of no changes', () => {
    const { container } = render(<ProductGroupRow product={ProductMock.withVariants} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders setupDraftView for BaristaBeverage type product', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProductGroupRow product={ProductMock.noVariants} />
      </BrowserRouter>,
    )
    expect(getByTestId('setup-draft-view')).toBeTruthy()
  })

  it('does not render setupDraftView for Food type product', () => {
    const foodTypeProduct = {
      ...ProductMock.noVariants,
      type: ProductType.Food,
    }
    const { container } = render(
      <BrowserRouter>
        <ProductGroupRow product={foodTypeProduct} />
      </BrowserRouter>,
    )
    const draftView = container.querySelector(`[data-testId=setup-draft-view]`)
    expect(draftView).toBeNull()
  })
})
