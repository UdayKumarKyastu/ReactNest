import { DiscardChangesConfirmationModalComponent } from 'cypress/pages/components/EditDiscardConfirmationModalComponent'
import { SaveChangesConfirmationModalComponent } from 'cypress/pages/components/EditSaveConfirmationModalComponent'
import { ProductMarketingPage } from 'cypress/pages/product-group/ProductMarketingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'

describe.skip('Product Marketing tab', () => {
  const productMarketingPage = new ProductMarketingPage()
  const saveModal = new SaveChangesConfirmationModalComponent()
  const discardModal = new DiscardChangesConfirmationModalComponent()

  const sku = 'UK001'
  const response = new ProductResponseDtoMockBuilder()
    .setProduct(
      new ProductDtoMockBuilder()
        .addVariant(new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build())
        .build(),
    )
    .build()

  const testProduct = response.product

  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getProductUrl(sku))
    cy.wait('@productResponse')
  })

  it('check marketing name other languages', () => {
    productMarketingPage.nameShowAllLanguagesButton().click()
    productMarketingPage.nameLanguagesList().should('be.visible')
    productMarketingPage.verifyNameOtherLanguagesContent(testProduct)
    productMarketingPage.nameHideOtherLanguagesButton().click()
    productMarketingPage.nameLanguagesList().should('not.exist')
  })

  it('checks marketing description other languages', () => {
    productMarketingPage.descriptionShowAllLanguagesButton().click()
    productMarketingPage.descriptionLanguagesList().should('be.visible')
    productMarketingPage.verifyDescriptionOtherLanguagesContent(testProduct)
    productMarketingPage.descriptionHideOtherLanguagesButton().click()
    productMarketingPage.descriptionLanguagesList().should('not.exist')
  })

  it('changes state to editable after click Edit button', () => {
    productMarketingPage.verifyReadonlyState()
    productMarketingPage.editButton().click()
    productMarketingPage.verifyEditState()
  })

  it('backs to readonly state after click Cancel button', () => {
    productMarketingPage.editButton().click()
    productMarketingPage.cancelButton().click()
    productMarketingPage.verifyReadonlyState()
  })

  it('backs to readonly state after click Cross (X) button', () => {
    productMarketingPage.editButton().click()
    productMarketingPage.cancelButton().click()
    productMarketingPage.verifyReadonlyState()
  })

  it('checks input values in edit state', () => {
    const productName = testProduct.name['en-GB']
    const productDescription = testProduct.description['en-GB']

    productMarketingPage.editButton().click()

    productMarketingPage.nameInput().should('have.value', productName)
    productMarketingPage.descriptionInput().should('have.value', productDescription)

    // TODO: all language inputs
  })

  it('checks save button activity', () => {
    productMarketingPage.editButton().click()

    productMarketingPage.nameInput().type('T')
    productMarketingPage.saveButton().should('not.have.attr', 'disabled')
    productMarketingPage.nameInput().type('{backspace}')
    productMarketingPage.saveButton().should('have.attr', 'disabled')

    productMarketingPage.descriptionInput().type('T')
    productMarketingPage.saveButton().should('not.have.attr', 'disabled')
    productMarketingPage.descriptionInput().type('{backspace}')
    productMarketingPage.saveButton().should('have.attr', 'disabled')
  })

  it('checks cancel button when no changes made', () => {
    productMarketingPage.editButton().click()
    productMarketingPage.cancelButton().click()
    productMarketingPage.verifyReadonlyState()
  })

  it('checks cross button when no changes made', () => {
    productMarketingPage.editButton().click()
    productMarketingPage.cancelButton().click()
    productMarketingPage.verifyReadonlyState()
  })

  it('checks discard changes by cancel button', () => {
    const testPhrase = 'test new name'

    productMarketingPage.editButton().click()
    productMarketingPage.nameInput().clear().type(testPhrase)
    productMarketingPage.cancelButton().click()
    discardModal.headline().should('be.visible')
    discardModal.goBackToEditButton().click()
    productMarketingPage.verifyEditState()
    productMarketingPage.saveButton().should('not.have.attr', 'disabled')
    discardModal.headline().should('not.exist')
    productMarketingPage.nameInput().should('have.value', testPhrase)

    productMarketingPage.cancelButton().click()
    discardModal.discardChangesButton().click()

    productMarketingPage.verifyReadonlyState()

    // TODO: check if product name not changed
  })

  it('checks discard changes by cross button', () => {
    const testPhrase = 'test new name'

    productMarketingPage.editButton().click()
    productMarketingPage.nameInput().clear().type(testPhrase)
    productMarketingPage.cancelButton().click()
    discardModal.headline().should('be.visible')
    discardModal.goBackToEditButton().click()
    discardModal.headline().should('not.exist')
    productMarketingPage.verifyEditState()
    productMarketingPage.saveButton().should('not.have.attr', 'disabled')
    productMarketingPage.nameInput().should('have.value', testPhrase)

    productMarketingPage.cancelButton().click()
    discardModal.discardChangesButton().click()

    productMarketingPage.verifyReadonlyState()

    // TODO: check if product name not changed
  })

  it('checks back to edit after save click', () => {
    const testPhrase = 'test new name'

    productMarketingPage.editButton().click()
    productMarketingPage.nameInput().clear().type(testPhrase)
    productMarketingPage.saveButton().click()

    saveModal.headline().should('be.visible')
    saveModal.backToEditButton().click()

    saveModal.headline().should('not.exist')
    productMarketingPage.verifyEditState()
    productMarketingPage.nameInput().should('have.value', testPhrase)
  })
})
