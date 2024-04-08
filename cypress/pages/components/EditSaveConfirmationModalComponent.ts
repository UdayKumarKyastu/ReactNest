export class SaveChangesConfirmationModalComponent {
  wholeModal = () => {
    return cy.get(this.selectors.hedline).parents(this.selectors.modal)
  }
  headline = () => {
    return cy.get(this.selectors.hedline)
  }
  backToEditButton = () => {
    return this.wholeModal().find(this.selectors.backToEditButton)
  }
  saveChangesButton = () => {
    return this.wholeModal().find(this.selectors.saveChangesButton)
  }

  private selectors = {
    hedline: '[data-cy="save-changes-modal-headline"]',
    modal: '[role="dialog"]',
    saveChangesButton: '[data-cy="approve-button"]',
    backToEditButton: '[data-cy="cancel-button"]',
  }

  private texts = {
    backToEditButton: 'Cancel',
    saveChangesButton: 'Save changes',
  }
}
