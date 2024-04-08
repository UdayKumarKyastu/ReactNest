import { BreadcumbComponent } from 'cypress/pages/components/BreadcrumbComponent'
import { SearchQueryParameters, TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

describe('Breadcrumb', () => {
  const breadcrumbComponent = new BreadcumbComponent()

  const sku = 'UK0001'
  const hgCode = 'FP0001'
  const versionNumber = 2

  const previousVariantVersion: GetProductDto.ProductVariant['versions'][0] = {
    id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
    liveFrom: '',
    name: {
      'en-GB': '',
      'en-US': '',
      'fr-FR': '',
      'en-HK': '',
      'zh-HK': '',
    },
    version: versionNumber,
    key: `${hgCode}-${versionNumber}`,
    sku: sku,
    hgCode: hgCode,
    publishState: VariantVersionPublishState.FUTURE,
  }

  const baseVariant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withHamiltonGrant({ productCode: hgCode })
    .addVersions([previousVariantVersion])
    .build()

  const product = new ProductDtoMockBuilder().addVariant(baseVariant).build()
  const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()
  const versionResponse = new VariantVersionResponseMockBuilder()
    .fromVariant(baseVariant)
    .setPublishState(VariantVersionPublishState.FUTURE)
    .withVersionNumber(versionNumber)
    .build()

  const productGroupName = productResponse.product.name['en-GB']

  beforeEach(() => {
    cy.interceptProductResponse(productResponse).as('productResponse')
    cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
  })

  it('has "[search] > [product group name]" content on product page', () => {
    const numberOfAnchorsOnProductPage = 2

    cy.visit(TestUrls.getProductUrl(sku))
    cy.wait('@productResponse')
    breadcrumbComponent.anchors().should('have.length', numberOfAnchorsOnProductPage)

    breadcrumbComponent.checkBreadcumbContentOnProductPage(productGroupName)
  })

  it('has "[search] > [product group name] > Master Variant" content on master variant page', () => {
    const numberOfAnchorsOnVariantPage = 3

    cy.visit(TestUrls.getVariantUrl(sku, sku))
    cy.wait('@productResponse')
    breadcrumbComponent.anchors().should('have.length', numberOfAnchorsOnVariantPage)

    breadcrumbComponent.checkBreadcumbContentOnMasterVariantPage(productGroupName)
  })

  it('has "[search] > [product group name] > [variant name]" content on variant page', () => {
    const nonMasterVariantSku = 'UK002'

    const multipleVariantsResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .addVariants([
            new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build(),
            new ProductVariantDtoMockBuilder().withSku(nonMasterVariantSku).build(),
          ])
          .build(),
      )
      .build()

    const numberOfAnchorsOnVariantPage = 3
    const variantName = multipleVariantsResponse.product.variants[1].name['en-GB']

    cy.interceptProductResponse(multipleVariantsResponse).as('productResponse')

    cy.visit(
      TestUrls.getVariantUrl(
        multipleVariantsResponse.product.variants[0].sku,
        multipleVariantsResponse.product.variants[1].sku,
      ),
    )
    cy.wait('@productResponse')

    breadcrumbComponent.anchors().should('have.length', numberOfAnchorsOnVariantPage)
    breadcrumbComponent.checkBreadcumbContentOnNonMasterVariantPage(productGroupName, variantName)
  })

  it('has "[search] > [product group name] > [variant name] > [version]" content on version page', () => {
    cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
    cy.wait('@productResponse')
    cy.wait('@versionResponse')

    const numberOfAnchorsOnVersionPage = 4

    breadcrumbComponent.anchors().should('have.length', numberOfAnchorsOnVersionPage)
    breadcrumbComponent.checkBreadcumbContentOnVersionPage(
      productGroupName,
      versionResponse.variantVersion,
    )
  })

  it('navigates to propper pages from anchors', () => {
    cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
    cy.wait('@productResponse')
    cy.wait('@versionResponse')
    breadcrumbComponent.variantAnchor().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`)
    breadcrumbComponent.productAnchor().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)
    breadcrumbComponent.searchProductAnchor().click()
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(SearchQueryParameters.productName)}`,
    )
  })
})
