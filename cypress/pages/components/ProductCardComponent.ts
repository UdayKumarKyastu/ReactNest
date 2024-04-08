export class ProductCardComponent {
  coutryIndicator = () => {
    return cy.get('[data-cy="country-indicator"]')
  }
  wholeCard = () => {
    return cy.get('[data-cy="product-card"]')
  }
  skuValue = () => {
    return cy.get('[data-cy="product-card-sku"]')
  }
  hgCodeValue = () => {
    return cy.get('[data-cy="product-card-hgcode"]')
  }
  lastSyncValue = () => {
    return cy.get('[data-cy="product-card-lastsync"]')
  }
  createdOnValue = () => {
    return cy.get('[data-cy="product-card-created"]')
  }
  variantsAnchor = () => {
    return cy.get(`${this.selectors.variantsCounter} a`)
  }
  variantsCounter = () => {
    return cy.get(this.selectors.variantsCounter)
  }
  additionalInfo = () => {
    return cy.get('[data-cy="product-card-additional-info"]')
  }
  brandSiteColumn = () => {
    return cy.get('[data-cy="product-card-brand-site"]')
  }

  readonly selectors = {
    variantsCounter: '[data-cy="product-variants-counter"]',
  }

  readonly texts = {
    labels: {
      sku: 'Product SKU',
      recipeId: 'Recipe ID',
      createdAt: 'Created on',
      recipeLastUpdated: 'Recipe last updated',
      brandSite: 'Brand site',
    },
    variantsCounterLabels: {
      productGroup: 'Product group:',
      masterVariant: 'Master Variant: 1 of',
      variant: 'Variant: 1 of',
    },
    published: 'Published',
    unpublished: 'Unpublished',
    siteOn: 'Brand site: On',
    siteOff: 'Brand site: Off',
    na: 'N/A',
    newFutureVersionAlert: 'New future version added',
  }

  verifyLabels() {
    Object.values(this.texts.labels).forEach((label) => {
      this.wholeCard().contains(label)
    })
  }

  verifyVariantCounterTextForProductGroup(expectedQuantity: number) {
    this.variantsCounter().should(
      'have.text',
      `${this.texts.variantsCounterLabels.productGroup}${expectedQuantity} variants`,
    )
  }

  verifyVariantCounterTextForMasterVariant(expectedQuantity: number) {
    this.variantsCounter().should(
      'have.text',
      `${this.texts.variantsCounterLabels.masterVariant}${expectedQuantity} variants`,
    )
  }

  verifyVariantCounterTextForVariant(expectedQuantity: number) {
    this.variantsCounter().should(
      'have.text',
      `${this.texts.variantsCounterLabels.variant}${expectedQuantity} variants`,
    )
  }

  verifyVersionCounterTextForVersions(versionNumber: number, totalVersionsQuantity: number) {
    this.variantsCounter().should(
      'have.text',
      `Version: ${versionNumber} of${totalVersionsQuantity} versions`,
    )
  }

  verifyBrandSiteBadgeText(expectedQuantity: number) {
    this.brandSiteColumn().should(
      'have.text',
      `${this.texts.labels.brandSite}: ${expectedQuantity}`,
    )
  }
}
