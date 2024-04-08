export class RejectAllDraftChangesModalComponent {
  public rejectChangesButton = () => {
    return cy.get('[data-cy="confirm-button"]')
  }
  public cancelButton = () => {
    return cy.get('[data-cy="cancel-button"]')
  }
}
