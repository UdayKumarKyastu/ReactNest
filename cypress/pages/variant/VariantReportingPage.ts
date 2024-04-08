import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

export class VariantReportingPage extends BaseProductPage {
  sku = () => {
    return cy.get('[data-cy="sku"]')
  }
  lastSyncAtHG = () => {
    return cy.get('[data-cy="dateLastUpdatedOnHamiltonGrant"]')
  }
  posId = () => {
    return cy.get('[data-cy="pointOfSaleID"]')
  }
  hamiltonGrantCode = () => {
    return cy.get('[data-cy="hamiltonGrantProductCode"]')
  }
  pluReportingNameEditable = () => {
    return cy.get(this.selectors.pluReportingName).find(this.selectors.input)
  }
  pluReportingNameReadonly = () => {
    return cy.get(this.selectors.pluReportingName).find(this.selectors.fieldValue).last()
  }
  pluPrimaryCategory = () => {
    return cy.get(this.selectors.pluPrimaryCategory).find(this.selectors.select)
  }
  pluSecondaryCategory = () => {
    return cy.get(this.selectors.pluSecondaryCategory).find(this.selectors.select)
  }
  productionProductCategory = () => {
    return cy.get(this.selectors.productionProductCategory).find(this.selectors.select)
  }
  productionProductSubcategory = () => {
    return cy.get(this.selectors.productionProductSubcategory).find(this.selectors.select)
  }
  selectOption = (optionText: string) => {
    return cy.get(this.selectors.selectOption).contains(optionText)
  }
  selectOptions = () => {
    return cy.get(this.selectors.selectOption)
  }
  parentProductSkuInput = () => {
    return cy.get(this.selectors.parentProductSku).find(this.selectors.input)
  }

  readonly selectors = {
    sku: '[data-cy="sku"]',
    lastSyncAtHG: '[data-cy="dateLastUpdatedOnHamiltonGrant"]',
    posId: '[data-cy="pointOfSaleID"]',
    hamiltonGrantCode: '[data-cy="hamiltonGrantProductCode"]',
    pluReportingName: '[data-cy="priceLookUpReportingName"]',
    pluPrimaryCategory: '[data-cy="priceLookUpPrimaryCategory"]',
    pluSecondaryCategory: '[data-cy="priceLookUpSecondaryCategory"]',
    productionProductCategory: '[data-cy="productionProductCategory"]',
    productionProductSubcategory: '[data-cy="productionProductSubcategory"]',
    input: 'input',
    fieldValue: '[class*="Content"]',
    select: '.select__control',
    selectOption: '.select__option',
    selectedOption: '.select__single-value',
    parentProductSku: '[data-cy="parentProductSku"]',
  }

  readonly texts = {
    subsectionHeadings: ['Reporting information', 'Production categories'],
    variantAttributtes: [
      'Product SKU',
      'Date last updated in Hamilton Grant',
      'POS ID',
      'Recipe ID',
      'PLU reporting name',
      'PLU primary category',
      'PLU secondary category',
      'Production product category',
      'Production product subcategory',
    ],
    parentProductSkuHeaading: 'Slim product reporting',
  }

  public readonly pluCategories = {
    BAKERY: ['MUFFINS & COOKIES', 'SAVOURY CROISSANTERIE', 'SWEET CROISSANTERIE'],
  }

  public readonly productionCategories = {
    BAGUETTES: ['MONTHLY SPECIAL', 'BAGUETTES'],
  }

  verifyBasicElements() {
    this.texts.subsectionHeadings.forEach((text) => {
      cy.contains(text)
    })
    this.texts.variantAttributtes.forEach((text) => {
      cy.contains(text)
    })
  }

