import { RecipeCalculatorState } from './RecipeCalculatorState'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { GoodBuilder } from '../mock/good-builder'
import { RecipeBuilder } from '../mock/recipe-builder'

describe('RecipeCalculatorState', () => {
  it('toggleGoodsModal action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    act(() => {
      result.current.actions.toggleGoodsModal()
    })
    expect(result.current.selectors.isGoodsModalOpen).toBe(true)
  })

  it('updateRecipeName action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const recipeName = 'example123'
    act(() => {
      result.current.actions.updateRecipeName(recipeName)
    })
    expect(result.current.selectors.recipeName).toBe(recipeName)
  })

  it('updateGoodsSearchList action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()
    expect(result.current.selectors.goodsSearchList).toEqual([])
    act(() => {
      result.current.actions.updateGoodsSearchList([GOOD])
    })
    expect(result.current.selectors.goodsSearchList).toEqual([GOOD])
  })

  it('selectGood and unselectGood actions', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()
    expect(result.current.selectors.selectedGoods).toEqual([])

    act(() => {
      result.current.actions.selectGood(GOOD)
    })
    expect(result.current.selectors.selectedGoods).toEqual([GOOD])

    act(() => {
      result.current.actions.unselectGood(GOOD.id)
    })
    expect(result.current.selectors.selectedGoods).toEqual([])
  })

  it('addToRecipe, removeFromRecipe and restore actions', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()
    expect(result.current.selectors.recipeGoods).toEqual([])

    act(() => {
      result.current.actions.selectGood(GOOD)
      result.current.actions.addToRecipe([GOOD])
    })
    expect(result.current.selectors.recipeGoods).toEqual([GOOD])

    act(() => {
      result.current.actions.removeFromRecipe(GOOD.id)
    })
    expect(result.current.selectors.recipeGoods[0].removed).toBeTruthy()

    act(() => {
      result.current.actions.restoreGood(GOOD.id)
    })
    expect(result.current.selectors.recipeGoods[0].removed).toBeFalsy()
  })

  it('editCost and editQuantity actions', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()
    const cost = 100
    const quantity = 50
    act(() => {
      result.current.actions.selectGood(GOOD)
      result.current.actions.addToRecipe([GOOD])
      result.current.actions.editCost(GOOD.id, cost)
      result.current.actions.editQuantity(GOOD.id, quantity)
    })
    expect(result.current.selectors.recipeGoods[0].cost.centAmount).toEqual(cost)
    expect(result.current.selectors.recipeGoods[0].quantity).toEqual(quantity)
  })

  it('toggleCreateGoodModal action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })

    act(() => {
      result.current.actions.toggleCreateGoodModal()
    })
    expect(result.current.selectors.isCreateGoodModalOpen).toBeTruthy()
  })

  it('addCreatedGoodToRecipe action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()

    act(() => {
      result.current.actions.toggleCreateGoodModal()
      result.current.actions.addCreatedGoodToRecipe(GOOD)
    })
    expect(result.current.selectors.isCreateGoodModalOpen).toBeFalsy()
    expect(result.current.selectors.recipeGoods).toEqual([GOOD])
  })

  it('selectRecipe action', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const GOOD = new GoodBuilder().build()
    const RECIPE = new RecipeBuilder().build()

    act(() => {
      result.current.actions.toggleSearchRecipeModal()
      result.current.actions.selectRecipe(RECIPE, [GOOD])
    })
    expect(result.current.selectors.isSearchRecipeModalOpen).toBeFalsy()
    expect(result.current.selectors.recipeGoods).toEqual([GOOD])
    expect(result.current.selectors.recipeName).toEqual(RECIPE.name)
    expect(result.current.selectors.recipeId).toEqual(RECIPE.id)
    expect(result.current.selectors.recipeSku).toEqual(RECIPE.sku)
    expect(result.current.selectors.recipeLastModified).toEqual(RECIPE.modifiedAt)
  })

  it('toggle edit mode', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    expect(result.current.selectors.editMode).toBeFalsy()

    act(() => {
      result.current.actions.toggleEditMode()
    })
    expect(result.current.selectors.editMode).toBeTruthy()
  })
})
