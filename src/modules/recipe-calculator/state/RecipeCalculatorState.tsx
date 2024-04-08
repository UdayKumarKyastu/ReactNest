import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { RECIPE_CALCULATOR_ACTIONS } from './actions'
import { RecipeCalculatorReducer } from './RecipeCalculatorReducer'
import { Good, RecipeGood, GoodBase } from '../model/Good'
import { Recipe } from '../model/Recipe'

export declare namespace RecipeCalculatorState {
  interface Props {
    children: JSX.Element | JSX.Element[]
  }

  type Action =
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.TOGGLE_GOODS_MODAL }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.UPDATE_RECIPE_NAME; payload: { name: string } }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.SELECT_GOOD; payload: { good: GoodBase } }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.UNSELECT_GOOD; payload: { goodId: string } }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.ADD_TO_RECIPE; payload: { goods: Good[] } }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.REMOVE_FROM_RECIPE; payload: { goodId: string } }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.EDIT_QUANTITY
        payload: { goodId: string; quantity: number }
      }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.EDIT_COST
        payload: { goodId: string; cost: number }
      }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.RESTORE_GOOD; payload: { goodId: string } }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.UPDATE_GOODS_SEARCH_LIST
        payload: { goods: GoodBase[] }
      }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.TOGGLE_CREATE_GOOD_MODAL }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.ADD_CREATED_GOOD_TO_RECIPE; payload: { good: Good } }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.TOGGLE_SEARCH_RECIPE_MODAL }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.SELECT_RECIPE
        payload: { recipe: Recipe; goods: Good[] }
      }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.TOGGLE_EDIT_MODE }
    | { type: typeof RECIPE_CALCULATOR_ACTIONS.RESET_GOODS }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.RESET_COST
        payload: { goodId: string }
      }
    | {
        type: typeof RECIPE_CALCULATOR_ACTIONS.RESET_QUANTITY
        payload: { goodId: string; quantity: number }
      }

  interface State {
    isGoodsModalOpen: boolean
    isCreateGoodModalOpen: boolean
    isSearchRecipeModalOpen: boolean
    recipeName: string
    recipeId?: string
    recipeSku?: string
    recipeLastModified?: string
    goodsSearchList: GoodBase[]
    selectedGoods: GoodBase[]
    recipeGoods: RecipeGood[]
    goodsOriginals: Good[]
    editMode: boolean
  }

  interface Context {
    state: State
    actions: {
      toggleGoodsModal(): void
      updateRecipeName(name: string): void
      updateGoodsSearchList(goods: GoodBase[]): void
      selectGood(good: GoodBase): void
      unselectGood(goodId: string): void
      addToRecipe(goods: Good[]): void
      removeFromRecipe(goodId: string): void
      restoreGood(goodId: string): void
      editCost(goodId: string, cost: number): void
      editQuantity(goodId: string, quantity: number): void
      toggleCreateGoodModal(): void
      addCreatedGoodToRecipe(good: Good): void
      toggleSearchRecipeModal(): void
      selectRecipe(recipe: Recipe, goods: Good[]): void
      toggleEditMode(): void
      resetGoods(): void
      resetCost(goodId: string): void
      resetQuantity(goodId: string, quantity: number): void
    }
  }
}

const DEFAULT_STATE: RecipeCalculatorState.State = {
  isGoodsModalOpen: false,
  isCreateGoodModalOpen: false,
  isSearchRecipeModalOpen: false,
  recipeName: 'Create new recipe',
  goodsSearchList: [],
  selectedGoods: [],
  recipeGoods: [],
  goodsOriginals: [],
  editMode: false,
}

const Context = createContext<RecipeCalculatorState.Context>({
  state: DEFAULT_STATE,
  actions: null as unknown as RecipeCalculatorState.Context['actions'],
})

const Provider = ({ children }: RecipeCalculatorState.Props) => {
  const [state, dispatch] = useReducer(RecipeCalculatorReducer, DEFAULT_STATE)

  const actions: RecipeCalculatorState.Context['actions'] = useMemo(() => {
    return {
      toggleGoodsModal() {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.TOGGLE_GOODS_MODAL })
      },
      updateRecipeName(name: string) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.UPDATE_RECIPE_NAME, payload: { name } })
      },
      updateGoodsSearchList(goods: GoodBase[]) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.UPDATE_GOODS_SEARCH_LIST, payload: { goods } })
      },
      selectGood(good: GoodBase) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.SELECT_GOOD, payload: { good } })
      },
      unselectGood(goodId: string) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.UNSELECT_GOOD, payload: { goodId } })
      },
      addToRecipe(goods: Good[]) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.ADD_TO_RECIPE, payload: { goods } })
      },
      removeFromRecipe(goodId: string) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.REMOVE_FROM_RECIPE, payload: { goodId } })
      },
      restoreGood(goodId: string) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.RESTORE_GOOD, payload: { goodId } })
      },
      editCost(goodId: string, cost: number) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.EDIT_COST, payload: { goodId, cost } })
      },
      editQuantity(goodId: string, quantity: number) {
        dispatch({
          type: RECIPE_CALCULATOR_ACTIONS.EDIT_QUANTITY,
          payload: { goodId, quantity },
        })
      },
      toggleCreateGoodModal() {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.TOGGLE_CREATE_GOOD_MODAL })
      },
      addCreatedGoodToRecipe(good: Good) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.ADD_CREATED_GOOD_TO_RECIPE, payload: { good } })
      },
      toggleSearchRecipeModal() {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.TOGGLE_SEARCH_RECIPE_MODAL })
      },
      selectRecipe(recipe: Recipe, goods: Good[]) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.SELECT_RECIPE, payload: { recipe, goods } })
      },
      toggleEditMode() {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.TOGGLE_EDIT_MODE })
      },
      resetGoods() {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.RESET_GOODS })
      },
      resetCost(goodId: string) {
        dispatch({ type: RECIPE_CALCULATOR_ACTIONS.RESET_COST, payload: { goodId } })
      },
      resetQuantity(goodId: string, quantity: number) {
        dispatch({
          type: RECIPE_CALCULATOR_ACTIONS.RESET_QUANTITY,
          payload: { goodId, quantity },
        })
      },
    }
  }, [])

  return <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
}

const useRecipeCalculatorState = () => {
  const { actions, state } = useContext(Context)

  return {
    actions,
    state,
    selectors: {
      isGoodsModalOpen: state.isGoodsModalOpen,
      recipeName: state.recipeName,
      goodsSearchList: state.goodsSearchList,
      selectedGoods: state.selectedGoods,
      recipeGoods: state.recipeGoods,
      isCreateGoodModalOpen: state.isCreateGoodModalOpen,
      isSearchRecipeModalOpen: state.isSearchRecipeModalOpen,
      recipeSku: state.recipeSku,
      recipeId: state.recipeId,
      recipeLastModified: state.recipeLastModified,
      editMode: state.editMode,
      goodsOriginals: state.goodsOriginals,
    },
  }
}

export const RecipeCalculatorState = {
  Provider,
  useState: useRecipeCalculatorState,
}
