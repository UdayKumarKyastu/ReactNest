import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'
import { VariantMarketingPage } from './VariantMarketingPage'

export class VariantDraftChangesPage extends BaseProductPage {
  private variantMarketingPage = new VariantMarketingPage()

  public verifyNoDraftChanges() {
    cy.contains(this.baseTexts.noDraftChangesInfo).should('be.visible')
    this.draftLeftColumn().should('not.exist')
    this.draftRightColumn().should('not.exist')
    cy.get(this.baseSelectors.leftSideNav)
      .find(this.baseSelectors.navTabChangeIcon)
      .should('not.exist')
    this.cancelButton().should('not.exist')
    this.saveButton().should('not.exist')
  }

  public veriyDraftChanges(
    initialValues: GetProductDto.ProductResponse,
    editedValues: GetProductDto.ProductResponse,
  ) {
    const initialVariant = initialValues.product.variants[0]
    const editedVariant = editedValues.draftChanges.variants[0]

    this.verifyColumnData(this.baseSelectors.draftLeftColumn, initialVariant)
    this.verifyColumnData(this.baseSelectors.draftRightColumn, editedVariant)

    cy.get(this.baseSelectors.draftRightColumn)
      .find(this.variantMarketingPage.selectors.nameSection)
      .find(this.baseSelectors.changeExclamationIcon)
      .should('have.length', 1)
    cy.get(this.baseSelectors.draftRightColumn)
      .find(this.variantMarketingPage.selectors.descriptionSection)
      .find(this.baseSelectors.changeExclamationIcon)
      .should('have.length', 1)
  }

  private verifyColumnData(columnSelector: string, variantData: GetProductDto.ProductVariant) {
    cy.get(columnSelector)
      .find(this.variantMarketingPage.selectors.nameSection)
      .contains(variantData.name['en-GB'])
    cy.get(columnSelector)
      .find(this.variantMarketingPage.selectors.descriptionSection)
      .contains(variantData.description.standard['en-GB'])
  }
}
