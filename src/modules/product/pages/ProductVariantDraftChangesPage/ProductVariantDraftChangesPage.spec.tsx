import { render } from '@testing-library/react'
import { ProductVariantDraftChangesPage } from './ProductVariantDraftChangesPage'
import { ProductVariantDtoMockBuilder } from '../../mock/product-variant-dto-mock-builder'
import { ProductDtoMockBuilder } from '../../mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from '../../mock/product-response-dto-mock-builder'
import { ProductVariant } from '../../model/product-variant'
import { ProductDtoMapper } from '../../model/ProductDtoMapper'
import { AppProvider, withQueryClient, withRouter } from '../../../../app-provider'

const mockedVariant = new ProductVariantDtoMockBuilder()
  .asMaster()
  .withSku('UK123')
  .withAttributes()
  .build()

const mockedProduct = new ProductDtoMockBuilder().addVariant(mockedVariant).setSetup().build()

const product = ProductDtoMapper.singleToProduct(
  new ProductResponseDtoMockBuilder().setProduct(mockedProduct).build(),
)

const views = ['marketing', 'reporting', 'attributes', 'pricing', 'labelling'] as const

describe('ProductVariantDraftChangesPage', () => {
  it.each(views)('should not display %s draft view if there are no changes', () => {
    const draftVariant: ProductVariant = {
      ...product.masterVariant,
    }

    const { queryByText } = render(
      <AppProvider providers={[withRouter, withQueryClient]}>
        <ProductVariantDraftChangesPage
          product={product}
          productVariant={product.masterVariant}
          draftVariant={draftVariant}
        />
      </AppProvider>,
    )
    expect(queryByText('Variant marketing')).not.toBeInTheDocument()
  })

  it.each(views)('should display %s draft view if there are no changes', (view) => {
    const draftVariant: ProductVariant = {
      ...product.masterVariant,
    }

    draftVariant.changesCount![view] = 1
    draftVariant.changesCount!.total = 1

    const { getByText } = render(
      <AppProvider providers={[withRouter, withQueryClient]}>
        <ProductVariantDraftChangesPage
          product={product}
          productVariant={product.masterVariant}
          draftVariant={draftVariant}
        />
      </AppProvider>,
    )
    expect(getByText(`Variant ${view}`)).toBeInTheDocument()
  })
})
