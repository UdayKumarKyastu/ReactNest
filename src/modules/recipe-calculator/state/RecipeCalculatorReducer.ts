import { RecipeCalculatorState } from './RecipeCalculatorState'
import { RECIPE_CALCULATOR_ACTIONS } from './actions'
import { uniqBy } from 'lodash'

export const RecipeCalculatorReducer = (
  state: RecipeCalculatorState.State,
  action: RecipeCalculatorState.Action,
) => {
  switch (action.type) {
    case RECIPE_CALCULATOR_ACTIONS.TOGGLE_GOODS_MODAL:
      return {
        ...state,
        isGoodsModalOpen: !state.isGoodsModalOpen,
        selectedGoods: [],
        goodsSearchList: [],
      }

    case RECIPE_CALCULATOR_ACTIONS.UPDATE_RECIPE_NAME:
      return {
        ...state,
        recipeName: action.payload.name,
      }

    case RECIPE_CALCULATOR_ACTIONS.UPDATE_GOODS_SEARCH_LIST:
      return {
        ...state,
        goodsSearchList: action.payload.goods,
      }

    case RECIPE_CALCULATOR_ACTIONS.SELECT_GOOD:
      return {
        ...state,
        selectedGoods: [...state.selectedGoods, action.payload.good],
      }

    case RECIPE_CALCULATOR_ACTIONS.UNSELECT_GOOD:
      return {
        ...state,
        selectedGoods: state.selectedGoods.filter(({ id }) => id !== action.payload.goodId),
      }

    case RECIPE_CALCULATOR_ACTIONS.ADD_TO_RECIPE:
      const newGoods = action.payload.goods
      return {
        ...state,
        recipeGoods: [...state.recipeGoods, ...newGoods],
        isGoodsModalOpen: false,
        selectedGoods: [],
        goodsOriginals: uniqBy([...state.recipeGoods, ...newGoods], 'id'),
      }

    case RECIPE_CALCULATOR_ACTIONS.REMOVE_FROM_RECIPE:
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) =>
          good.id === action.payload.goodId ? { ...good, removed: true } : good,
        ),
      }

    case RECIPE_CALCULATOR_ACTIONS.RESTORE_GOOD:
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) =>
          good.id === action.payload.goodId ? { ...good, removed: false } : good,
        ),
      }

    case RECIPE_CALCULATOR_ACTIONS.EDIT_COST:
      const { goodId, cost } = action.payload
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) =>
          good.id === goodId ? { ...good, cost: { ...good.cost, centAmount: cost } } : good,
        ),
      }

    case RECIPE_CALCULATOR_ACTIONS.EDIT_QUANTITY:
      const { quantity } = action.payload
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) =>
          good.id === action.payload.goodId ? { ...good, quantity } : good,
        ),
      }

    case RECIPE_CALCULATOR_ACTIONS.TOGGLE_CREATE_GOOD_MODAL:
      return {
        ...state,
        isGoodsModalOpen: false,
        isCreateGoodModalOpen: !state.isCreateGoodModalOpen,
      }

    case RECIPE_CALCULATOR_ACTIONS.ADD_CREATED_GOOD_TO_RECIPE:
      return {
        ...state,
        isCreateGoodModalOpen: false,
        recipeGoods: [...state.recipeGoods, action.payload.good],
        goodsOriginals: [...state.goodsOriginals, action.payload.good],
      }

    case RECIPE_CALCULATOR_ACTIONS.TOGGLE_SEARCH_RECIPE_MODAL:
      return {
        ...state,
        isSearchRecipeModalOpen: !state.isSearchRecipeModalOpen,
      }

    case RECIPE_CALCULATOR_ACTIONS.SELECT_RECIPE:
      const { recipe, goods } = action.payload
      return {
        ...state,
        isSearchRecipeModalOpen: false,
        recipeGoods: goods,
        recipeName: recipe.name,
        recipeId: recipe.id,
        recipeLastModified: recipe.modifiedAt,
        recipeSku: recipe.sku,
        editMode: false,
        goodsOriginals: goods,
      }

    case RECIPE_CALCULATOR_ACTIONS.TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode,
        recipeGoods: state.goodsOriginals,
      }

    case RECIPE_CALCULATOR_ACTIONS.RESET_QUANTITY:
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) => ({
          ...good,
          quantity:
            good.id === action.payload.goodId
              ? state.goodsOriginals.find(({ id }) => id === action.payload.goodId)!.quantity
              : good.quantity,
        })),
      }

    case RECIPE_CALCULATOR_ACTIONS.RESET_COST:
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) => ({
          ...good,
          cost:
            good.id === action.payload.goodId
              ? state.goodsOriginals.find(({ id }) => id === action.payload.goodId)!.cost
              : good.cost,
        })),
      }

    case RECIPE_CALCULATOR_ACTIONS.RESET_GOODS:
      return {
        ...state,
        recipeGoods: state.recipeGoods.map((good) => {
          return {
            ...state.goodsOriginals.find(({ id }) => good.id === id)!,
            removed: good.removed,
          }
        }),
      }

    default:
      return state
  }
}
