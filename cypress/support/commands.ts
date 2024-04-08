import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { TestUrls } from './TestUrls'
import { getAvailableHowToDisplayOptions } from 'cypress/fixtures/mocks/avaliable-how-to-display.mock'
import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
declare global {
  namespace Cypress {
    interface Chainable {
      interceptProductResponse: typeof interceptProductResponse
      interceptVariantVersionResponse: typeof interceptVariantVersionResponse
    }
  }
}

function interceptProductResponse(productResponse: GetProductDto.ProductResponse) {
  const sku = productResponse.product.variants[0].sku
  const url = TestUrls.getApiProductUrl(sku)

  cy.intercept('GET', TestUrls.getHowToDisplayOptionsUrl(productResponse.product.type), {
    body: { options: getAvailableHowToDisplayOptions() },
  })

  return cy.intercept('GET', url, { body: productResponse })
}

function interceptVariantVersionResponse(versionResponse: GetProductVariantVersionDto) {
  const sku = versionResponse.variant.sku
  const versionKey = versionResponse.key
  const url = TestUrls.getApiVersionUrl(sku, sku, versionKey)

  return cy.intercept('GET', url, { body: versionResponse })
}

Cypress.Commands.add('interceptProductResponse', interceptProductResponse)
Cypress.Commands.add('interceptVariantVersionResponse', interceptVariantVersionResponse)
