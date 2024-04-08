import { BaseProductPage } from '../BaseProductPage'

export class VariantPage extends BaseProductPage {
  saveDuplicatedDataButton = () => {
    return cy.contains('button', 'Save duplicated data')
  }
  updateDataButton = () => {
    return cy.contains('button', 'Save duplicated data')
  }

  readonly foodTypeMenuLabels = {
    marketing: 'Variant marketing',
    pricing: 'Variant pricing',
    reporting: 'Variant reporting',
    nutritionals: 'Variant nutritionals',
    labelling: 'Variant labelling',
    versionHistory: 'Version history',
    draftChanges: 'Draft changes',
  }

  readonly baristaTypeMenuLabels = {
    marketing: 'Variant marketing',
    pricing: 'Variant pricing',
    reporting: 'Variant reporting',
    attributes: 'Variant attributes',
    nutritionals: 'Variant nutritionals',
    versionHistory: 'Version history',
    draftChanges: 'Draft changes',
  }

  verifyFooterNavigationForFoodType() {
    const labels = this.getTabLabelsArrayForFoodType()
    this.verifyFooterNavigation(labels)
  }

  verifyFooterNavigationForBaristaType() {
    const labels = this.getTabLabelsArrayForBaristaType()
    this.verifyFooterNavigation(labels)
  }

  private verifyFooterNavigation(labels: string[]) {
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

  verifyLeftSideNavigationForFoodType() {
    const labels = this.getTabLabelsArrayForFoodType()
    this.verifyLeftSideNavigation(labels)
  }

  verifyLeftSideNavigationForBaristaType() {
    const labels = this.getTabLabelsArrayForBaristaType()
    this.verifyLeftSideNavigation(labels)
  }

  private verifyLeftSideNavigation(labels: string[]) {
    labels.forEach((label) => {
      cy.get(this.baseSelectors.leftSideNav).contains(label).click().should('have.class', 'active')
      this.sectionHeading().should('have.text', label)
    })
  }

  private getTabLabelsArrayForFoodType() {
    return Object.values(this.foodTypeMenuLabels)
  }

  private getTabLabelsArrayForBaristaType() {
    return Object.values(this.baristaTypeMenuLabels)
  }
}
