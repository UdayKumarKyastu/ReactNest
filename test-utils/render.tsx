import { render as _render } from '@testing-library/react'
import { QueryParamProvider } from 'use-query-params'
import React, { ReactNode } from 'react'
import { LocaleProvider } from '../src/modules/i18n/LocaleProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

const defaults: {
  initialHistoryEntries?: string[]
} = {
  initialHistoryEntries: undefined,
}

/**
 * @deprecated use builder to attach specific providers
 */
export const render = (ui: ReactNode, opts = {}) => {
  const options = { ...defaults, ...opts }
  const queryClient = new QueryClient()
  const history = createMemoryHistory({
    initialEntries: options.initialHistoryEntries,
  })

  return _render(
    <QueryClientProvider client={queryClient}>
      <Router navigator={history} location={history.location}>
        <LocaleProvider.Provider>
          <QueryParamProvider history={history as any} location={history.location as any}>
            {ui}
          </QueryParamProvider>
        </LocaleProvider.Provider>
      </Router>
    </QueryClientProvider>,
  )
}
