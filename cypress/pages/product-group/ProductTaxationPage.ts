export class ProductTaxationPage {
  editButton = () => {
    return cy.get('[data-testid="edit-button"]')
  }
  cancelButton = () => {
    return cy.get('[data-testid="cancel-button"]')
  }
  saveButton = () => {
    return cy.get('[data-testid="save-button"]')
  }
  crossButton = () => {
    return cy.get('[data-testid="cross-button"]')
  }
  taxSelect = () => {
    return cy.get('.select__control')
  }
  taxOptions = () => {
    return cy.get('.select__menu')
  }
  selectOption = () => {
    return cy.get('.select__option')
  }
  selectedOption = () => {
    return cy.get('.select__single-value').then(($value) => {
      this.taxSelect().click()

      return cy.get('.select__menu').contains($value.text())
    })
  }

  public readonly taxCategories = {
    UK: ['VAT (0%)', 'VAT (5%)', 'VAT (20%)'],
    US: ['US 20%'],
  }

  private texts = {
    changesSaved: '1 draft changes have been saved',
  }

  public verifyReadonlyState() {
    this.taxSelect().should('not.exist')
    this.cancelButton().should('not.exist')
    this.saveButton().should('not.exist')
    this.crossButton().should('not.exist')
  }

  public verifyEditState() {
    this.taxSelect().should('be.visible')
    this.cancelButton().should('exist')
    this.saveButton().should('exist')
    this.crossButton().should('exist')
  }

  public changeTaxCategory() {
    this.selectedOption().then(($selectedOption) => {
      const selectedValue = $selectedOption.text()
      const otherOption = this.taxCategories.UK.find((el) => el !== selectedValue)
      if (otherOption) {
        this.taxOptions().contains(otherOption).click()
      }
    })
  }

  public verifyPostUpdateState(newTaxValue: string) {
    this.verifyReadonlyState()
    cy.contains(this.texts.changesSaved)
    cy.contains(newTaxValue)
  }
}
