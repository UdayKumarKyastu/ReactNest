import { BaseProductPage } from '../BaseProductPage'

export class VariantAttributtesPage extends BaseProductPage {
  withDecafPodsCheckbox = () => {
    return cy.get(this.selectors.withDecafPodsCheckbox)
  }

  withoutMilkCheckbox = () => {
    return cy.get('#withoutMilk')
  }

  readonly selectors = {
    withDecafPodsCheckbox: '#withDecafPods',
  }

  readonly texts = {
    subsectionHeadings: ['This drink is made'],
    combinationDuplicationMessage: 'This combination of attributes duplicates',
  }

  verifyBasicElements() {
    this.texts.subsectionHeadings.forEach((text) => {
      cy.contains(text)
    })
  }

  checkIfCombinationErrorIsNotVisible() {
    cy.contains(this.texts.combinationDuplicationMessage).should('not.exist')
  }

  checkIfCombinationErrorIsVisible(expectedSku: string) {
    cy.contains(`${this.texts.combinationDuplicationMessage} ${expectedSku}`).should('be.visible')
  }

  verifySavedChangesForDecafPods() {
    cy.get(this.baseSelectors.draftLeftColumn)
      .find('[type="checkbox"]:not(:checked)')
      .should('have.length', 7)
    cy.get(this.baseSelectors.draftRightColumn)
      .find(this.selectors.withDecafPodsCheckbox)
      .should('be.checked')
    cy.get(this.baseSelectors.draftRightColumn)
      .find('[type="checkbox"]:not(:checked)')
      .should('have.length', 6)
    cy.get(this.baseSelectors.draftRightColumn)
      .find(this.baseSelectors.changeExclamationIcon)
      .should('have.length', 1)
    cy.get(this.baseSelectors.leftSideNav)
      .find(this.baseSelectors.navTabChangeIcon)
      .should('be.visible')
  }
}
