import { VariantNutritionalsPage } from 'cypress/pages/variant/VariantNutritionalsPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'

describe('Variant nutritionals tab', () => {
  const variantNutritionalsPage = new VariantNutritionalsPage()

  const sku = 'UK001'
  const response = new ProductResponseDtoMockBuilder().setBasicRequiredData(sku).build()

  it('display basic elements', () => {
    cy.interceptProductResponse(response)
    cy.visit(TestUrls.getVariantNutritionalsUrl(sku, sku))
    variantNutritionalsPage.verifyBasicElements()
  })
})
