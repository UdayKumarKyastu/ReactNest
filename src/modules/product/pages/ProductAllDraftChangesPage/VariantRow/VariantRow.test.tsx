import { render } from '@testing-library/react'
import { VariantRow } from './VariantRow'
import { ProductMock } from '../../../mock/product.mock'
import { ProductVariantBuilder } from '../../../mock/product-variant-builder'
import { AppProvider, withQueryClient } from '../../../../../app-provider'

const MASTER_VARIANT_TRANSLATION = 'Master variant translation'
const VARIANT_TRANSLATION = 'Variant translation'
jest.mock('../../../../i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              'productAllDraftChangesPage.masterVariant': MASTER_VARIANT_TRANSLATION,
              'productAllDraftChangesPage.variant': VARIANT_TRANSLATION,
            }[key]
          },
        }
      },
    },
  }
})

describe('VariantRow', () => {
  it('display proper name in header for master variant', () => {
    const variant = new ProductVariantBuilder().asMaster(true).build()

    const { getByText } = render(
      <AppProvider providers={[withQueryClient]}>
        <VariantRow variant={variant} product={ProductMock.withVariants} />,
      </AppProvider>,
    )

    expect(getByText(MASTER_VARIANT_TRANSLATION)).toBeTruthy()
  })

  it('display proper name in header', () => {
    const variant = new ProductVariantBuilder().asMaster(false).build()

    const { getByText } = render(
      <AppProvider providers={[withQueryClient]}>
        <VariantRow variant={variant} product={ProductMock.withVariants} />
      </AppProvider>,
    )

    expect(getByText(VARIANT_TRANSLATION)).toBeTruthy()
  })

  it('does not render for variant with no changes', () => {
    const variant = new ProductVariantBuilder()
      .withSku('UK000003')
      .withChangesCount({
        labelling: 0,
        attributes: 1,
        marketing: 0,
        pricing: 0,
        reporting: 0,
        total: 0,
      })
      .asMaster(false)
      .build()

    const mockWithNoChanges = {
      ...ProductMock.noVariants,
      draftChanges: {
        ...ProductMock.noVariants.draftChanges,
        variants: [variant],
      },
    }
    const { container } = render(
      <AppProvider providers={[withQueryClient]}>
        <VariantRow variant={variant} product={mockWithNoChanges} />
      </AppProvider>,
    )

    expect(container.firstChild).toBeNull()
  })
})
