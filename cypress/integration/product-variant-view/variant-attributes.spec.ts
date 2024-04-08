import { VariantAttributtesPage } from 'cypress/pages/variant/VariantAttributesPage'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { ProductType } from 'src/modules/product/model/product-type'

describe('Variant attributes tab', () => {
  const attributesPage = new VariantAttributtesPage()
  const variantPage = new VariantPage()

  context('food type product', () => {
    const sku = 'UK002'
    const foodVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withName('Food Variant')
      .build()
    const foodProduct = new ProductDtoMockBuilder()
      .addVariant(foodVariant)
      .setProductType(ProductType.Food)
      .build()
    const foodResponse = new ProductResponseDtoMockBuilder().setProduct(foodProduct).build()

    it('is not displayed for food type', () => {
      cy.interceptProductResponse(foodResponse).as('foodResponse')
      cy.visit(TestUrls.getVariantAtribitesUrl(sku, sku))
      cy.wait('@foodResponse')
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
      )
      cy.contains(variantPage.baristaTypeMenuLabels.marketing).should('be.visible')
      cy.contains(variantPage.baristaTypeMenuLabels.attributes).should('not.exist')
    })
  })

  context('barista type product', () => {
    const sku = 'UK001'
    const baristaVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withName('Barista Variant')
      .withAttributes()
      .build()
    const baristaProduct = new ProductDtoMockBuilder().addVariant(baristaVariant).build()
    const baristaResponse = new ProductResponseDtoMockBuilder().setProduct(baristaProduct).build()

    beforeEach(() => {
      cy.interceptProductResponse(baristaResponse).as('baristaResponse')
      cy.visit(TestUrls.getVariantAtribitesUrl(sku, sku))
      cy.wait('@baristaResponse')
    })

    it('is displayed for barista type product', () => {
      attributesPage.verifyBasicElements()
      cy.contains(variantPage.baristaTypeMenuLabels.attributes).should('be.visible')
    })

    it('displays "duplicated combination" message if matches existing attributes combination', () => {
      const masterSku = 'UK001'
      const variant1Sku = 'UK002'
      const variant2Sku = 'UK003'

      const fullFalseAttributes: GetProductDto.BaristaVariantAttributes = {
        withDecafPods: false,
        withoutMilk: false,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSoyMilk: false,
      }

      const variantAttributes1: GetProductDto.BaristaVariantAttributes = {
        withDecafPods: true,
        withoutMilk: true,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSoyMilk: true,
      }

      const variantAttributes2: GetProductDto.BaristaVariantAttributes = {
        withDecafPods: false,
        withoutMilk: false,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSoyMilk: true,
      }

      const masterVariant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(masterSku)
        .withAttributes(fullFalseAttributes)
        .build()
      const variant1 = new ProductVariantDtoMockBuilder()
        .withSku(variant1Sku)
        .withName('Variant 1')
        .withAttributes(variantAttributes1)
        .build()
      const variant2 = new ProductVariantDtoMockBuilder()
        .withSku(variant2Sku)
        .withName('Variant 2')
        .withAttributes(variantAttributes2)
        .build()

      const product = new ProductDtoMockBuilder()
        .addVariants([masterVariant, variant1, variant2])
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantAtribitesUrl(masterSku, variant2Sku))
      cy.wait('@productResponse')

      attributesPage.editButton().click()
      attributesPage.checkIfCombinationErrorIsNotVisible()

      // { force: true } because of custom styling - element is covered by another
      attributesPage.withDecafPodsCheckbox().check({ force: true })
      attributesPage.saveButton().should('not.be.disabled')

      attributesPage.withoutMilkCheckbox().check({ force: true })
      attributesPage.checkIfCombinationErrorIsVisible(variant1Sku)
      attributesPage.saveButton().should('be.disabled')

      attributesPage.withDecafPodsCheckbox().uncheck({ force: true })
      attributesPage.checkIfCombinationErrorIsNotVisible()
      attributesPage.saveButton().should('not.be.disabled')
    })

    it('allows saving edited attributes', () => {
      const editedAttributes: GetProductDto.BaristaVariantAttributes = {
        withDecafPods: true,
        withoutMilk: false,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSoyMilk: false,
      }

      const variantIndex = 0
      const draftChanges = new DraftChangesMockBuilder(baristaProduct)
        .replaceVariantAttributes(variantIndex, editedAttributes)
        .build()
      const editedResponse = new ProductResponseDtoMockBuilder(baristaResponse)
        .setDraftChanges(draftChanges)
        .build()

      cy.intercept('PUT', TestUrls.getApiVariantAttributesUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('updateAttributes')

      cy.interceptProductResponse(editedResponse).as('editedResponse')

      attributesPage.editButton().click()
      attributesPage.withDecafPodsCheckbox().check({ force: true })
      attributesPage.saveChanges()

      cy.wait('@updateAttributes').should(({ request }) => {
        expect(request.body).to.deep.equal(editedAttributes)
      })
      cy.wait('@editedResponse')

      attributesPage.verifySavedDraftChangesInfo(
        editedResponse.draftChanges.variants[variantIndex].changesCount.attributes,
      )
      attributesPage.verifySavedChangesForDecafPods()
    })
  })
})
