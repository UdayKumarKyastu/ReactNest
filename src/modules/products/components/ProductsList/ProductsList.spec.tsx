import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe } from 'jest-axe'
import { ProductsList } from './ProductsList'
import { ProductSearchItem } from '../../../product/model/product-search-result'
import { LocaleMock } from '../../../i18n/LocaleMock'
import { CountryCode } from '../../../../shared/model/country-code'

describe('ProductsList', () => {
  const products: ProductSearchItem[] = [
    {
      name: LocaleMock.createMultiLangMock('some product'),
      sku: 'some sku',
      hgCode: 'some hgCode',
      type: 'group',
      published: true,
      imageUrl: null,
      masterSku: 'master sku',
      createdAt: '2020-01-01T10:00:00Z',
      visibleOnWebsite: true,
      countryCode: CountryCode.UK,
    },
  ]
  const setPage = jest.fn()
  const setLimit = jest.fn()
  const setCountry = jest.fn()

  const renderResults = (props: Partial<ProductsList.Props> = {}) => {
    return render(
      <BrowserRouter>
        <ProductsList
          products={products}
          totalCount={1}
          limit={10}
          page={1}
          setLimit={setLimit}
          setPage={setPage}
          setCountry={setCountry}
          country="UK"
          {...props}
        />
      </BrowserRouter>,
    )
  }

  it('renders a list of results', () => {
    renderResults()

    expect(screen.getByText(`${products.length} results`)).toBeInTheDocument()

    expect(screen.getByText('01/01/2020')).toBeInTheDocument()
    expect(screen.getByText('All Product SKUs')).toBeInTheDocument()
    expect(screen.getByText('All Product IDs')).toBeInTheDocument()
  })

  it('renders nothing if no results returned', () => {
    renderResults({ products: [], totalCount: 0 })

    expect(screen.getByText('0 results'))
  })

  it('is accessible', async () => {
    const { container } = renderResults()
    expect(await axe(container)).toHaveNoViolations()
  })
})
