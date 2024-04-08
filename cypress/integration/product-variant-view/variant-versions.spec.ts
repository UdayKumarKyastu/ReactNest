import { getLabellingOptionsMock } from 'cypress/fixtures/mocks/labelling-options.mock'
import { getUkPriceChannelsMock } from 'cypress/fixtures/mocks/price-channels.mock'
import { getUpdateVariantMarketingBody } from 'cypress/fixtures/update-variant-request-bodies'
import { verifyVersionToastMessage } from 'cypress/helpers/util'
import { VariantLabellingPage } from 'cypress/pages/variant/VariantLabellingPage'
import { VariantMarketingPage } from 'cypress/pages/variant/VariantMarketingPage'
import { VariantPage } from 'cypress/pages/variant/VariantPage'
import { VariantPricingPage } from 'cypress/pages/variant/VariantPricingPage'
import { VariantReportingPage } from 'cypress/pages/variant/VariantReportingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { EditProductVariantDto } from 'src/modules/product/dto/edit-product-variant.dto'
import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

const versionPage = new VariantPage()
const reportingPage = new VariantReportingPage()
const marketingPage = new VariantMarketingPage()
const labellingPage = new VariantLabellingPage()
const pricingPage = new VariantPricingPage()

describe('Variant Versions pages', () => {
  const tommorow = new Date()
  tommorow.setDate(tommorow.getDate() + 1)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  context('Previous version', () => {
    const sku = 'UK00001'
    const hgCode = 'FP00001'
    const versionNumber = 1

    const previousVariantVersion = {
      id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
      liveFrom: '',
      name: {
        'en-GB': '',
        'en-US': '',
        'fr-FR': '',
        'en-HK': '',
        'zh-HK': '',
      },
      version: versionNumber,
      key: `${hgCode}-${versionNumber}`,
      sku: sku,
      hgCode: hgCode,
      publishState: VariantVersionPublishState.PREVIOUS,
    }

    const allTabsTrue: GetProductVariantVersionDto['approvedTabs'] = {
      marketing: true,
      labelling: true,
      pricing: true,
      reporting: true,
      baristaAttributes: true,
    }

    const baseVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withHamiltonGrant({ productCode: hgCode })
      .addVersions([previousVariantVersion])
      .build()

    const product = new ProductDtoMockBuilder().addVariant(baseVariant).build()
    const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()
    const previousVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(baseVariant)
      .setPublishState(VariantVersionPublishState.PREVIOUS)
      .withVersionNumber(versionNumber)
      .withAvailibility({ liveSchedule: { on: null, off: yesterday.toISOString() } })
      .withDraftTabs(allTabsTrue)
      .withApprovedTabs(allTabsTrue)
      .build()

    describe('Version Variant marketing page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(previousVersionResponse)
      })

      it('tab does not allow to edit previous variant version data', () => {
        versionPage.editButton().should('not.be.visible')
      })

      it('tab fields displays data from variant version', () => {
        marketingPage.verifyPageData(previousVersionResponse.variant)
      })
    })

    describe('Version Variant pricing page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionPricingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(previousVersionResponse)
      })

      it('tab does not allow to edit previous variant version data', () => {
        versionPage.editButton().should('not.be.visible')
      })
    })

    describe('Version Variant reporting page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionReportingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(previousVersionResponse)
      })

      it('tab does not allow to edit previous variant version data', () => {
        versionPage.editButton().should('not.be.visible')
      })

      it('tab fields displays data from variant version', () => {
        reportingPage.verifyPageData(previousVersionResponse.variant)
      })
    })

    describe('Version Variant nutritionals page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionNutritionalsUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(previousVersionResponse)
      })

      it('tab does not allow to edit previous variant version data', () => {
        versionPage.editButton().should('not.exist')
      })
    })

    describe('Version Variant labelling page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(previousVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionLabellingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(previousVersionResponse)
      })

      it('tab does not allow to edit previous variant version data', () => {
        versionPage.editButton().should('not.be.visible')
      })

      it('tab fields displays data from variant version', () => {
        labellingPage.verifyPageData(previousVersionResponse.variant)
      })
    })
  })

  context('Future version', () => {
    const sku = 'UK00002'
    const hgCode = 'FP00002'
    const versionNumber = 2
    const pricingChannels = getUkPriceChannelsMock()

    const futureVariantVersion = {
      id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
      liveFrom: '',
      name: {
        'en-GB': '',
        'en-US': '',
        'fr-FR': '',
        'en-HK': '',
        'zh-HK': '',
      },
      version: versionNumber,
      key: `${hgCode}-${versionNumber}`,
      sku: sku,
      hgCode: hgCode,
      publishState: VariantVersionPublishState.FUTURE,
    }

    const allTabsTrue: GetProductVariantVersionDto['approvedTabs'] = {
      marketing: true,
      labelling: true,
      pricing: true,
      reporting: true,
      baristaAttributes: true,
    }

    const baseVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withHamiltonGrant({ productCode: hgCode })
      .withPrices(pricingChannels)
      .addVersions([futureVariantVersion])
      .build()

    const product = new ProductDtoMockBuilder().addVariant(baseVariant).build()
    const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()
    const futureVersionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(baseVariant)
      .setPublishState(VariantVersionPublishState.FUTURE)
      .withVersionNumber(versionNumber)
      .withAvailibility({ liveSchedule: { on: tommorow.toISOString(), off: null } })
      .withDraftTabs(allTabsTrue)
      .withApprovedTabs(allTabsTrue)
      .build()

    describe('Version Variant marketing page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a previous variant version with "See current version" link', () => {
        verifyVersionToastMessage(futureVersionResponse)
      })

      it('tab fields displays data from variant version', () => {
        marketingPage.verifyPageData(futureVersionResponse.variant)
      })

      it('tab allow to edit future variant version data and displays draft changes', () => {
        const draftName = 'Test version name'
        const draftDesc = 'Test version description'
        const numberOfChanges = 2

        const draftVersionResponse = new VariantVersionResponseMockBuilder(futureVersionResponse)
          .withDraftChanges({
            name: {
              ...futureVersionResponse.variant.name,
              'en-GB': draftName,
            },
            description: {
              standard: {
                ...futureVersionResponse.variant.description.standard,
                'en-GB': draftDesc,
              },
            },
            changesCount: {
              marketing: numberOfChanges,
              reporting: 0,
              attributes: 0,
              pricing: 0,
              labelling: 0,
              total: numberOfChanges,
            },
          })
          .build()

        marketingPage.editButton().scrollIntoView().should('be.visible')
        marketingPage.editButton().click()
        marketingPage.marketingNameGbInput().clear().type(draftName)
        marketingPage.marketingDescriptionGbInput().clear().type(draftDesc)

        cy.intercept(
          'PUT',
          TestUrls.getApiVersionMarketingUrl(sku, sku, versionNumber, hgCode),
          (req) => {
            req.reply(204)
          },
        ).as('marketing-update')

        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(draftVersionResponse).as('draftResponse')

        marketingPage.saveChanges()

        cy.wait('@marketing-update').should(({ request, response }) => {
          expect(request.body).to.deep.equal(
            getUpdateVariantMarketingBody(draftVersionResponse.draft),
          )
        })

        cy.wait('@draftResponse')

        verifyVersionToastMessage(futureVersionResponse)
        marketingPage.veriyVersionDraftChangesData(draftVersionResponse)
      })
    })

    describe('Version Variant pricing page', () => {
      beforeEach(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionPricingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a future variant version with "See current version" link', () => {
        verifyVersionToastMessage(futureVersionResponse)
      })

      it('tab allows to edit future variant version data and displays draft changes', () => {
        const newPrices = {
          eatInPrice: 9,
          eatInTax: 5,
          takeAwayPrice: 10,
        }

        const editedPrices = getUkPriceChannelsMock()
        editedPrices[0].eatInPrice.centAmount = newPrices.eatInPrice * 100 // * 100 cents
        editedPrices[0].eatInTax = newPrices.eatInTax / 100 // / 100 percents
        editedPrices[0].takeAwayPrice.centAmount = newPrices.takeAwayPrice * 100

        const draftVersionResponse = new VariantVersionResponseMockBuilder(futureVersionResponse)
          .withDraftChanges({
            prices: editedPrices,
            changesCount: {
              marketing: 0,
              reporting: 0,
              attributes: 0,
              pricing: 2,
              labelling: 0,
              total: 2,
            },
          })
          .build()

        const expectedPutRequestBody: EditProductVariantDto.UpdateVariantPricing = {
          prices: editedPrices.map(({ channelLabel, ...keepAttrs }) => keepAttrs),
        }

        pricingPage.editButton().click()
        pricingPage.firstEatInPriceInput().type(newPrices.eatInPrice.toString())
        pricingPage.firstEatInTaxInput().type(newPrices.eatInTax.toString())
        pricingPage.firstTakeawayPriceInput().type(newPrices.takeAwayPrice.toString())

        cy.intercept(
          'PUT',
          TestUrls.getApiVersionPricingUrl(sku, sku, versionNumber, hgCode),
          (req) => {
            req.reply(204)
          },
        ).as('updatePricing')

        cy.interceptProductResponse(productResponse).as('editedResponse')
        cy.interceptVariantVersionResponse(draftVersionResponse).as('draftVersionResponse')

        pricingPage.saveChanges()

        cy.wait('@updatePricing').then((interception) => {
          expect(interception.request.body).to.deep.equal(expectedPutRequestBody)
        })
        cy.wait('@draftVersionResponse')

        verifyVersionToastMessage(futureVersionResponse)
        pricingPage.verifyVersionUkCoreDraftChanges(draftVersionResponse)
      })
    })

    describe('Version Variant reporting page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionReportingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a future variant version with "See current version" link', () => {
        verifyVersionToastMessage(futureVersionResponse)
      })

      it('tab fields displays data from variant version', () => {
        reportingPage.verifyPageData(futureVersionResponse.variant)
      })

      it('tab allows to edit future variant version data and displays draft changes', () => {
        const draftName = 'test name'
        const draftParentSku = 'UK00123'

        const expectedPutRequestBody = {
          pluReportingName: draftName,
          parentProductSku: draftParentSku,
          sku: sku,
          dateLastUpdatedOnHamiltonGrant: futureVersionResponse.variant.hamiltonGrant.lastSyncedAt,
          pointOfSaleID: futureVersionResponse.variant.posID,
          hamiltonGrantProductCode: futureVersionResponse.variant.hamiltonGrant.productCode,
          pluPrimaryCategoryID: futureVersionResponse.variant.pluPrimaryCategoryID,
          pluSecondaryCategoryID: futureVersionResponse.variant.pluSecondaryCategoryID,
          starKisProductCategoryID: futureVersionResponse.variant.starKisProductCategoryID,
          starKisProductSubCategoryID: futureVersionResponse.variant.starKisProductSubCategoryID,
        }

        reportingPage.editButton().click()

        reportingPage.pluReportingNameEditable().clear()
        reportingPage.pluReportingNameEditable().type(draftName)
        reportingPage.parentProductSkuInput().clear().type(draftParentSku)

        const draftVersionResponse = new VariantVersionResponseMockBuilder(futureVersionResponse)
          .withDraftChanges({
            pluReportingName: draftName,
            parentProductSku: draftParentSku,
            changesCount: {
              marketing: 0,
              reporting: 2,
              attributes: 0,
              pricing: 0,
              labelling: 0,
              total: 2,
            },
          })
          .build()

        cy.intercept(
          'PUT',
          TestUrls.getApiVersionReportingUrl(sku, sku, versionNumber, hgCode),
          (req) => {
            req.reply(204)
          },
        ).as('reportingUpdate')

        cy.interceptProductResponse(productResponse)
        cy.interceptVariantVersionResponse(draftVersionResponse).as('draftVersionResponse')

        reportingPage.saveChanges()

        cy.wait('@reportingUpdate').then((interception) => {
          expect(interception.request.body).to.deep.equal(expectedPutRequestBody)
        })
        cy.wait('@draftVersionResponse')

        verifyVersionToastMessage(futureVersionResponse)
        reportingPage.veriyVersionDraftChangesData(draftVersionResponse)
      })
    })

    describe('Version Variant nutritionals page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionNutritionalsUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a future variant version with "See current version" link', () => {
        verifyVersionToastMessage(futureVersionResponse)
      })

      it('tab does not allow to edit future variant version data', () => {
        versionPage.editButton().should('not.exist')
      })
    })

    describe('Version Variant labelling page', () => {
      before(() => {
        cy.interceptProductResponse(productResponse).as('productResponse')
        cy.intercept('GET', TestUrls.getLabellingOptionsUrl(), {
          body: getLabellingOptionsMock(),
        })
        cy.interceptVariantVersionResponse(futureVersionResponse).as('versionResponse')
        cy.visit(TestUrls.getVersionLabellingUrl(sku, sku, versionNumber))
        cy.wait('@productResponse')
        cy.wait('@versionResponse')
      })

      it('toast message is visible that tab is for a future variant version with "See current version" link', () => {
        verifyVersionToastMessage(futureVersionResponse)
      })

      it('tab fields displays data from variant version', () => {
        labellingPage.verifyPageData(futureVersionResponse.variant)
      })

      it('tab allows to edit future variant version data', () => {
        versionPage.editButton().scrollIntoView().should('be.visible')

        const newLabelling: GetProductDto.ProductVariant['labelling'] = {
          canBeCookedInTurboChef: false,
          countryOfOriginDescription: 'Test description of origin',
          ean13Code: '7414782298525',
          includeAverageWeightOnLabel: true,
          includeNutritionalInformationOnLabel: true,
          legalTitle: 'Test title',
          storageConditions: 'Enjoy whilst hot, do not reheat',
          useBy: '3',
          sellBy: '3',
          productServes: null,
          useByTurboChef: null,
          sellByTurboChef: null,
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
          productServes: null,
          storageConditions: newLabelling.storageConditions,
          useBy: newLabelling.useBy,
          useByTurboChef: newLabelling.useByTurboChef,
          sellByTurboChef: newLabelling.sellByTurboChef,
          canBeCookedInTurboChef: newLabelling.canBeCookedInTurboChef,
        }

        const draftVersionResponse = new VariantVersionResponseMockBuilder(futureVersionResponse)
          .withDraftChanges({
            labelling: { ...newLabelling },
            changesCount: {
              marketing: 0,
              reporting: 0,
              attributes: 0,
              pricing: 0,
              labelling: 8,
              total: 8,
            },
          })
          .build()

        labellingPage.editButton().click()
        labellingPage.legalTitleInput().type(String(newLabelling.legalTitle))
        labellingPage.countryOfOriginInput().type(String(newLabelling.countryOfOriginDescription))
        labellingPage.selectInstructionsForUse(String(newLabelling.storageConditions))
        labellingPage.selectUseBy(String(newLabelling.useBy))
        labellingPage.selectSellBy(String(newLabelling.sellBy))
        labellingPage.productWeightYesRadio().click({ force: true })
        labellingPage.nutritionalInformationRadioYes().click({ force: true })
        labellingPage.eanCodeInput().type(String(newLabelling.ean13Code))

        cy.intercept(
          'PUT',
          TestUrls.getApiVersionLabellingUrl(sku, sku, versionNumber, hgCode),
          (req) => {
            req.reply(204)
          },
        ).as('labellingUpdate')
        cy.interceptProductResponse(productResponse)
        cy.interceptVariantVersionResponse(draftVersionResponse).as('draftVersionResponse')

        labellingPage.saveChanges()

        cy.wait('@labellingUpdate').then((interception) => {
          expect(interception.request.body).to.deep.equal(expectedUpdateBody)
        })
        cy.wait('@draftVersionResponse')

        verifyVersionToastMessage(futureVersionResponse)
        labellingPage.veriyVersionDraftChangesData(draftVersionResponse)
      })
    })
  })
})
