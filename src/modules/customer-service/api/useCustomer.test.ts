import { HttpProvider } from '../../common/http/http.provider'
import { renderHook } from '@testing-library/react-hooks'
import { useCustomer } from './useCustomer'

describe('useCustomer api test', () => {
  let mockHttpGet: jest.Mock
  let mockHttpPost: jest.Mock
  let mockHttpPut: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({ data: {} })
    mockHttpPost = jest.fn().mockResolvedValue({})
    mockHttpPut = jest.fn().mockResolvedValue({})
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
      post: mockHttpPost,
      put: mockHttpPut,
    })
  })

  it('getCustomer', async () => {
    const customerId = 'customer123'
    const { result } = renderHook(useCustomer)
    await result.current.getCustomer(customerId)
    expect(mockHttpGet).toHaveBeenCalledWith(`/v1/customer-service/customers/${customerId}`)
  })

  it('getSubscriptions', async () => {
    const customerId = 'customer123'
    const { result } = renderHook(useCustomer)
    await result.current.getSubscriptions(customerId)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/subscriptions`,
    )
  })

  it('getInvoices', async () => {
    const customerId = 'customer123'
    const { result } = renderHook(useCustomer)
    await result.current.getInvoices(customerId)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/invoices`,
    )
  })

  it('blockCustomer', async () => {
    const customerId = 'customer123'
    const { result } = renderHook(useCustomer)
    await result.current.blockCustomer(customerId, true)
    expect(mockHttpPut).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/update`,
      { blocked: true },
    )
  })

  it('pauseSubscription', async () => {
    const customerId = 'customer123'
    const subscriptionId = 'subscription123'
    const { result } = renderHook(useCustomer)
    await result.current.pauseSubscription(customerId, subscriptionId)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/pause`,
    )
  })

  it('cancelSubscription', async () => {
    const customerId = 'customer123'
    const subscriptionId = 'subscription123'
    const cancelEndOfTerm = true
    const { result } = renderHook(useCustomer)
    await result.current.cancelSubscription(customerId, subscriptionId, cancelEndOfTerm)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/subscriptions/${subscriptionId}/cancel`,
      { cancelEndOfTerm },
    )
  })

  it('getLoyalty', async () => {
    const customerId = 'customer123'
    const walletId = 'wallet123'
    const { result } = renderHook(useCustomer)
    await result.current.getLoyalty(customerId, walletId)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/loyalty/${walletId}`,
    )
  })

  it('reactivateReward', async () => {
    const customerId = 'customer123'
    const walletId = 'wallet123'
    const rewardId = 123123
    const { result } = renderHook(useCustomer)
    await result.current.reactivateReward(customerId, walletId, rewardId)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/loyalty/${walletId}/rewards/${rewardId}/activate`,
    )
  })
})
