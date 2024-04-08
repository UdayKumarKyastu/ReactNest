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

const countryCodes = CountryCode

describe('Product Menu categorisation page', () => {
  const categorisationPage = new ProductMenuCategorisationPage()

  context('Product without set categories', () => {
    const sku = 'UK0001'

    const productWoCategories = new ProductDtoMockBuilder()
      .setCountry(countryCodes.UK, 'United Kingdom')
      .addVariant(new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build())
      .build()
    const responseWoCategories = new ProductResponseDtoMockBuilder()
      .setProduct(productWoCategories)
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(responseWoCategories).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')

      cy.intercept('GET', TestUrls.getApiProductCategoriesUrl(sku), {
        body: getUkCategoriesResponseMock(),
      })
    })

    it('displays empty page when any category is not set', () => {
      categorisationPage.verifyReadonlyState()
      cy.contains(categorisationPage.texts.menuCategoryLabel).should('not.exist')
      cy.contains(categorisationPage.texts.addNewCategory).should('not.exist')
    })

    it('allows to add new category', () => {
      const editedResponse = new ProductResponseDtoMockBuilder(responseWoCategories).build()
      editedResponse.draftChanges.categories = [
        createSingleCategoryByNames('UK', 'Breakfast', 'Breakfast baguettes'),
      ]
      editedResponse.draftChanges.changesCount.categories = 1

      const expectedNewCategoryName = 'UK > Breakfast > Breakfast baguettes'

      categorisationPage.editButton().click()
      categorisationPage.addNewCategory('Breakfast', 'Breakfast baguettes')
      categorisationPage.checkIfCategoryNameIsInInput(expectedNewCategoryName)

      cy.intercept('PUT', TestUrls.getApiProductCategoriesUrl(sku), (req) => {
        req.reply(204)
      }).as('updateRequest')

      cy.interceptProductResponse(editedResponse).as('editedResponse')

      categorisationPage.saveChanges()

      cy.wait('@updateRequest')
      cy.wait('@editedResponse')

      categorisationPage.verifySavedDraftChangesInfo(1)
      categorisationPage.verifyDraftChangesData(
        editedResponse.product.categories,
        editedResponse.draftChanges.categories,
      )
    })
  })

  context('Product with existing category', () => {
    const sku = 'UK0002'

    const ukCategories = getUkCategoriesResponseMock().categories[0]

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

    it('displays set category in readonly and edit view', () => {
      cy.contains(categorisationPage.texts.menuCategoryLabel)
        .should('be.visible')
        .and('have.length', 1)
      categorisationPage.checkIfCategoryNameIsVisible(expectedCategoryName)
      categorisationPage.editButton().click()
      categorisationPage.checkIfCategoryNameIsInInput(expectedCategoryName)
      categorisationPage.verifyEditState()
      categorisationPage.cancelButton().click()
      categorisationPage.verifyReadonlyState()
    })

    it('allows undoing of a category remove', () => {
      categorisationPage.editButton().click()
      categorisationPage.removeButton().click()

      categorisationPage.saveButton().should('be.enabled')
      cy.contains(categorisationPage.texts.categoryRemoved).should('be.visible')
      cy.contains(categorisationPage.texts.menuCategoryLabel).should('not.exist')

      categorisationPage.undoButton().click()

      categorisationPage.saveButton().should('be.disabled')
      categorisationPage.checkIfCategoryNameIsInInput(expectedCategoryName)
      cy.contains(categorisationPage.texts.menuCategoryLabel)
        .should('be.visible')
        .and('have.length', 1)
    })

    it('allows to remove existing category', () => {
      const editedResponse = new ProductResponseDtoMockBuilder(responseWithCategory).build()
      editedResponse.draftChanges.categories = []
      editedResponse.draftChanges.changesCount.categories = 1
      editedResponse.draftChanges.changesCount.total = 1

      cy.intercept('PUT', TestUrls.getApiProductCategoriesUrl(sku), (req) => {
        req.reply(204)
      }).as('putDelete')
      cy.interceptProductResponse(editedResponse).as('editedResponse')

      categorisationPage.editButton().click()
      categorisationPage.removeButton().click()

      categorisationPage.saveChanges()

      cy.wait('@putDelete').should(({ request, response }) => {
        expect(request.body).to.deep.equal({ categoriesIDs: [] })
      })
      cy.wait('@editedResponse')

      categorisationPage.verifySavedDraftChangesInfo(1)
      categorisationPage.verifyDraftChangesData(
        editedResponse.product.categories,
        editedResponse.draftChanges.categories,
      )
    })

    it('allows to edit existing category', () => {
      const editedResponse = new ProductResponseDtoMockBuilder(responseWithCategory).build()
      editedResponse.draftChanges.categories = [
        createSingleCategoryByNames('UK', 'Cold drinks', 'Frappes'),
      ]
      editedResponse.draftChanges.changesCount.categories = 1
      editedResponse.draftChanges.changesCount.total = 1

      categorisationPage.editButton().click()
      categorisationPage.categoryInput().click()
      categorisationPage.setCategoriesOnModal('Cold drinks', 'Frappes')
      categorisationPage.applyCategoryButton().click()
      categorisationPage.checkIfCategoryNameIsInInput('UK > Cold drinks > Frappes')

      cy.intercept('PUT', TestUrls.getApiProductCategoriesUrl(sku), (req) => {
        req.reply(204)
      }).as('putUpdate')
      cy.interceptProductResponse(editedResponse).as('editedResponse')

      categorisationPage.saveChanges()

      cy.wait('@putUpdate')
      cy.wait('@editedResponse')

      categorisationPage.verifySavedDraftChangesInfo(1)
      categorisationPage.verifyDraftChangesData(
        editedResponse.product.categories,
        editedResponse.draftChanges.categories,
      )
    })
  })
})
