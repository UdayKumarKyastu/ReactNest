import { ProductSetupPage } from 'cypress/pages/product-group/ProductSetupPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { EditProductDto } from 'src/modules/product/dto/edit-product.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'

describe('Product set-up page', () => {
  const setupPage = new ProductSetupPage()

  context('food type product', () => {
    const sku = 'UK0010'
    const foodProductResponse = new ProductResponseDtoMockBuilder()
      .setBasicRequiredData(sku)
      .build()

    it('redirects to categorisation page', () => {
      cy.interceptProductResponse(foodProductResponse).as('productResponse')
      cy.visit(TestUrls.getProductSetupUrl(sku))
      cy.wait('@productResponse')

      cy.url().should('eq', `${Cypress.config().baseUrl}${TestUrls.getProductCategoriesUrl(sku)}`)
    })
  })

  context('barista type product', () => {
    const sku = 'UK001'
    const variant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withAttributes()
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).setSetup().build()
    const baristaResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(baristaResponse).as('productResponse')
      cy.visit(TestUrls.getProductSetupUrl(sku))
      cy.wait('@productResponse')
    })

    it('allows to open and close edit view', () => {
      setupPage.verifyReadonlyView()
      setupPage.editButton().click()
      setupPage.verifyEditView()
      setupPage.cancelButton().click()
      setupPage.verifyReadonlyView()
    })

    it('allows to edit product setup', () => {
      const expectedPutRequestBody: EditProductDto.UpdateSetup = {
        iceMachineRequired: false,
        blenderRequired: true,
        canHaveVariants: false,
        canAddSyrup: true,
        canAddExtraCoffeeShot: false,
        canAddWhippedCream: false,
      }

      const baristaSetup: GetProductDto.BaristaSetup = {
        ...expectedPutRequestBody,
        canBeDecaf: false,
        canBeWithoutMilk: false,
        canBeWithSemiSkimmedMilk: false,
        canBeWithSkimmedMilk: false,
        canBeWithOatMilk: false,
        canBeWithRiceCoconutMilk: false,
        canBeWithSoyMilk: false,
      }

      const variant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withAttributes()
        .build()
      const editedProduct = new ProductDtoMockBuilder().setSetup().addVariant(variant).build()
      const editedResponse = new ProductResponseDtoMockBuilder().setProduct(editedProduct).build()
      editedResponse.draftChanges.setUp = { ...baristaSetup }
      editedResponse.draftChanges.changesCount.setUp = 2
      editedResponse.draftChanges.changesCount.total = 2

      setupPage.editButton().click()

      // { force: true } because of custom styling - element is covered by another
      setupPage.blenderCheckbox().check({ force: true })
      setupPage.syrupCheckbox().check({ force: true })

      cy.intercept('PUT', TestUrls.getApiProductSetupUrl(sku), (req) => {
        req.reply(204)
      }).as('setupEdit')
      cy.interceptProductResponse(editedResponse).as('editedResponse')

      setupPage.saveChanges()

      cy.wait('@setupEdit').then((interception) => {
        expect(interception.request.body).to.deep.equal(expectedPutRequestBody)
      })
      cy.wait('@editedResponse')

      setupPage.verifySavedDraftChangesInfo(editedResponse.draftChanges.changesCount.total)
      setupPage.verifyDraftChangesData(editedResponse)
    })
  })
})
