export enum ChangeStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
}

export interface ReviewStatus {
  status: ChangeStatus
  modifiedAt?: string
  user?: {
    name: string
    id: string
  }
}

export interface MenuCategoriesReviewStatus extends ReviewStatus {
  value: string[]
}

export interface PricingReviewStatus extends ReviewStatus {
  value: {
    channelName: string
    field:
      | 'takeAwayPrice'
      | 'eatInPrice'
      | 'eatInTax'
      | 'deliveryPrice'
      | 'deliveryTax'
      | 'takeAwayClubPret'
      | 'eatInClubPret'
  }
}
