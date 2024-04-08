export class NavBarComponent {
  landingPageTab = () => {
    return cy.get(`${this.selectors.topNavigation} a[href="/"]`)
  }
  productSearchTab = () => {
    return cy.get(`${this.selectors.topNavigation} a[href="/products"]`)
  }

  private selectors = {
    topNavigation: '[data-cy="top-navigation"]',
  }
}
