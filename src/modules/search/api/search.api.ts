import { useCallback } from 'react'

import { HttpProvider } from '../../common/http/http.provider'
import { SearchProductsDto } from '../dto/search-products.dto'
import { ProductDtoMapper } from '../../product/model/ProductDtoMapper'
import { ProductSearchResult } from '../../product/model/product-search-result'

const useSearchProducts = () => {
  const http = HttpProvider.useHttpClient()

  /**
   * TODO
   * - Handle errors
   */
  const searchProducts = useCallback(
    async (
      query: string,
      propertyName: string,
      limit: number,
      page: number,
      country: string,
    ): Promise<ProductSearchResult> => {
      const searchParams = new URLSearchParams({
        query,
        propertyName,
        limit: limit.toString(),
        page: page.toString(),
      })
      if (country) {
        searchParams.set('country', country)
      }

      return http
        .get<SearchProductsDto.Response>(`/v5/products?${searchParams}`)
        .then(({ data }) => {
          return {
            products: ProductDtoMapper.searchCollectionToProducts(data),
            total: data.total || 0,
          }
        })
    },
    [http],
  )

  return {
    searchProducts,
  }
}

export abstract class SearchApi {
  static useSearchProducts = useSearchProducts
}
