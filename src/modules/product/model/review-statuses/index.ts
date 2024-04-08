import { MenuCategoriesReviewStatus } from '../review-status'
import { SetupReviewStatus } from './setup-review-status'

export interface ProductGroupReviewStatuses {
  setUp: SetupReviewStatus
  categories?: MenuCategoriesReviewStatus[]
  statusCount?: {
    accepted: number
    rejected: number
    pending: number
  }
}
