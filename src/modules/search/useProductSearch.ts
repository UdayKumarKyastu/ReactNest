import { useCallback, useMemo, useState } from 'react'
import { SearchApi } from './api/search.api'
import { ProductSearchItem } from '../product/model/product-search-result'

declare namespace SearchProduceState {
  export type State =
    | {
        type: 'INITIAL'
      }
    | {
        type: 'PENDING'
      }
    | {
        type: 'FETCHED'
        products: ProductSearchItem[]
        total: number
      }
    | {
        type: 'FAILED'
        error: Error
      }
}

export const useProductSearch = () => {
  const { searchProducts } = SearchApi.useSearchProducts()
  const [state, setState] = useState<SearchProduceState.State>({ type: 'INITIAL' })

  const search = useCallback(
    async (query: string, propertyName: string, limit: number, page: number, country: string) => {
      setState({
        type: 'PENDING',
      })

      try {
        searchProducts(query, propertyName, limit, page, country).then((result) => {
          setState({
            type: 'FETCHED',
            products: result.products,
            total: result.total,
          })
        })
      } catch (error) {
        setState({
          type: 'FAILED',
          error: error as Error,
        })
      }
    },
    [searchProducts],
  )

  const reset = useCallback(() => {
    setState({
      type: 'INITIAL',
    })
  }, [])

  const isLoading = state.type === 'PENDING'
  const products = useMemo(() => {
    return (state.type === 'FETCHED' && state.products) || null
    // state type always comes with products or not, so they dont need to be in the array
    // eslint-disable-next-line
  }, [state.type])

  const total = useMemo(() => {
    return (state.type === 'FETCHED' && state.total) || 0
  }, [state])

  return { search, reset, state, isLoading, products, total }
}
