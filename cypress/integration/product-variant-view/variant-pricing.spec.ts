import {
  getUkPriceChannelsMock,
  getUSPriceChannelsMock,
  getFRPriceChannelsMock,
  getHKPriceChannelsMock,
} from 'cypress/fixtures/mocks/price-channels.mock'
import { VariantPricingPage } from 'cypress/pages/variant/VariantPricingPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { EditProductVariantDto } from 'src/modules/product/dto/edit-product-variant.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'
import { ChannelPrice } from 'src/modules/product/model/price'
import { CountryCode } from 'src/shared/model/country-code'

describe('Variant pricing tab', () => {
  const productTaxCategory: GetProductDto.Product['taxCategory'] = {
    amount: 0.125,
    id: '80ff1a3a-5e78-458a-b8c6-08006cdfdefd',
    name: 'VAT (12.5%)',
  }
  const pricingPage = new VariantPricingPage()

  const pricingChannels = getUkPriceChannelsMock()
  const sku = 'UK001'
  const variant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withPrices(pricingChannels)
    .build()
  const product = new ProductDtoMockBuilder()
    .addVariant(variant)
    .setTaxCategory(productTaxCategory)
    .build()
  const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getVariantPricingUrl(sku, sku))
    cy.wait('@productResponse')
  })

  it('displays channels from response', () => {
    pricingChannels.forEach((channel) => {
      cy.contains(channel.channelLabel['en-GB']).scrollIntoView().should('be.visible')
    })
    pricingPage.verifyUkCoreInElement('body', response.product.variants[0].prices)
  })

  // https://pretamanger.atlassian.net/browse/PP-1558
  it('exposes takeaway tax rate from product group', () => {
    const expectedTakeawayTax = productTaxCategory.amount * 100
    pricingPage.ukCoreTakeawayTaxField().should('have.text', `${expectedTakeawayTax.toFixed(2)}%`)
    pricingPage.editButton().click()
    pricingPage.firstTakeawayTaxInput().should('have.text', `${expectedTakeawayTax.toFixed(2)}%`)
  })

  it('contains tooltip icon with information text', () => {
    pricingPage.editButton().click()
    pricingPage.tooltips().first().should('be.visible')
    pricingPage
      .tooltips()
      .first()
      .find('svg')
      .invoke('attr', 'aria-label')
      .should('eq', pricingPage.texts.tooltipText)
  })

  it('allows to edit product prices', () => {
    const variantIndex = 0
    const newPrices = {
      eatInPrice: 9,
      eatInTax: 5,
      deliveryPrice: 11,
      deliveryTax: 20,
      takeAwayPrice: 10,
    }

    const editedPrices = getUkPriceChannelsMock()
    editedPrices[0].eatInPrice.centAmount = newPrices.eatInPrice * 100 // * 100 cents
    editedPrices[0].eatInTax = newPrices.eatInTax / 100 // / 100 percents
    editedPrices[0].takeAwayPrice.centAmount = newPrices.takeAwayPrice * 100

    const editedResponse = new ProductResponseDtoMockBuilder(response).build()
    editedResponse.draftChanges.variants[variantIndex].prices = editedPrices
    editedResponse.draftChanges.variants[variantIndex].changesCount.pricing = 2
    editedResponse.draftChanges.variants[variantIndex].changesCount.total = 2

    const expectedPutRequestBody: EditProductVariantDto.UpdateVariantPricing = {
      prices: editedPrices.map(({ channelLabel, ...keepAttrs }) => keepAttrs),
    }

    pricingPage.editButton().click()
    pricingPage.firstEatInPriceInput().type(newPrices.eatInPrice.toString())
    pricingPage.firstEatInTaxInput().type(newPrices.eatInTax.toString())
    pricingPage.firstTakeawayPriceInput().type(newPrices.takeAwayPrice.toString())

    cy.intercept('PUT', TestUrls.getApiVariantPricingUrl(sku, sku), (req) => {
      req.reply(204)
    }).as('updatePricing')
    cy.interceptProductResponse(editedResponse).as('editedResponse')

    pricingPage.saveChanges()

    cy.wait('@updatePricing').then((interception) => {
      expect(interception.request.body).to.deep.equal(expectedPutRequestBody)
    })
    cy.wait('@editedResponse')

    pricingPage.verifyUkCoreDraftChanges(variantIndex, editedResponse)
  })

  context('validation rules', () => {
    it('not accept letter or symbol characters', () => {
      pricingPage.editButton().click()
      pricingPage
        .firstEatInPriceInput()
        .clear()
        .type('Qw!@#$%^&*()_{},;=1 2')
        .should('have.value', '12')

      pricingPage
        .firstEatInTaxInput()
        .clear()
        .type('Qw!@#$%^&*()_{},;=1 2')
        .should('have.value', '12')
    })

    it('not allow to provide more than 100% tax rate', () => {
      pricingPage.editButton().click()
      pricingPage.firstEatInTaxInput().clear().type('999').should('have.value', '99')
    })

    it('fields are accurate to 2 decimals - rounded if necessary', () => {
      const expectedChannel: Partial<ChannelPrice> = getUkPriceChannelsMock()[0]
      expectedChannel.eatInPrice!.centAmount = 999
      expectedChannel.eatInTax = 0.125
      expectedChannel.takeAwayPrice!.centAmount = 990
      delete expectedChannel.channelLabel

      pricingPage.editButton().click()
      pricingPage.firstEatInPriceInput().type('9.9944')
      pricingPage.firstEatInTaxInput().type('12.4999')
      pricingPage.firstTakeawayPriceInput().type('9.9')
      pricingPage.saveChanges()

      cy.intercept('PUT', TestUrls.getApiVariantPricingUrl(sku, sku), (req) => {
        req.reply(204)
      }).as('updatePricing')
      cy.wait('@updatePricing', { timeout: 10000 }).then((interception) => {
        expect(interception.request.body.prices[0]).to.deep.equal(expectedChannel)
      })
    })

    it('tax rates from response are rounded to 4 decimals', () => {
      const sku = 'UK002'
      const customChannel = getUkPriceChannelsMock()[0]
      customChannel.eatInTax = 0.123456789
      const variant = new ProductVariantDtoMockBuilder()
        .asMaster()
        .withSku(sku)
        .withPrices([customChannel])
        .build()
      const product = new ProductDtoMockBuilder().addVariant(variant).build()
      const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getVariantPricingUrl(sku, sku))
      cy.wait('@productResponse')

      cy.get(pricingPage.selectors.ukCoreEatInTax).should('have.text', '12.3457%')
    })
  })
})

