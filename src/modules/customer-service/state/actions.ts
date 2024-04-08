export const CUSTOMER_DETAILS_ACTIONS = {
  FETCH_CUSTOMER: '@CustomerDetails/fetchCustomer' as const,
  FETCH_SUBSCRIPTION: '@CustomerDetails/fetchSubscription' as const,
  FETCH_INVOICES: '@CustomerDetails/fetchInvoices' as const,
  FETCH_LOYALTY: '@CustomerDetails/fetchLoyalty' as const,
  SET_LOADING: '@CustomerDetails/setLoading' as const,
  TOGGLE_REFUND_MODAL: '@CustomerDetails/toggleRefundModal' as const,
  TOGGLE_REFUND_CONFIRMATION_MODAL: '@CustomerDetails/toggleRefundConfirmationModal' as const,
  TOGGLE_CANCEL_SUBSCRIPTION_MODAL: '@CustomerDetails/toggleCancelSubscriptionModal' as const,
}
