import {
  getVersionUpdateLabellingBodyMock,
  getVersionUpdateReportingBodyMock,
} from 'cypress/fixtures/mocks/version-save-duplicated-request-bodies.mock'
import { getUpdateVariantMarketingBody } from 'cypress/fixtures/update-variant-request-bodies'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { ProductResponseVariantVersionsMockBuilder } from 'src/modules/product/mock/product-response-variant-version-dto-mock-builder'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

type VersionDto = GetProductVariantVersionDto

describe('Unsaved data notifications', () => {
  const variantPage = new VariantPage()

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
  const previousVersion = new ProductResponseVariantVersionsMockBuilder()
    .fromVariant(baseVariant)
    .withPublishState(VariantVersionPublishState.PREVIOUS)
    .build()
  const variant = new ProductVariantDtoMockBuilder(baseVariant)
    .addVersions([futureVersion1, previousVersion])
    .build()
  const product = new ProductDtoMockBuilder().addVariant(variant).build()
  const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()

  beforeEach(() => {
    cy.interceptProductResponse(productResponse).as('productResponse')
  })

  it('displays propper warnings for marketing page and allows to save duplicated data', () => {
    const approvedTabs: VersionDto['approvedTabs'] = {
      marketing: false,
      labelling: true,
      pricing: true,
      reporting: true,
    }
    const versionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(variant)
      .withApprovedTabs(approvedTabs)
      .build()
    const expectedUpdateBody = getUpdateVariantMarketingBody(variant)

    cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
    cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
    cy.wait(['@productResponse', '@versionResponse'])

    variantPage.editButton().should('not.exist')
    cy.contains(getWarningToastTextForPage('marketing')).should('be.visible')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .contains('a', variantPage.foodTypeMenuLabels.marketing)
      .find('svg')
      .should('be.visible')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .find(variantPage.baseSelectors.navTabChangeIcon)
      .should('have.length', 1)
    variantPage.saveDuplicatedDataButton().should('be.visible')
    variantPage.updateDataButton().should('be.visible')

    cy.intercept(
      'PUT',
      TestUrls.getApiVersionMarketingUrl(sku, sku, versionNumber, hgCode),
      (req) => {
        req.reply(204)
      },
    ).as('update')

    variantPage.saveDuplicatedDataButton().click()

    cy.wait('@update').should(({ request }) => {
      expect(request.body).to.deep.eq({ ...expectedUpdateBody, isDuplicatedData: true })
    })
  })

  it('displays propper warnings for pricing page and allows to save duplicated data', () => {
    const approvedTabs: VersionDto['approvedTabs'] = {
      marketing: true,
      labelling: true,
      pricing: false,
      reporting: true,
    }
    const versionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(variant)
      .withApprovedTabs(approvedTabs)
      .build()
    cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
    cy.visit(TestUrls.getVersionPricingUrl(sku, sku, versionNumber))
    cy.wait(['@productResponse', '@versionResponse'])

    cy.contains(getWarningToastTextForPage('pricing')).should('be.visible')
    variantPage.editButton().should('not.exist')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .contains('a', variantPage.foodTypeMenuLabels.pricing)
      .find('svg')
      .should('be.visible')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .find(variantPage.baseSelectors.navTabChangeIcon)
      .should('have.length', 1)
    variantPage.saveDuplicatedDataButton().should('be.visible')
    variantPage.updateDataButton().should('be.visible')

    cy.intercept(
      'PUT',
      TestUrls.getApiVersionPricingUrl(sku, sku, versionNumber, hgCode),
      (req) => {
        req.reply(204)
      },
    ).as('update')

    variantPage.saveDuplicatedDataButton().click()

    cy.wait('@update').should(({ request }) => {
      expect(request.body).to.deep.eq({ prices: [], isDuplicatedData: true })
    })
    cy.interceptVariantVersionResponse(versionResponse)
  })

  it('displays propper warnings for reporting page and allows to save duplicated data', () => {
    const expectedPutRequestBody = getVersionUpdateReportingBodyMock(sku, hgCode)
    const approvedTabs: VersionDto['approvedTabs'] = {
      marketing: true,
      labelling: true,
      pricing: true,
      reporting: false,
    }
    const versionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(variant)
      .withApprovedTabs(approvedTabs)
      .build()
    cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
    cy.visit(TestUrls.getVersionReportingUrl(sku, sku, versionNumber))
    cy.wait(['@productResponse', '@versionResponse'])

    cy.contains(getWarningToastTextForPage('reporting')).should('be.visible')
    variantPage.editButton().should('not.exist')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .contains('a', variantPage.foodTypeMenuLabels.reporting)
      .find('svg')
      .should('be.visible')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .find(variantPage.baseSelectors.navTabChangeIcon)
      .should('have.length', 1)
    variantPage.saveDuplicatedDataButton().should('be.visible')
    variantPage.updateDataButton().should('be.visible')

    cy.intercept(
      'PUT',
      TestUrls.getApiVersionReportingUrl(sku, sku, versionNumber, hgCode),
      (req) => {
        req.reply(204)
      },
    ).as('update')

    variantPage.saveDuplicatedDataButton().click()

    cy.wait('@update').should(({ request }) => {
      expect(request.body).to.deep.eq(expectedPutRequestBody)
    })
    cy.interceptVariantVersionResponse(versionResponse)
  })

  it('displays propper warnings for labelling page and allows to save duplicated data', () => {
    const expectedPutRequestBody = getVersionUpdateLabellingBodyMock()
    const approvedTabs: VersionDto['approvedTabs'] = {
      marketing: true,
      labelling: false,
      pricing: true,
      reporting: true,
    }
    const versionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(variant)
      .withApprovedTabs(approvedTabs)
      .build()
    cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
    cy.visit(TestUrls.getVersionLabellingUrl(sku, sku, versionNumber))
    cy.wait(['@productResponse', '@versionResponse'])

    cy.contains(getWarningToastTextForPage('labelling')).should('be.visible')
    variantPage.editButton().should('not.exist')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .contains('a', variantPage.foodTypeMenuLabels.labelling)
      .find('svg')
      .should('be.visible')
    cy.get(variantPage.baseSelectors.leftSideNav)
      .find(variantPage.baseSelectors.navTabChangeIcon)
      .should('have.length', 1)
    variantPage.saveDuplicatedDataButton().should('be.visible')
    variantPage.updateDataButton().should('be.visible')

    cy.intercept(
      'PUT',
      TestUrls.getApiVersionLabellingUrl(sku, sku, versionNumber, hgCode),
      (req) => {
        req.reply(204)
      },
    ).as('update')

    variantPage.saveDuplicatedDataButton().click()

    cy.wait('@update').should(({ request }) => {
      expect(request.body).to.deep.eq(expectedPutRequestBody)
    })
    cy.interceptVariantVersionResponse(versionResponse)
  })
})

const getWarningToastTextForPage = (page: string) => {
  return `All marketing data has been duplicated from the current version of this product. If this data is correct please select 'save duplicated data'. Data that is duplicated does not require reviewing or approval. If this data needs to be updated please select 'update data'. Data this is updated will be held in draft until reviewed by an approver.`
}
