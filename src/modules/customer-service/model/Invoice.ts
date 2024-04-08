export enum InvoiceStatus {
  Paid = 'paid',
  Posted = 'posted',
  PaymentDue = 'payment_due',
  NotPaid = 'not_paid',
  Voided = 'voided',
  Pending = 'pending',
}

export enum PaymentMethod {
  Card = 'card',
  Other = 'other',
}

export interface Invoice {
  id: string
  paid_at?: number
  amount_paid?: number
  status: InvoiceStatus
  currency_code: string
  updated_at?: number
  transaction_id: string
  payment_method?: PaymentMethod
  amount_refunded: number
}
