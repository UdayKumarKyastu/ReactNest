import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { CountryCode } from 'src/shared/model/country-code'
import { BaseProductPage } from '../BaseProductPage'
import { DatePickerComponent } from '../components/DatePickerComponent'

export class VariantMarketingPage extends BaseProductPage {
  showNameLanguagesButton = () => {
    return cy.get(this.selectors.nameSection).contains(this.texts.showLanguages)
  }
  showDescriptionLanguagesButton = () => {
    return cy.get(this.selectors.descriptionSection).contains(this.texts.showLanguages)
  }
  hideNameLanguagesButton = () => {
    return cy.get(this.selectors.nameSection).contains(this.texts.hideLanguages)
  }
  hideDescriptionLanguagesButton = () => {
    return cy.get(this.selectors.descriptionSection).contains(this.texts.hideLanguages)
  }
  nameLanguagesList = () => {
    return cy.get(`${this.selectors.nameSection} ${this.selectors.languageInputList}`)
  }
  descriptionLanguagesList = () => {
    return cy.get(`${this.selectors.descriptionSection} ${this.selectors.languageInputList}`)
  }
  nameLanguageListLabels = () => {
    return cy.get(this.selectors.nameSection).get(this.selectors.languageLabel)
  }
  descriptionLanguageListLabels = () => {
    return cy.get(this.selectors.descriptionSection).get(this.selectors.languageLabel)
  }
  delistProductOnDatepicker = () => {
    return cy.get('#liveTo')
  }
  delistProductOnField = () => {
    return cy.get(this.selectors.delistProductOnField)
  }
  makeProductVisibleOnRead = () => {
    return cy.get('[data-cy="read-make-product-visible-on"]')
  }
  dateProductDisplausNewTillEdit = () => {
    return cy.get('#newUntilDate')
  }
  dateProductDisplausNewTillRead = () => {
    return cy.get('[data-cy="read-date-display-product-as-new"]')
  }
  marketingNameGbInput = () => {
    return cy.get(`${this.selectors.nameSection} ${this.selectors.gbLanguageField} input`)
  }
  marketingDescriptionGbInput = () => {
    return cy.get(`${this.selectors.descriptionSection} ${this.selectors.gbLanguageField} textarea`)
  }
  websiteReleaseDatesSectionReleaseDatesLabel = () => {
    return cy
      .get(this.selectors.websiteReleaseDatesSection)
      .contains(this.texts.subsectionHeadings[2])
  }
  websiteReleaseDatesSectionLiveFromLabel = () => {
    return cy.get(this.selectors.websiteReleaseDatesSection).contains(this.texts.liveFrom)
  }
  websiteReleaseDatesSectionLiveUntilLabel = () => {
    return cy.get(this.selectors.websiteReleaseDatesSection).contains(this.texts.liveUntil)
  }
  websiteEditButton = () => {
    return cy.get(this.selectors.editButton)
  }
  getTooltipInLiveFromEditView = () => {
    return cy.get(this.selectors.editViewLiveFromSection)
  }
  getTooltipInLiveUntilEditView = () => {
    return cy.get(this.selectors.editViewLiveUntilSection)
  }
  tooltips = () => {
    return cy.get('div[class*="StyledTooltip"]')
  }
  popupInEditView = () => {
    return cy.get('*[class*="TooltipText"]')
  }

