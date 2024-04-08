import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { LocaleProvider } from '../../../i18n/LocaleProvider'
import { ProductCard } from './ProductCard'
import { LiveStatus } from '../../model/live-status'
import { BrowserRouter } from 'react-router-dom'

describe('Product card', () => {
  it('Redirects to all variants view after "total X variants" clicked', () => {
    render(
      <BrowserRouter>
        <LocaleProvider.Provider>
          <ProductCard
            masterSku="UK10000"
            variantSku="UK10001"
            hgProductCode="HG1000"
            isVariant={true}
            countryCode="UK"
            activeVariants={2}
            lastSyncDate={null}
            variantsCount={4}
            status={LiveStatus.ACTIVE}
            published={false}
            createdOn={null}
            view="product-group"
          />
        </LocaleProvider.Provider>
      </BrowserRouter>,
    )

    const variantsButton = screen.getByText('4 variants')

    fireEvent.click(variantsButton)

    expect(window.location.pathname).toBe('/products/UK10000/variants')
  })
})
