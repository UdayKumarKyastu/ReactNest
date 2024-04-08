import { getVariantReportingOptions } from 'cypress/fixtures/mocks/variant-reporting-options.mock'
import { DiscardChangesConfirmationModalComponent } from 'cypress/pages/components/EditDiscardConfirmationModalComponent'
import { SaveChangesConfirmationModalComponent } from 'cypress/pages/components/EditSaveConfirmationModalComponent'
import { VariantReportingPage } from 'cypress/pages/variant/VariantReportingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { ProductType } from 'src/modules/product/model/product-type'

describe('Variant reporting page', () => {
  const variantReportingPage = new VariantReportingPage()
  const saveModal = new SaveChangesConfirmationModalComponent()
  const discardModal = new DiscardChangesConfirmationModalComponent()

  context('food type product', () => {
    const variantReportingOptions = getVariantReportingOptions()
    const starKis = variantReportingOptions.starKisCategoryOptions[0]
    const plu = variantReportingOptions.pluCategoryOptions[0]
    const reporting = {
      starKisProductCategoryID: starKis.key,
      starKisProductSubCategoryID: starKis.children![0].key,
      pluReportingName: 'Test reporting name 1',
      pluPrimaryCategoryID: plu.key,
      pluSecondaryCategoryID: plu.children![0].key,
      posID: '12345',
    }

    const sku = 'UK0005'
    const parentProductSku = 'UK013500'
    const variant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withReporting(reporting)
      .withParentProductSku(parentProductSku)
      .withHamiltonGrant({ productCode: 'HG001' })
      .build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.intercept('GET', TestUrls.getReportingOptionsUrl(product.type), {
        body: getVariantReportingOptions(),
      })
      cy.visit(TestUrls.getVariantReporingUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('displays basic elements', () => {
      variantReportingPage.verifyBasicElements()
    })

    it('allows enter and exit edit view', () => {
      variantReportingPage.verifyReadonlyState()
      variantReportingPage.editButton().click()
      variantReportingPage.verifyEditableState()
      variantReportingPage.closeButton().click()
      variantReportingPage.verifyReadonlyState()
    })

    it('allows editing "free text" fields', () => {
      variantReportingPage.editButton().click()
      variantReportingPage.pluReportingNameEditable().then(($input) => {
        const initialVal = $input.val()
        variantReportingPage.pluReportingNameEditable().type(' test')
        variantReportingPage.verifyIfBottomButtonsAreActive()
        variantReportingPage.undoButton().click()
        variantReportingPage.pluReportingNameEditable().should('have.value', initialVal)
      })
    })

    it('allows editing "drop down" fields', () => {
      const bakeryCategories = variantReportingPage.pluCategories.BAKERY
      const baguetteCategories = variantReportingPage.productionCategories.BAGUETTES

      variantReportingPage.editButton().click()
      variantReportingPage.selectPluPrimaryCategory('BAKERY')
      variantReportingPage.verifyPluSecondaryCategories(bakeryCategories)

      variantReportingPage.selectProductionCategory('BAGUETTES')
      variantReportingPage.verifyProductionSubcategories(baguetteCategories)

      variantReportingPage.selectPluSecondaryCategory(bakeryCategories[0])

      variantReportingPage.verifyIfBottomButtonsAreActive()

      variantReportingPage.clickAllUndoButtons()
      const pluReportingNameValue = variant.pluReportingName ? variant.pluReportingName : ''
      variantReportingPage.pluReportingNameEditable().should('have.value', pluReportingNameValue)

      variantReportingPage.verifySelectedValueFor(
        variantReportingPage.pluPrimaryCategory(),
        variant.pluPrimaryCategoryID as string,
      )
      variantReportingPage.verifySelectedValueFor(
        variantReportingPage.pluSecondaryCategory(),
        variant.pluSecondaryCategoryID as string,
      )
      variantReportingPage.verifySelectedValueFor(
        variantReportingPage.productionProductCategory(),
        variant.starKisProductCategoryID as string,
      )
    })

    it('allows undoing an edit ‘free text’ fields', () => {
      variantReportingPage.editButton().click()
      variantReportingPage.verifyEditAndUndoPluReportingName()
    })

    it('allows backing out of submitting an edit', () => {
      const nameSuffix = ' test'

      variantReportingPage.editButton().click()
      variantReportingPage.pluReportingNameEditable().then(($el) => {
        const initialName = $el.val()
        variantReportingPage.pluReportingNameEditable().type(nameSuffix)
        variantReportingPage.saveButton().click()

        saveModal.headline().should('be.visible')
        saveModal.backToEditButton().click()

        variantReportingPage.verifyEditableState()
        variantReportingPage
          .pluReportingNameEditable()
          .should('have.value', `${initialName}${nameSuffix}`)
      })
    })

    it('allows backing out of cancelling an edit', () => {
      const nameSuffix = ' test'

      variantReportingPage.editButton().click()
      variantReportingPage.pluReportingNameEditable().then(($el) => {
        const initialName = $el.val()
        variantReportingPage.pluReportingNameEditable().type(nameSuffix)
        variantReportingPage.cancelButton().click()

        discardModal.headline().should('be.visible')
        discardModal.goBackToEditButton().click()

        variantReportingPage.verifyEditableState()
        variantReportingPage
          .pluReportingNameEditable()
          .should('have.value', `${initialName}${nameSuffix}`)
      })
    })

    it('allows to save edited data and displays draft changes', () => {
      const testName = 'test name'
      const parentSku = 'UK00123'
      const variantIndex = 0

      const expectedPutRequestBody = {
        pluReportingName: testName,
        parentProductSku: parentSku,
        sku: response.product.variants[variantIndex].sku,
        dateLastUpdatedOnHamiltonGrant:
          response.product.variants[variantIndex].hamiltonGrant.lastSyncedAt,
        pointOfSaleID: response.product.variants[variantIndex].posID,
        hamiltonGrantProductCode: response.product.variants[variantIndex].hamiltonGrant.productCode,
        pluPrimaryCategoryID: response.product.variants[variantIndex].pluPrimaryCategoryID,
        pluSecondaryCategoryID: response.product.variants[variantIndex].pluSecondaryCategoryID,
        starKisProductCategoryID: response.product.variants[variantIndex].starKisProductCategoryID,
        starKisProductSubCategoryID:
          response.product.variants[variantIndex].starKisProductSubCategoryID,
      }

      variantReportingPage.editButton().click()

      variantReportingPage.pluReportingNameEditable().clear()
      variantReportingPage.pluReportingNameEditable().type(testName)
      variantReportingPage.parentProductSkuInput().clear().type(parentSku)

      const draftChanges = new DraftChangesMockBuilder(product)
        .replaceVariantPluReportingName(variantIndex, testName)
        .replaceVariantParentProductSku(variantIndex, parentSku)
        .build()
      const editedResponse = new ProductResponseDtoMockBuilder()
        .setProduct(product)
        .setDraftChanges(draftChanges)
        .build()

      cy.intercept('PUT', TestUrls.getApiVariantReportingUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('reportingUpdate')

      cy.intercept('GET', TestUrls.getApiProductUrl(sku), (req) => {
        req.reply(editedResponse)
      }).as('editedResponse')

      variantReportingPage.saveChanges()

      cy.wait('@reportingUpdate').then((interception) => {
        expect(interception.request.body).to.deep.equal(expectedPutRequestBody)
      })
      cy.wait('@editedResponse')

      variantReportingPage.verifySavedDraftChangesInfo(
        editedResponse.draftChanges.variants[variantIndex].changesCount.reporting,
      )
      variantReportingPage.veriyDraftChangesData(variantIndex, editedResponse)
    })

    it('allows confirming the cancelling of changes', () => {
      const nameSuffix = ' test'

      variantReportingPage.editButton().click()
      variantReportingPage.pluReportingNameEditable().then(($el) => {
        const initialName = String($el.val())
        variantReportingPage.pluReportingNameEditable().type(nameSuffix)
        variantReportingPage.cancelButton().click()

        discardModal.discardChangesButton().click()

        variantReportingPage.verifyReadonlyState()
        variantReportingPage.pluReportingNameReadonly().should('have.text', initialName)
      })
    })
  })

  context('barista type product', () => {
    const sku = 'UK002'
    const baristaVariant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
    const baristaProduct = new ProductDtoMockBuilder()
      .addVariant(baristaVariant)
      .setProductType(ProductType.BaristaBeverage)
      .build()
    const baristaResponse = new ProductResponseDtoMockBuilder().setProduct(baristaProduct).build()

    it('does not display "slim product reporting" for barista type products', () => {
      cy.interceptProductResponse(baristaResponse).as('baristaResponse')
      cy.visit(TestUrls.getVariantReporingUrl(sku, sku))
      cy.wait('@baristaResponse')

      cy.get(variantReportingPage.selectors.parentProductSku).should('not.exist')
      variantReportingPage.editButton().click()
      cy.get(variantReportingPage.selectors.parentProductSku).should('not.exist')
    })

    it('does not display "slim product reporting" for barista type products draft changes', () => {
      const draftChanges = new DraftChangesMockBuilder(baristaProduct)
        .replaceVariantPluReportingName(0, 'new test reporting name')
        .build()
      const baristaResponseWithDraft = new ProductResponseDtoMockBuilder(baristaResponse)
        .setDraftChanges(draftChanges)
        .build()

      cy.interceptProductResponse(baristaResponseWithDraft).as('baristaResponseWithDraft')
      cy.visit(TestUrls.getVariantReporingUrl(sku, sku))
      cy.wait('@baristaResponseWithDraft')

      cy.get(variantReportingPage.selectors.parentProductSku).should('not.exist')
    })
  })
})
