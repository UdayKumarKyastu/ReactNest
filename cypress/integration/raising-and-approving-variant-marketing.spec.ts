import { getUpdateVariantMarketingBody } from 'cypress/fixtures/update-variant-request-bodies'
import { SaveChangesConfirmationModalComponent } from 'cypress/pages/components/EditSaveConfirmationModalComponent'
import { VariantMarketingPage } from 'cypress/pages/variant/VariantMarketingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ChangeStatus } from 'src/modules/product/model/review-status'
import { setUsersPermissions } from 'cypress/helpers/auth0'
import { AuthPermission } from 'src/modules/auth/AuthPermission'

describe('Variant marketing tab', () => {
  const variantMarketingPage = new VariantMarketingPage()
  const saveModal = new SaveChangesConfirmationModalComponent()
  context('master variant without draft changes', () => {
    beforeEach(() => {
      setUsersPermissions([
        AuthPermission.REVIEW_MARKETING_CHANGES,
        AuthPermission.CAN_EDIT,
        AuthPermission.CAN_APPROVE_CHANGES,
        AuthPermission.REVIEW_MARKETING_CHANGES,
      ])
    })
    const tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1)
    const sku = 'UK006783'
    const variant = new ProductVariantDtoMockBuilder()
      .withSku(sku)
      .withName('Tuna & Cucumber with chilli tuna TEST')
      .withDescription(
        'Pole & line caught tuna mayo with spring onions, chopped capers and a squeeze of lemon juice, paired with sliced cucumber TEST',
      )
      .withAvailability({
        liveSchedule: {
          on: '2016-04-18T00:00:00.000Z',
          off: '2026-04-18T00:00:00.000Z',
        },
        displayAsNew: {
          isDisplayed: false,
          until: null,
        },
        availableForOutposts: true,
      })
      .asMaster()
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()
    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantUrl(sku, sku))
      cy.wait('@productResponse')
    })
    it('allows editing and undoing fields', () => {
      variantMarketingPage.editButton().click()
      cy.get('#variantName').clear().type('Tuna & Cucumber with salsa')
      cy.get('#variantDescription').clear().type('Tuna & salsa what could be better')
      cy.get('#availableForCollection').check({ force: true })
      cy.get('#availableForOutpost').uncheck({ force: true })
      cy.get('#visibleOnBrandWebsite').check({ force: true })
      cy.get('.select__control').click()
      cy.get('[type="checkbox"]:not(:checked)')
        .parents('[class*="CheckboxWrapper"]')
        .eq(13)
        .click({ force: true })
      cy.get('.select__control').click()
      cy.get('[type="checkbox"]:not(:checked)')
        .parents('[class*="CheckboxWrapper"]')
        .eq(13)
        .click({ force: true })
      cy.get('.select__control').click()
      cy.get('[type="checkbox"]:not(:checked)')
        .parents('[class*="CheckboxWrapper"]')
        .eq(7)
        .click({ force: true })

      const updatedVariant = new ProductVariantDtoMockBuilder()
        .withSku(sku)
        .withName('Tuna & Cucumber with chilli tuna TEST')
        .withDescription(
          'Pole & line caught tuna mayo with spring onions, chopped capers and a squeeze of lemon juice, paired with sliced cucumber TEST',
        )
        .withAvailability({
          liveSchedule: {
            on: '2016-04-18T00:00:00.000Z',
            off: '2026-04-18T00:00:00.000Z',
          },
          isLive: true,
          displayAsNew: {
            isDisplayed: false,
            until: null,
          },
          availableForOutposts: false,
          availableForClickAndCollect: true,
        })
        .withHowToDisplay(['IOPKFS', 'ABTGT', 'ODSP'])
        .asMaster()
        .build()
      const updatedProduct = new ProductDtoMockBuilder().addVariant(updatedVariant).build()
      const updateBody = getUpdateVariantMarketingBody(updatedVariant)
      updateBody.name['en-GB'] = 'Tuna & Cucumber with salsa'
      updateBody.description['en-GB'] = 'Tuna & salsa what could be better'
      //TODO: update
      const draftName = {
        'en-GB': 'Tuna & Cucumber with salsa salsa',
        'en-US': 'Tuna & Cucumber with chilli tuna TEST-en-US',
        'zh-HK': 'Tuna & Cucumber with chilli tuna TEST-zh-HK',
        'en-HK': 'Tuna & Cucumber with chilli tuna TEST-en-HK',
        'fr-FR': 'Tuna & Cucumber with chilli tuna TEST-fr-FR',
      }
      //TODO: build proper draft changes object
      const draftChanges = new DraftChangesMockBuilder(updatedProduct)
        .replaceVariantName(0, draftName)
        .build()
      draftChanges.changesCount.marketing = 5
      const editedProductResponse = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(draftChanges)
        .build()
      cy.intercept('PUT', TestUrls.getApiVariantMarketingUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('marketing-update')
      cy.interceptProductResponse(editedProductResponse).as('editedResponse')
      variantMarketingPage.saveButton().click()
      saveModal.saveChangesButton().click()
      cy.wait('@marketing-update').should(({ request, response }) => {
        expect(request.body).to.deep.equal(updateBody)
      })
      cy.wait('@editedResponse')
    })
  })
})

