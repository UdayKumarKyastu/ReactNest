import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'
import { ApproveAllDraftChangesModalComponent } from '../components/ApproveAllDraftChangesModalComponent'
import { VariantAttributtesPage } from '../variant/VariantAttributesPage'
import { VariantLabellingPage } from '../variant/VariantLabellingPage'
import { VariantMarketingPage } from '../variant/VariantMarketingPage'
import { VariantPage } from '../variant/VariantPage'
import { VariantPricingPage } from '../variant/VariantPricingPage'
import { VariantReportingPage } from '../variant/VariantReportingPage'
import { ProductMenuCategorisationPage } from './ProductMenuCategorisationPage'
import { ProductSetupPage } from './ProductSetupPage'

export class ProductAllDraftChangesPage extends BaseProductPage {
  private approveChangesModal = new ApproveAllDraftChangesModalComponent()
  private variantMarketingPage = new VariantMarketingPage()
  private variantReportingPage = new VariantReportingPage()
  private variantAttributesPage = new VariantAttributtesPage()
  private variantPricingPage = new VariantPricingPage()
  private variantLabellingPage = new VariantLabellingPage()
  private variantPage = new VariantPage()
  private productCategoriesPage = new ProductMenuCategorisationPage()
  private productSetupPage = new ProductSetupPage()

  accordionItem = () => {
    return cy.get(this.selectors.accordionItem)
  }
  accordionItemOfVariant = (variantName: string) => {
    return cy.contains(variantName).parents(this.selectors.accordionItem)
  }
  accordionHeader = () => {
    return cy.get(this.selectors.accordionHeader)
  }
  accordionHeaderOfVariant = (variantName: string) => {
    return cy.contains(variantName).parents(this.selectors.accordionHeader)
  }
  changesCellOfVariant = (variantName: string) => {
    return cy
      .contains(variantName)
      .parents(this.selectors.accordionItem)
      .find(this.selectors.changesCell)
  }
  visibleChangeIcons = () => {
    return cy.get(`${this.baseSelectors.changeExclamationIcon}:visible`)
  }
  productGroupAccordionHeader = () => {
    return cy
      .contains(this.selectors.accordionCell, this.texts.productGroup)
      .parents(this.selectors.accordionHeader)
  }

  readonly selectors = {
    accordionItem: '[data-cy="accordion-item"]',
    accordionHeader: '[data-cy="accordion-header"]',
    changesCell: '[data-cy="cell-changes"]',
    nameCell: '[data-cy="cell-name"]',
    accordionCell: '[class*="AccordionCell"]',
  }

  readonly texts = {
    savedDraftChangesSuccesInfo:
      'draft changes have been approved for this product and are now up to date.',
    rejectedDraftChangesSuccesInfo: 'There are no draft changes pending',
    productGroup: 'Product group',
    masterVariant: 'Master Variant',
  }

  verifyNoDraftChanges() {
    cy.contains(this.baseTexts.noDraftChangesInfo).should('be.visible')
    this.draftLeftColumn().should('not.exist')
    this.draftRightColumn().should('not.exist')
    cy.get(this.baseSelectors.leftSideNav)
      .find(this.baseSelectors.navTabChangeIcon)
      .should('not.exist')
  }

  verifySuccesSavedDraftChanges(numberOfChanges: number) {
    cy.contains(`${numberOfChanges} ${this.texts.savedDraftChangesSuccesInfo}`).should('be.visible')
    this.draftLeftColumn().should('not.exist')
    this.draftRightColumn().should('not.exist')
    cy.get(this.baseSelectors.leftSideNav)
      .find(this.baseSelectors.navTabChangeIcon)
      .should('not.exist')
  }

  verifyRejectedDraftChanges() {
    cy.contains(`${this.texts.rejectedDraftChangesSuccesInfo}`).should('be.visible')
    this.draftLeftColumn().should('not.exist')
    this.draftRightColumn().should('not.exist')
    cy.get(this.baseSelectors.leftSideNav)
      .find(this.baseSelectors.navTabChangeIcon)
      .should('not.exist')
  }

  approveAllChanges() {
    this.saveButton().click()
    this.approveChangesModal.approveChangesButton().click()
  }

  verifyTotalDraftChangesInfoMessage(expectedAmountOfChanges: number) {
    cy.contains(`There are ${expectedAmountOfChanges} draft changes pending approval`).should(
      'be.visible',
    )
  }

  verifyAllSectionsAreVisible() {
    this.variantMarketingPage.texts.subsectionHeadings.forEach((section) => {
      cy.contains(section).scrollIntoView().should('be.visible')
    })
    this.variantReportingPage.texts.subsectionHeadings.forEach((section) => {
      cy.contains(section).scrollIntoView().should('be.visible')
    })
    this.variantAttributesPage.texts.subsectionHeadings.forEach((section) => {
      cy.contains(section).scrollIntoView().should('be.visible')
    })
  }

  verifyVariantDraftChangesData(varinatIndex: number, response: GetProductDto.ProductResponse) {
    const draftVariant = response.draftChanges.variants[varinatIndex]

    if (draftVariant.changesCount.marketing > 0) {
      this.variantMarketingPage.veriyDraftChangesData(varinatIndex, response)
    } else {
      cy.contains(this.variantPage.baristaTypeMenuLabels.marketing).should('not.exist')
    }

    if (draftVariant.changesCount.pricing > 0) {
      this.variantPricingPage.verifyUkCoreDraftChanges(varinatIndex, response)
    } else {
      cy.contains(this.variantPage.baristaTypeMenuLabels.pricing).should('not.exist')
    }

    if (draftVariant.changesCount.reporting > 0) {
      this.variantReportingPage.veriyDraftChangesData(varinatIndex, response)
    } else {
      cy.contains(this.variantPage.baristaTypeMenuLabels.reporting).should('not.exist')
    }

    if (draftVariant.changesCount.labelling > 0) {
      this.variantLabellingPage.veriyDraftChangesData(varinatIndex, response)
    } else {
      cy.contains(this.variantPage.foodTypeMenuLabels.labelling).should('not.exist')
    }

    if (draftVariant.changesCount.attributes > 0) {
      // TODO: variantAttributes.verifyDraftChanges(varinatIndex, response)
    } else {
      cy.contains(this.variantPage.baristaTypeMenuLabels.attributes).should('not.exist')
    }
  }

  verifyProductDraftChangesData(response: GetProductDto.ProductResponse) {
    const product = response.product
    const draft = response.draftChanges

    if (draft.changesCount.categories > 0) {
      this.productCategoriesPage.verifyDraftChangesData(product.categories, draft.categories)
    }
    if (draft.changesCount.setUp > 0) {
      this.productSetupPage.verifyDraftChangesData(response)
    }
  }
}
