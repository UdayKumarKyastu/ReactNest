import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render items provided as children', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Breadcrumbs separator="-">
          <BreadcrumbItem href="products">Search products</BreadcrumbItem>
          <BreadcrumbItem href="products/UK000001">Americano</BreadcrumbItem>
        </Breadcrumbs>
      </BrowserRouter>,
    )

    expect(getByText('Search products')).toBeInTheDocument()
    expect(getByText('Americano')).toBeInTheDocument()
  })

  it('should render seperator correct amount of times', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <Breadcrumbs separator="-">
          <BreadcrumbItem href="products">Search products</BreadcrumbItem>
          <BreadcrumbItem href="products/UK000001">Americano</BreadcrumbItem>
        </Breadcrumbs>
      </BrowserRouter>,
    )
    expect(getAllByText('-')).toHaveLength(1)
  })

  it('should navigate to correct route on item click', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Breadcrumbs separator="-">
          <BreadcrumbItem href="products">Search products</BreadcrumbItem>
          <BreadcrumbItem href="products/UK000001">Americano</BreadcrumbItem>
        </Breadcrumbs>
      </BrowserRouter>,
    )

    const breadcrumb = getByText('Americano')
    fireEvent.click(breadcrumb)

    expect(window.location.pathname).toBe('/products/UK000001')
  })
})
