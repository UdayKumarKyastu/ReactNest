export class SearchPage {
  searchInput = () => {
    return cy.get('input#btnSearch')
  }
  searchButton = () => {
    return cy.get('[data-cy="search-button"]')
  }
  searchResultsHeader = () => {
    return cy.get('[data-cy="search-results-header"]')
  }
  tableRow = (name?: string) => {
    if (name) {
      return cy.contains('tr', name)
    }

    return cy.get('tbody tr')
  }

  readonly selectors = {
    selectControl: '.select__control',
    selectOption: '.select__option',
    toggleArrow: '[class*="ToggleArrow"]',
  }

  searchByProductName(productName: string) {
    cy.get(this.selectors.selectControl).click()
    cy.contains(this.selectors.selectOption, 'Product name').click()
    this.searchInput().type(productName)
    this.searchButton().click()
  }

  searchBySku(sku: string) {
    cy.get(this.selectors.selectControl).click()
    cy.contains(this.selectors.selectOption, 'SKU').click()
    this.searchInput().type(sku)
    this.searchButton().click()
  }

  searchByHamiltonGrant(sku: string) {
    cy.get(this.selectors.selectControl).click()
    cy.contains(this.selectors.selectOption, 'Hamilton Grant ID').click()
    this.searchInput().type(sku)
    this.searchButton().click()
  }
}
