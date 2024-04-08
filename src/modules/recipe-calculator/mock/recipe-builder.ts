import { Recipe } from '../model/Recipe'

export class RecipeBuilder {
  private readonly recipe: Partial<Recipe> = {
    id: 'recipe-1',
    name: 'Recipe #1',
    sku: 'SKU123',
    modifiedAt: '2022-03-16T09:56:16.417Z',
    country: 'UK',
  }

  withId(id: string) {
    this.recipe.id = id
    return this
  }

  build() {
    return { ...this.recipe } as Recipe
  }
}
