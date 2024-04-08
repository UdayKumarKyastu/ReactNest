import { CountryFilters } from 'cypress/support/TestUrls'

export class LandingPage {
  roleLabel = () => {
    return cy.get('[data-cy="role-label"]')
  }
  pendingTab = () => {
    return cy.contains('div', 'Pending review')
  }
  newTab = () => {
    return cy.contains('div', 'New')
  }
  liveSoonTab = () => {
    return cy.contains('div', 'Live soon')
  }
  tableRowByText = (text: string) => {
    return cy.contains('tr', text)
  }
  nextPageButton = () => {
    return cy.get('[data-testid="nextPageButton"]')
  }
  prevPageButton = () => {
    return cy.get('[data-testid="previousPageButton"]')
  }
  lastPageButton = () => {
    return cy.get('[data-testid="lastPageButton"]')
  }
  firstPageButton = () => {
    return cy.get('[data-testid="firstPageButton"]')
  }
  searchInput = () => {
    return cy.get('input#btnSearch')
  }
  searchButton = () => {
    return cy.get('[data-cy="search-button"]')
  }

  readonly selectors = {
    toggleArrow: '[class*="ToggleArrow"]',
    productsPerPageWrapper: '[data-cy="products-per-page-wrapper"]',
    countryDropdownWrapper: '[data-cy="country-dropdown-wrapper"]',
    selectControl: '.select__control',
    selectOption: '.select__option',
    spinner: '.spinner',
    searchSection: '[data-cy="search-section"]',
  }

  readonly texts = {
    noPendingReview: 'Nothing pending review',
    productGroupRecipeId: 'All Product IDs',
    productGroupSku: 'All Product SKUs',
    loadingProducts: 'Loading products...',
  }

  expandRowByText(text: string) {
    this.tableRowByText(text).find(this.selectors.toggleArrow).click()
  }

  changeProductsPerPage(productsPerPage: number) {
    cy.get(`${this.selectors.productsPerPageWrapper} ${this.selectors.selectControl}`).click()
    cy.contains(this.selectors.selectOption, productsPerPage).click()
  }

  changeCountryFilter(country: CountryFilters) {
    cy.get(`${this.selectors.countryDropdownWrapper} ${this.selectors.selectControl}`).click()
    cy.contains(this.selectors.selectOption, country).click()
  }

  searchByProductName(productName: string) {
    cy.get(`${this.selectors.searchSection} ${this.selectors.selectControl}`).click()
    cy.contains(this.selectors.selectOption, 'Product name').click()
    this.searchInput().type(productName)
    this.searchButton().click()
  }

  searchBySku(sku: string) {
    cy.get(`${this.selectors.searchSection} ${this.selectors.selectControl}`).click()
    cy.contains(this.selectors.selectOption, 'SKU').click()
    this.searchInput().type(sku)
    this.searchButton().click()
  }

  searchByHamiltonGrant(sku: string) {
    cy.get(`${this.selectors.searchSection} ${this.selectors.selectControl}`).click()
    cy.contains(this.selectors.selectOption, 'Hamilton Grant ID').click()
    this.searchInput().type(sku)
    this.searchButton().click()
  }
}
