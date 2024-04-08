import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

type VariantPrices = GetProductDto.ProductVariant['prices']

export class VariantPricingPage extends BaseProductPage {
  firstEatInPriceInput = () => {
    return cy.get('[data-testid="prices[0].eatInPrice"]')
  }
  firstEatInClubPretInput = () => {
    return cy.get('[data-testid="prices[0].eatInClubPret"]')
  }
  firstEatInTaxInput = () => {
    return cy.get('[data-testid="prices[0].eatInTaxRate"]')
  }
  firstDeliveryPriceInput = () => {
    return cy.get('[data-testid="prices[0].deliveryPrice"]')
  }
  firstTakeawayPriceInput = () => {
    return cy.get('[data-testid="prices[0].takeAwayPrice"]')
  }
  firstTakeawayClubPretInput = () => {
    return cy.get('[data-testid="prices[0].takeAwayClubPret"]')
  }
  firstDeliveryTaxInput = () => {
    return cy.get('[data-testid="prices[0].deliveryTaxRate"]')
  }
  firstTakeawayTaxInput = () => {
    return cy.get('[data-cy="prices[0].takeAwayTax"]')
  }
  firstTakeawayTaxInputField = () => {
    return cy
      .get('[data-cy="prices[0].takeAwayTax"]')
      .get('input[data-testid="prices[0].takeAwayTaxRate"]')
  }
  ukCoreTakeawayTaxField = () => {
    return cy.get('[data-cy="uk_core-takeAwayTax"]')
  }
  usCoreTakeawayTaxField = () => {
    return cy.get('[data-cy="us_new_york-takeAwayTax"]')
  }
  tooltips = () => {
    return cy.get('div[class*="StyledTooltip"')
  }

  readonly selectors = {
    ukCoreEatInPrice: '[data-cy="uk_core-eatInPrice"]',
    ukCoreEatInClubPret: '[data-cy="uk_core-eatInClubPret"]',
    ukCoreEatInTax: '[data-cy="uk_core-eatInTaxRate"]',
    ukCoreDeliveryPrice: '[data-cy="uk_core-deliveryPrice"]',
    ukCoreDeliveryTax: '[data-cy="uk_core-deliveryTaxRate"]',
    ukCoreTakeawayPrice: '[data-cy="uk_core-takeAwayPrice"]',
    ukCoreTakeawayClubPret: '[data-cy="uk_core-takeAwayClubPret"]',
  }

  readonly texts = {
    tooltipText:
      'Takeaway tax can only be set at the product group level. Navigate to the product group if you wish to edit it.',
  }

  verifyUkCoreDraftChanges(indexOfEditedVariant: number, response: GetProductDto.ProductResponse) {
    const approvedContent = response.product.variants[indexOfEditedVariant]
    const savedChanges = response.draftChanges.variants[indexOfEditedVariant]
    const changesCount = savedChanges.changesCount.pricing
    this.verifySavedDraftChangesInfo(changesCount)
    this.verifyUkCoreInElement(this.baseSelectors.draftLeftColumn, approvedContent.prices)
    this.verifyUkCoreInElement(this.baseSelectors.draftRightColumn, savedChanges.prices)
  }

  verifyVersionUkCoreDraftChanges(versionResponse: GetProductVariantVersionDto) {
    const approvedData = versionResponse.variant
    const draftData = versionResponse.draft

    const changesCount = versionResponse.draft.changesCount!.pricing
    this.verifySavedDraftChangesInfo(changesCount)
    this.verifyUkCoreInElement(this.baseSelectors.draftLeftColumn, approvedData.prices)
    this.verifyUkCoreInElement(this.baseSelectors.draftRightColumn, draftData.prices)
  }

  public verifyUkCoreInElement(elementSelector: string, data: VariantPrices) {
    cy.get(elementSelector)
      .find(this.selectors.ukCoreEatInPrice)
      .should('have.text', `${this.formatPrice(data[0].eatInPrice.centAmount)}`)
    cy.get(elementSelector)
      .find(this.selectors.ukCoreEatInClubPret)
      .should('have.text', `${this.formatPrice(data[0].eatInClubPret.centAmount)}`)
    cy.get(elementSelector)
      .find(this.selectors.ukCoreEatInTax)
      .should('have.text', `${this.formatTax(data[0].eatInTax)}`)
    cy.get(elementSelector)
      .find(this.selectors.ukCoreTakeawayPrice)
      .should('have.text', `${this.formatPrice(data[0].takeAwayPrice.centAmount)}`)
    cy.get(elementSelector)
      .find(this.selectors.ukCoreTakeawayClubPret)
      .should('have.text', `${this.formatPrice(data[0].takeAwayClubPret.centAmount)}`)
    cy.get(elementSelector)
      .find(this.selectors.ukCoreDeliveryPrice)
      .should('have.text', `${this.formatPrice(data[0].deliveryPrice.centAmount)}`)
  }

  private formatPrice(centAmount: number | string) {
    centAmount = typeof centAmount === 'string' ? parseInt(centAmount) : centAmount

    return `£${(centAmount / 100).toFixed(2).toString()}`
  }

  private formatTax(taxRate: number | string) {
    taxRate = typeof taxRate === 'string' ? parseInt(taxRate) : taxRate

    return `${(taxRate * 100).toFixed(2).toString()}%`
  }
}
