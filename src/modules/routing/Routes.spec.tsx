import { Routes } from './Routes'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}))

describe('Routes', () => {
  const mockSku = 'UK001234'
  const mockSku2 = 'UK001231'

  it.each`
    section         | expected
    ${'root'}       | ${`products/:masterSku/*`}
    ${'taxation'}   | ${`taxation`}
    ${'setUp'}      | ${`set-up`}
    ${'variants'}   | ${`variants`}
    ${'categories'} | ${`categories`}
  `(
    'Resolves Product Route "$section" to be route: $expected',
    (data: { section: Routes.ProductSection; expected: string }) => {
      expect(Routes.Product.resolveSection(data.section)).toBe(data.expected)
    },
  )

  it.each`
    section         | expected
    ${'root'}       | ${`/products/:masterSku/variants/:variantSku/*`}
    ${'marketing'}  | ${`marketing`}
    ${'pricing'}    | ${`pricing`}
    ${'reporting'}  | ${`reporting`}
    ${'attributes'} | ${`attributes`}
  `(
    'Resolves Variant Route "$section" to be route: $expected',
    (data: { section: Routes.ProductVariantSection; expected: string }) => {
      expect(Routes.ProductVariant.resolveSection(data.section)).toBe(data.expected)
    },
  )

  it.each`
    section         | expected
    ${'root'}       | ${`products/${mockSku}`}
    ${'taxation'}   | ${`taxation`}
    ${'setUp'}      | ${`set-up`}
    ${'variants'}   | ${`variants`}
    ${'categories'} | ${`categories`}
  `(
    `Resolves Product Route with sku: ${mockSku}. "$section" to be route: $expected`,
    (data: { section: Routes.ProductSection; expected: string }) => {
      expect(Routes.resolveProductRoute(Routes.Product.resolveSection(data.section), mockSku)).toBe(
        data.expected,
      )
    },
  )

  it.each`
    section         | expected
    ${'root'}       | ${`/products/${mockSku}/variants/${mockSku2}`}
    ${'marketing'}  | ${`marketing`}
    ${'pricing'}    | ${`pricing`}
    ${'reporting'}  | ${`reporting`}
    ${'attributes'} | ${`attributes`}
  `(
    'Resolves Variant Route "$section" to be route: $expected',
    (data: { section: Routes.ProductVariantSection; expected: string }) => {
      expect(
        Routes.resolveProductVariantRoute(
          Routes.ProductVariant.resolveSection(data.section),
          mockSku,
          mockSku2,
        ),
      ).toBe(data.expected)
    },
  )

  describe('ProductRoute.useProductRoute', () => {
    let hook = renderHook(() => Routes.useNavigation())

    beforeEach(() => {
      const RouterContext = ({ children }: any) => <BrowserRouter>{children}</BrowserRouter>

      hook = renderHook(() => Routes.useNavigation(), {
        wrapper: RouterContext,
      })
    })

    it('Navigates to list', () => {
      hook.result.current.navigateToList()

      expect(mockedNavigate).toHaveBeenCalledWith('/products')
    })

    it('Navigates to Product', () => {
      hook.result.current.navigateToProduct(mockSku)

      expect(mockedNavigate).toHaveBeenCalledWith(`/products/${mockSku}`)
    })

    it('Navigates to Product - to provided section', () => {
      hook.result.current.navigateToProduct(mockSku, 'categories')

      expect(mockedNavigate).toHaveBeenCalledWith(`categories`)
    })

    it('Navigates to Product Variant', () => {
      hook.result.current.navigateToProductVariant(mockSku, mockSku2)

      expect(mockedNavigate).toHaveBeenCalledWith(`/products/${mockSku}/variants/${mockSku2}`)
    })

    it('Navigates to Product Variant - to provided section', () => {
      hook.result.current.navigateToProductVariant(mockSku, mockSku2, 'marketing')

      expect(mockedNavigate).toHaveBeenCalledWith(`marketing`)
    })
  })
})
