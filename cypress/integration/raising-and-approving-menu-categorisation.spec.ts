import {
  createSingleCategoryByNames,
  getUkCategoriesResponseMock,
} from 'cypress/fixtures/mocks/categories.mock'
import { ProductMenuCategorisationPage } from 'cypress/pages/product-group/ProductMenuCategorisationPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { CountryCode } from 'src/shared/model/country-code'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import { setUsersPermissions } from 'cypress/helpers/auth0'
import { AuthPermission } from 'src/modules/auth/AuthPermission'
import { ChangeStatus } from 'src/modules/product/model/review-status'

const countryCodes = CountryCode
describe('Raising and approving menu categorisation', () => {
  const categorisationPage = new ProductMenuCategorisationPage()
  context('Menu categorisation page', () => {
    const sku = 'UK00047'
    const ukCategories = getUkCategoriesResponseMock().categories[0]
    beforeEach(() => {
      setUsersPermissions([
        AuthPermission.REVIEW_MENU_CATEGORISATION_CHANGES,
        AuthPermission.CAN_EDIT,
        AuthPermission.CAN_APPROVE_CHANGES,
      ])
    })
    const testCategory: GetProductDto.ProductCategoryTree[] = [
      [
        {
          key: ukCategories.key,
          id: ukCategories.categoryID,
          name: ukCategories.categoryName,
        },
        {
          key: ukCategories.categories[0].key,
          id: ukCategories.categories[0].categoryID,
          name: ukCategories.categories[0].categoryName,
        },
        {
          key: ukCategories.categories[0].categories[0].key,
          id: ukCategories.categories[0].categories[0].categoryID,
          name: ukCategories.categories[0].categories[0].categoryName,
        },
      ],
    ]
    const expectedCategoryName = testCategory[0].map((el) => el.name['en-GB']).join(' > ')
    const productWithCategory = new ProductDtoMockBuilder()
      .setCountry(countryCodes.UK, 'United Kingdom')
      .addVariant(new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build())
      .setMenuCategories(testCategory)
      .build()
    const responseWithCategory = new ProductResponseDtoMockBuilder()
      .setProduct(productWithCategory)
      .build()
    beforeEach(() => {
      cy.interceptProductResponse(responseWithCategory).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.intercept('GET', TestUrls.getApiProductCategoriesUrl(sku), {
        body: getUkCategoriesResponseMock(),
      })
    })
    it('Editing menu categorisation', () => {
      const editedResponse = new ProductResponseDtoMockBuilder(responseWithCategory).build()
      editedResponse.draftChanges.categories = [
        createSingleCategoryByNames('UK', 'Breakfast', 'Breakfast porridge'),
        createSingleCategoryByNames('UK', 'Cold drinks', 'Juices'),
      ]
      editedResponse.draftChanges.changesCount.categories = 2
      editedResponse.draftChanges.changesCount.total = 2
      categorisationPage.checkIfCategoryNameIsVisible(expectedCategoryName)
      categorisationPage.editButton().click()
      categorisationPage.addCategoryButton().click()
      categorisationPage.setCategoriesOnModal('Breakfast', 'Breakfast porridge')
      categorisationPage.applyCategoryButton().click()
      categorisationPage.addCategoryButton().click()
      categorisationPage.setCategoriesOnModal('Cold drinks', 'Juices')
      categorisationPage.applyCategoryButton().click()
      cy.intercept('PUT', TestUrls.getApiProductCategoriesUrl(sku), (req) => {
        req.reply(204)
      }).as('putUpdate')
      cy.interceptProductResponse(editedResponse).as('editedResponse')

      categorisationPage.saveChanges()

      cy.wait('@putUpdate')
      cy.wait('@editedResponse')

      categorisationPage.verifySavedDraftChangesInfo(2)
      categorisationPage.verifyDraftChangesData(
        editedResponse.product.categories,
        editedResponse.draftChanges.categories,
      )
    })
  })

  describe('All draft change page, approving and rejecting changes', () => {
    const sku = 'UK00047'
    const ukCategories = getUkCategoriesResponseMock().categories[0]
    const updatedCategories1: GetProductDto.ProductCategoryTree[] = [
      [
        {
          key: ukCategories.key,
          id: ukCategories.categoryID,
          name: ukCategories.categoryName,
        },
        {
          key: ukCategories.categories[0].key,
          id: ukCategories.categories[0].categoryID,
          name: ukCategories.categories[0].categoryName,
        },
        {
          key: ukCategories.categories[0].categories[0].key,
          id: ukCategories.categories[0].categories[0].categoryID,
          name: ukCategories.categories[0].categories[1].categoryName,
        },
      ],
    ]
    const updatedCategories2: GetProductDto.ProductCategoryTree[] = [
      [
        {
          key: ukCategories.key,
          id: ukCategories.categoryID,
          name: ukCategories.categoryName,
        },
        {
          key: ukCategories.categories[0].key,
          id: ukCategories.categories[0].categoryID,
          name: ukCategories.categories[1].categoryName,
        },
        {
          key: ukCategories.categories[0].categories[0].key,
          id: ukCategories.categories[0].categories[1].categoryID,
          name: ukCategories.categories[1].categories[0].categoryName,
        },
      ],
    ]
    it('approve or reject categories', () => {
      const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
      const product = new ProductDtoMockBuilder().addVariant(variant).build()
      const draftChanges = new DraftChangesMockBuilder(product)
        .replaceProductMenuCategory(updatedCategories1)
        .replaceProductMenuCategory(updatedCategories2)
        .build()
      const response = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(draftChanges)
        .build()
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      cy.wait('@productResponse')
      cy.contains('Accept').click()
      cy.intercept('POST', TestUrls.getreviewMenuCategorisationUrl(sku), {
        body: {},
      }).as('acceptCategory')
      cy.wait('@acceptCategory')
      cy.contains('Reject').click()
      const updatedDraftChanges = new DraftChangesMockBuilder(product)
        .replaceProductMenuCategory(updatedCategories1)
        .replaceProductMenuCategory(updatedCategories2)
        .build()
      const updatedResponse = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(updatedDraftChanges)
        .build()
      updatedResponse.draftChanges.reviewStatuses!.statusCount = {
        accepted: 1,
        rejected: 0,
        pending: 0,
      }
      updatedResponse.draftChanges.reviewStatuses!.categories[0] = {
        ...updatedResponse.draftChanges.reviewStatuses!.categories[0],
        status: ChangeStatus.Accepted,
        user: {
          name: 'Test user',
          id: 'test_id',
        },
      }
      updatedResponse.draftChanges.reviewStatuses!.categories[1] = {
        ...updatedResponse.draftChanges.reviewStatuses!.categories[1],
        status: ChangeStatus.Rejected,
        user: {
          name: 'Test user',
          id: 'test_id',
        },
      }
      cy.interceptProductResponse(updatedResponse).as('productResponse')
      cy.wait('@productResponse')
      cy.contains('Accept').click({ force: true })
    })
  })
})
