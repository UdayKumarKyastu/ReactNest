import { RecipeGood } from '../model/Good'
import { DEFAULT_CURRENCY_CODE } from '../../common/constants'

export class GoodBuilder {
  private readonly good: Partial<RecipeGood> = {
    id: 'good-123',
    name: 'goodName',
    cost: { centAmount: 100, currencyCode: DEFAULT_CURRENCY_CODE },
    quantity: 1,
    unitOfMeasurement: 'g',
    modifiedAt: new Date().toISOString(),
    removed: false,
  }

  withId(id: string) {
    this.good.id = id
    return this
  }

  withRemoved(removed: boolean) {
    this.good.removed = removed
    return this
  }

  withCost(centAmount: number) {
    this.good.cost = {
      centAmount,
      currencyCode: DEFAULT_CURRENCY_CODE,
    }
    return this
  }

  withQuantity(quantity: number) {
    this.good.quantity = quantity
    return this
  }

  build() {
    return { ...this.good } as RecipeGood
  }
}
