import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'

const useProductApproval = () => {
  const http = HttpProvider.useHttpClient()

  const approve = useCallback(
    async (masterSku: string): Promise<void> => {
      return http.post(`/v3/products/${masterSku}/publish`).then((response) => response.data)
    },
    [http],
  )

  return { approve }
}

const useProductVariantVersionApproval = () => {
  const http = HttpProvider.useHttpClient()

  const approve = useCallback(
    async (masterSku: string, variantSku: string, versionKey: string): Promise<void> => {
      return http
        .post(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/publish`)
        .then((response) => response.data)
    },
    [http],
  )

  return { approve }
}

export abstract class ProductApprovalApi {
  static useProductApproval = useProductApproval
  static useProductVariantVersionApproval = useProductVariantVersionApproval
}
