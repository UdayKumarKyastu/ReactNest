export interface BaseSetup {
  canHaveVariants: boolean
}

export interface BaristaSetup extends BaseSetup {
  iceMachineRequired: boolean
  blenderRequired: boolean
  canBeDecaf: boolean
  canAddSyrup: boolean
  canAddExtraCoffeeShot: boolean
  canAddWhippedCream: boolean
  canBeWithoutMilk: boolean
  canBeWithSemiSkimmedMilk: boolean
  canBeWithSkimmedMilk: boolean
  canBeWithOatMilk: boolean
  canBeWithRiceCoconutMilk: boolean
  canBeWithSoyMilk: boolean
}

export const ProductSetupMock = {
  getMockBaristaSetup(): BaristaSetup {
    return {
      blenderRequired: false,
      canAddExtraCoffeeShot: false,
      canAddSyrup: true,
      canAddWhippedCream: false,
      canBeDecaf: false,
      canBeWithOatMilk: false,
      canBeWithoutMilk: false,
      canBeWithRiceCoconutMilk: false,
      canBeWithSemiSkimmedMilk: false,
      canBeWithSkimmedMilk: false,
      canBeWithSoyMilk: false,
      canHaveVariants: true,
      iceMachineRequired: false,
    }
  },
}
