import { fireEvent, render } from '@testing-library/react'
import { GoodBuilder } from '../../../mock/good-builder'
import SearchGoodsTable from './SearchGoodsTable'

describe('search goods table', () => {
  it('all goods are selected', () => {
    const goodsList = [new GoodBuilder().withId('1').build(), new GoodBuilder().withId('2').build()]
    const callback = jest.fn()
    const { container } = render(
      <SearchGoodsTable selectedGoods={goodsList} goodsList={goodsList} onSelect={callback} />,
    )
    expect(container.querySelector('search-goods-table')).toBeNull()
  })

  it('displays only unselected goods', () => {
    const goodsList = [new GoodBuilder().withId('1').build(), new GoodBuilder().withId('2').build()]
    const selectedGoods = [new GoodBuilder().withId('1').build()]
    const callback = jest.fn()
    const { getAllByTestId } = render(
      <SearchGoodsTable selectedGoods={selectedGoods} goodsList={goodsList} onSelect={callback} />,
    )
    expect(getAllByTestId('search-good-row')).toHaveLength(1)
  })

  it('displays only unselected goods', () => {
    const goodsList = [new GoodBuilder().withId('1').build()]
    const callback = jest.fn()
    const { getByTestId } = render(
      <SearchGoodsTable selectedGoods={[]} goodsList={goodsList} onSelect={callback} />,
    )
    fireEvent.click(getByTestId('select-button'))
    expect(callback).toBeCalledWith(goodsList[0])
  })
})
