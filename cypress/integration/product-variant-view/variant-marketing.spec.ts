import { getAvailableHowToDisplayOptions } from 'cypress/fixtures/mocks/avaliable-how-to-display.mock'
import { getUpdateVariantMarketingBody } from 'cypress/fixtures/update-variant-request-bodies'
import { DiscardChangesConfirmationModalComponent } from 'cypress/pages/components/EditDiscardConfirmationModalComponent'
import { SaveChangesConfirmationModalComponent } from 'cypress/pages/components/EditSaveConfirmationModalComponent'
import { VariantMarketingPage } from 'cypress/pages/variant/VariantMarketingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { CountryCode } from 'src/shared/model/country-code'

describe('Variant marketing tab', () => {
  const variantMarketingPage = new VariantMarketingPage()
  const saveModal = new SaveChangesConfirmationModalComponent()
  const discardModal = new DiscardChangesConfirmationModalComponent()

  context('master variant without draft changes', () => {
    const tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1)

    const sku = 'UK01'
    const variant = new ProductVariantDtoMockBuilder()
      .withSku(sku)
      .withAvailability({
        liveSchedule: {
          on: '2016-04-18T00:00:00.000Z',
          off: '2026-04-18T00:00:00.000Z',
        },
        displayAsNew: {
          isDisplayed: true,
          until: tommorow.toISOString().slice(0, 10),
        },
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

    it('display basic elements', () => {
      variantMarketingPage.verifyBasicElements()
    })

    // https://pretamanger.atlassian.net/browse/PP-257 - AC1, AC2
    it('allows entering and exiting edit view', () => {
      variantMarketingPage.editButton().click()

      variantMarketingPage.verifyEditState(response.product.countryCode)
      variantMarketingPage.cancelButton().click()
      variantMarketingPage.verifyReadonlyState(
        response.product.variants[0],
        response.product.countryCode,
      )
    })

    // https://pretamanger.atlassian.net/browse/PP-257 - AC3, AC4
    it('allows editing and undoing fields', () => {
      const sku = 'UK001'
      const howToDisplayOptions = getAvailableHowToDisplayOptions()
      const variantWithHowToDisplay = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withHowToDisplay([howToDisplayOptions[0].key])
        .build()
      const responseWithHTDO = new ProductResponseDtoMockBuilder()
        .setProduct(new ProductDtoMockBuilder().addVariant(variantWithHowToDisplay).build())
        .build()

      cy.interceptProductResponse(responseWithHTDO)
      cy.visit(TestUrls.getVariantUrl(sku, sku))

      variantMarketingPage.editButton().click()
      variantMarketingPage.verifyEditingMainName(' test name text')

      variantMarketingPage.verifyEditingMainDescription(' test description text')

      variantMarketingPage.verifyEditingCheckbox()

      variantMarketingPage.verifyEditingInStoreDropdown()
    })

    // https://pretamanger.atlassian.net/browse/PP-257 - 5
    it('allows backing out of submitting and cancelling an edit', () => {
      const testText = ' test name text'

      variantMarketingPage.editButton().click()
      variantMarketingPage
        .marketingNameGbInput()
        .type(testText)
        .then(($input) => {
          const editedValue = $input.val()
          variantMarketingPage.saveButton().click()
          saveModal.backToEditButton().click()
          saveModal.headline().should('not.exist')
          variantMarketingPage.marketingNameGbInput().should('have.value', editedValue)

          variantMarketingPage.cancelButton().click()
          discardModal.goBackToEditButton().click()
          discardModal.headline().should('not.exist')
          variantMarketingPage.marketingNameGbInput().should('have.value', editedValue)
        })
    })

    // https://pretamanger.atlassian.net/browse/PP-257 - AC 6a, 7ab
    it('confirming the saving of changes', () => {
      const editData = {
        name: 'test edited name',
        description: 'test edited description',
      }

      const editedResponse = new ProductResponseDtoMockBuilder(response).build()
      const editedVariant = editedResponse.draftChanges.variants[0]

      editedVariant.name['en-GB'] = editData.name
      editedVariant.description.standard['en-GB'] = editData.description
      editedVariant.changesCount.marketing = 2

      variantMarketingPage.editButton().click()
      variantMarketingPage.marketingNameGbInput().clear().type(editData.name)
      variantMarketingPage.marketingDescriptionGbInput().clear().type(editData.description)

      cy.intercept('PUT', TestUrls.getApiVariantMarketingUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('marketing-update')

      cy.intercept('GET', TestUrls.getApiProductUrl(sku), (req) => {
        req.reply(editedResponse)
      })

      variantMarketingPage.saveButton().click()
      saveModal.saveChangesButton().click()

      cy.wait('@marketing-update').should(({ request, response }) => {
        expect(request.body).to.deep.equal(getUpdateVariantMarketingBody(editedVariant))
      })

      variantMarketingPage.verifySavedDraftChangesInfo(editedVariant.changesCount.marketing)
      variantMarketingPage.veriyDraftChangesData(0, editedResponse)
    })

    // https://pretamanger.atlassian.net/browse/PP-257 - AC 6b
    it('confirming the cancelling of changes', () => {
      const testPhrase = 'test phrase'

      variantMarketingPage.editButton().click()
      variantMarketingPage.marketingNameGbInput().clear().type(testPhrase)
      variantMarketingPage.cancelButton().click()
      discardModal.discardChangesButton().click()
      variantMarketingPage.nameLanguageListLabels().should('not.contain', testPhrase)
      variantMarketingPage.verifyReadonlyState(
        response.product.variants[0],
        response.product.countryCode,
      )
    })

    // https://pretamanger.atlassian.net/browse/PP-1728 - AC 1a, 1b
    it('shows live from and live until at view mode and tooltips at edit mode', () => {
      variantMarketingPage
        .websiteReleaseDatesSectionReleaseDatesLabel()
        .scrollIntoView()
        .should('be.visible')
      variantMarketingPage.websiteReleaseDatesSectionLiveFromLabel().should('be.visible')
      variantMarketingPage.websiteReleaseDatesSectionLiveUntilLabel().should('be.visible')

      variantMarketingPage.editButton().click()
      variantMarketingPage
        .getTooltipInLiveFromEditView()
        .scrollIntoView()
        .within(() => {
          variantMarketingPage.tooltips().should('be.visible').trigger('mouseover').invoke('show')
          variantMarketingPage.popupInEditView().should('exist')
        })
      variantMarketingPage
        .getTooltipInLiveUntilEditView()
        .scrollIntoView()
        .within(() => {
          variantMarketingPage.tooltips().should('be.visible').trigger('mouseover').invoke('show')
          variantMarketingPage.popupInEditView().should('exist')
        })
    })

    // https://pretamanger.atlassian.net/browse/PP-1719 - AC 1a, 1b, 2a, 2b
    describe('French product', () => {
      const product = new ProductDtoMockBuilder()
        .addVariant(variant)
        .setCountry(CountryCode.FR, 'France')
        .build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      beforeEach(() => {
        cy.interceptProductResponse(response).as('productResponse')
        cy.visit(TestUrls.getVariantUrl(sku, sku))
        cy.wait('@productResponse')
      })

      it('shows and hides Variant marketing French name', () => {
        variantMarketingPage.showNameLanguagesButton().click()
        variantMarketingPage.nameLanguagesList().should('be.visible')
        variantMarketingPage.verifyNameOtherLanguagesContent(product)
        variantMarketingPage.hideNameLanguagesButton().click()
        variantMarketingPage.nameLanguagesList().should('not.exist')
      })
    })
  })
})
