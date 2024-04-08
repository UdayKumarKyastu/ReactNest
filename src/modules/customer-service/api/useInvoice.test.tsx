import { renderHook } from '@testing-library/react-hooks'
import { useInvoice } from './useInvoice'
import { HttpProvider } from '../../common/http/http.provider'

describe('useInvoice api test', () => {
  let mockHttpGet: jest.Mock
  let mockHttpPost: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({ data: {} })
    mockHttpPost = jest.fn().mockResolvedValue({})
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
      post: mockHttpPost,
    })
  })

  it('download invoice', async () => {
    const customerId = 'customer123'
    const invoiceId = 'invoice123'
    const { result } = renderHook(useInvoice)
    await result.current.downloadInvoice(customerId, invoiceId)
    expect(mockHttpGet).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/download`,
    )
  })

  it('void invoice', async () => {
    const customerId = 'customer123'
    const invoiceId = 'invoice123'
    const { result } = renderHook(useInvoice)
    await result.current.voidInvoice(customerId, invoiceId)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/void`,
    )
  })

  it('refund invoice', async () => {
    const customerId = 'customer123'
    const invoiceId = 'invoice123'
    const reason = 'reason123'
    const amount = 20
    const comment = 'comment123'

    const { result } = renderHook(useInvoice)
    await result.current.refundInvoice(customerId, invoiceId, amount, reason, comment)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/refund`,
      {
        refund_amount: amount,
        reason_code: reason,
        comment,
      },
    )
  })
})