// https://pretamanger.atlassian.net/browse/PP-1558 for US products
describe('Variant pricing tab for US products', () => {
  const pricingPage = new VariantPricingPage()

  const pricingChannels = getUSPriceChannelsMock()
  const sku = 'US001'
  const variant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withPrices(pricingChannels)
    .build()
  const product = new ProductDtoMockBuilder()
    .addVariant(variant)
    .setCountry(CountryCode.US, 'US')
    .withTakeAwayTaxEnabled()
    .build()
  const response = new ProductResponseDtoMockBuilder().setProduct(product).build()
  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getVariantPricingUrl(sku, sku))
    cy.wait('@productResponse')
  })

  // add test in product group view not having taxation tab

  it('does not contain tooltip icon with information text', () => {
    pricingPage.editButton().click()
    pricingPage.tooltips().should('not.exist')
  })

  it('takeaway tax is editable', () => {
    pricingPage.editButton().click()
    pricingPage.firstTakeawayTaxInputField().should('exist')
  })
})

// https://pretamanger.atlassian.net/browse/PP-1558 for FR products
describe('Variant pricing tab for FR products', () => {
  const pricingPage = new VariantPricingPage()

  const pricingChannels = getFRPriceChannelsMock()
  const sku = 'FR001'
  const variant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withPrices(pricingChannels)
    .build()
  const product = new ProductDtoMockBuilder()
    .addVariant(variant)
    .setCountry(CountryCode.FR, 'FR')
    .withTakeAwayTaxEnabled()
    .build()
  const response = new ProductResponseDtoMockBuilder().setProduct(product).build()
  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getVariantPricingUrl(sku, sku))
    cy.wait('@productResponse')
  })

  // add test in product group view not having taxation tab

  it('does not contain tooltip icon with information text', () => {
    pricingPage.editButton().click()
    pricingPage.tooltips().should('not.exist')
  })

  it('takeaway tax is editable', () => {
    pricingPage.editButton().click()
    pricingPage.firstTakeawayTaxInputField().should('exist')
  })
})

// https://pretamanger.atlassian.net/browse/PP-1558 for HK products
describe('Variant pricing tab for HK products', () => {
  const pricingPage = new VariantPricingPage()

  const pricingChannels = getHKPriceChannelsMock()
  const sku = 'HK001'
  const variant = new ProductVariantDtoMockBuilder()
    .asMaster()
    .withSku(sku)
    .withPrices(pricingChannels)
    .build()
  const product = new ProductDtoMockBuilder()
    .addVariant(variant)
    .setCountry(CountryCode.HK, 'HK')
    .withTakeAwayTaxEnabled()
    .build()
  const response = new ProductResponseDtoMockBuilder().setProduct(product).build()
  beforeEach(() => {
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getVariantPricingUrl(sku, sku))
    cy.wait('@productResponse')
  })

  it('does not contain tooltip icon with information text', () => {
    pricingPage.editButton().click()
    pricingPage.tooltips().should('not.exist')
  })

  it('takeaway tax is editable', () => {
    pricingPage.editButton().click()
    pricingPage.firstTakeawayTaxInputField().should('exist')
  })
})
