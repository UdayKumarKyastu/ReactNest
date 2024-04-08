import RecipeCostsTable from './RecipeCostsTable'
import { fireEvent, render } from '@testing-library/react'
import { GoodBuilder } from '../../mock/good-builder'

describe('RecipeCostTable component', () => {
  it('adding new goods is hidden in non edit mode', () => {
    const mockAction = jest.fn()
    const { container } = render(
      <RecipeCostsTable
        recipeGoods={[]}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode={false}
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )
    const addNewGoodElement = container.querySelector('[data-testid=add-new-row]')
    expect(addNewGoodElement).toBeFalsy()
  })

  it('fire proper callback for adding', () => {
    const mockAction = jest.fn()
    const onAddGood = jest.fn()
    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={[]}
        onAddGoods={onAddGood}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )
    fireEvent.click(getByTestId('add-new-toggle'))
    expect(onAddGood).toBeCalled()
  })

  it('onRemove prop', () => {
    const mockAction = jest.fn()
    const onRemove = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={onRemove}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )
    fireEvent.click(getByTestId('remove-toggle'))
    expect(onRemove).toBeCalledWith(GOODS[0].id)
  })

  it('onRestore prop', () => {
    const mockAction = jest.fn()
    const onRestore = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').withRemoved(true).build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={onRestore}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )

    fireEvent.click(getByTestId('restore-toggle'))
    expect(onRestore).toBeCalledWith(GOODS[0].id)
  })

  it('onEditQuantity prop', () => {
    const mockAction = jest.fn()
    const onEditQuantity = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={onEditQuantity}
        onEditCost={mockAction}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )

    const newQuantity = '13'
    fireEvent.change(getByTestId('quantity-input'), { target: { value: newQuantity } })
    expect(onEditQuantity).toBeCalledWith(GOODS[0].id, Number(newQuantity))
  })

  it('onEditCost prop', () => {
    const mockAction = jest.fn()
    const onEditCost = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={onEditCost}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )

    const newCost = '2.5'
    fireEvent.change(getByTestId('cost-input'), { target: { value: newCost } })
    expect(onEditCost).toBeCalledWith(GOODS[0].id, Number(newCost) * 100)
  })

  it('renders all goods', () => {
    const mockAction = jest.fn()
    const GOODS = [
      new GoodBuilder().withId('1').build(),
      new GoodBuilder().withId('2').build(),
      new GoodBuilder().withId('3').build(),
    ]

    const { getAllByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={[]}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )

    expect(getAllByTestId('good-row')).toHaveLength(GOODS.length)
  })

  it('reset button is disabled by default', () => {
    const mockAction = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={GOODS}
        onResetGoods={mockAction}
        onResetCost={mockAction}
        onResetQuantity={mockAction}
        totalCost={0}
      />,
    )

    expect(getByTestId('reset-button')).toBeDisabled()
    expect(getByTestId('reset-cost')).toHaveStyle(`visibility: hidden`)
    expect(getByTestId('reset-quantity')).toHaveStyle(`visibility: hidden`)
  })

  it('reset buttons should be active when values are changed', () => {
    const mockAction = jest.fn()
    const resetGoodsAction = jest.fn()
    const resetCostAction = jest.fn()
    const resetQuantityAction = jest.fn()
    const GOODS = [new GoodBuilder().withId('1').build()]
    const ORIGINALS = [new GoodBuilder().withId('1').withCost(200).withQuantity(2).build()]

    const { getByTestId } = render(
      <RecipeCostsTable
        recipeGoods={GOODS}
        onAddGoods={mockAction}
        onRemoveGood={mockAction}
        onRestoreGood={mockAction}
        onEditQuantity={mockAction}
        onEditCost={mockAction}
        editMode
        goodsOriginals={ORIGINALS}
        onResetGoods={resetGoodsAction}
        onResetCost={resetCostAction}
        onResetQuantity={resetQuantityAction}
        totalCost={0}
      />,
    )

    expect(getByTestId('reset-button')).not.toBeDisabled()
    fireEvent.click(getByTestId('reset-button'))
    expect(resetGoodsAction).toBeCalled()

    expect(getByTestId('reset-cost')).toHaveStyle(`visibility: visible`)
    fireEvent.click(getByTestId('reset-cost'))
    expect(resetCostAction).toBeCalledWith(GOODS[0].id)

    expect(getByTestId('reset-quantity')).toHaveStyle(`visibility: visible`)
    fireEvent.click(getByTestId('reset-quantity'))
    expect(resetQuantityAction).toBeCalled()
  })
})
