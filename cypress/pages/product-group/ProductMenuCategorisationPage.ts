import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { BaseProductPage } from '../BaseProductPage'

type CategoryTree = GetProductDto.ProductCategoryTree

export class ProductMenuCategorisationPage extends BaseProductPage {
  removeButton = () => {
    return cy.get(this.selectors.removeButton)
  }
  addCategoryButton = () => {
    return cy.contains(this.texts.addNewCategory)
  }
  categoryInput = () => {
    return cy.get(this.selectors.categoryInput)
  }
  editModalCategoryInput = () => {
    return cy
      .contains('label', 'Category')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  editModalSubcategoryInput = () => {
    return cy
      .contains('label', 'Subcategory')
      .parent(this.baseSelectors.selectWrapper)
      .find(this.baseSelectors.dropdown.container)
  }
  selectOption = (option: string) => {
    return cy.contains('.select__option', option)
  }
  applyCategoryButton = () => {
    return cy.get('[data-cy="apply-category"]')
  }
  backToSearchButton = () => {
    return cy.contains(this.texts.backToSearch)
  }

  readonly texts = {
    addNewCategory: '+ Add new menu category',
    menuCategoryLabel: 'Menu category',
    categoryRemoved: 'This category has been removed',
    backToSearch: 'Back to Search',
  }

  readonly selectors = {
    removeButton: 'button[class*="RemoveButton"]',
    categoryField: '[class*=Content]',
    categoryInput: '[data-cy="category-input"] input',
  }

  addNewCategory(category: string, subcategory: string) {
    this.addCategoryButton().click()
    this.setCategoriesOnModal(category, subcategory)
    this.applyCategoryButton().click()
  }

  setCategoriesOnModal(category: string, subcategory: string) {
    this.editModalCategoryInput().click()
    this.selectOption(category).click()
    this.editModalSubcategoryInput().click()
    this.selectOption(subcategory).click()
  }

  verifyReadonlyState() {
    this.verifyBaseReadonlyState()
    this.removeButton().should('not.exist')
  }

  verifyEditState() {
    this.verifyBaseEditState()
    this.removeButton().should('be.visible')
    this.addCategoryButton().should('be.visible')
  }

  checkIfCategoryNameIsVisible(expectedCategoryName: string) {
    cy.get(this.selectors.categoryField).then(($value) => {
      expect(
        $value
          .html()
          .replaceAll(/<\/*span>/g, '')
          .replaceAll('&gt;', '>')
          .trim(),
      ).to.equal(expectedCategoryName)
    })
  }

  checkIfCategoryNameIsInInput(expectedCategoryName: string) {
    this.categoryInput().then(($input) => {
      const inputValueText = $input.val()!.toString().replaceAll(/ {2}/g, ' ').trim()
      expect(inputValueText).to.equal(expectedCategoryName)
    })
  }

  verifyDraftChangesData(approvedCategories: CategoryTree[], savedCategories: CategoryTree[]) {
    this.verifyDraftColumnData(this.baseSelectors.draftLeftColumn, approvedCategories)
    this.verifyDraftColumnData(this.baseSelectors.draftRightColumn, savedCategories)
  }

  private verifyDraftColumnData(columnSelector: string, categoriesData: CategoryTree[]) {
    if (categoriesData.length === 0) {
      cy.get(columnSelector).contains(this.texts.menuCategoryLabel).should('not.exist')
    } else {
      cy.get(columnSelector).contains(this.texts.menuCategoryLabel).should('exist')
      categoriesData.forEach((category) => {
        category.forEach((catBranch) => {
          cy.get(columnSelector)
            .contains(catBranch.name['en-GB'])
            .scrollIntoView()
            .should('be.visible')
        })
      })
    }
  }
}
