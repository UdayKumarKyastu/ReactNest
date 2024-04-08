import { setUsersPermissions } from 'cypress/helpers/auth0'
import { VariantMarketingPage } from 'cypress/pages/variant/VariantMarketingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { AuthPermission } from 'src/modules/auth/AuthPermission'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'

describe('Pret Portal roles and permissions', () => {
  const variantMarketingPage = new VariantMarketingPage()

  const sku = 'UK001'
  const response = new ProductResponseDtoMockBuilder().setBasicRequiredData(sku).build()
  response.draftChanges.variants[0].description.standard['en-GB'] = 'Changed test description'
  response.draftChanges.variants[0].changesCount.marketing = 1
  response.draftChanges.variants[0].changesCount.total = 1

  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
  })

  context('user with no elevated permissions', () => {
    beforeEach(() => {
      setUsersPermissions([])
    })

    it('is able to read product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      variantMarketingPage.verifyBasicElements()
    })

    it('is not able to edit product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      variantMarketingPage.editButton().should('be.disabled')
    })
  })

  context('user with Editor permission', () => {
    beforeEach(() => {
      setUsersPermissions([AuthPermission.CAN_EDIT])
    })

    it('is able to read product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('is able to edit product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      variantMarketingPage.editButton().should('be.enabled')
      variantMarketingPage.editButton().click()
      variantMarketingPage.marketingNameGbInput().type('test')
      variantMarketingPage.saveButton().should('be.enabled')
    })
  })

  context('user with editor and approver permissions', () => {
    beforeEach(() => {
      setUsersPermissions([AuthPermission.CAN_EDIT, AuthPermission.CAN_APPROVE_CHANGES])
    })

    it('is able to read product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('is able to edit product merchandising information', () => {
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@productResponse')
      variantMarketingPage.editButton().should('be.enabled')
      variantMarketingPage.editButton().click()
      variantMarketingPage.marketingNameGbInput().type('test')
      variantMarketingPage.saveButton().should('be.enabled')
    })
  })
})
