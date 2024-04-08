import { render } from '@testing-library/react'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { GoodBuilder } from '../../mock/good-builder'
import RecipeCalculatorCreateNew from './RecipeCalculatorCreateNew'

jest.mock('../../hooks/usePrompt')

describe('recipe calculator create new', () => {
  it('no recipe goods scenario', () => {
    const { getByTestId } = render(
      <RecipeCalculatorState.Provider>
        <RecipeCalculatorCreateNew />
      </RecipeCalculatorState.Provider>,
    )
    expect(getByTestId('recipe-title')).toBeInTheDocument()
    expect(getByTestId('recipe-card')).toBeInTheDocument()
    expect(getByTestId('no-goods-view')).toBeInTheDocument()
  })

  it('scenario with goods added', async () => {
    const GOOD = new GoodBuilder().build()
    jest.spyOn(RecipeCalculatorState, 'useState').mockImplementation(() => ({
      selectors: {
        ...({} as any),
        recipeGoods: [GOOD],
        goodsOriginals: [],
      },
      actions: {} as any,
      state: {} as any,
    }))

    const { getByTestId } = render(
      <RecipeCalculatorState.Provider>
        <RecipeCalculatorCreateNew />
      </RecipeCalculatorState.Provider>,
    )

    expect(getByTestId('recipe-title')).toBeInTheDocument()
    expect(getByTestId('recipe-card')).toBeInTheDocument()
    expect(getByTestId('recipe-cost-table')).toBeInTheDocument()
    expect(getByTestId('price-calculator')).toBeInTheDocument()
  })
})
