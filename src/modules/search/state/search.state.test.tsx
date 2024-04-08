import React, { ReactChildren } from 'react'

import { act, renderHook } from '@testing-library/react-hooks'
import { useSearchState, SearchStateProvider } from './search.state'

describe('SearchState', () => {
  describe('SearchState.use', () => {
    it('Provide access to search state and can change it', () => {
      const Wrapper = ({ children }: { children: ReactChildren }) => (
        <SearchStateProvider.Provider>{children}</SearchStateProvider.Provider>
      )

      const { result, rerender } = renderHook(() => useSearchState(), {
        wrapper: Wrapper,
      })

      /**
       * Expect initial state to be empty
       */
      expect(result.current.query).toBe(null)

      act(() => {
        result.current.setQuery('Query')
      })

      rerender()

      expect(result.current.query).toBe('Query')
    })
  })
})
