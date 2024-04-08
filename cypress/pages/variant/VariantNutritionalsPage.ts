export class VariantNutritionalsPage {
  private texts = {
    subsectionHeadings: ['Product details', 'Nutritional information', 'Suitable for', 'Allergens'],
  }

  public verifyBasicElements() {
    this.texts.subsectionHeadings.forEach((text) => {
      cy.contains(text)
    })
  }
}
