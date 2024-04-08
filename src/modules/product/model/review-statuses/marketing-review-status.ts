import { ReviewStatus } from '../review-status'

export interface InternationalField {
  'en-GB'?: ReviewStatus
  'en-HK'?: ReviewStatus
  'en-US'?: ReviewStatus
  'en-FR'?: ReviewStatus
  'fr-FR'?: ReviewStatus
  'zh-HK'?: ReviewStatus
}

export interface MarketingReviewStatus {
  name?: InternationalField
  description?: InternationalField
  availableForClickAndCollect?: ReviewStatus
  availableForPretDelivers?: ReviewStatus
  availableForOutposts?: ReviewStatus
  isLive?: ReviewStatus
  publishProductToDeliveryWebsite?: ReviewStatus
  isChefsSpecial?: ReviewStatus
  isDisplayed?: ReviewStatus
  displayAsNewUntil?: ReviewStatus
  availableAllDay?: ReviewStatus
  availableForLunch?: ReviewStatus
  howToDisplay?: ReviewStatus
  liveFrom?: ReviewStatus
  liveTo?: ReviewStatus
  visibleOnDeliveryWebsite?: ReviewStatus
}
