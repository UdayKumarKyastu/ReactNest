import RecipeSearchModal from './RecipeSearchModal'
import { RecipeBuilder } from '../../mock/recipe-builder'
import { RecipeCalculatorApi } from '../../api/recipeCalculator.api'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'

const RECIPE_LIST_MOCK = [
  new RecipeBuilder().withId('123').build(),
  new RecipeBuilder().withId('234').build(),
]

describe('RecipeSearchModal', () => {
  beforeEach(() => {
    jest.spyOn(RecipeCalculatorState, 'useState').mockImplementation(() => ({
      selectors: {} as any,
      actions: {} as any,
      state: {} as any,
    }))
  })

  it('displays "no data" info in no results case', async () => {
    jest.spyOn(RecipeCalculatorApi, 'useGetRecipes').mockImplementation(() => ({
      getRecipes: jest.fn().mockResolvedValue([]),
      getRecipeGoods: jest.fn().mockResolvedValue(RECIPE_LIST_MOCK),
    }))

    const { getByTestId, getByText, container } = render(
      <BrowserRouter>
        <RecipeSearchModal />
      </BrowserRouter>,
    )
    fireEvent.change(getByTestId('btnSearch'), { target: { value: 'milk' } })
    fireEvent.click(getByTestId('search-button'))

    await waitFor(() => {
      expect(getByTestId('results-label')).toBeInTheDocument()
      expect(getByText('0 results')).toBeInTheDocument()
      expect(getByTestId('recipe-calc-no-results')).toBeInTheDocument()
      const resultsTableElement = container.querySelector('[data-testid=search-recipe-table]')
      expect(resultsTableElement).toBeFalsy()
    })
  })

  it('displays results table properly', async () => {
    jest.spyOn(RecipeCalculatorApi, 'useGetRecipes').mockImplementation(() => ({
      getRecipes: jest.fn().mockResolvedValue(RECIPE_LIST_MOCK),
      getRecipeGoods: jest.fn().mockResolvedValue(RECIPE_LIST_MOCK),
    }))

    const { container, getByTestId, getByText } = render(
      <BrowserRouter>
        <RecipeSearchModal />
      </BrowserRouter>,
    )
    fireEvent.change(getByTestId('btnSearch'), { target: { value: 'milk' } })
    fireEvent.click(getByTestId('search-button'))

    await waitFor(() => {
      expect(getByTestId('results-label')).toBeInTheDocument()
      expect(getByText(`${RECIPE_LIST_MOCK.length} results`)).toBeInTheDocument()
      expect(getByTestId('search-recipe-table')).toBeInTheDocument()
      const noResultsElement = container.querySelector('[data-testid=recipe-calc-no-results]')
      expect(noResultsElement).toBeFalsy()
    })
  })
})
