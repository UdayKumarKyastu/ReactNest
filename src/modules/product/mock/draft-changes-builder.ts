import { Locale } from '../../i18n/Locale'
import { ProductType } from '../model/product-type'
import { DraftChanges } from '../model/draft-changes'
import { ProductVariant } from '../model/product-variant'

interface ChangesCount {
  marketing: number
  setUp: number
  categories: number
  total: number
}

export class DraftChangesBuilder {
  private readonly draftChanges: Partial<DraftChanges> = {
    taxCategory: {
      id: 'tax-food-5-percent',
      name: '5%',
      amount: 0.05,
    },
    name: Locale.MultilangString.generateFrom('Americano'),
    description: Locale.MultilangString.generateFrom('desc'),
    lastEdit: new Date(2020, 1, 1),
    variants: [],
    type: ProductType.BaristaBeverage,
    changesCount: {
      marketing: 0,
      setUp: 5,
      categories: 5,
      total: 10,
    },
    categories: [],
    setUp: {
      blenderRequired: false,
      canAddExtraCoffeeShot: true,
      canAddSyrup: true,
      canAddWhippedCream: true,
      canBeDecaf: false,
      canBeWithOatMilk: true,
      canBeWithoutMilk: true,
      canBeWithRiceCoconutMilk: true,
      canBeWithSemiSkimmedMilk: true,
      canBeWithSkimmedMilk: true,
      canBeWithSoyMilk: true,
      canHaveVariants: true,
      iceMachineRequired: false,
    },
  }

  withVariants(variants: ProductVariant[]) {
    this.draftChanges.variants = variants
    return this
  }

  withChangesCount(changesCount: ChangesCount) {
    this.draftChanges.changesCount = changesCount
    return this
  }

  build() {
    return { ...this.draftChanges } as DraftChanges
  }
}
