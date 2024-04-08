import { Customer } from '../model/Customer'
import { CUSTOMER_DETAILS_ACTIONS } from './actions'
import { createContext, useContext, useMemo, useReducer } from 'react'
import { CustomerDetailsReducer } from './CustomerDetailsReducer'
import { Subscription } from '../model/Subscription'
import { Invoice } from '../model/Invoice'
import { Loyalty } from '../model/Loyalty'

export declare namespace CustomerDetailsState {
  interface Props {
    children: JSX.Element | JSX.Element[]
  }

  type Action =
    | { type: typeof CUSTOMER_DETAILS_ACTIONS.FETCH_CUSTOMER; payload: { customer: Customer } }
    | {
        type: typeof CUSTOMER_DETAILS_ACTIONS.FETCH_SUBSCRIPTION
        payload: { subscription: Subscription }
      }
    | { type: typeof CUSTOMER_DETAILS_ACTIONS.FETCH_LOYALTY; payload: { loyalty: Loyalty } }
    | { type: typeof CUSTOMER_DETAILS_ACTIONS.FETCH_INVOICES; payload: { invoices: Invoice[] } }
    | { type: typeof CUSTOMER_DETAILS_ACTIONS.SET_LOADING; payload: { value: boolean } }
    | {
        type: typeof CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_MODAL
        payload: { value: boolean; invoice?: Invoice }
      }
    | {
        type: typeof CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_CONFIRMATION_MODAL
        payload: { value: boolean; reason?: string; amount?: number }
      }
    | {
        type: typeof CUSTOMER_DETAILS_ACTIONS.TOGGLE_CANCEL_SUBSCRIPTION_MODAL
        payload: { value: boolean }
      }

  interface State {
    loading: boolean
    customer?: Customer
    loyalty?: Loyalty
    subscription?: Subscription
    invoices: Invoice[]
    isRefundModalOpen: boolean
    selectedInvoice?: Invoice
    refundReason?: string
    refundAmount?: number
    isRefundConfirmationModalOpen: boolean
    isCancelSubscriptionModalOpen: boolean
  }

  interface Context {
    state: State
    actions: {
      fetchCustomer(customer: Customer): void
      fetchSubscription(subscription: Subscription): void
      fetchInvoices(invoices: Invoice[]): void
      fetchLoyalty(loyalty: Loyalty): void
      setLoading(value: boolean): void
      toggleRefundModal(value: boolean, invoice?: Invoice): void
      toggleRefundConfirmationModal(value: boolean, reason?: string, amount?: number): void
      toggleCancelSubscriptionModal(value: boolean): void
    }
  }
}

const DEFAULT_STATE: CustomerDetailsState.State = {
  loading: false,
  invoices: [],
  isRefundModalOpen: false,
  isRefundConfirmationModalOpen: false,
  isCancelSubscriptionModalOpen: false,
}

const Context = createContext<CustomerDetailsState.Context>({
  state: DEFAULT_STATE,
  actions: null as unknown as CustomerDetailsState.Context['actions'],
})

const Provider = ({ children }: CustomerDetailsState.Props) => {
  const [state, dispatch] = useReducer(CustomerDetailsReducer, DEFAULT_STATE)

  const actions: CustomerDetailsState.Context['actions'] = useMemo(() => {
    return {
      fetchCustomer(customer: Customer) {
        dispatch({ type: CUSTOMER_DETAILS_ACTIONS.FETCH_CUSTOMER, payload: { customer } })
      },
      fetchSubscription(subscription: Subscription) {
        dispatch({ type: CUSTOMER_DETAILS_ACTIONS.FETCH_SUBSCRIPTION, payload: { subscription } })
      },
      fetchInvoices(invoices: Invoice[]) {
        dispatch({ type: CUSTOMER_DETAILS_ACTIONS.FETCH_INVOICES, payload: { invoices } })
      },
      fetchLoyalty(loyalty: Loyalty) {
        dispatch({ type: CUSTOMER_DETAILS_ACTIONS.FETCH_LOYALTY, payload: { loyalty } })
      },
      setLoading(value: boolean) {
        dispatch({ type: CUSTOMER_DETAILS_ACTIONS.SET_LOADING, payload: { value } })
      },
      toggleRefundModal(value: boolean, invoice?: Invoice) {
        dispatch({
          type: CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_MODAL,
          payload: { value, invoice },
        })
      },
      toggleRefundConfirmationModal(value: boolean, reason?: string, amount?: number) {
        dispatch({
          type: CUSTOMER_DETAILS_ACTIONS.TOGGLE_REFUND_CONFIRMATION_MODAL,
          payload: { value, reason, amount },
        })
      },
      toggleCancelSubscriptionModal(value: boolean) {
        dispatch({
          type: CUSTOMER_DETAILS_ACTIONS.TOGGLE_CANCEL_SUBSCRIPTION_MODAL,
          payload: { value },
        })
      },
    }
  }, [])

  return <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
}

const useCustomerDetailsState = () => {
  const { actions, state } = useContext(Context)

  return {
    actions,
    state,
  }
}

export const CustomerDetailsState = {
  Provider,
  useState: useCustomerDetailsState,
}
