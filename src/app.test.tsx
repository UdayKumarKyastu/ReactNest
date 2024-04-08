/* eslint-disable react/display-name, camelcase */
import React, { ComponentType, PropsWithChildren } from 'react'
import { App } from './app'
import { screen } from '@testing-library/react'
import { LocaleProvider } from './modules/i18n/LocaleProvider'
import { Auth0Errors } from './modules/auth/Auth0Errors'
import { render } from '../test-utils/render'

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: PropsWithChildren<{}>) => children,
  withAuthenticationRequired(Component: ComponentType) {
    return () => <Component />
  },
  useAuth0: () => ({ user: { given_name: 'Given Name' } }),
}))

jest.mock('./modules/i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              'welcome-page-header': 'Welcome to Pret Portal',
              '403-page-message': '403 message',
              'welcome-page-shop-management': 'Shop management',
              'welcome-page-shop-management-desc': 'Shop management desc',
              'welcome-page-product-management': 'Product management',
              'welcome-page-product-management-desc': 'Product management desc',
              'search-input-label': '',
            }[key]
          },
        }
      },
    },
  }
})

describe('Pret Portal', () => {
  const renderApp = (props = {}, initialRoute = {}) => {
    return render(
      <LocaleProvider.Provider>
        <App {...props} />
      </LocaleProvider.Provider>,
      {
        initialHistoryEntries: [initialRoute],
      },
    )
  }

  it('handles access denied', async () => {
    renderApp(
      {},
      `?error=${Auth0Errors.accessDeniedError}&error_description=Some%20Error%20Message`,
    )

    expect(screen.getByText('403 message')).toBeInTheDocument()
    expect(screen.getByText('Some Error Message')).toBeInTheDocument()
  })
})
