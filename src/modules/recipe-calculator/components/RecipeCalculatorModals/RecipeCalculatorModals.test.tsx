import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { render } from '@testing-library/react'
import RecipeCalculatorModals from './RecipeCalculatorModals'
import { BrowserRouter } from 'react-router-dom'

const getStateMock = (changedSelectors?: any) => ({
  selectors: {
    ...({} as any),
    recipeGoods: [],
    goodsOriginals: [],
    goodsSearchList: [],
    selectedGoods: [],
    ...changedSelectors,
  },
  actions: {} as any,
  state: {} as any,
})

describe('Recipe calculator modals', () => {
  it('modals hidden by default', () => {
    jest.spyOn(RecipeCalculatorState, 'useState').mockImplementation(() => getStateMock())
    const { queryByTestId } = render(<RecipeCalculatorModals />)

    expect(queryByTestId('add-goods-modal')).toBeNull()
    expect(queryByTestId('create-good-modal')).toBeNull()
    expect(queryByTestId('recipe-search-modal')).toBeNull()
  })

  it('displaying add goods modal', () => {
    jest
      .spyOn(RecipeCalculatorState, 'useState')
      .mockImplementation(() => getStateMock({ isGoodsModalOpen: true }))
    const { getByTestId } = render(<RecipeCalculatorModals />)
    expect(getByTestId('add-goods-modal')).toBeInTheDocument()
  })

  it('displaying create good modal', () => {
    jest
      .spyOn(RecipeCalculatorState, 'useState')
      .mockImplementation(() => getStateMock({ isCreateGoodModalOpen: true }))
    const { getByTestId } = render(<RecipeCalculatorModals />)
    expect(getByTestId('create-good-modal')).toBeInTheDocument()
  })

  it('displaying recipe search modal', () => {
    jest
      .spyOn(RecipeCalculatorState, 'useState')
      .mockImplementation(() => getStateMock({ isSearchRecipeModalOpen: true }))
    const { getByTestId } = render(
      <BrowserRouter>
        <RecipeCalculatorModals />
      </BrowserRouter>,
    )
    expect(getByTestId('recipe-search-modal')).toBeInTheDocument()
  })
})
