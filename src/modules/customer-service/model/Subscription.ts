export enum SubscriptionStatus {
  Future = 'future',
  InTrial = 'in_trial',
  Active = 'active',
  NonRenewing = 'non_renewing',
  Paused = 'paused',
  Cancelled = 'cancelled',
}

export interface Subscription {
  id: string
  current_term_start?: number
  current_term_end?: number
  next_billing_at?: number
  created_at?: number
  started_at?: number
  status: SubscriptionStatus
  activated_at?: number
  plan_name: string
  preferred_state: string | null
}
