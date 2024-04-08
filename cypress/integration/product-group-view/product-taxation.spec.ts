import { getUkTaxCategories, getUsTaxCategories } from 'cypress/fixtures/mocks/tax-categories.mock'
import { SaveChangesConfirmationModalComponent } from 'cypress/pages/components/EditSaveConfirmationModalComponent'
import { ProductGroupPage } from 'cypress/pages/product-group/ProductGroupPage'
import { ProductMarketingPage } from 'cypress/pages/product-group/ProductMarketingPage'
import { ProductTaxationPage } from 'cypress/pages/product-group/ProductTaxationPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { CountryCode } from 'src/shared/model/country-code'
import { ProductType } from 'src/modules/product/model/product-type'

const productMarketingPage = new ProductMarketingPage()
const productTaxationPage = new ProductTaxationPage()
const productPage = new ProductGroupPage()
const saveModal = new SaveChangesConfirmationModalComponent()
const countryCodes = CountryCode

describe('Product taxation tab', () => {
  context('UK product with UK tax categories', () => {
    const ukTaxCategories = getUkTaxCategories()
    const sku = 'UK000001'

    const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
    const product = new ProductDtoMockBuilder()
      .setCountry(countryCodes.UK, 'United Kingdom')
      .setTaxCategory(ukTaxCategories[0])
      .addVariant(variant)
      .build()

    const response = new ProductResponseDtoMockBuilder()
      .setProduct(product)
      .setTaxCategories(ukTaxCategories)
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductTaxationUrl(sku))
      cy.wait('@productResponse')
    })

    it('allows change state to editable after click Edit button', () => {
      productTaxationPage.verifyReadonlyState()
      productTaxationPage.editButton().click()
      productTaxationPage.verifyEditState()
    })

    it('allows back to readonly state after click Cancel button', () => {
      productTaxationPage.editButton().click()
      productTaxationPage.cancelButton().click()
      productTaxationPage.verifyReadonlyState()
    })

    it('allows back to readonly state after click Cross (X) button', () => {
      productTaxationPage.editButton().click()
      productTaxationPage.crossButton().click()
      productTaxationPage.verifyReadonlyState()
    })

    it('back to readonly state after click cancel button when no changes made', () => {
      productTaxationPage.editButton().click()
      productTaxationPage.cancelButton().click()
      productTaxationPage.verifyReadonlyState()
    })

    it('checks save button activity', () => {
      cy.visit(TestUrls.getProductTaxationUrl(sku))

      productTaxationPage.editButton().click()

      productTaxationPage.selectedOption().then(($selectedOption) => {
        const selectedValue = $selectedOption.text()
        productTaxationPage.taxSelect().click()
        productTaxationPage.changeTaxCategory()
        productMarketingPage.saveButton().should('be.enabled')
        productTaxationPage.taxSelect().click()
        productTaxationPage.taxOptions().contains(selectedValue).click()
        productMarketingPage.saveButton().should('be.disabled')
      })
    })

    it('checks back to edit after save click', () => {
      cy.visit(TestUrls.getProductTaxationUrl(sku))

      productTaxationPage.editButton().click()

      productTaxationPage.changeTaxCategory()
      productTaxationPage.selectedOption().then(($newSelectedOption) => {
        const changedValue = $newSelectedOption.text()

        productTaxationPage.saveButton().click()
        saveModal.headline().should('be.visible')
        saveModal.backToEditButton().click()

        productTaxationPage.verifyEditState()
        productTaxationPage.selectedOption().should('have.text', changedValue)
      })
    })

    it('allows to edit tax category', () => {
      const editedTaxCategory = ukTaxCategories[1]

      const editedResponse = new ProductResponseDtoMockBuilder()
        .setProduct(new ProductDtoMockBuilder(product).setTaxCategory(editedTaxCategory).build())
        .build()

      cy.interceptProductResponse(editedResponse).as('editedResponse')
      cy.intercept('PUT', TestUrls.getApiProductTaxationUrl(sku), (req) => {
        req.reply(204)
      }).as('tax-update')

      productTaxationPage.editButton().click()
      productTaxationPage.taxSelect().click()
      productTaxationPage.taxOptions().contains(editedTaxCategory.name).click()
      productTaxationPage.saveButton().click()
      saveModal.saveChangesButton().click()

      cy.wait('@tax-update').should(({ request, response }) => {
        expect(request.body).to.include({ taxCategoryId: editedTaxCategory.id })
      })
      cy.wait('@editedResponse')

      productTaxationPage.verifyPostUpdateState(editedTaxCategory.name)
    })
  })

  context('UK product with US tax category', () => {
    const sku = 'UK001'
    const ukTaxCategories = getUkTaxCategories()
    const usTaxCategories = getUsTaxCategories()

    const ukProducktWithUsTaxResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .setCountry(countryCodes.UK, 'United Kingdom')
          .setTaxCategory(usTaxCategories)
          .addVariant(new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build())
          .build(),
      )
      .setTaxCategories(ukTaxCategories)
      .build()

    it('displays US category but allows edit to UK categories only', () => {
      cy.interceptProductResponse(ukProducktWithUsTaxResponse).as('productResponse')
      cy.visit(TestUrls.getProductTaxationUrl(sku))
      cy.wait('@productResponse')

      cy.contains(usTaxCategories.name)
      productTaxationPage.editButton().click()

      productTaxationPage
        .taxSelect()
        .click()
        .get('.select__option')
        .should('have.length', ukTaxCategories.length)
      productTaxationPage.selectOption().should('not.have.text', `${usTaxCategories.name}`)
    })
  })

  context('non-UK products', () => {
    it('tab not appears for United States food product', () => {
      const sku = 'US001'
      const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.US, 'United States')
        .setProductType(ProductType.Food)
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.foodProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.foodProductMenuLabels).length - 1)
    })

    it('tab not appears for United States barista product', () => {
      const sku = 'US002'
      const variant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withAttributes()
        .build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.FR, 'United States')
        .setProductType(ProductType.BaristaBeverage)
        .setSetup()
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.baristaProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.baristaProductMenuLabels).length - 1)
    })

    it('tab not appears for France food product', () => {
      const sku = 'FR001'
      const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.FR, 'France')
        .setProductType(ProductType.Food)
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.foodProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.foodProductMenuLabels).length - 1)
    })

    it('tab not appears for France barista product', () => {
      const sku = 'FR002'
      const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.FR, 'France')
        .setProductType(ProductType.BaristaBeverage)
        .setSetup()
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.baristaProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.baristaProductMenuLabels).length - 1)
    })

    it('tab not appears for Hong-Kong food product', () => {
      const sku = 'HK001'
      const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.HK, 'Hong-Kong')
        .setProductType(ProductType.Food)
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.foodProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.foodProductMenuLabels).length - 1)
    })

    it('tab not appears for United States barista product', () => {
      const sku = 'HK002'
      const variant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withAttributes()
        .build()
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(countryCodes.HK, 'Hong-Kong')
        .setProductType(ProductType.BaristaBeverage)
        .setSetup()
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductCategoriesUrl(sku))
      cy.wait('@productResponse')
      cy.contains(productPage.baristaProductMenuLabels.taxation).should('not.exist')
      cy.get(productPage.baseSelectors.leftSideNav)
        .find('a')
        .should('have.length', Object.keys(productPage.baristaProductMenuLabels).length - 1)
    })
  })
})
