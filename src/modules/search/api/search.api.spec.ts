import { renderHook } from '@testing-library/react-hooks'
import { SearchApi } from './search.api'
import { HttpProvider } from '../../common/http/http.provider'

jest.mock('../../common/http/http.provider')

const mockFulfilledResponse = {
  data: {
    products: [
      {
        variants: [
          {
            name: {
              'en-gb': 'name',
            },
            sku: 'skuTest',
            masterSku: 'masterSKUTest',
            hgCode: null,
            countryCode: 'GB',
            createdAt: 'test',
            visibleOnWebsite: true,
            published: true,
            imageUrl: null,
            isMaster: true,
          },
        ],
      },
    ],
    total: 1,
  },
}

describe('Search.api', () => {
  let mockHttpGet: jest.Mock
  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({
      data: {
        products: [],
      },
    })
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
    })
  })

  it('should make a http request to get the products', async () => {
    const { result } = renderHook(() => SearchApi.useSearchProducts())

    await result.current.searchProducts('Abc', 'name', 1, 1, 'UK')

    expect(mockHttpGet).toHaveBeenCalledWith(
      '/v5/products?query=Abc&propertyName=name&limit=1&page=1&country=UK',
    )
  })

  it('should return a valid response when there are no products in the response', async () => {
    const { result } = renderHook(() => SearchApi.useSearchProducts())

    const res = await result.current.searchProducts('Abc', 'name', 1, 1, 'UK')

    expect(res).toEqual({ products: [], total: 0 })
  })

  it('should return a valid response when there are products in the response', async () => {
    mockHttpGet = jest.fn().mockResolvedValue(mockFulfilledResponse)
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
    })

    const { result } = renderHook(() => SearchApi.useSearchProducts())

    const res = await result.current.searchProducts('Abc', 'name', 1, 1, 'UK')

    expect(res.total).toEqual(1)
    expect(res.products.length).toEqual(1)
  })
})
