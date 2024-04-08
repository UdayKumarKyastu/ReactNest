import { render } from '@testing-library/react'
import PricingImporterBreadcrumbs from './PricingImporterBreadcrumbs'

describe('PricingImporterBreadcrumbs', () => {
  it('active step is highlighted', () => {
    const { getByTestId } = render(<PricingImporterBreadcrumbs step="validation" />)
    expect(getByTestId('validation')).toHaveStyle(
      'border-color: rgba(159,27,50,var(--tw-border-opacity))',
    )
    expect(getByTestId('validation-badge')).toHaveStyle(
      'border: rgba(159,27,50,var(--tw-bg-opacity))',
    )
  })
})
