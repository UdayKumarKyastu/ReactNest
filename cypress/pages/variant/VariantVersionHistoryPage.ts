import { ProductResponseVariantVersion } from 'src/modules/product/mock/variant-version-dto-mock-builder'

export class VariantVersionHistoryPage {
  rowByText = (text: string) => {
    return cy.contains('td', text)
  }

  readonly selectors = {
    currentVersionSection: '[data-cy="current-version-section"]',
    futureVersionsSection: '[data-cy="future-version-section"]',
    previousVersionsSection: '[data-cy="previous-version-section"]',
    versionNumberCell: '[data-cy="version-number-cell"]',
  }

  readonly texts = {
    heading: 'Version history',
    noFutureVersionsMessage: 'There are no future versions available for this variant',
    noPreviousVersionsMessage: 'There are no previous versions available for this variant',
  }

  verifyBasicElements() {
    cy.contains(this.texts.heading).should('be.visible')
    cy.get(this.selectors.currentVersionSection).should('be.visible')
  }

  verifyVersionInCurrentSection(version: ProductResponseVariantVersion) {
    this.verifyVersionInSection(this.selectors.currentVersionSection, version)
    cy.get(this.selectors.currentVersionSection).should('contain.text', 'Published')
  }

  verifyVersionInFutureSection(version: ProductResponseVariantVersion) {
    this.verifyVersionInSection(this.selectors.futureVersionsSection, version)
    cy.get(this.selectors.futureVersionsSection).should('contain.text', 'Unpublished')
  }

  verifyVersionInPreviousSection(version: ProductResponseVariantVersion) {
    this.verifyVersionInSection(this.selectors.previousVersionsSection, version)
    cy.get(this.selectors.futureVersionsSection).should('contain.text', 'Unpublished')
  }

  private verifyVersionInSection(sectionSelector: string, version: ProductResponseVariantVersion) {
    cy.get(sectionSelector)
      .should('contain.text', version.name['en-GB'])
      .and('contain.text', version.hgCode)
      .and('contain.text', version.sku)
      .and('contain.text', new Date(version.liveFrom).toLocaleDateString('en-Gb'))
      .find(this.selectors.versionNumberCell)
      .should('have.text', version.version.toString())
  }
}
