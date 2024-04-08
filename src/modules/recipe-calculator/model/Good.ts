import { Price } from '../../product/model/price'

export type UnitOfMeasure = 'g' | 'ml' | 'each'

export interface GoodBase {
  id: string
  hgGoodId: string | null
  name: string
  modifiedAt: string
}

export interface Good extends GoodBase {
  cost: Price
  quantity: number
  unitOfMeasurement: UnitOfMeasure
}

export interface RecipeGood extends Good {
  removed?: boolean
}
