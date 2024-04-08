import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryParamProvider } from 'use-query-params'
import { LocaleProvider } from './modules/i18n/LocaleProvider'
import { SearchStateProvider } from './modules/search/state/search.state'
import { SingleProductState } from './modules/product/SingleProductState'
import { App } from './app'
import { AuthProvider } from './app-factory'
import { NotificationsState } from './modules/notifications/state/NotificationsState'

const queryClient = new QueryClient()

const AppWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AuthProvider
      domain={process.env.AUTH0_DOMAIN as string}
      clientId={process.env.AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin + '/home'}
      onRedirectCallback={(state) => {
        if (state.returnTo && state.returnTo !== location.pathname) {
          navigate(state.returnTo)
        }
      }}
      audience={process.env.AUTH0_AUDIENCE}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider>
          <LocaleProvider.Provider>
            <SearchStateProvider.Provider>
              <SingleProductState.Provider>
                <NotificationsState.Provider>
                  <App />
                </NotificationsState.Provider>
              </SingleProductState.Provider>
            </SearchStateProvider.Provider>
          </LocaleProvider.Provider>
        </QueryParamProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default AppWrapper
