import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'

export declare namespace SearchState {
  export interface State {
    query: string | null
    propertyName: string
    limit: number
    page: number
    country: string
  }

  interface Context {
    query: string | null
    propertyName: string
    limit: number
    page: number
    country: string
    setQuery: (query: string) => void
    setPropertyName: (propertyName: string) => void
    setLimit: (limit: number) => void
    setPage: (offset: number) => void
    setCountry: (country: string) => void
  }
}

const initialSearchState: SearchState.State = {
  query: null,
  propertyName: 'name',
  limit: 10,
  page: 1,
  country: '',
}

export abstract class SearchStateProvider {
  static Context = createContext<SearchState.Context>({
    query: initialSearchState.query,
    propertyName: initialSearchState.propertyName,
    limit: initialSearchState.limit,
    page: initialSearchState.page,
    country: initialSearchState.country,
    setQuery() {
      throw new Error('Context used without SearchStateProvider')
    },
    setPropertyName() {
      throw new Error('Context used without SearchStateProvider')
    },
    setLimit() {
      throw new Error('Context used without SearchStateProvider')
    },
    setPage() {
      throw new Error('Context used without SearchStateProvider')
    },
    setCountry() {
      throw new Error('Context used without SearchStateProvider')
    },
  })

  static Provider = (props: PropsWithChildren<{ initialState?: SearchState.State }>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState(initialSearchState)

    return (
      <SearchStateProvider.Context.Provider
        value={{
          query: state.query,
          propertyName: state.propertyName,
          limit: state.limit,
          page: state.page,
          country: state.country,
          // eslint-disable-next-line react-hooks/rules-of-hooks
          setQuery: useCallback(
            (query: string) => {
              setState((state) => ({
                ...state,
                query,
              }))
            },
            [setState],
          ),
          // eslint-disable-next-line react-hooks/rules-of-hooks
          setPropertyName: useCallback(
            (propertyName: string) => {
              setState((state) => ({
                ...state,
                propertyName,
              }))
            },
            [setState],
          ),
          // eslint-disable-next-line react-hooks/rules-of-hooks
          setLimit: useCallback(
            (limit: number) => {
              setState((state) => ({ ...state, limit }))
            },
            [setState],
          ),
          // eslint-disable-next-line react-hooks/rules-of-hooks
          setPage: useCallback(
            (page: number) => {
              setState((state) => ({ ...state, page }))
            },
            [setState],
          ),
          // eslint-disable-next-line react-hooks/rules-of-hooks
          setCountry: useCallback(
            (country: string) => {
              setState((state) => ({ ...state, country }))
            },
            [setState],
          ),
        }}
      >
        {props.children}
      </SearchStateProvider.Context.Provider>
    )
  }
}

export const useSearchState = () => useContext(SearchStateProvider.Context)
