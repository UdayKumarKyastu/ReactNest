export class ApproveAllDraftChangesModalComponent {
  public approveChangesButton = () => {
    return cy.get('[data-cy="approve-button"]')
  }
  public cancelChangesButton = () => {
    return cy.get('[data-cy="cancel-button"]')
  }
}
