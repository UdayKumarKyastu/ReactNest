import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

export class ProductMarketingPage extends BaseProductPage {
  nameShowAllLanguagesButton = () => {
    return cy.get(this.selectors.nameSection).contains(this.texts.showLanguages)
  }
  nameHideOtherLanguagesButton = () => {
    return cy.get(this.selectors.nameSection).contains(this.texts.hideLanguages)
  }
  descriptionShowAllLanguagesButton = () => {
    return cy.get(this.selectors.descriptionSection).contains(this.texts.showLanguages)
  }
  descriptionHideOtherLanguagesButton = () => {
    return cy.get(this.selectors.descriptionSection).contains(this.texts.hideLanguages)
  }
  nameLanguagesList = () => {
    return cy.get(this.selectors.nameSection).get(this.selectors.languageList)
  }
  nameLanguageListLabels = () => {
    return cy.get(this.selectors.nameSection).get(this.selectors.languageField)
  }
  descriptionLanguageListLabels = () => {
    return cy.get(this.selectors.descriptionSection).get(this.selectors.languageField)
  }
  descriptionLanguagesList = () => {
    return cy.get(this.selectors.descriptionSection).get(this.selectors.languageList)
  }
  nameInput = () => {
    return cy.get(this.selectors.nameSection).get(this.selectors.input)
  }
  descriptionInput = () => {
    return cy.get(this.selectors.descriptionSection).get(this.selectors.textarea)
  }
  backToSearchButton = () => {
    return cy.contains(this.texts.backToSearch)
  }

  private selectors = {
    nameSection: '[data-cy="product-marketing-name-section"]',
    descriptionSection: '[data-cy="product-marketing-description-section"]',
    languageList: '[data-cy="languages-list"]',
    languageField: '[data-cy="language-field"]',
    input: 'input',
    textarea: 'textarea',
  }

  private texts = {
    marketingName: 'Product Marketing Name',
    marketingDescription: 'Product Marketing Description',
    showLanguages: 'Show all languages',
    hideLanguages: 'Hide other languages',
    languagesLabels: {
      main: 'EN-GB',
      others: {
        'en-US': 'EN-US',
        'fr-FR': 'FR-FR',
        'en-HK': 'EN-HK',
        'zh-HK': 'ZH-HK',
      },
    },
    backToSearch: 'Back to Search',
  }

  public verifyNameOtherLanguagesContent(testProduct: GetProductDto.Product) {
    const productNames = testProduct.name
    this.nameLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-US'])
      .parents(this.selectors.languageField)
      .contains(productNames['en-US'])
    this.nameLanguageListLabels()
      .contains(this.texts.languagesLabels.others['fr-FR'])
      .parents(this.selectors.languageField)
      .contains(productNames['fr-FR'])
    this.nameLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-HK'])
      .parents(this.selectors.languageField)
      .contains(productNames['en-HK'])
    this.nameLanguageListLabels()
      .contains(this.texts.languagesLabels.others['zh-HK'])
      .parents(this.selectors.languageField)
      .contains(productNames['zh-HK'])
  }

  public verifyDescriptionOtherLanguagesContent(testProduct: GetProductDto.Product) {
    const productDescriptions = testProduct.description
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-US'])
      .parents(this.selectors.languageField)
      .contains(productDescriptions['en-US'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['fr-FR'])
      .parents(this.selectors.languageField)
      .contains(productDescriptions['fr-FR'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-HK'])
      .parents(this.selectors.languageField)
      .contains(productDescriptions['en-HK'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['zh-HK'])
      .parents(this.selectors.languageField)
      .contains(productDescriptions['zh-HK'])
  }

  public verifyReadonlyState() {
    this.verifyBaseReadonlyState()
    this.nameInput().should('not.exist')
    this.descriptionInput().should('not.exist')
  }

  public verifyEditState() {
    this.verifyBaseEditState()
    this.nameInput().should('be.visible')
    this.descriptionInput().should('be.visible')
  }
}
