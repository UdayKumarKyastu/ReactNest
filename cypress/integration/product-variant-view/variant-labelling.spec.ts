import { getLabellingOptionsMock } from 'cypress/fixtures/mocks/labelling-options.mock'
import { generateRandomString } from 'cypress/helpers/util'
import { VariantLabellingPage } from 'cypress/pages/variant/VariantLabellingPage'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { EditProductVariantDto } from 'src/modules/product/dto/edit-product-variant.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { ProductType } from 'src/modules/product/model/product-type'

describe('Variant Labelling page', () => {
  const variantPage = new VariantPage()
  const labellingPage = new VariantLabellingPage()

  const legalTitleCharsLimit = 280
  const countryOfOriginCharsLimit = 100
  const validEan = '7414782298525'
  const invalidEan = '7414782298526'

  context('barista product', () => {
    const sku = 'UK000002'
    const baristaVariant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
    const baristaProduct = new ProductDtoMockBuilder()
      .addVariant(baristaVariant)
      .setProductType(ProductType.BaristaBeverage)
      .build()
    const baristaResponse = new ProductResponseDtoMockBuilder().setProduct(baristaProduct).build()

    it('labelling page should not exist for barista product variants', () => {
      cy.interceptProductResponse(baristaResponse).as('baristaResponse')
      cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
      cy.wait('@baristaResponse')
      cy.contains(variantPage.foodTypeMenuLabels.labelling).should('not.exist')

      cy.visit(TestUrls.getVariantLabellingUrl(sku, sku))
      cy.wait('@baristaResponse')
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}${TestUrls.getVariantMarketingUrl(sku, sku)}`,
      )
    })
  })

  context('food product', () => {
    const labellingOptions = getLabellingOptionsMock()
    const sku = 'UK000001'
    const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    beforeEach(() => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.intercept('GET', TestUrls.getLabellingOptionsUrl(), {
        body: labellingOptions,
      })
      cy.visit(TestUrls.getVariantLabellingUrl(sku, sku))
      cy.wait('@productResponse')
    })

    it('displays edit view after "Edit" button click and backs to Read view after click X button', () => {
      labellingPage.verifyReadonlyState()
      labellingPage.editButton().click()
      labellingPage.verifyEditState()
      labellingPage.closeButton().click()
      labellingPage.verifyReadonlyState()
    })

    it('allows to edit data and displays saved draft changes', () => {
      const newLabelling: GetProductDto.ProductVariant['labelling'] = {
        countryOfOriginDescription: 'Test description of origin',
        ean13Code: validEan,
        includeAverageWeightOnLabel: true,
        includeNutritionalInformationOnLabel: true,
        legalTitle: 'Test title',
        storageConditions: 'Enjoy whilst hot, do not reheat',
        useBy: '3',
        sellBy: '3',
        productServes: null,
        canBeCookedInTurboChef: true,
        useByTurboChef: '4',
        sellByTurboChef: '5',
        howToCard: {
          fileName: 'QR_CODE',
          qrPng: '',
          qrSvg: '<svg/>',
        },
      }

      const expectedUpdateBody: EditProductVariantDto.UpdateVariantLabelling = {
        countryOfOriginDescription: newLabelling.countryOfOriginDescription,
        ean13Code: newLabelling.ean13Code,
        includeAverageWeightOnLabel: newLabelling.includeAverageWeightOnLabel,
        includeNutritionalInformationOnLabel: newLabelling.includeNutritionalInformationOnLabel,
        legalTitle: newLabelling.legalTitle,
        sellBy: newLabelling.sellBy,
        productServes: newLabelling.productServes,
        storageConditions: newLabelling.storageConditions,
        useBy: newLabelling.useBy,
        canBeCookedInTurboChef: newLabelling.canBeCookedInTurboChef,
        useByTurboChef: newLabelling.useByTurboChef,
        sellByTurboChef: newLabelling.sellByTurboChef,
      }

      const variantIndex = 0
      const draftChanges = new DraftChangesMockBuilder(product)
        .replaceVariantLabelling(variantIndex, newLabelling)
        .build()
      const editedResponse = new ProductResponseDtoMockBuilder(response)
        .setDraftChanges(draftChanges)
        .build()

      cy.intercept('PUT', TestUrls.getApiVariantLabellingUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('labellingUpdate')
      cy.interceptProductResponse(editedResponse).as('editedResponse')

      labellingPage.editButton().click()
      labellingPage.legalTitleInput().type(String(newLabelling.legalTitle))
      labellingPage.countryOfOriginInput().type(String(newLabelling.countryOfOriginDescription))
      labellingPage.selectInstructionsForUse(String(newLabelling.storageConditions))
      labellingPage.selectUseBy(String(newLabelling.useBy))
      labellingPage.selectSellBy(String(newLabelling.sellBy))
      labellingPage.productWeightYesRadio().click({ force: true })
      labellingPage.nutritionalInformationRadioYes().click({ force: true })
      labellingPage.canBeCookedInTurboChefRadioYes().click({ force: true })
      labellingPage.selectTurboChefUseBy(String(newLabelling.useByTurboChef))
      labellingPage.selectTurboChefSellBy(String(newLabelling.sellByTurboChef))
      labellingPage.eanCodeInput().type(String(newLabelling.ean13Code))

      labellingPage.saveChanges()

      cy.wait('@labellingUpdate').then((interception) => {
        expect(interception.request.body).to.deep.equal(expectedUpdateBody)
      })
      cy.wait('@editedResponse')

      labellingPage.verifySavedDraftChangesInfo(
        editedResponse.draftChanges.variants[variantIndex].changesCount.labelling,
      )
      labellingPage.veriyDraftChangesData(variantIndex, editedResponse)
    })

    describe('validation rules', () => {
      beforeEach(() => {
        labellingPage.editButton().click()
      })

      it(`legal title field accepts up to ${legalTitleCharsLimit} characters`, () => {
        const text = generateRandomString(legalTitleCharsLimit)

        labellingPage
          .legalTitleInputWrapper()
          .should('contain.text', `${legalTitleCharsLimit} characters remaining`)
        labellingPage.legalTitleInput().type('a')
        labellingPage
          .legalTitleInputWrapper()
          .should('contain.text', `${legalTitleCharsLimit - 1} characters remaining`)

        labellingPage.legalTitleInput().clear().invoke('val', text).type('{backspace}').type('a')
        labellingPage.legalTitleInputWrapper().should('contain.text', '0 characters remaining')
        labellingPage.saveButton().should('be.enabled')

        labellingPage.legalTitleInput().type('a')
        cy.contains('1 characters over limit').should('be.visible')
        labellingPage.saveButton().should('be.disabled')
      })

      it(`country of origin description accepts up to ${countryOfOriginCharsLimit} characters`, () => {
        const text = generateRandomString(countryOfOriginCharsLimit)

        labellingPage
          .countryOfOriginInputWrapper()
          .should('contain.text', `${countryOfOriginCharsLimit} characters remaining`)
        labellingPage.countryOfOriginInput().type('a')
        labellingPage
          .countryOfOriginInputWrapper()
          .should('contain.text', `${countryOfOriginCharsLimit - 1} characters remaining`)

        labellingPage
          .countryOfOriginInput()
          .clear()
          .invoke('val', text)
          .type('{backspace}')
          .type('a')
        labellingPage.countryOfOriginInputWrapper().should('contain.text', '0 characters remaining')
        labellingPage.saveButton().should('be.enabled')

        labellingPage.countryOfOriginInput().type('a')
        cy.contains('1 characters over limit').should('be.visible')
        labellingPage.saveButton().should('be.disabled')
      })

      it('ean 13 field displays error if ean checksum digit is inpropper', () => {
        labellingPage.eanCodeInput().type(invalidEan).blur()
        cy.contains('The EAN is not valid').should('be.visible')
        labellingPage.eanCodeInput().clear().type(validEan).blur()
        cy.contains('The EAN is not valid').should('not.exist')
      })

      it('ean 13 field displays error if ean is already assigned to other product', () => {
        cy.intercept('GET', TestUrls.getApiBarcodeUrl(validEan), (req) => {
          req.reply({
            statusCode: 200,
            body: { id: '4419e965-741f-464f-a4b5-8302a272a819', sku: 'UK000123' },
          })
        })
        labellingPage.eanCodeInput().type(validEan).blur()
        cy.contains(
          'The EAN is already assigned to another product. Please use a different one.',
        ).should('be.visible')
      })
    })
  })
})
