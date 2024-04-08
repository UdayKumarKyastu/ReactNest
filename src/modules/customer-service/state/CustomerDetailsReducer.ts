import { CUSTOMER_DETAILS_ACTIONS } from './actions'
import { CustomerDetailsState } from './CustomerDetailsState'

export const CustomerDetailsReducer = (
  state: CustomerDetailsState.State,
  action: CustomerDetailsState.Action,
) => {
  switch (action.type) {
    case CUSTOMER_DETAILS_ACTIONS.FETCH_CUSTOMER:
      return {
        ...state,
        customer: action.payload.customer,
      }

    case CUSTOMER_DETAILS_ACTIONS.FETCH_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload.subscription,
      }

    case CUSTOMER_DETAILS_ACTIONS.FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload.invoices,
      }

    case CUSTOMER_DETAILS_ACTIONS.FETCH_LOYALTY:
      return {
        ...state,
        loyalty: action.payload.loyalty,
      }

    case CUSTOMER_DETAILS_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload.value,
      }

    case CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_MODAL:
      return {
        ...state,
        isRefundModalOpen: action.payload.value,
        selectedInvoice: action.payload.invoice,
      }

    case CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_CONFIRMATION_MODAL:
      return {
        ...state,
        isRefundModalOpen: false,
        isRefundConfirmationModalOpen: action.payload.value,
        refundAmount: action.payload.amount,
        refundReason: action.payload.reason,
      }

    case CUSTOMER_DETAILS_ACTIONS.TOGGLE_CANCEL_SUBSCRIPTION_MODAL:
      return {
        ...state,
        isCancelSubscriptionModalOpen: action.payload.value,
      }

    default:
      return state
  }
}
