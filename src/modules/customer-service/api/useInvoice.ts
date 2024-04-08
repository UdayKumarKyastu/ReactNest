import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'
import { RefundReason } from 'src/modules/customer-service/model/RefundReason'

export const useInvoice = () => {
  const http = HttpProvider.useHttpClient()

  const downloadInvoice = useCallback(
    (customerId: string, invoiceId: string): Promise<string> => {
      return http
        .get(`/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/download`)
        .then(({ data }) => data.download_url)
    },
    [http],
  )

  const voidInvoice = useCallback(
    (customerId: string, invoiceId: string) => {
      return http.post(`/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/void`)
    },
    [http],
  )

  const refundInvoice = useCallback(
    (
      customerId: string,
      invoiceId: string,
      refund_amount: number,
      reason_code: string,
      comment: string,
    ) => {
      return http.post(
        `/v1/customer-service/customers/${customerId}/invoices/${invoiceId}/refund`,
        {
          refund_amount,
          reason_code,
          comment,
        },
      )
    },
    [http],
  )

  const getRefundReasons = useCallback((): Promise<RefundReason[]> => {
    return http.get(`/v1/customer-service/refund-reasons`).then(({ data }) => data)
  }, [http])

  return {
    downloadInvoice,
    voidInvoice,
    refundInvoice,
    getRefundReasons,
  }
}
