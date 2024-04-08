import { ProductGroupPage } from 'cypress/pages/product-group/ProductGroupPage'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { SearchQueryParameters, TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { ProductType } from 'src/modules/product/model/product-type'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

describe('Pret Portal navigation', () => {
  const productGroupPage = new ProductGroupPage()
  const variantPage = new VariantPage()

  const sku = 'UK001'
  const hgCode = 'HG001'
  const prevVersionNumber = 1
  const futureVersionNumber = 3

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
    version: prevVersionNumber,
    key: `${hgCode}-${prevVersionNumber}`,
    sku: sku,
    hgCode: hgCode,
    publishState: VariantVersionPublishState.PREVIOUS,
  }

  const futureVariantVersion: GetProductDto.ProductVariant['versions'][0] = {
    id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
    liveFrom: '',
    name: {
      'en-GB': '',
      'en-US': '',
      'fr-FR': '',
      'en-HK': '',
      'zh-HK': '',
    },
    version: futureVersionNumber,
    key: `${hgCode}-${futureVersionNumber}`,
    sku: sku,
    hgCode: hgCode,
    publishState: VariantVersionPublishState.FUTURE,
  }

  context('food type product', () => {
    const foodVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withVersionNumber(2)
      .withHamiltonGrant({ productCode: hgCode })
      .addVersions([previousVariantVersion, futureVariantVersion])
      .build()

    const foodProduct = new ProductDtoMockBuilder()
      .addVariant(foodVariant)
      .setProductType(ProductType.Food)
      .build()

    const foodProductResponse = new ProductResponseDtoMockBuilder().setProduct(foodProduct).build()

    const previousVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(foodVariant)
      .setPublishState(VariantVersionPublishState.PREVIOUS)
      .withVersionNumber(prevVersionNumber)
      .build()

    const futureVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(foodVariant)
      .setPublishState(VariantVersionPublishState.FUTURE)
      .withVersionNumber(futureVersionNumber)
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(foodProductResponse).as('productResponse')
    })

    describe('Product group page', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getProductUrl(sku))
        cy.wait('@productResponse')
      })
      it('displays proper left-sided navigation for product group page tabs', () => {
        productGroupPage.verifyLeftSideNavigationForFoodProduct()
      })

      it('displays proper footer navigation for product group page tabs', () => {
        productGroupPage.verifyFooterNavigationForFoodProduct()
      })

      it('preserves categories tab', () => {
        cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)

        cy.visit(`${TestUrls.getProductUrl(sku)}/test`)
        cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)
      })

      it('"< Back to Search" link redirects to search page from product group page', () => {
        cy.contains(variantPage.baseTexts.backToSearch).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(
            SearchQueryParameters.productName,
          )}`,
        )
      })
    })

    describe('Variant page', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getVariantUrl(sku, sku))
        cy.wait('@productResponse')
      })
      it('displays proper left-sided navigation for product variant view tabs', () => {
        variantPage.verifyLeftSideNavigationForFoodType()
      })

      it('displays proper footer navigation for product variant view tabs', () => {
        variantPage.verifyFooterNavigationForFoodType()
      })

      it('"< Back to product group" link redirects to product group page from variant page', () => {
        cy.contains(variantPage.baseTexts.backToProduct).click()
        cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)
      })
    })

    describe('Version page', () => {
      beforeEach(() => {
        cy.interceptVariantVersionResponse(previousVersionResponse).as('previousVersionResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('futureVersionResponse')
      })

      it('"< Back to current version" link redirects to variant page from previous version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, prevVersionNumber))
        cy.wait('@previousVersionResponse')

        cy.contains(variantPage.baseTexts.backToVariant).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
        )
      })

      it('does not display Version history tab on previous version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, prevVersionNumber))
        cy.wait('@previousVersionResponse')

        cy.contains(variantPage.foodTypeMenuLabels.versionHistory).should('not.exist')
      })

      it('"< Back to current version" link redirects to variant page from future version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, futureVersionNumber))
        cy.wait('@futureVersionResponse')

        cy.contains(variantPage.baseTexts.backToVariant).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
        )
      })

      it('does not display Version history tab on future version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, futureVersionNumber))
        cy.wait('@futureVersionResponse')

        cy.contains(variantPage.foodTypeMenuLabels.versionHistory).should('not.exist')
      })
    })
  })

  context('barista type product', () => {
    const baristaVariant = new ProductVariantDtoMockBuilder()
      .withSku(sku)
      .asMaster()
      .withAttributes()
      .withHamiltonGrant({ productCode: hgCode })
      .addVersions([previousVariantVersion, futureVariantVersion])
      .build()

    const baristaProduct = new ProductDtoMockBuilder()
      .addVariant(baristaVariant)
      .setSetup()
      .setProductType(ProductType.BaristaBeverage)
      .build()

    const baristaProductResponse = new ProductResponseDtoMockBuilder()
      .setProduct(baristaProduct)
      .build()

    const previousVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(baristaVariant)
      .setPublishState(VariantVersionPublishState.PREVIOUS)
      .withVersionNumber(prevVersionNumber)
      .build()

    const futureVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(baristaVariant)
      .setPublishState(VariantVersionPublishState.FUTURE)
      .withVersionNumber(futureVersionNumber)
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(baristaProductResponse).as('productResponse')
    })

    describe('Product group page', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getProductUrl(sku))
        cy.wait('@productResponse')
      })

      it('displays propper left-sided navigation for product group page tabs', () => {
        productGroupPage.verifyLeftSideNavigationForBaristaProduct()
      })

      it('displays propper footer navigation for product group page tabs', () => {
        productGroupPage.verifyFooterNavigationForBaristaProduct()
      })

      it('"< Back to Search" link redirects to search page from product group page', () => {
        cy.contains(variantPage.baseTexts.backToSearch).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(
            SearchQueryParameters.productName,
          )}`,
        )
      })
    })

    describe('Variant page', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getVariantUrl(sku, sku))
        cy.wait('@productResponse')
      })

      it('displays propper left-sided navigation for product variant page tabs', () => {
        variantPage.verifyLeftSideNavigationForBaristaType()
      })

      it('displays propper footer navigation for product variant page tabs', () => {
        variantPage.verifyFooterNavigationForBaristaType()
      })

      it('"< Back to product group" link redirects to product group page from variant page', () => {
        cy.contains(variantPage.baseTexts.backToProduct).click()
        cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)
      })
    })

    describe('Version page', () => {
      beforeEach(() => {
        cy.interceptVariantVersionResponse(previousVersionResponse).as('previousVersionResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('futureVersionResponse')
      })

      it('"< Back to current version" link redirects to variant page from previous version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, prevVersionNumber))
        cy.wait('@previousVersionResponse')

        cy.contains(variantPage.baseTexts.backToVariant).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
        )
      })

      it('does not display Version history tab on previous version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, prevVersionNumber))
        cy.wait('@previousVersionResponse')

        cy.contains(variantPage.foodTypeMenuLabels.versionHistory).should('not.exist')
      })

      it('"< Back to current version" link redirects to variant page from future version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, futureVersionNumber))
        cy.wait('@futureVersionResponse')

        cy.contains(variantPage.baseTexts.backToVariant).click()
        cy.url().should(
          'eq',
          `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
        )
      })

      it('does not display Version history tab on future version page', () => {
        cy.visit(TestUrls.getVersionUrl(sku, sku, futureVersionNumber))
        cy.wait('@futureVersionResponse')

        cy.contains(variantPage.foodTypeMenuLabels.versionHistory).should('not.exist')
      })
    })
  })
})
