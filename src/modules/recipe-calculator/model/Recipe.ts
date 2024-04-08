import { FlagIcon } from '../../../icons/FlagIcon'

export interface Recipe {
  id: string
  starkisId: number
  name: string
  sku: string
  modifiedAt: string
  country: keyof typeof FlagIcon
  dataSource: string
}
