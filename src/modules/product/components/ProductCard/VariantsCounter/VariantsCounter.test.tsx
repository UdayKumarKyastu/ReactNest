import { render } from '@testing-library/react'
import VariantsCounter from './VariantsCounter'
import { BrowserRouter } from 'react-router-dom'

const versionLabel = 'version-label'
const variantLabel = 'variant-label'
const masterLabel = 'master-label'
const productGroupLabel = 'product-group'
const versionsCountLabel = 'versions-count'
const variantsCountLabel = 'variants-count'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    pathname: '',
  }),
}))

jest.mock('../../../../i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              'product.variantsCounter.version': versionLabel,
              'product.variantsCounter.variant': variantLabel,
              'product.variantsCounter.masterVariant': masterLabel,
              'product.variantsCounter.productGroup': productGroupLabel,
              'product.variantsCounter.versionsCount': versionsCountLabel,
              'product.variantsCounter.variantsCount': variantsCountLabel,
            }[key]
          },
        }
      },
    },
  }
})

describe('VariantsCounter', () => {
  it('renders proper label, count and link for version', () => {
    const productSku = 'sku321'
    const variantSku = 'sku123'
    const { getByText } = render(
      <BrowserRouter>
        <VariantsCounter
          masterSku={productSku}
          variantSku={variantSku}
          versionNumber={3}
          view="version"
        />
      </BrowserRouter>,
    )
    expect(getByText(versionLabel)).toBeTruthy()
    expect(getByText(versionsCountLabel)).toBeTruthy()
    expect(getByText(versionsCountLabel)).toHaveAttribute(
      'href',
      `/products/${productSku}/variants/${variantSku}/versions`,
    )
  })

  it('renders proper label for variant', () => {
    const { getByText } = render(
      <BrowserRouter>
        <VariantsCounter
          masterSku={'sku123'}
          variantSku={'sku123'}
          versionNumber={3}
          view="variant"
        />
      </BrowserRouter>,
    )
    expect(getByText(variantLabel)).toBeTruthy()
  })

  it('renders proper label for master variant', () => {
    const { getByText } = render(
      <BrowserRouter>
        <VariantsCounter
          masterSku={'sku123'}
          variantSku={'sku123'}
          versionNumber={3}
          view="master"
        />
      </BrowserRouter>,
    )
    expect(getByText(masterLabel)).toBeTruthy()
  })

  it('renders proper label for master product group', () => {
    const { getByText } = render(
      <BrowserRouter>
        <VariantsCounter
          masterSku={'sku123'}
          variantSku={'sku123'}
          versionNumber={3}
          view="product-group"
        />
      </BrowserRouter>,
    )
    expect(getByText(productGroupLabel)).toBeTruthy()
  })

  it('renders proper count and link for other views', () => {
    const productSku = 'sku123'
    const { getByText } = render(
      <BrowserRouter>
        <VariantsCounter
          masterSku={'sku123'}
          variantSku={productSku}
          versionNumber={3}
          view="variant"
        />
      </BrowserRouter>,
    )
    expect(getByText(variantsCountLabel)).toBeTruthy()
    expect(getByText(variantsCountLabel)).toHaveAttribute(
      'href',
      `/products/${productSku}/variants`,
    )
  })
})
