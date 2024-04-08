export enum RewardStatus {
  Active = 'ACTIVE',
  Redeemed = 'REDEEMED',
  Expired = 'EXPIRED',
  Used = 'USED',
}

export interface Reward {
  accountId: number
  campaignId: number
  status: RewardStatus
  dateIssued: string
  expiryDate: string
  dateRedeemed: string
  name: string
}

export interface Loyalty {
  totalNoOfStars: number
  starsLeftToReward: number
  rewards: Reward[]
}
