import { RecipeBuilder } from '../../../mock/recipe-builder'
import { fireEvent, render } from '@testing-library/react'
import SearchRecipeTable from './SearchRecipeTable'

const RECIPE_LIST_MOCK = [
  new RecipeBuilder().withId('123').build(),
  new RecipeBuilder().withId('234').build(),
]

describe('SearchRecipeTable', () => {
  it('renders proper quantity of rows', () => {
    const action = jest.fn()
    const { getAllByTestId } = render(
      <SearchRecipeTable recipesList={RECIPE_LIST_MOCK} selectRecipe={action} />,
    )
    expect(getAllByTestId('recipe-row')).toHaveLength(RECIPE_LIST_MOCK.length)
  })

  it('fires callback prop', () => {
    const action = jest.fn()
    const { getAllByTestId } = render(
      <SearchRecipeTable recipesList={RECIPE_LIST_MOCK} selectRecipe={action} />,
    )
    fireEvent.click(getAllByTestId('recipe-row')[0])
    expect(action).toBeCalledWith(RECIPE_LIST_MOCK[0])

    fireEvent.click(getAllByTestId('recipe-row')[1])
    expect(action).toBeCalledWith(RECIPE_LIST_MOCK[1])
  })
})
