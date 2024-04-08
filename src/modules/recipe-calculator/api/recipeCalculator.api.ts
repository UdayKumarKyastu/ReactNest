import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'
import { Good, GoodBase } from '../model/Good'
import { Recipe } from '../model/Recipe'

const useGetGoods = () => {
  const http = HttpProvider.useHttpClient()

  const getGoods = useCallback(
    (query: string, property: string): Promise<GoodBase[]> => {
      return http
        .get(`/v1/recipe-calculator/goods?query=${query}&propertyName=${property}`)
        .then((response) => response.data)
    },
    [http],
  )

  const getGoodsDetails = useCallback(
    (ids: string[]): Promise<Good[]> => {
      return http
        .get(`/v1/recipe-calculator/goods-details?id=${ids.join(',')}`)
        .then((response) => response.data)
    },
    [http],
  )

  return {
    getGoods,
    getGoodsDetails,
  }
}

const useGetRecipes = () => {
  const http = HttpProvider.useHttpClient()

  const getRecipes = useCallback(
    (query: string, property: string): Promise<Recipe[]> => {
      return http
        .get(`/v1/recipe-calculator/recipes?query=${query}&propertyName=${property}`)
        .then((response) => {
          const responce = response?.data?.map((recipe: any) => ({
            ...recipe,
            dataSource: 'create',
          }))
          return responce
        })
    },
    [http],
  )

  const getRecipeGoods = useCallback(
    (starkisId: number): Promise<Good[]> => {
      return http
        .get(`/v1/recipe-calculator/recipes/${starkisId}/goods`)
        .then((response) => response.data)
    },
    [http],
  )

  return { getRecipes, getRecipeGoods }
}

export abstract class RecipeCalculatorApi {
  static useGetGoods = useGetGoods
  static useGetRecipes = useGetRecipes
}
