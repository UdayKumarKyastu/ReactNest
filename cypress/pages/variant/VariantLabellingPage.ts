import { getLabellingOptionsMock } from 'cypress/fixtures/mocks/labelling-options.mock'
import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

export class VariantLabellingPage extends BaseProductPage {
  legalTitleInput = () => {
    return cy.get('#legalTitle')
  }
  legalTitleField = () => {
    return cy.get(this.selectors.fields.legalTitleField)
  }
  countryOfOriginInput = () => {
    return cy.get('#countryOfOriginDescription')
  }
  countryOfOriginField = () => {
    return cy.get(this.selectors.fields.countryOfOriginDescription)
  }
  instructionsForUseDropdown = () => {
    return cy
      .contains('label', this.texts.labels.instructionsForUse)
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  instructionsForUseField = () => {
    return cy.get(this.selectors.fields.storageConditions)
  }
  useByField = () => {
    return cy.get(this.selectors.fields.useBy)
  }
  useByDropdown = () => {
    return cy
      .get('label[for="useBy"]')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  sellByField = () => {
    return cy.get(this.selectors.fields.sellBy)
  }
  sellByDropdown = () => {
    return cy
      .get('label[for="sellBy"]')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  useByTurboChefField = () => {
    return cy.get(this.selectors.fields.useByTurboChef)
  }
  useByTurboChefDropdown = () => {
    return cy
      .get('label[for="useByTurboChef"]')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  sellByTurboChefField = () => {
    return cy.get(this.selectors.fields.sellByTurboChef)
  }
  sellByTurboChefDropdown = () => {
    return cy
      .get('label[for="sellByTurboChef"]')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  eanCodeField = () => {
    return cy.get(this.selectors.fields.ean13Code)
  }
  eanCodeInput = () => {
    return cy.get('#ean13Code')
  }
  productWeightYesRadio = () => {
    return cy.get(this.selectors.fields.includeAverageWeightOnLabelYes).find('input')
  }
  productWeightNoRadio = () => {
    return cy.get(this.selectors.fields.includeAverageWeightOnLabelNo).find('input')
  }
  nutritionalInformationRadioYes = () => {
    return cy.get(this.selectors.fields.includeNutritionalInformationOnLabelYes).find('input')
  }
  nutritionalInformationRadioNo = () => {
    return cy.get(this.selectors.fields.includeNutritionalInformationOnLabelNo).find('input')
  }
  canBeCookedInTurboChefRadioYes = () => {
    return cy.get(this.selectors.fields.canBeCookedInTurboChefRadioYes).find('input')
  }
  canBeCookedInTurboChefRadioNo = () => {
    return cy.get(this.selectors.fields.canBeCookedInTurboChefRadioNo).find('input')
  }
  legalTitleInputWrapper = () => {
    return cy.contains('[class*="FieldLabel"]', 'Legal title').parent('[class*="InputWrapper"]')
  }
  countryOfOriginInputWrapper = () => {
    return cy
      .contains('[class*="FieldLabel"]', 'Country of origin description (if applicable)')
      .parent('[class*="InputWrapper"]')
  }

  readonly selectors = {
    radio: 'input[type="radio"]',
    fields: {
      legalTitleField: '[data-cy="legalTitle"]',
      countryOfOriginDescription: '[data-cy="countryOfOriginDescription"]',
      storageConditions: '[data-cy="storageConditions"]',
      useBy: '[data-cy="useBy"]',
      sellBy: '[data-cy="sellBy"]',
      useByTurboChef: '[data-cy="useByTurboChef"]',
      sellByTurboChef: '[data-cy="sellByTurboChef"]',
      includeAverageWeightOnLabelYes: '[data-cy="includeAverageWeightOnLabelYes"]',
      includeAverageWeightOnLabelNo: '[data-cy="includeAverageWeightOnLabelNo"]',
      includeNutritionalInformationOnLabelYes:
        '[data-cy="includeNutritionalInformationOnLabelYes"]',
      includeNutritionalInformationOnLabelNo: '[data-cy="includeNutritionalInformationOnLabelNo"]',
      canBeCookedInTurboChefRadioYes: '[data-cy="canBeCookedInTurboChefYes"]',
      canBeCookedInTurboChefRadioNo: '[data-cy="canBeCookedInTurboChefNo"]',
      ean13Code: '[data-cy="ean13Code"]',
    },
  }

  readonly texts = {
    mandatoryInfo: 'All fields below are mandatory to complete for Pret to sell this product.',
    labels: {
      legalTitle: 'Legal title',
      countryOfOrigin: 'Country of origin description (if applicable)',
      instructionsForUse: 'Instructions for use',
      useBy: 'Use by',
      sellBy: 'Sell by',
      eanCode: 'EAN-13 code',
    },
  }

  verifyReadonlyState() {
    this.verifyBaseReadonlyState()
    this.legalTitleField().should('be.visible')
    this.countryOfOriginField().should('be.visible')
    this.instructionsForUseField().scrollIntoView().should('be.visible')
    this.useByField().scrollIntoView().should('be.visible')
    this.sellByField().scrollIntoView().should('be.visible')
    this.useByTurboChefField().scrollIntoView().should('be.visible')
    this.sellByTurboChefField().scrollIntoView().should('be.visible')
    cy.get(this.selectors.radio).should('have.length', 6).and('be.disabled')
    this.eanCodeField().scrollIntoView().should('be.visible')
  }

  verifyEditState() {
    this.verifyBaseEditState()
    cy.contains(this.texts.mandatoryInfo).should('be.visible')
    this.legalTitleInput().should('be.visible').and('be.enabled')
    this.countryOfOriginInput().should('be.visible').and('be.enabled')
    this.instructionsForUseDropdown().scrollIntoView().should('be.visible')
    this.useByDropdown().scrollIntoView().should('be.visible')
    this.sellByDropdown().scrollIntoView().should('be.visible')
    this.useByTurboChefDropdown().scrollIntoView().should('be.visible')
    this.sellByTurboChefDropdown().scrollIntoView().should('be.visible')
    cy.get(this.selectors.radio).should('have.length', 6).and('be.enabled')
    this.eanCodeInput().scrollIntoView().should('be.visible')
  }

  selectInstructionsForUse(option: string) {
    this.instructionsForUseDropdown().click()
    this.dropdownOption(option).click()
  }

  selectUseBy(option: string) {
    this.useByDropdown().click()
    this.dropdownOption(option).click()
  }

  selectSellBy(option: string) {
    this.sellByDropdown().click()
    this.dropdownOption(option).click()
  }

  selectTurboChefUseBy(option: string) {
    this.useByTurboChefDropdown().click()
    this.dropdownOption(option).click()
  }

  selectTurboChefSellBy(option: string) {
    this.sellByTurboChefDropdown().click()
    this.dropdownOption(option).click()
  }

  veriyDraftChangesData(varinatIndex: number, response: GetProductDto.ProductResponse) {
    const initialVariant = response.product.variants[varinatIndex]
    const editedVariant = response.draftChanges.variants[varinatIndex]

    this.verifyColumnData(this.baseSelectors.draftLeftColumn, initialVariant)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, editedVariant)
  }

  veriyVersionDraftChangesData(response: GetProductVariantVersionDto) {
    const approvedContent = response.variant
    const draftContent = response.draft

    this.verifySavedDraftChangesInfo(response.draft.changesCount!.labelling)
    this.verifyColumnData(this.baseSelectors.draftLeftColumn, approvedContent)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, draftContent)
  }

  verifyPageData(variant: GetProductDto.ProductVariant) {
    this.verifyColumnData(this.baseSelectors.pageTabWrapper, variant)
  }

  private verifyColumnData(columnSelector: string, variantData: GetProductDto.ProductVariant) {
    const labellingOptions = getLabellingOptionsMock()

    if (variantData.labelling.legalTitle) {
      cy.get(columnSelector)
        .find(this.selectors.fields.legalTitleField)
        .should('have.text', variantData.labelling.legalTitle)
    } else {
      cy.get(columnSelector).find(this.selectors.fields.legalTitleField).should('have.text', '')
    }

    if (variantData.labelling.countryOfOriginDescription) {
      cy.get(columnSelector)
        .find(this.selectors.fields.countryOfOriginDescription)
        .should('have.text', variantData.labelling.countryOfOriginDescription)
    } else {
      cy.get(columnSelector).find(this.selectors.fields.legalTitleField).should('have.text', '')
    }

    if (variantData.labelling.storageConditions) {
      cy.get(columnSelector)
        .find(this.selectors.fields.storageConditions)
        .should(
          'have.text',
          labellingOptions.instructionsForUse.find(
            (option) => option.key === variantData.labelling.storageConditions,
          )!.label,
        )
    } else {
      cy.get(columnSelector).find(this.selectors.fields.storageConditions).should('have.text', '')
    }

    if (variantData.labelling.useBy) {
      cy.get(columnSelector)
        .find(this.selectors.fields.useBy)
        .should(
          'have.text',
          labellingOptions.useBy.find((option) => option.key === variantData.labelling.useBy)!
            .label,
        )
    } else {
      cy.get(columnSelector).find(this.selectors.fields.useBy).should('have.text', '')
    }

    if (variantData.labelling.sellBy) {
      cy.get(columnSelector)
        .find(this.selectors.fields.sellBy)
        .should(
          'have.text',
          labellingOptions.sellBy.find((option) => option.key === variantData.labelling.sellBy)!
            .label,
        )
    } else {
      cy.get(columnSelector).find(this.selectors.fields.sellBy).should('have.text', '')
    }

    if (variantData.labelling.useByTurboChef) {
      cy.get(columnSelector)
        .find(this.selectors.fields.useByTurboChef)
        .should(
          'have.text',
          labellingOptions.useBy.find(
            (option) => option.key === variantData.labelling.useByTurboChef,
          )!.label,
        )
    } else {
      cy.get(columnSelector).find(this.selectors.fields.useByTurboChef).should('have.text', '')
    }

    if (variantData.labelling.sellByTurboChef) {
      cy.get(columnSelector)
        .find(this.selectors.fields.sellByTurboChef)
        .should(
          'have.text',
          labellingOptions.sellBy.find(
            (option) => option.key === variantData.labelling.sellByTurboChef,
          )!.label,
        )
    } else {
      cy.get(columnSelector).find(this.selectors.fields.sellByTurboChef).should('have.text', '')
    }

    if (variantData.labelling.ean13Code) {
      cy.get(columnSelector)
        .find(this.selectors.fields.ean13Code)
        .should('have.text', variantData.labelling.ean13Code)
    } else {
      cy.get(columnSelector).find(this.selectors.fields.ean13Code).should('have.text', '')
    }

    if (variantData.labelling.includeAverageWeightOnLabel) {
      cy.get(columnSelector)
        .find(this.selectors.fields.includeAverageWeightOnLabelYes)
        .find('input')
        .should('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.fields.includeAverageWeightOnLabelNo)
        .find('input')
        .should('be.checked')
    }

    if (variantData.labelling.includeNutritionalInformationOnLabel) {
      cy.get(columnSelector)
        .find(this.selectors.fields.includeNutritionalInformationOnLabelYes)
        .find('input')
        .should('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.fields.includeNutritionalInformationOnLabelNo)
        .find('input')
        .should('be.checked')
    }

    if (variantData.labelling.canBeCookedInTurboChef) {
      cy.get(columnSelector)
        .find(this.selectors.fields.canBeCookedInTurboChefRadioYes)
        .find('input')
        .should('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.fields.canBeCookedInTurboChefRadioNo)
        .find('input')
        .should('be.checked')
    }
  }
}
