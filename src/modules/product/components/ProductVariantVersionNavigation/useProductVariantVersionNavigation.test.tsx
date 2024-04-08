import { useProductVariantVersionNavigation } from '../ProductVariantVersionNavigation/useProductVariantVersionNavigation'
import { ProductType } from '../../model/product-type'
import { renderHook } from '@testing-library/react-hooks'
import { ProductVariantVersionBuilder } from '../../mock/product-variant-version-builder'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    pathname: '',
  }),
}))

const approvedTabs = {
  marketing: true,
  labelling: true,
  pricing: true,
  reporting: true,
  baristaAttributes: true,
}
const notApprovedTabs = {
  marketing: false,
  labelling: false,
  pricing: false,
  reporting: false,
  baristaAttributes: false,
}

describe('ProductVariantDraftChangesPage', () => {
  it('displays warnings in proper way for future version', () => {
    const productVariantVersionNotApproved = new ProductVariantVersionBuilder()
      .withApprovedTabs(notApprovedTabs)
      .withDraftTabs(notApprovedTabs)
      .build()
    const productVariantVersionApproved = new ProductVariantVersionBuilder()
      .withApprovedTabs(approvedTabs)
      .withDraftTabs(approvedTabs)
      .build()
    const { result: notApprovedVersion } = renderHook(() =>
      useProductVariantVersionNavigation(
        'SKU123',
        productVariantVersionNotApproved,
        ProductType.BaristaBeverage,
        undefined,
        true,
        true,
      ),
    )
    const { result: approvedVersion } = renderHook(() =>
      useProductVariantVersionNavigation(
        'SKU123',
        productVariantVersionApproved,
        ProductType.BaristaBeverage,
        undefined,
        true,
        true,
      ),
    )

    const warningsCountNotApproved = notApprovedVersion.current.navItems.filter(
      ({ withWarning }) => withWarning,
    ).length
    expect(warningsCountNotApproved).toBe(4)

    const warningsCountApproved = approvedVersion.current.navItems.filter(
      ({ withWarning }) => withWarning,
    ).length
    expect(warningsCountApproved).toBe(0)
  })

  it('displays warnings in proper way for previous version', () => {
    const productVariantVersionNotApproved = new ProductVariantVersionBuilder()
      .withApprovedTabs(notApprovedTabs)
      .withDraftTabs(notApprovedTabs)
      .build()
    const { result: notApprovedVersion } = renderHook(() =>
      useProductVariantVersionNavigation(
        'SKU123',
        productVariantVersionNotApproved,
        ProductType.BaristaBeverage,
        undefined,
        false,
      ),
    )

    const warningsCountNotApproved = notApprovedVersion.current.navItems.filter(
      ({ withWarning }) => withWarning,
    ).length
    expect(warningsCountNotApproved).toBe(0)
  })
})
