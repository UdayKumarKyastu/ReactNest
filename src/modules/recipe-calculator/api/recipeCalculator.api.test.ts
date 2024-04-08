import { HttpProvider } from '../../common/http/http.provider'
import { renderHook } from '@testing-library/react-hooks'
import { RecipeCalculatorApi } from './recipeCalculator.api'

describe('Recipe calculator API', () => {
  let mockHttpGet: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({
      data: [],
    })
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
    })
  })

  it('getGoods', async () => {
    const query = 'propertyName'
    const property = 'example123'
    const { result } = renderHook(RecipeCalculatorApi.useGetGoods)
    await result.current.getGoods(query, property)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/recipe-calculator/goods?query=${query}&propertyName=${property}`,
    )
  })

  it('getGoodsDetails', async () => {
    const ids = ['1', '2', '3']
    const { result } = renderHook(RecipeCalculatorApi.useGetGoods)
    await result.current.getGoodsDetails(ids)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/recipe-calculator/goods-details?id=${ids.join(',')}`,
    )
  })

  it('getRecipes', async () => {
    const query = 'propertyName'
    const property = 'example123'
    const { result } = renderHook(RecipeCalculatorApi.useGetRecipes)
    await result.current.getRecipes(query, property)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/recipe-calculator/recipes?query=${query}&propertyName=${property}`,
    )
  })

  it('getRecipeGoods', async () => {
    const starkissId = 123
    const { result } = renderHook(RecipeCalculatorApi.useGetRecipes)
    await result.current.getRecipeGoods(starkissId)
    expect(mockHttpGet).toHaveBeenCalledWith(`/v1/recipe-calculator/recipes/${starkissId}/goods`)
  })
})
