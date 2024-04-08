import { ReviewStatus } from '../review-status'

export interface SetupReviewStatus {
  iceMachineRequired?: ReviewStatus
  blenderRequired?: ReviewStatus
  canHaveVariants?: ReviewStatus
  canBeDecaf?: ReviewStatus
  canAddSyrup?: ReviewStatus
  canAddExtraShot?: ReviewStatus
  canAddWhippedCream?: ReviewStatus
  canBeWithoutMilk?: ReviewStatus
  canBeWithSemiSkimmedMilk?: ReviewStatus
  canBeWithSkimmedMilk?: ReviewStatus
  canBeWithOatMilk?: ReviewStatus
  canBeWithRiceCoconutMilk?: ReviewStatus
  canBeWithSoyMilk?: ReviewStatus
  ingredients?: ReviewStatus
}
