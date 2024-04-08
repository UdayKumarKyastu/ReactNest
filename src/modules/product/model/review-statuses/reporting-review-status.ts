import { ReviewStatus } from '../review-status'

export interface ReportingReviewStatus {
  pluReportingName?: ReviewStatus
  pluPrimaryCategoryID?: ReviewStatus
  pluSecondaryCategoryID?: ReviewStatus
  starKisProductCategoryID?: ReviewStatus
  starKisProductSubCategoryID?: ReviewStatus
  parentProductSku?: ReviewStatus
  productRange?: ReviewStatus
}
