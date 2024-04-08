import { VariantDraftChangesPage } from 'cypress/pages/variant/VariantDraftChangesPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'

describe('Variant Draft changes', () => {
  const variantDraftChangesPage = new VariantDraftChangesPage()

  const sku = 'UK0001'

  const noDraftChangesResponse = new ProductResponseDtoMockBuilder()
    .setProduct(
      new ProductDtoMockBuilder()
        .addVariant(new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build())
        .build(),
    )
    .build()

  // https://pretamanger.atlassian.net/browse/PP-232 - AC 1
  it('saved draft changes', () => {
    const draftChangesResponse = new ProductResponseDtoMockBuilder(noDraftChangesResponse).build()
    draftChangesResponse.draftChanges.variants[0].name['en-GB'] = 'Test draft name'
    draftChangesResponse.draftChanges.variants[0].description.standard['en-GB'] =
      'Test draft description'
    draftChangesResponse.draftChanges.variants[0].changesCount.marketing = 2
    draftChangesResponse.draftChanges.variants[0].changesCount.total = 2

    cy.interceptProductResponse(draftChangesResponse)

    cy.visit(TestUrls.getVariantDraftchangesUrl(sku, sku))
    variantDraftChangesPage.veriyDraftChanges(noDraftChangesResponse, draftChangesResponse)
  })

  // https://pretamanger.atlassian.net/browse/PP-232 - AC 2
  it('no saved draft changes', () => {
    cy.interceptProductResponse(noDraftChangesResponse)
    cy.visit(TestUrls.getVariantDraftchangesUrl(sku, sku))
    variantDraftChangesPage.verifyNoDraftChanges()
  })
})
