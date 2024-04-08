import { ProductBuilder } from '../../../mock/product-builder'
import { DraftChangesBuilder } from '../../../mock/draft-changes-builder'
import { ProductVariantBuilder } from '../../../mock/product-variant-builder'
import { render } from '@testing-library/react'
import { AllDraftChangesView } from '../../ProductAllDraftChangesPage/AllDraftsChangesView/AllDraftsChangesView'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider, withQueryClient } from '../../../../../app-provider'

describe('AllDraftsChangesView', () => {
  it('lists all variants from product, draftChanges === 1', () => {
    const changesCount = {
      marketing: 1,
      reporting: 1,
      attributes: 1,
      pricing: 0,
      labelling: 1,
      total: 2,
    }
    const variant1 = new ProductVariantBuilder().withChangesCount(changesCount).build()
    const variant2 = new ProductVariantBuilder().withChangesCount(changesCount).build()
    const draftChanges = new DraftChangesBuilder().withVariants([variant1, variant2]).build()
    const productMock = new ProductBuilder()
      .withMasterVariant(variant1)
      .withDraftChanges(draftChanges)
      .build()
    const { container, getByTestId } = render(
      <BrowserRouter>
        <AppProvider providers={[withQueryClient]}>
          <AllDraftChangesView product={productMock} />
        </AppProvider>
      </BrowserRouter>,
    )

    const rows = container.querySelectorAll('[data-cy=accordion-item]')

    // +1 because of master variant
    expect(rows).toHaveLength(draftChanges.variants.length)
    expect(getByTestId('accordion')).toBeTruthy()
  })

  it('lists all variants from product - changes only in master variant', () => {
    const changesCount = {
      marketing: 1,
      reporting: 1,
      attributes: 1,
      pricing: 0,
      labelling: 1,
      total: 2,
    }
    const variant = new ProductVariantBuilder().withChangesCount(changesCount).build()
    const productMock = new ProductBuilder().withMasterVariant(variant).build()
    const { getByTestId } = render(
      <BrowserRouter>
        <AppProvider providers={[withQueryClient]}>
          <AllDraftChangesView product={productMock} />
        </AppProvider>
      </BrowserRouter>,
    )
    expect(getByTestId('menu-categorisation-draft-view')).toBeTruthy()
  })

  it('lists all variants from product', () => {
    const changesCount = {
      marketing: 1,
      reporting: 1,
      attributes: 1,
      pricing: 0,
      labelling: 1,
      total: 2,
    }
    const draftChangesCount = {
      marketing: 0,
      setUp: 0,
      categories: 0,
      total: 0,
    }
    const variant = new ProductVariantBuilder().withChangesCount(changesCount).build()
    const variantWithNoChanges = new ProductVariantBuilder().build()
    const draftChanges = new DraftChangesBuilder()
      .withChangesCount(draftChangesCount)
      .withVariants([variant])
      .build()
    const productMock = new ProductBuilder()
      .withDraftChanges(draftChanges)
      .withMasterVariant(variantWithNoChanges)
      .build()
    const { getByTestId } = render(
      <BrowserRouter>
        <AppProvider providers={[withQueryClient]}>
          <AllDraftChangesView product={productMock} />
        </AppProvider>
      </BrowserRouter>,
    )
    expect(getByTestId('variant-draft-view')).toBeTruthy()
  })
})
