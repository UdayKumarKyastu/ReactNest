import { ReviewStatus } from '../review-status'

export interface LabellingReviewStatus {
  legalTitle?: ReviewStatus
  includeAverageWeightOnLabel?: ReviewStatus
  includeNutritionalInformationOnLabel?: ReviewStatus
  countryOfOriginDescription?: ReviewStatus
  useBy?: ReviewStatus
  sellBy?: ReviewStatus
  storageConditions?: ReviewStatus
  productServes?: ReviewStatus
  canBeCookedInTurboChef?: ReviewStatus
  useByTurboChef?: ReviewStatus
  sellByTurboChef?: ReviewStatus
  ean13Code?: ReviewStatus
}
