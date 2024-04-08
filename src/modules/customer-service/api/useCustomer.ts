import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'
import { Customer } from '../model/Customer'
import { Subscription } from '../model/Subscription'
import { Invoice } from '../model/Invoice'
import { Loyalty } from '../model/Loyalty'

export const useCustomer = () => {
  const http = HttpProvider.useHttpClient()

  const getCustomer = useCallback(
    (id: string): Promise<Customer> => {
      return http.get(`/v1/customer-service/customers/${id}`).then(({ data }) => data)
    },
    [http],
  )

  const getSubscriptions = useCallback(
    (id: string): Promise<Subscription[]> => {
      return http.get(`/v1/customer-service/customers/${id}/subscriptions`).then(({ data }) => data)
    },
    [http],
  )

  const getInvoices = useCallback(
    (id: string): Promise<Invoice[]> => {
      return http.get(`/v1/customer-service/customers/${id}/invoices`).then(({ data }) => data)
    },
    [http],
  )

  const blockCustomer = useCallback(
    (id: string, value: boolean) => {
      return http.put(`/v1/customer-service/customers/${id}/update`, {
        blocked: value,
      })
    },
    [http],
  )

  const pauseSubscription = useCallback(
    (customerId: string, subscriptionId: string) => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/pause`,
      )
    },
    [http],
  )

  const cancelSubscription = useCallback(
    (
      customerId: string,
      subscriptionId: string,
      cancelEndOfTerm: boolean,
      comment?: string,
    ): Promise<Loyalty> => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/cancel`,
        { cancelEndOfTerm, comment },
      )
    },
    [http],
  )

  const resumeSubscription = useCallback(
    (customerId: string, subscriptionId: string): Promise<Loyalty> => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/resume`,
      )
    },
    [http],
  )

  const restartSubscription = useCallback(
    (customerId: string, subscriptionId: string): Promise<Loyalty> => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/reactivate`,
      )
    },
    [http],
  )

  const getLoyalty = useCallback(
    (customerId: string, walletId: string) => {
      return http
        .get(`/v1/customer-service/customers/${customerId}/loyalty/${walletId}`)
        .then(({ data }) => data)
    },
    [http],
  )

  const reactivateReward = useCallback(
    (customerId: string, walletId: string, rewardId: number) => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/loyalty/${walletId}/rewards/${rewardId}/activate`,
      )
    },
    [http],
  )

  const issueNewReward = useCallback(
    (customerId: string, walletId: string) => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/loyalty/${walletId}/issue-new-reward`,
      )
    },
    [http],
  )

  return {
    getCustomer,
    getSubscriptions,
    getInvoices,
    blockCustomer,
    pauseSubscription,
    cancelSubscription,
    getLoyalty,
    reactivateReward,
    resumeSubscription,
    restartSubscription,
    issueNewReward,
  }
}
