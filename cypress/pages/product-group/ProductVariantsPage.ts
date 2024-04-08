export class ProductVariantsPage {
  public readonly selectors = {
    variantsTable: '[data-cy="variants-table"]',
  }

  private texts = {
    heading: 'Product variants',
  }

  verifyBasicElements() {
    cy.contains(this.texts.heading).should('be.visible')
    cy.get(this.selectors.variantsTable).should('be.visible')
  }
}