  public readonly selectors = {
    nameSection: '[data-cy="variant-marketing-name-section"]',
    descriptionSection: '[data-cy="variant-marketing-description-section"]',
    languageInputList: '[data-cy="languages-list"]',
    languageLabel: '[data-cy="language-field"]',
    delistProductOnSection: '[data-cy="delist-product-on-wrapper"]',
    dateProductDisplaysNewTillSection: '[data-cy="product-display-new-till-wrapper"]',
    isProductAvailableForSection: '[data-cy="is-product-available-for-section"]',
    customerVisibilitySection: '[data-cy="customer-visibility-section"]',
    productDisplaySeciotn: '[data-cy="product-display-section"]',
    pretDeliversSection: '[data-cy="pret-delivers-section"]',
    inStoreSection: '[data-cy="in-store-section"]',
    websiteReleaseDatesSection: '[data-cy="website-release-dates-section"]',
    checkbox: '[type="checkbox"]',
    makeProductVisibleOnInput: '#liveFrom',
    delistProductOnInput: '#liveTo',
    gbLanguageField: '[data-cy="language-gb-field"]',
    clickAndCollectCheckbox: '#availableForCollection',
    productIsVisibleOnDeliversWebsiteCheckbox: '#publishProductToDeliveryWebsite',
    chefsSpecial: '#isChefSpecial',
    delistProductOnField: '[data-cy="read-delist-product-on"]',
    editButton: '[data-testid="edit-button"]',
    editViewLiveFromSection: '[data-cy="make-product-visible-on-wrapper"]',
    editViewLiveUntilSection: '[data-cy="delist-product-on-wrapper"]',
  }

  public readonly texts = {
    showLanguages: 'Show all languages',
    hideLanguages: 'Hide other languages',
    liveFrom: 'Live from',
    liveUntil: 'Live until',
    subsectionHeadings: [
      'Product descriptions',
      'Is product available for',
      'Release dates',
      'Customer visibility',
      'Product display',
      'Pret Delivers',
      'In store',
    ],
    languagesLabels: {
      main: 'EN-GB',
      others: {
        'en-US': 'EN-US',
        'fr-FR': 'FR-FR',
        'en-HK': 'EN-HK',
        'zh-HK': 'ZH-HK',
      },
    },
    editViewReleaseDatesTooltip: 'This value can only be modified in in Hamilton Grant',
  }

  public verifyBasicElements() {
    this.texts.subsectionHeadings.forEach((heading) => {
      cy.contains(heading).scrollIntoView().should('be.visible')
    })
  }

  public verifyNameOtherLanguagesContent(testProduct: GetProductDto.Product) {
    const productNames = testProduct.variants[0].name
    this.nameLanguageListLabels()
      .contains(this.texts.languagesLabels.others['fr-FR'])
      .parents(this.selectors.languageLabel)
      .contains(productNames['fr-FR'])
  }

