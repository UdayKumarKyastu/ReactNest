import { SaveChangesConfirmationModalComponent } from './components/EditSaveConfirmationModalComponent'

export class BaseProductPage {
  protected saveChangesModal = new SaveChangesConfirmationModalComponent()

  editButton = () => {
    return cy.get('[data-testid="edit-button"]')
  }
  cancelButton = () => {
    return cy.get('[data-testid="cancel-button"]')
  }
  saveButton = () => {
    return cy.get('[data-testid="save-button"]')
  }
  closeButton = () => {
    return cy.get('[data-testid="cross-button"]')
  }
  draftLeftColumn = () => {
    return cy.get(this.baseSelectors.draftLeftColumn)
  }
  draftRightColumn = () => {
    return cy.get(this.baseSelectors.draftRightColumn)
  }
  footerNavigation = () => {
    return cy.get('[data-cy="footer-navigation"]')
  }
  sectionHeading = () => {
    return cy.get('[data-cy="section-heading"]')
  }
  undoButton = () => {
    return cy.get(this.baseSelectors.undoButton)
  }
  changeIcon = () => {
    return cy.get(this.baseSelectors.changeExclamationIcon)
  }
  roleLabel = () => {
    return cy.get('[data-cy="role-label"]')
  }
  dropdownOption = (option: string) => {
    return cy.contains(this.baseSelectors.dropdown.option, option)
  }

  public readonly baseSelectors = {
    draftLeftColumn: '[data-cy="draft-left-column"]',
    draftRightColumn: '[data-cy="draft-right-column"]',
    datePicker: '.DayPickerInput',
    dropdown: {
      field: '.select__control',
      option: '.select__option',
      container: '.select__value-container',
    },
    undoButton: 'button[class*="DiscardButton"]',
    leftSideNav: '[data-cy="left-side-navigation"]',
    changeExclamationIcon: '[data-testid="change-icon"]',
    navTabChangeIcon: 'a svg',
    fieldLabel: '[class*="FieldLabel"]',
    readonlyField: '[class*="ReadonlyField"]',
    fieldValue: '[class*="Content"]',
    selectWrapper: '[class*=SelectWrapper]',
    pageTabWrapper: '[class*="TabWrapper"]',
  }

  public readonly baseTexts = {
    savedDraftChangesInfo: 'draft changes have been saved',
    noDraftChangesInfo: 'There are no draft changes pending',
    backToVariant: 'Back to current version',
    backToProduct: 'Back to product group',
    backToSearch: 'Back to Search',
  }

  verifySavedDraftChangesInfo(numberOfChanges: number) {
    const expectedMessage = `${numberOfChanges} ${this.baseTexts.savedDraftChangesInfo}`
    cy.contains(expectedMessage)
  }

  protected verifyBaseReadonlyState() {
    this.cancelButton().should('not.exist')
    this.saveButton().should('not.exist')
    this.closeButton().should('not.exist')
    this.editButton().should('exist')
  }

  protected verifyBaseEditState() {
    this.cancelButton().should('exist')
    this.closeButton().should('exist')
    this.saveButton().should('exist')
    this.editButton().should('not.exist')
  }

  protected getReadonlyFieldByLabel(label: string) {
    return cy
      .contains(this.baseSelectors.fieldLabel, `${label}`)
      .parent(this.baseSelectors.readonlyField)
      .find(this.baseSelectors.fieldValue)
  }

  verifyIfBottomButtonsAreActive() {
    this.saveButton().should('be.enabled')
    this.cancelButton().should('be.enabled')
  }

  clickAllUndoButtons() {
    cy.get(this.baseSelectors.undoButton).click({ multiple: true })
  }

  saveChanges() {
    this.saveButton().click()
    this.saveChangesModal.saveChangesButton().click()
  }
}
