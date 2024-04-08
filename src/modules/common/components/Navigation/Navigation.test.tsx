import { render } from '@testing-library/react'
import { Navigation } from './Navigation'
import { BrowserRouter } from 'react-router-dom'
const UserPermissions = require('../../../auth/useUserPermissions')

describe('Navigation', () => {
  it('no permissions for pricing importer', () => {
    jest.spyOn(UserPermissions, 'useUserPermissions').mockImplementation(() => ({
      canUsePricingImporter: false,
    }))

    const { queryByTestId } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    )
    expect(queryByTestId('pricing-importer-link')).not.toBeInTheDocument()
  })

  it('permissions for pricing importer granted', () => {
    jest.spyOn(UserPermissions, 'useUserPermissions').mockImplementation(() => ({
      canUsePricingImporter: true,
    }))

    const { getByTestId } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    )
    expect(getByTestId('pricing-importer-link')).toBeInTheDocument()
  })
})