  public verifyDescriptionOtherLanguagesContent(testProduct: GetProductDto.Product) {
    const productDescriptions = testProduct.variants[0].description.standard
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-US'])
      .parents(this.selectors.languageLabel)
      .contains(productDescriptions['en-US'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['fr-FR'])
      .parents(this.selectors.languageLabel)
      .contains(productDescriptions['fr-FR'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['en-HK'])
      .parents(this.selectors.languageLabel)
      .contains(productDescriptions['en-HK'])
    this.descriptionLanguageListLabels()
      .contains(this.texts.languagesLabels.others['zh-HK'])
      .parents(this.selectors.languageLabel)
      .contains(productDescriptions['zh-HK'])
  }

  public verifyReadonlyState(variantData: GetProductDto.ProductVariant, countryCode: CountryCode) {
    this.verifyBaseReadonlyState()
    this.verifyIsProductAvaliableForSectionReadView()
    this.verifyCustomerVisibilitySectionReadView()
    this.verifyWebsiteReleaseDatesSectionReadView(variantData)
    this.verifyProductDisplaySectionReadView(variantData)
    this.verifyPretDeliversSectionReadView()
    this.verifyInStoreSectionReadView()

    if (countryCode === CountryCode.FR) {
      this.verifyProductDescriptionsSectionReadView()
    } else {
      this.verifyMarketProductDescriptionsSectionReadView()
    }
  }

  public verifyEditState(countryCode: CountryCode) {
    this.verifyBaseEditState()
    this.verifyIsProductAvaliableForSectionEditView()
    this.verifyCustomerVisibilitySectionEditView()
    this.verifyWebsiteReleaseDatesSectionEditView()
    this.verifyProductDisplaySectionEditView()
    this.verifyPretDeliversSectionEditView()
    this.verifyInStoreSectionEditView()

    if (countryCode === CountryCode.FR) {
      this.verifyProductDescriptionsSectionEditView()
    } else {
      this.verifyMarketOnlyProductDescriptionsSectionEditView()
    }
  }

  private verifyMarketOnlyProductDescriptionsSectionEditView() {
    cy.get(this.selectors.nameSection).find('input').should('have.length', 1).and('be.enabled')
    cy.get(this.selectors.descriptionSection)
      .find('textarea')
      .should('have.length', 1)
      .and('be.enabled')
  }

  private verifyProductDescriptionsSectionEditView() {
    this.showNameLanguagesButton().click()
    cy.get(this.selectors.nameSection).find('input').should('have.length', 2).and('be.enabled')
    this.showDescriptionLanguagesButton().click()
    cy.get(this.selectors.descriptionSection)
      .find('textarea')
      .should('have.length', 2)
      .and('be.enabled')
  }

  private verifyProductDescriptionsSectionReadView() {
    this.showNameLanguagesButton().click()
    cy.get(this.selectors.nameSection).find(this.selectors.languageLabel).should('have.length', 2)
    this.showDescriptionLanguagesButton().click()
    cy.get(this.selectors.descriptionSection)
      .find(this.selectors.languageLabel)
      .should('have.length', 2)
  }

  private verifyMarketProductDescriptionsSectionReadView() {
    cy.get(this.selectors.nameSection).find(this.selectors.languageLabel).should('have.length', 1)
    cy.get(this.selectors.descriptionSection)
      .find(this.selectors.languageLabel)
      .should('have.length', 1)
  }

  private verifyIsProductAvaliableForSectionEditView() {
    cy.get(this.selectors.isProductAvailableForSection)
      .find(this.selectors.checkbox)
      .should('have.length', 3)
      .and('be.enabled')
  }

  private verifyIsProductAvaliableForSectionReadView() {
    cy.get(this.selectors.isProductAvailableForSection)
      .find(this.selectors.checkbox)
      .should('have.length', 3)
      .and('be.disabled')
  }

  private verifyCustomerVisibilitySectionEditView() {
    cy.get(this.selectors.customerVisibilitySection)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
      .and('be.enabled')
  }

  private verifyCustomerVisibilitySectionReadView() {
    cy.get(this.selectors.customerVisibilitySection)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
      .and('be.disabled')
  }

  private verifyWebsiteReleaseDatesSectionEditView() {
    cy.get(this.selectors.websiteReleaseDatesSection)
      .find(this.selectors.makeProductVisibleOnInput)
      .should('be.disabled')
      .and('have.length', 1)
    cy.get(this.selectors.websiteReleaseDatesSection)
      .find(this.selectors.delistProductOnInput)
      .should('be.disabled')
      .and('have.length', 1)
  }

  private verifyWebsiteReleaseDatesSectionReadView(variantData: GetProductDto.ProductVariant) {
    cy.get(this.selectors.websiteReleaseDatesSection)
      .find(this.baseSelectors.datePicker)
      .should('not.exist')
    this.makeProductVisibleOnRead().should(
      'have.text',
      new Date(variantData.availability.liveSchedule.on!).toLocaleDateString('en-GB'),
    )
    this.delistProductOnField().should(
      'have.text',
      new Date(variantData.availability.liveSchedule.off!).toLocaleDateString('en-GB'),
    )
  }

  private verifyProductDisplaySectionEditView() {
    cy.get(this.selectors.productDisplaySeciotn)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
      .and('be.enabled')
    cy.get(this.selectors.productDisplaySeciotn)
      .find(this.baseSelectors.datePicker)
      .find('input')
      .should('have.length', 1)
  }

  private verifyProductDisplaySectionReadView(variantData: GetProductDto.ProductVariant) {
    cy.get(this.selectors.productDisplaySeciotn)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
      .and('be.disabled')
    this.dateProductDisplausNewTillRead().should(
      'have.text',
      new Date(variantData.availability.displayAsNew.until!).toLocaleDateString('en-GB'),
    )
  }

  private verifyInStoreSectionEditView() {
    cy.get(this.selectors.inStoreSection).find(this.baseSelectors.dropdown.field)
  }

  private verifyPretDeliversSectionReadView() {
    cy.get(this.selectors.pretDeliversSection)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
      .and('be.disabled')
  }

  private verifyPretDeliversSectionEditView() {
    cy.get(this.selectors.pretDeliversSection)
      .find(this.selectors.checkbox)
      .should('have.length', 2)
  }

  private verifyInStoreSectionReadView() {
    cy.get(this.selectors.inStoreSection)
      .find(this.baseSelectors.dropdown.field)
      .should('not.exist')
  }

  public verifyEditingMainName(text: string) {
    this.marketingNameGbInput().then(($input) => {
      const initialVal = $input.val()
      this.marketingNameGbInput().type(text)
      this.verifyIfBottomButtonsAreActive()
      cy.get(this.selectors.nameSection)
        .find(this.selectors.gbLanguageField)
        .find(this.baseSelectors.undoButton)
        .click()
      this.marketingNameGbInput().should('have.value', initialVal)
    })
  }

  public verifyEditingMainDescription(text: string) {
    this.marketingDescriptionGbInput().then(($input) => {
      const initialVal = $input.val()
      this.marketingDescriptionGbInput().type(text)
      this.verifyIfBottomButtonsAreActive()
      cy.get(this.selectors.descriptionSection)
        .find(this.selectors.gbLanguageField)
        .find(this.baseSelectors.undoButton)
        .click()
      this.marketingDescriptionGbInput().should('have.value', initialVal)
    })
  }

  public verifyEditingDedlistProductOnDatepicker() {
    this.delistProductOnDatepicker().then(($input) => {
      const initialVal = $input.val()
      this.delistProductOnDatepicker().click()
      const datePicker = new DatePickerComponent()
      datePicker.selectLastDayOfMonth()
      this.delistProductOnDatepicker().should('not.have.value', initialVal)
      this.verifyIfBottomButtonsAreActive()
      cy.get(this.selectors.delistProductOnSection).find(this.baseSelectors.undoButton).click()
      this.delistProductOnDatepicker().should('have.value', initialVal)
    })
  }

  public verifyEditingCheckbox() {
    cy.get('[type="checkbox"]:not(:checked)')
      .parents('[class*="CheckboxWrapper"]')
      .first()
      .as('firstUnchecked')
      .click()
    this.verifyIfBottomButtonsAreActive()
    cy.get('@firstUnchecked').click()
  }

  public verifyEditingInStoreDropdown() {
    cy.get(this.selectors.inStoreSection).find(this.baseSelectors.dropdown.field).click()
    cy.get(this.baseSelectors.dropdown.option).first().click()
    this.saveButton().should('be.enabled')
    cy.get(this.selectors.inStoreSection).find(this.baseSelectors.undoButton).click()
    // TODO: check dropdown values
  }

  veriyDraftChangesData(varinatIndex: number, response: GetProductDto.ProductResponse) {
    const initialVariant = response.product.variants[varinatIndex]
    const editedVariant = response.draftChanges.variants[varinatIndex]

    this.verifyColumnData(this.baseSelectors.draftLeftColumn, initialVariant)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, editedVariant)
  }

  veriyVersionDraftChangesData(response: GetProductVariantVersionDto) {
    const approvedData = response.variant
    const draftData = response.draft

    this.verifySavedDraftChangesInfo(response.draft.changesCount!.marketing)
    this.verifyColumnData(this.baseSelectors.draftLeftColumn, approvedData)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, draftData)
  }

  verifyPageData(variant: GetProductDto.ProductVariant) {
    this.verifyColumnData(this.baseSelectors.pageTabWrapper, variant)
  }

  private verifyColumnData(columnSelector: string, variantData: GetProductDto.ProductVariant) {
    cy.get(columnSelector)
      .find(this.selectors.nameSection)
      .contains(variantData.name['en-GB'])
      .scrollIntoView()
      .should('be.visible')
    cy.get(columnSelector)
      .find(this.selectors.descriptionSection)
      .contains(variantData.description.standard['en-GB'])
      .scrollIntoView()
      .should('be.visible')
    // TODO: check marketing page data
  }
}
