export declare namespace EditProductDto {
  export type UpdateTaxation = {
    taxCategoryId: string
  }

  export type UpdateCategories = {
    categoriesIDs: string[]
  }

  export type UpdateSetup = {
    iceMachineRequired: boolean
    blenderRequired: boolean
    canHaveVariants: boolean
    canAddSyrup: boolean
    canAddExtraCoffeeShot: boolean
    canAddWhippedCream: boolean
  }
}
