import React from 'react'
import { fireEvent, screen, waitFor, render as RTLRender } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { ProductPage } from './ProductPage'
import { render } from '../../../../../test-utils/render'
import { Routes as AppRoutes } from '../../../routing/Routes'
import { ProductApi } from '../../api/product.api'
import { ProductMock } from '../../mock/product.mock'
import { SingleProductState } from '../../SingleProductState'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

describe('ProductPage', () => {
  const history = {
    initialHistoryEntries: [
      AppRoutes.resolveProductRoute(AppRoutes.Product.root, ProductMock.withVariants.sku, true),
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  jest.spyOn(ProductApi, 'useGetProduct').mockImplementation(() => ({
    async fetchProduct() {
      return ProductMock.withVariants
    },
  }))

  it('displays the product information as expected', async () => {
    render(
      <SingleProductState.Provider>
        <Routes>
          <Route path={AppRoutes.Product.root} element={<ProductPage />} />
        </Routes>
      </SingleProductState.Provider>,
      history,
    )

    return waitFor(() => {
      expect(screen.getAllByText(ProductMock.withVariants.name['en-GB'])).toHaveLength(2)
    })
  })

  it('redirects to product list works properly', async () => {
    const productHistory = createMemoryHistory()

    const { getByTestId } = RTLRender(
      <Router navigator={productHistory} location={productHistory.location}>
        <SingleProductState.Provider>
          <ProductPage />
        </SingleProductState.Provider>
      </Router>,
    )

    return waitFor(() => {
      fireEvent.click(getByTestId('go-back-button'))
      expect(productHistory.location.pathname).toBe('/products')
    })
  })
})
