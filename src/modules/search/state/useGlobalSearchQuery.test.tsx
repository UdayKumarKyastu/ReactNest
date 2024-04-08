import React, { ComponentType, ReactChildren } from 'react'
import { SearchStateProvider } from './search.state'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'
import { useGlobalSearchQuery } from './useGlobalSearchQuery'
import { QueryParamProvider } from 'use-query-params'
import { Routes } from '../../routing/Routes'

describe('useGlobalSearchQuery', () => {
  let history = createMemoryHistory({ initialEntries: [Routes.List] })
  let Wrapper: ComponentType<{ children: ReactChildren }>

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: [Routes.List] })

    // eslint-disable-next-line react/display-name
    Wrapper = ({ children }: { children: ReactChildren }) => (
      <Router navigator={history} location={history.location}>
        <QueryParamProvider history={history as any} location={history.location as any}>
          <SearchStateProvider.Provider>{children}</SearchStateProvider.Provider>
        </QueryParamProvider>
      </Router>
    )
  })

  it('Keeps empty state if nothing provided in URL', () => {
    history.push(`${Routes.List}`)

    const { result, waitFor } = renderHook(() => useGlobalSearchQuery(), {
      wrapper: Wrapper,
    })

    return waitFor(() => {
      expect(result.current.query).toBe('')
    })
  })

  it('Sets initial query state if provided in URL', () => {
    history.push(`${Routes.List}?q=query`)

    const { result, waitFor } = renderHook(() => useGlobalSearchQuery(), {
      wrapper: Wrapper,
    })

    return waitFor(() => {
      expect(result.current.query).toBe('query')
    })
  })

  it('Updates URL in query, when state changes', () => {
    history.push(`${Routes.List}?q=query`)

    const { result, waitFor } = renderHook(() => useGlobalSearchQuery(), {
      wrapper: Wrapper,
    })

    act(() => {
      result.current.setQuery('New Query')
    })

    return waitFor(() => {
      expect(result.current.query).toBe('New Query')
    })
  })
})
