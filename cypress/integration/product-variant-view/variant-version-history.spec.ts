import { verifyVersionToastMessage } from 'cypress/helpers/util'
import { VariantMarketingPage } from 'cypress/pages/variant/VariantMarketingPage'
import { VariantVersionHistoryPage } from 'cypress/pages/variant/VariantVersionHistoryPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { ProductResponseVariantVersionsMockBuilder } from 'src/modules/product/mock/product-response-variant-version-dto-mock-builder'

import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

const variantVersionHistoryPage = new VariantVersionHistoryPage()
const variantMarketingPage = new VariantMarketingPage()

describe('Variant version history page', () => {
  const today = new Date()
  const prevDate = new Date(today.getFullYear(), today.getMonth() - 1, 2)
  const futureDate = new Date(today.getFullYear(), today.getMonth() + 1, 2)
  const previousName = 'Previous version name'
  const previousVersionNumber = 1
  const currentVersionNumber = 2
  const futureVersionNumber = 1
  const currentName = 'Current version name'
  const futureName = 'Future version name'
  const sku = 'UK001'
  const baseVariant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withHamiltonGrant({ productCode: 'HG001' })
    .build()
  const previousVersion = new ProductResponseVariantVersionsMockBuilder()
    .fromVariant(baseVariant)
    .withPublishState(VariantVersionPublishState.PREVIOUS)
    .withVersionNumber(previousVersionNumber)
    .withLiveFrom(prevDate)
    .withName(previousName)
    .build()
  const currentVersion = new ProductResponseVariantVersionsMockBuilder()
    .fromVariant(baseVariant)
    .withPublishState(VariantVersionPublishState.CURRENT)
    .withVersionNumber(currentVersionNumber)
    .withLiveFrom(today)
    .withName(currentName)
    .build()
  const futureVersion = new ProductResponseVariantVersionsMockBuilder()
    .fromVariant(baseVariant)
    .withPublishState(VariantVersionPublishState.FUTURE)
    .withVersionNumber(futureVersionNumber)
    .withLiveFrom(futureDate)
    .withName(futureName)
    .build()

  context('variant with previous, current and future version', () => {
    const variant = new ProductVariantDtoMockBuilder(baseVariant)
      .addVersions([previousVersion, currentVersion, futureVersion])
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantVersionHistoryUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('displays version in propper rows - future, current, previous', () => {
      variantVersionHistoryPage.verifyVersionInCurrentSection(currentVersion)
      variantVersionHistoryPage.verifyVersionInFutureSection(futureVersion)
      variantVersionHistoryPage.verifyVersionInPreviousSection(previousVersion)
    })

    it('click on future variant version row redirects to version marketing page', () => {
      const futureVersionResponse = new VariantVersionResponseMockBuilder()
        .fromVariant(baseVariant)
        .withVersionNumber(futureVersionNumber)
        .setPublishState(VariantVersionPublishState.FUTURE)
        .build()
      cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
      variantVersionHistoryPage.rowByText(futureName).click()
      cy.wait('@versionResponse')
      verifyVersionToastMessage(futureVersionResponse)
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}${TestUrls.getVersionUrl(
          sku,
          sku,
          futureVersionNumber,
        )}/marketing`,
      )
    })

    it('click on previous variant version row redirects to version marketing page', () => {
      const previousVersionResponse = new VariantVersionResponseMockBuilder()
        .fromVariant(baseVariant)
        .withVersionNumber(previousVersionNumber)
        .setPublishState(VariantVersionPublishState.PREVIOUS)
        .build()
      cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
      variantVersionHistoryPage.rowByText(futureName).click()
      cy.wait('@versionResponse')
      verifyVersionToastMessage(previousVersionResponse)
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}${TestUrls.getVersionUrl(
          sku,
          sku,
          previousVersionNumber,
        )}/marketing`,
      )
    })

    it('click on current variant version row redirects to variant marketing page', () => {
      cy.contains(currentName).click()
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
      )
      variantMarketingPage.verifyBasicElements()
    })
  })

  context('variant with future version only', () => {
    const variant = new ProductVariantDtoMockBuilder(baseVariant)
      .addVersions([futureVersion])
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantVersionHistoryUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('displays future version in Future Versions section', () => {
      variantVersionHistoryPage.verifyVersionInFutureSection(futureVersion)
      cy.contains(variantVersionHistoryPage.texts.noFutureVersionsMessage).should('not.exist')
      cy.contains(variantVersionHistoryPage.texts.noPreviousVersionsMessage).should('be.visible')
    })
  })

  context('variant with current version only', () => {
    const variant = new ProductVariantDtoMockBuilder(baseVariant)
      .addVersions([currentVersion])
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantVersionHistoryUrl(sku, sku))
      cy.wait('@productResponse')
    })
    it('displays current version in Current Versions section', () => {
      variantVersionHistoryPage.verifyVersionInCurrentSection(currentVersion)
      cy.contains(variantVersionHistoryPage.texts.noFutureVersionsMessage).should('be.visible')
      cy.contains(variantVersionHistoryPage.texts.noPreviousVersionsMessage).should('be.visible')
    })
  })
})
