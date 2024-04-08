import { BaseProductPage } from '../BaseProductPage'

export class ProductGroupPage extends BaseProductPage {
  productNameHeader = () => {
    return cy.get('[data-cy="product-name"]')
  }

  public readonly foodProductMenuLabels = {
    categorisation: 'Menu categorisation',
    taxation: 'Taxation',
    variants: 'Product variants',
    allDraftChanges: 'All draft changes',
  }

  public readonly baristaProductMenuLabels = {
    categorisation: 'Menu categorisation',
    taxation: 'Taxation',
    setup: 'Product set up',
    variants: 'Product variants',
    allDraftChanges: 'All draft changes',
  }

  public verifyFooterNavigationForFoodProduct() {
    const labels = this.getFoodTabLabelsArray()
    this.verifyFooterNavigarion(labels)
  }

  verifyFooterNavigationForBaristaProduct() {
    const labels = this.getBaristaTabLabelsArray()
    this.verifyFooterNavigarion(labels)
  }

  verifyLeftSideNavigationForFoodProduct() {
    const labels = this.getFoodTabLabelsArray()
    this.verifyLeftSideNavigation(labels)
  }

  verifyLeftSideNavigationForBaristaProduct() {
    const labels = this.getBaristaTabLabelsArray()
    this.verifyLeftSideNavigation(labels)
  }

  private getFoodTabLabelsArray() {
    return Object.values(this.foodProductMenuLabels)
  }

  private getBaristaTabLabelsArray() {
    return Object.values(this.baristaProductMenuLabels)
  }

  private verifyLeftSideNavigation(labels: string[]) {
    labels.forEach((label) => {
      cy.get(this.baseSelectors.leftSideNav).contains(label).click().should('have.class', 'active')
      this.sectionHeading().should('have.text', label)
    })
  }

  private verifyFooterNavigarion(labels: string[]) {
    labels.forEach((label, index) => {
      cy.contains(label).click()
      if (label === labels[0]) {
        this.footerNavigation()
          .contains('a', labels[index + 1])
          .scrollIntoView()
          .should('be.visible')
        this.footerNavigation().find('a').should('have.length', 1)
      } else if (label === labels[labels.length - 1]) {
        this.footerNavigation()
          .contains('a', labels[index - 1])
          .scrollIntoView()
          .should('be.visible')
        this.footerNavigation().find('a').should('have.length', 1)
      } else {
        this.footerNavigation()
          .contains('a', labels[index - 1])
          .scrollIntoView()
          .should('be.visible')
        this.footerNavigation()
          .contains('a', labels[index + 1])
          .scrollIntoView()
          .should('be.visible')
        this.footerNavigation().find('a').should('have.length', 2)
      }
    })
  }
}
