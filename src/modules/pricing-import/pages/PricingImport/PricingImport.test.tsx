import { render } from '@testing-library/react'
import PricingImport from './PricingImport'

jest.mock('../../../auth/useUserPermissions', () => ({
  useUserPermissions: () => ({
    canUsePricingImporter: false,
  }),
}))

describe('PricingImport page', () => {
  it('no permissions scenario', () => {
    const { queryByTestId, getByTestId } = render(<PricingImport />)
    expect(getByTestId('no-permissions-page')).toBeInTheDocument()
    expect(queryByTestId('pricing-importer-page')).not.toBeInTheDocument()
  })
})
