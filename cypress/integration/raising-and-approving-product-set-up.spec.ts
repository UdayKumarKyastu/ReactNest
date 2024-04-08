import { setUsersPermissions } from 'cypress/helpers/auth0'
import { ProductSetupPage } from 'cypress/pages/product-group/ProductSetupPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { AuthPermission } from 'src/modules/auth/AuthPermission'
import { EditProductDto } from 'src/modules/product/dto/edit-product.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import {
  ProductDtoMockBuilder,
  ProductSetupEditableForUser,
} from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { ChangeStatus } from 'src/modules/product/model/review-status'

describe('Raising and approving product set up', () => {
  const setupPage = new ProductSetupPage()
  context('barista type product', () => {
    const sku = 'UK006647'
    const variant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withAttributes()
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).setSpecificSetup().build()
    const baristaResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(baristaResponse).as('productResponse')
      cy.visit(TestUrls.getProductSetupUrl(sku))
      cy.wait('@productResponse')
      setUsersPermissions([
        AuthPermission.REVIEW_SET_UP_CHANGES,
        AuthPermission.CAN_EDIT,
        AuthPermission.CAN_APPROVE_CHANGES,
        AuthPermission.REVIEW_BARISTA_ATTRIBUTE_CHANGES,
      ])
    })

    it('allows to edit product setup', () => {
      const expectedPutRequestBody: EditProductDto.UpdateSetup = {
        iceMachineRequired: true,
        blenderRequired: true,
        canHaveVariants: false,
        canAddSyrup: true,
        canAddExtraCoffeeShot: true,
        canAddWhippedCream: true,
      }

      const baristaSetup: GetProductDto.BaristaSetup = {
        ...expectedPutRequestBody,
        canBeDecaf: false,
        canBeWithoutMilk: false,
        canBeWithSemiSkimmedMilk: true,
        canBeWithSkimmedMilk: true,
        canBeWithOatMilk: true,
        canBeWithRiceCoconutMilk: true,
        canBeWithSoyMilk: true,
      }

      const variant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withAttributes()
        .build()
      const editedProduct = new ProductDtoMockBuilder()
        .setSpecificSetup()
        .addVariant(variant)
        .build()
      const editedResponse = new ProductResponseDtoMockBuilder().setProduct(editedProduct).build()
      editedResponse.draftChanges.setUp = { ...baristaSetup }
      editedResponse.draftChanges.changesCount.setUp = 4
      editedResponse.draftChanges.changesCount.total = 4

      setupPage.editButton().click()

      // { force: true } because of custom styling - element is covered by another
      setupPage.iceMachineCheckbox().check({ force: true })
      setupPage.blenderCheckbox().check({ force: true })
      setupPage.variantsCheckbox().uncheck({ force: true })
      setupPage.whippedCream().check({ force: true })

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
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
    })
  })

  describe('All draft change page, approving and rejecting changes', () => {
    const sku = 'UK006647'
    const newProductSetup: ProductSetupEditableForUser = {
      iceMachineRequired: true,
      blenderRequired: true,
      canHaveVariants: false,
      canAddSyrup: true,
      canAddExtraCoffeeShot: true,
      canAddWhippedCream: true,
    }
    it('Approve or reject changes', () => {
      const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
      const product = new ProductDtoMockBuilder().addVariant(variant).setSpecificSetup().build()
      const draftChanges = new DraftChangesMockBuilder(product)
        .replaceProductSetup(newProductSetup)
        .withReviewStatuses('setUp', 'iceMachineRequired', {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
        })
        .withReviewStatuses('setUp', 'blenderRequired', {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
        })
        .withReviewStatuses('setUp', 'canHaveVariants', {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
        })
        .withReviewStatuses('setUp', 'canAddWhippedCream', {
          status: ChangeStatus.Pending,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
        })
        .build()
      const response = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(draftChanges)
        .build()
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      cy.wait('@productResponse')

      cy.intercept('POST', TestUrls.getreviewSetUpUrl(sku), {
        body: {},
      }).as('acceptCategory')
      cy.get('[data-testid="approve-button"]').eq(3).click({ force: true })
      cy.wait('@acceptCategory')
      const updatedDraftChanges = new DraftChangesMockBuilder(product)
        .replaceProductSetup(newProductSetup)
        .withReviewStatuses('setUp', 'iceMachineRequired', {
          status: ChangeStatus.Accepted,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        })
        .withReviewStatuses('setUp', 'blenderRequired', {
          status: ChangeStatus.Rejected,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        })
        .withReviewStatuses('setUp', 'canHaveVariants', {
          status: ChangeStatus.Accepted,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        })
        .withReviewStatuses('setUp', 'canAddWhippedCream', {
          status: ChangeStatus.Rejected,
          user: {
            name: 'Test user',
            id: 'test_id',
          },
          modifiedAt: '2022-04-19T15:18:50.607Z',
        })
        .build()
      const updatedResponse = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(updatedDraftChanges)
        .build()
      updatedResponse.draftChanges.reviewStatuses!.statusCount = {
        accepted: 2,
        rejected: 2,
        pending: 0,
      }
      cy.interceptProductResponse(updatedResponse).as('productResponse')
      cy.wait('@productResponse')

      setupPage.verifyDraftChangesData(updatedResponse)
    })
  })
})
