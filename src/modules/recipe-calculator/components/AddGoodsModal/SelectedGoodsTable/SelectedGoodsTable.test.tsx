import { fireEvent, render } from '@testing-library/react'
import { GoodBuilder } from '../../../mock/good-builder'
import SelectedGoodsTable from './SelectedGoodsTable'

describe('SelectedGoodsTable', () => {
  it('renders  properly', () => {
    const callback = jest.fn()
    const goods = [new GoodBuilder().build()]
    const { getAllByTestId } = render(
      <SelectedGoodsTable selectedGoods={goods} unSelectGood={callback} />,
    )

    expect(getAllByTestId('selected-row')).toHaveLength(goods.length)
    expect(getAllByTestId('selected-badge')).toHaveLength(goods.length)
  })

  it('fires callback', () => {
    const callback = jest.fn()
    const good = new GoodBuilder().build()
    const { getByTestId } = render(
      <SelectedGoodsTable selectedGoods={[good]} unSelectGood={callback} />,
    )

    fireEvent.click(getByTestId('reject-icon'))
    expect(callback).toBeCalledWith(good.id)
  })
})