  verifyReadonlyState() {
    this.verifyBaseReadonlyState()
    cy.get(this.selectors.sku).find(this.selectors.fieldValue).scrollIntoView().should('be.visible')
    cy.get(this.selectors.lastSyncAtHG)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.posId)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.hamiltonGrantCode)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.pluReportingName)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.pluPrimaryCategory)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.pluSecondaryCategory)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.productionProductCategory)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.productionProductSubcategory)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.posId)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
    cy.get(this.selectors.parentProductSku)
      .find(this.selectors.fieldValue)
      .scrollIntoView()
      .should('be.visible')
  }

  verifyEditableState() {
    this.verifyBaseEditState()
    cy.get(this.selectors.sku).find(this.selectors.input).should('be.disabled')
    cy.get(this.selectors.lastSyncAtHG).find(this.selectors.input).should('be.disabled')
    cy.get(this.selectors.posId).find(this.selectors.input).should('be.disabled')
    cy.get(this.selectors.hamiltonGrantCode).find(this.selectors.input).should('be.disabled')
    cy.get(this.selectors.pluReportingName).find(this.selectors.input).should('be.enabled')
    cy.get(this.selectors.pluPrimaryCategory).find(this.selectors.select).should('exist')
    cy.get(this.selectors.pluSecondaryCategory).find(this.selectors.select).should('exist')
    cy.get(this.selectors.productionProductCategory).find(this.selectors.select).should('exist')
    cy.get(this.selectors.productionProductSubcategory).find(this.selectors.select).should('exist')
    this.parentProductSkuInput().scrollIntoView().should('be.enabled')
  }

  selectPluPrimaryCategory(category: string) {
    this.pluPrimaryCategory().click()
    this.selectOption(category).click()
  }

  selectProductionCategory(category: string) {
    this.productionProductCategory().click()
    this.selectOption(category).click()
  }

  verifyPluSecondaryCategories(categories: string[]) {
    this.pluSecondaryCategory().click()
    this.selectOptions().should('have.length', categories.length)
    categories.forEach((category) => {
      this.selectOption(category).should('be.visible')
    })
  }

  verifyProductionSubcategories(categories: string[]) {
    this.productionProductSubcategory().click()
    this.selectOptions().should('have.length', categories.length)
    categories.forEach((category) => {
      this.selectOption(category).should('be.visible')
    })
  }

  selectPluSecondaryCategory(category: string) {
    this.pluSecondaryCategory().click()
    this.selectOption(category).click()
  }

  veriyDraftChangesData(variantIndex: number, response: GetProductDto.ProductResponse) {
    const initialVariant = response.product.variants[variantIndex]
    const draftVariant = response.draftChanges.variants[variantIndex]

    this.verifyColumnData(this.baseSelectors.draftLeftColumn, initialVariant)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, draftVariant)
  }

  veriyVersionDraftChangesData(response: GetProductVariantVersionDto) {
    const approvedContent = response.variant
    const draftContent = response.draft

    this.verifySavedDraftChangesInfo(response.draft.changesCount!.reporting)
    this.verifyColumnData(this.baseSelectors.draftLeftColumn, approvedContent)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, draftContent)
  }

  verifyPageData(variant: GetProductDto.ProductVariant) {
    this.verifyColumnData(this.baseSelectors.pageTabWrapper, variant)
  }

  private verifyColumnData(columnSelector: string, variantData: GetProductDto.ProductVariant) {
    cy.get(columnSelector).find(this.selectors.sku).contains(variantData.sku)
    if (variantData.posID) {
      cy.get(columnSelector).find(this.selectors.posId).contains(String(variantData.posID))
    }
    if (variantData.hamiltonGrant.productCode) {
      cy.get(columnSelector)
        .find(this.selectors.hamiltonGrantCode)
        .contains(variantData.hamiltonGrant.productCode!)
    }
    if (variantData.pluReportingName) {
      cy.get(columnSelector)
        .find(this.selectors.pluReportingName)
        .contains(String(variantData.pluReportingName))
    }
    if (variantData.pluPrimaryCategoryID) {
      cy.get(columnSelector)
        .find(this.selectors.pluPrimaryCategory)
        .then(($el) => {
          expect(this.standarizeText($el.text())).to.include(
            this.standarizeText(String(variantData.pluPrimaryCategoryID)),
          )
        })
    }
    if (variantData.pluSecondaryCategoryID) {
      cy.get(columnSelector)
        .find(this.selectors.pluSecondaryCategory)
        .then(($el) => {
          expect(this.standarizeText($el.text())).to.include(
            this.standarizeText(String(variantData.pluSecondaryCategoryID)),
          )
        })
    }
    if (variantData.starKisProductCategoryID) {
      cy.get(columnSelector)
        .find(this.selectors.productionProductCategory)
        .then(($el) => {
          expect(this.standarizeText($el.text())).to.include(
            this.standarizeText(String(variantData.starKisProductCategoryID)),
          )
        })
    }
    if (variantData.starKisProductSubCategoryID) {
      cy.get(columnSelector)
        .find(this.selectors.productionProductSubcategory)
        .then(($el) => {
          expect(this.standarizeText($el.text())).to.include(
            this.standarizeText(String(variantData.starKisProductSubCategoryID)),
          )
        })
    }
    if (this.isVariantOfFoodProduct(variantData)) {
      if (variantData.parentProductSku) {
        cy.get(columnSelector)
          .find(this.selectors.parentProductSku)
          .contains(variantData.parentProductSku)
      }
    } else {
      cy.get(columnSelector).contains(this.texts.parentProductSkuHeaading).should('not.exist')
    }
  }

  private isVariantOfFoodProduct(variant: GetProductDto.ProductVariant) {
    return !Boolean(variant.attributes)
  }

  private standarizeText(text: string) {
    return text.replace(/\W/g, '').toUpperCase()
  }

  public verifyEditAndUndoPluReportingName() {
    this.pluReportingNameEditable().then(($input) => {
      const initialVal = $input.val()
      this.pluReportingNameEditable().type(' test')
      this.verifyIfBottomButtonsAreActive()
      cy.get(this.baseSelectors.undoButton).click()
      this.pluReportingNameEditable().should('have.value', initialVal)
    })
  }

  public verifySelectedValueFor(element: Cypress.Chainable, value: string) {
    element.find(this.selectors.selectedOption).then(($el) => {
      expect(this.standarizeText($el.text())).to.include(this.standarizeText(value))
    })
  }
}
