export class DiscardChangesConfirmationModalComponent {
  wholeModal = () => {
    return cy.get(this.selectors.hedline).parents(this.selectors.modal)
  }
  headline = () => {
    return cy.get(this.selectors.hedline)
  }
  goBackToEditButton = () => {
    return this.wholeModal().find(this.selectors.backToEditButton)
  }
  discardChangesButton = () => {
    return this.wholeModal().find(this.selectors.discardChangesButton)
  }

  private selectors = {
    hedline: '[data-cy="discard-changes-modal-headline"]',
    modal: '[role="dialog"]',
    discardChangesButton: '[data-cy="confirm-button"]',
    backToEditButton: '[data-cy="cancel-button"]',
  }

  private texts = {
    backToEditButton: 'Go back to edit',
    discardChangesButton: 'Discard changes',
  }
}
