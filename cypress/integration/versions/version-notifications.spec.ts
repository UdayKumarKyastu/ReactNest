import { ProductCardComponent } from 'cypress/pages/components/ProductCardComponent'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { ProductResponseVariantVersionsMockBuilder } from 'src/modules/product/mock/product-response-variant-version-dto-mock-builder'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

describe('Version notifications', () => {
  const variantPage = new VariantPage()
  const productCard = new ProductCardComponent()

  context('variant without future versions', () => {
    const sku = 'UK001'
    const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    it('new version notifications are not visible when variant does not contain future versions', () => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      cy.contains('a', variantPage.foodTypeMenuLabels.versionHistory)
        .should('have.text', variantPage.foodTypeMenuLabels.versionHistory)
        .and('not.contain.text', '+')
        .and('not.contain.text', '0')
      cy.contains(productCard.texts.newFutureVersionAlert).should('not.exist')
    })
  })

  context('variant with future versions', () => {
    const tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1)

    const sku = 'UK001'
    const hgCode = 'HG001'
    const versionNumber = 1
    const baseVariant = new ProductVariantDtoMockBuilder()
      .withSku(sku)
      .asMaster()
      .withHamiltonGrant({ productCode: hgCode })
      .withVersionNumber(versionNumber)
      .build()
    const futureVersion1 = new ProductResponseVariantVersionsMockBuilder()
      .fromVariant(baseVariant)
      .withPublishState(VariantVersionPublishState.FUTURE)
      .withLiveFrom(tommorow)
      .build()
    const futureVersion2 = new ProductResponseVariantVersionsMockBuilder(futureVersion1).build()
    const variant = new ProductVariantDtoMockBuilder(baseVariant)
      .addVersions([futureVersion1, futureVersion2])
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
    })

    it('new version notifications are visible when variant contain future versions', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      cy.contains('a', variantPage.foodTypeMenuLabels.versionHistory).should(
        'have.text',
        `${variantPage.foodTypeMenuLabels.versionHistory}+2`,
      )
    })

    it('notifications are not visible on product group page', () => {
      cy.visit(TestUrls.getProductUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productCard.texts.newFutureVersionAlert).should('not.exist')
    })

    it('notifications are not visible on version page', () => {
      const futureVersionResponse = new VariantVersionResponseMockBuilder()
        .fromVariant(baseVariant)
        .build()
      cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
      cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
      cy.wait(['@productResponse', '@versionResponse'])
      cy.contains(productCard.texts.newFutureVersionAlert).should('not.exist')
    })
  })
})
