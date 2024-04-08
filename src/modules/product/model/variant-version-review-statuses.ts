import { PricingReviewStatus } from './review-status'
import { MarketingReviewStatus } from './review-statuses/marketing-review-status'
import { LabellingReviewStatus } from './review-statuses/labelling-review-status'
import { ReportingReviewStatus } from './review-statuses/reporting-review-status'
import { AttributesReviewStatus } from './review-statuses/attributes-review-status'

export interface VariantVersionReviewStatuses {
  marketing?: MarketingReviewStatus
  prices?: PricingReviewStatus[]
  reporting?: ReportingReviewStatus
  labelling?: LabellingReviewStatus
  attributes?: AttributesReviewStatus
  statusCount?: {
    accepted: number
    rejected: number
    pending: number
  }
}
