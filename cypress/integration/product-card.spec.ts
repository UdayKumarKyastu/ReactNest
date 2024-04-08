import { getFormatedProductCardDate } from 'cypress/helpers/util'
import { ProductCardComponent } from 'cypress/pages/components/ProductCardComponent'
import { ProductVariantsPage } from 'cypress/pages/product-group/ProductVariantsPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { VariantVersionResponseMockBuilder } from 'src/modules/product/mock/variant-version-dto-mock-builder'
import { LiveStatus } from 'src/modules/product/model/live-status'
import { CountryCode } from 'src/shared/model/country-code'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'
import { VariantVersionHistoryPage } from 'cypress/pages/variant/VariantVersionHistoryPage'

const countryCodes = CountryCode

describe('Product Card', () => {
  const productCard = new ProductCardComponent()
  const productVariantsPage = new ProductVariantsPage()
  const variantVersionHistoryPage = new VariantVersionHistoryPage()

  const countriesData = {
    US: { sku: 'US01', countryName: 'United States', countryCode: countryCodes.US },
    UK: { sku: 'UK01', countryName: 'United Kingdom', countryCode: countryCodes.UK },
    HK: { sku: 'HK01', countryName: 'Hong Kong', countryCode: countryCodes.HK },
    FR: { sku: 'FR01', countryName: 'France', countryCode: countryCodes.FR },
  } as const

  const date = new Date()
  const createdAtDate = new Date(date.getFullYear(), date.getMonth(), 1, 1, 1, 1).toISOString()
  const masterSku = 'UK001'
  const masterVersion = 5
  const nonMasterVersion = 2
  const nonMasterSku = 'UK002'
  const masterHgData: Partial<GetProductDto.ProductVariant['hamiltonGrant']> = {
    productCode: 'HG001',
    lastSyncedAt: new Date(date.getFullYear(), date.getMonth(), 1, 20, 1, 1).toISOString(),
  }
  const nonMasterHgData: Partial<GetProductDto.ProductVariant['hamiltonGrant']> = {
    productCode: 'HG002',
    lastSyncedAt: new Date(date.getFullYear(), date.getMonth() - 1, 1, 22, 1, 1).toISOString(),
  }
  const masterVariant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(masterSku)
    .withHamiltonGrant(masterHgData)
    .withVersionNumber(masterVersion)
    .build()
  const nonMasterVariant = new ProductVariantDtoMockBuilder()
    .withSku(nonMasterSku)
    .withHamiltonGrant(nonMasterHgData)
    .withStatus(LiveStatus.INACTIVE)
    .withVersionNumber(nonMasterVersion)
    .build()
  const product = new ProductDtoMockBuilder()
    .addVariants([masterVariant, nonMasterVariant])
    .setCreatedAt(createdAtDate)
    .setPublished(true)
    .build()
  const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
  })

  describe('Product group page', () => {
    beforeEach(() => {
      cy.visit(TestUrls.getProductUrl(masterSku))
      cy.wait('@productResponse')
    })

    it('displays propper labels', () => {
      productCard.verifyLabels()
    })

    it('displays propper data', () => {
      const expectedBrandSiteQuantity = response.product.variants.filter((v) => {
        return v.status === LiveStatus.ACTIVE
      }).length

      productCard.skuValue().should('have.text', 'All Product SKUs')
      productCard.hgCodeValue().should('have.text', 'All Product IDs')
      productCard
        .lastSyncValue()
        .should('have.text', getFormatedProductCardDate(masterVariant.hamiltonGrant.lastSyncedAt!))
      productCard
        .createdOnValue()
        .should('have.text', getFormatedProductCardDate(response.product.createdAt!))
      productCard.additionalInfo().contains(productCard.texts.published).should('be.visible')
      productCard.verifyVariantCounterTextForProductGroup(response.product.variants.length)
      productCard.verifyBrandSiteBadgeText(expectedBrandSiteQuantity)
    })

    it('displays "n/a" if missing data', () => {
      const sku = 'UK0010'
      const noDataResponse = new ProductResponseDtoMockBuilder().setBasicRequiredData(sku).build()
      cy.interceptProductResponse(noDataResponse).as('noDataResponse')
      cy.visit(TestUrls.getProductUrl(sku))
      cy.wait('@noDataResponse')

      productCard.lastSyncValue().should('have.text', productCard.texts.na)
      productCard.createdOnValue().should('have.text', productCard.texts.na)
    })

    it('variants counter link redirects to product variants page', () => {
      productCard.variantsAnchor().click()
      productVariantsPage.verifyBasicElements()
    })
  })

  describe('Variant page', () => {
    context('master variant', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getVariantMarketingUrl(masterSku, masterSku))
        cy.wait('@productResponse')
      })

      it('variants counter link redirects to product variants page', () => {
        productCard.variantsAnchor().click()
        productVariantsPage.verifyBasicElements()
      })

      it('displays proper data', () => {
        productCard.skuValue().should('have.text', masterVariant.sku)
        productCard.hgCodeValue().should('have.text', masterVariant.hamiltonGrant.productCode)
        productCard
          .lastSyncValue()
          .should(
            'have.text',
            getFormatedProductCardDate(masterVariant.hamiltonGrant.lastSyncedAt!),
          )
        productCard
          .createdOnValue()
          .should('have.text', getFormatedProductCardDate(response.product.createdAt!))
        productCard.additionalInfo().contains(productCard.texts.published).should('be.visible')
        productCard.additionalInfo().contains(`Version ${masterVersion}`).should('be.visible')
        productCard.verifyVariantCounterTextForMasterVariant(response.product.variants.length)
        productCard.brandSiteColumn().should('have.text', productCard.texts.siteOn)
      })

      it('displays "n/a" if missing data', () => {
        const sku = 'UK0011'
        const noDataResponse = new ProductResponseDtoMockBuilder().setBasicRequiredData(sku).build()
        cy.interceptProductResponse(noDataResponse).as('noDataResponse')
        cy.visit(TestUrls.getVariantMarketingUrl(sku, sku))
        cy.wait('@noDataResponse')

        productCard.lastSyncValue().should('have.text', productCard.texts.na)
        productCard.createdOnValue().should('have.text', productCard.texts.na)
        productCard.hgCodeValue().should('have.text', '')
      })

      it('displays proper labels', () => {
        productCard.verifyLabels()
      })
    })

    context('variant', () => {
      beforeEach(() => {
        cy.visit(TestUrls.getVariantMarketingUrl(masterSku, nonMasterSku))
        cy.wait('@productResponse')
      })

      it('variants counter link redirects to product variants page', () => {
        productCard.variantsAnchor().click()
        productVariantsPage.verifyBasicElements()
      })

      it('displays proper data', () => {
        productCard.skuValue().should('have.text', nonMasterVariant.sku)
        productCard.hgCodeValue().should('have.text', nonMasterVariant.hamiltonGrant.productCode)
        productCard
          .lastSyncValue()
          .should(
            'have.text',
            getFormatedProductCardDate(nonMasterVariant.hamiltonGrant.lastSyncedAt!),
          )
        productCard
          .createdOnValue()
          .should('have.text', getFormatedProductCardDate(response.product.createdAt!))
        productCard.additionalInfo().contains(productCard.texts.published).should('be.visible')
        productCard.additionalInfo().contains(`Version ${nonMasterVersion}`).should('be.visible')
        productCard.verifyVariantCounterTextForVariant(response.product.variants.length)
        productCard.brandSiteColumn().should('have.text', productCard.texts.siteOff)
      })

      it('displays proper labels', () => {
        productCard.verifyLabels()
      })
    })
  })

  describe('Version page', () => {
    const sku = 'UK0005'
    const hgCode = 'FP0005'
    const currentVersionNumber = 1
    const futureVersionNumber = 3

    const tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1)

    const futureVersion = {
      id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
      liveFrom: '',
      name: {
        'en-GB': '',
        'en-US': '',
        'fr-FR': '',
        'en-HK': '',
        'zh-HK': '',
      },
      version: futureVersionNumber,
      key: `${hgCode}-${futureVersionNumber}`,
      sku: sku,
      hgCode: hgCode,
      publishState: VariantVersionPublishState.FUTURE,
    }

    const curentVersion = {
      id: '59fdd200-1d93-437f-a6f5-8e2f80e38ad2',
      liveFrom: '',
      name: {
        'en-GB': '',
        'en-US': '',
        'fr-FR': '',
        'en-HK': '',
        'zh-HK': '',
      },
      version: currentVersionNumber,
      key: `${hgCode}-${currentVersionNumber}`,
      sku: sku,
      hgCode: hgCode,
      publishState: VariantVersionPublishState.CURRENT,
    }

    const baseVariant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(sku)
      .withHamiltonGrant({ productCode: hgCode })
      .addVersions([curentVersion, futureVersion])
      .build()

    const product = new ProductDtoMockBuilder()
      .setCreatedAt(new Date().toISOString())
      .addVariant(baseVariant)
      .build()
    const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()
    const versionResponse = new VariantVersionResponseMockBuilder()
      .fromVariant(baseVariant)
      .setPublishState(VariantVersionPublishState.FUTURE)
      .withVersionNumber(futureVersionNumber)
      .withHamiltonGrant({ lastSyncedAt: new Date().toISOString() })
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(productResponse).as('productResponse')
      cy.interceptVariantVersionResponse(versionResponse).as('versionResponse')
      cy.visit(TestUrls.getVersionUrl(sku, sku, futureVersionNumber))
      cy.wait('@productResponse')
      cy.wait('@versionResponse')
    })

    it('variants counter link redirects to product variants page', () => {
      productCard.variantsAnchor().click()
      variantVersionHistoryPage.verifyBasicElements()
    })

    it('displays proper labels', () => {
      productCard.verifyLabels()
    })

    it('displays proper data', () => {
      productCard.skuValue().should('have.text', versionResponse.variant.sku)
      productCard
        .hgCodeValue()
        .should('have.text', versionResponse.variant.hamiltonGrant.productCode)
      productCard
        .lastSyncValue()
        .should(
          'have.text',
          getFormatedProductCardDate(versionResponse.variant.hamiltonGrant.lastSyncedAt!),
        )
      productCard
        .createdOnValue()
        .should('have.text', getFormatedProductCardDate(productResponse.product.createdAt!))
      productCard.additionalInfo().contains(productCard.texts.unpublished).should('be.visible')
      productCard.additionalInfo().contains(`Version ${futureVersionNumber}`).should('be.visible')
      productCard.verifyVersionCounterTextForVersions(
        futureVersionNumber,
        baseVariant.versions.length,
      )
      productCard.brandSiteColumn().should('have.text', productCard.texts.siteOn)
    })
  })

  it('displays United Kindgom coutry indicator for UK product', () => {
    const ukProductResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .setCountry(countriesData.UK.countryCode, countriesData.UK.countryName)
          .addVariant(
            new ProductVariantDtoMockBuilder().asMaster().withSku(countriesData.UK.sku).build(),
          )
          .build(),
      )
      .build()

    cy.interceptProductResponse(ukProductResponse).as('productResponse')
    cy.visit(TestUrls.getProductUrl(countriesData.UK.sku))
    cy.wait('@productResponse')
    productCard.coutryIndicator().contains(countriesData.UK.countryCode)
  })

  it('displays United States coutry indicator for US product', () => {
    const ukProductResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .setCountry(countriesData.US.countryCode, countriesData.US.countryName)
          .addVariant(
            new ProductVariantDtoMockBuilder().asMaster().withSku(countriesData.US.sku).build(),
          )
          .build(),
      )
      .build()

    cy.interceptProductResponse(ukProductResponse).as('productResponse')
    cy.visit(TestUrls.getProductUrl(countriesData.US.sku))
    cy.wait('@productResponse')
    productCard.coutryIndicator().contains(countriesData.US.countryCode)
  })

  it('displays France coutry indicator for FR product', () => {
    const ukProductResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .setCountry(countriesData.FR.countryCode, countriesData.FR.countryName)
          .addVariant(
            new ProductVariantDtoMockBuilder().asMaster().withSku(countriesData.FR.sku).build(),
          )
          .build(),
      )
      .build()

    cy.interceptProductResponse(ukProductResponse).as('productResponse')
    cy.visit(TestUrls.getProductUrl(countriesData.FR.sku))
    cy.wait('@productResponse')
    productCard.coutryIndicator().contains(countriesData.FR.countryCode)
  })

  it('displays Hong-Kong coutry indicator for Hong-Kong product', () => {
    const ukProductResponse = new ProductResponseDtoMockBuilder()
      .setProduct(
        new ProductDtoMockBuilder()
          .setCountry(countriesData.HK.countryCode, countriesData.HK.countryName)
          .addVariant(
            new ProductVariantDtoMockBuilder().asMaster().withSku(countriesData.HK.sku).build(),
          )
          .build(),
      )
      .build()

    cy.interceptProductResponse(ukProductResponse).as('productResponse')
    cy.visit(TestUrls.getProductUrl(countriesData.HK.sku))
    cy.wait('@productResponse')
    productCard.coutryIndicator().contains(countriesData.HK.countryCode)
  })
})