describe('All draft change page, approving and rejecting changes', () => {
  const tommorow = new Date()
  tommorow.setDate(tommorow.getDate() + 1)
  const sku = 'UK006783'
  const updatedVariant = new ProductVariantDtoMockBuilder()
    .withSku(sku)
    .withName('Tuna & Cucumber with chilli tuna TEST')
    .withDescription(
      'Pole & line caught tuna mayo with spring onions, chopped capers and a squeeze of lemon juice, paired with sliced cucumber TEST',
    )
    .withAvailability({
      liveSchedule: {
        on: '2016-04-18T00:00:00.000Z',
        off: '2026-04-18T00:00:00.000Z',
      },
      isLive: false,
      displayAsNew: {
        isDisplayed: false,
        until: null,
      },
      availableForOutposts: true,
      availableForClickAndCollect: false,
    })
    .withHowToDisplay([])
    .asMaster()
    .build()
  const updatedProduct = new ProductDtoMockBuilder().addVariant(updatedVariant).build()

  it('Approve or reject changes', () => {
    const draftName: GetProductDto.ProductVariant['name'] = {
      'en-GB': 'Tuna & Cucumber with salsa',
      'en-US': 'Tuna & Cucumber with chilli tuna TEST-en-US',
      'zh-HK': 'Tuna & Cucumber with chilli tuna TEST-zh-HK',
      'en-HK': 'Tuna & Cucumber with chilli tuna TEST-en-HK',
      'fr-FR': 'Tuna & Cucumber with chilli tuna TEST-fr-FR',
    }
    const draftDescription: GetProductDto.ProductVariant['description']['standard'] = {
      'en-GB': 'Tuna & salsa what could be better.',
      'en-US': 'Tuna & Cucumber with chilli tuna TEST-en-US',
      'zh-HK': 'Tuna & Cucumber with chilli tuna TEST-zh-HK',
      'en-HK': 'Tuna & Cucumber with chilli tuna TEST-en-HK',
      'fr-FR': 'Tuna & Cucumber with chilli tuna TEST-fr-FR',
    }
    const draftAvailability: GetProductDto.ProductVariant['availability'] = {
      availableForClickAndCollect: true,
      availableForOutposts: false,
      visibleOnDeliveryWebsite: false,
      availableForLunch: true,
      isLive: true,
      availableForPretDelivers: false,
      isChefsSpecial: false,
      displayAsNew: {
        isDisplayed: false,
        until: null,
      },
      liveSchedule: {
        on: '2016-04-18T00:00:00.000Z',
        off: '2026-04-18T00:00:00.000Z',
      },
      availableAllDay: false,
    }

    const draftDisplay: GetProductDto.ProductVariant['howToDisplay'] = ['IOPKFS', 'ABTGT', 'ODSP']

    const draftChanges = new DraftChangesMockBuilder(updatedProduct)
      .replaceVariantName(0, draftName, {
        'en-GB': {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceVariantDescription(0, draftDescription, {
        'en-GB': {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceAvailability(0, draftAvailability, {
        availableForClickAndCollect: {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        availableForOutposts: {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        isLive: {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        availableForLunch: {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceHowToDisplay(0, draftDisplay, {
        status: ChangeStatus.Pending,
        user: {
          name: 'Test user',
          id: 'test_id',
        },
        modifiedAt: '2022-04-19T15:18:50.607Z',
      })
      .build()
    const response = new ProductResponseDtoMockBuilder()
      .setProduct(updatedProduct)
      .setDraftChanges(draftChanges)
      .build()
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
    cy.wait('@productResponse')
    cy.intercept('POST', TestUrls.getreviewMarketingUrl(sku, sku), {
      body: {},
    }).as('acceptCategory')
    cy.get('[data-testid="approve-button"]').eq(1).click({ force: true })
    cy.wait('@acceptCategory')
    const updatedDraftChanges = new DraftChangesMockBuilder(updatedProduct)
      .replaceVariantName(0, draftName, {
        'en-GB': {
          status: ChangeStatus.Accepted,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceVariantDescription(0, draftDescription, {
        'en-GB': {
          status: ChangeStatus.Rejected,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceAvailability(0, draftAvailability, {
        availableForClickAndCollect: {
          status: ChangeStatus.Accepted,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        availableForOutposts: {
          status: ChangeStatus.Rejected,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        isLive: {
          status: ChangeStatus.Accepted,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
        availableForLunch: {
          status: ChangeStatus.Rejected,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        },
      })
      .replaceHowToDisplay(0, draftDisplay, {
        status: ChangeStatus.Accepted,
        user: {
          name: 'Test user',
          id: 'test_id',
        },
        modifiedAt: '2022-04-19T15:18:50.607Z',
      })
      .build()
    const updatedResponse = new ProductResponseDtoMockBuilder()
      .setProduct(updatedProduct)
      .setDraftChanges(updatedDraftChanges)
      .build()
    updatedResponse.draftChanges.reviewStatuses!.statusCount = {
      accepted: 4,
      rejected: 3,
      pending: 0,
    }
    cy.interceptProductResponse(updatedResponse).as('productResponse')
    cy.wait('@productResponse')
  })
})
