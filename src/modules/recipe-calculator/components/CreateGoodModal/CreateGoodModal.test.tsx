import CreateGoodModal from './CreateGoodModal'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { renderHook } from '@testing-library/react-hooks'

describe('Create good modal', () => {
  it('certain fields are disabled', () => {
    const { getByTestId } = render(
      <RecipeCalculatorState.Provider>
        <CreateGoodModal />
      </RecipeCalculatorState.Provider>,
    )
    expect(getByTestId('total-cost-field')).toBeDisabled()
    expect(getByTestId('recipe-unit-input')).toBeDisabled()
    expect(getByTestId('cost-per-unit-input')).toBeDisabled()
  })

  it('validation and autocomplete works', () => {
    const { result } = renderHook(() => RecipeCalculatorState.useState(), {
      wrapper: RecipeCalculatorState.Provider,
    })
    const { getByTestId, container } = render(
      <RecipeCalculatorState.Provider>
        <CreateGoodModal />
      </RecipeCalculatorState.Provider>,
    )
    expect(getByTestId('submit-button')).toBeDisabled()

    fireEvent.change(getByTestId('name-input'), { target: { value: 'Name 123' } })
    fireEvent.change(getByTestId('pack-size-quantity-input'), { target: { value: '5' } })
    fireEvent.change(getByTestId('pack-size-unit-quantity-input'), { target: { value: '5' } })
    fireEvent.click(container.querySelector('#pack-size-unit-grams')!)
    fireEvent.change(getByTestId('pack-cost-input'), { target: { value: '20' } })
    fireEvent.change(getByTestId('distribution-cost-input'), { target: { value: '20' } })
    fireEvent.change(getByTestId('quantity-input'), { target: { value: '2' } })

    expect(getByTestId('submit-button')).not.toBeDisabled()
    const recipeUnit = getByTestId('recipe-unit-input') as HTMLInputElement
    expect(recipeUnit.value).toEqual('g')
    const totalCost = getByTestId('total-cost-field') as HTMLInputElement
    expect(totalCost.value).toEqual('40')
    const costPerUnit = getByTestId('cost-per-unit-input') as HTMLInputElement
    expect(costPerUnit.value).toEqual('0.0032')

    fireEvent.click(getByTestId('submit-button'))
    waitFor(() => {
      expect(result.current.selectors.recipeGoods).toHaveLength(1)
      expect(result.current.actions.addCreatedGoodToRecipe).toBeCalled()
    })
  })
})
