import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

type ProductSetup = GetProductDto.BaristaSetup

export class ProductSetupPage extends BaseProductPage {
  equipmentSection = () => {
    return cy.get('[data-cy="equipment-section"]')
  }
  canCustomerAddFollowingSection = () => {
    return cy.get('[data-cy="can-customer-add-following-section"]')
  }
  canDrinkBeMadeSection = () => {
    return cy.get('[data-cy="can-drink-be-made-section"]')
  }
  iceMachineCheckbox = () => {
    return cy.get(this.selectors.iceMachineCheckbox)
  }
  blenderCheckbox = () => {
    return cy.get(this.selectors.blenderCheckbox)
  }
  variantsCheckbox = () => {
    return cy.get(this.selectors.variantsCheckbox)
  }
  decafChexbox = () => {
    return cy.get(this.selectors.decafChexbox)
  }
  syrupCheckbox = () => {
    return cy.get(this.selectors.syrupCheckbox)
  }
  whippedCream = () => {
    return cy.get(this.selectors.whippedCreamCheckbox)
  }

  readonly selectors = {
    iceMachineCheckbox: '#iceMachineRequired',
    blenderCheckbox: '#blenderRequired',
    variantsCheckbox: '#canHaveVariants',
    decafChexbox: '#canBeDecaf',
    syrupCheckbox: '#canAddSyrup',
    extraCoffeShotCheckbox: '#canAddExtraCoffeeShot',
    whippedCreamCheckbox: '#canAddWhippedCream',
    wihoutMilkCheckbox: '#canBeWithoutMilk',
    semiSkimmedMilkCheckbox: '#canBeWithSemiSkimmedMilk',
    skimmedMilkCheckbox: '#canBeWithSkimmedMilk',
    oatMilkCheckbox: '#canBeWithOatMilk',
    riceCoconutMilkCheckbox: '#canBeWithRiceCoconutMilk',
    soyMilkCheckbox: '#canBeWithSoyMilk',
  }

  verifyReadonlyView() {
    this.verifyBaseReadonlyState()
    this.equipmentSection().find('[type="checkbox"]').should('have.length', 4).and('be.disabled')
    this.canCustomerAddFollowingSection()
      .find('[type="checkbox"]')
      .should('have.length', 3)
      .and('be.disabled')
    this.canDrinkBeMadeSection()
      .find('[type="checkbox"]')
      .should('have.length', 6)
      .and('be.disabled')
  }

  verifyEditView() {
    this.verifyBaseEditState()
    this.verifyEquipmentSectionEditState()
    this.canCustomerAddFollowingSection()
      .find('[type="checkbox"]')
      .should('have.length', 3)
      .and('be.enabled')
    this.canDrinkBeMadeSection()
      .find('[type="checkbox"]')
      .should('have.length', 6)
      .and('be.disabled')
  }

  private verifyEquipmentSectionEditState() {
    this.iceMachineCheckbox().should('be.enabled')
    this.blenderCheckbox().should('be.enabled')
    this.variantsCheckbox().should('be.enabled')
    this.decafChexbox().should('be.disabled')
  }

  verifyDraftChangesData(response: GetProductDto.ProductResponse) {
    const approvedContent = response.product.setUp!
    const draftChanges = response.draftChanges.setUp!

    this.verifyColumnData(this.baseSelectors.draftLeftColumn, approvedContent)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, draftChanges)
  }

  private verifyColumnData(columnSelector: string, data: ProductSetup) {
    if (data.iceMachineRequired) {
      cy.get(columnSelector)
        .find(this.selectors.iceMachineCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.iceMachineCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.blenderRequired) {
      cy.get(columnSelector)
        .find(this.selectors.blenderCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.blenderCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.canHaveVariants) {
      cy.get(columnSelector)
        .find(this.selectors.variantsCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.variantsCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.canBeDecaf) {
      cy.get(columnSelector)
        .find(this.selectors.decafChexbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.decafChexbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.canAddSyrup) {
      cy.get(columnSelector)
        .find(this.selectors.syrupCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.syrupCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.canAddExtraCoffeeShot) {
      cy.get(columnSelector)
        .find(this.selectors.extraCoffeShotCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.extraCoffeShotCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }

    if (data.canAddWhippedCream) {
      cy.get(columnSelector)
        .find(this.selectors.whippedCreamCheckbox)
        .should('be.disabled')
        .and('be.checked')
    } else {
      cy.get(columnSelector)
        .find(this.selectors.whippedCreamCheckbox)
        .should('be.disabled')
        .and('not.be.checked')
    }
  }
}
