import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'
import { ImportStatus } from '../model/ImportStatus'
import { UploadResponse } from '../model/UploadResponse'

const useUploadFile = () => {
  const http = HttpProvider.useHttpClient()

  const uploadFile = useCallback(
    (file: File): Promise<UploadResponse> => {
      const formData = new FormData()
      formData.append('import', file)
      return http
        .post('/v1/price-importer/upload', formData)
        .then(({ data }) => data)
        .catch((e) => ({
          errors: e?.response?.data || [],
        }))
    },
    [http],
  )

  return { uploadFile }
}

const usePricesImport = () => {
  const http = HttpProvider.useHttpClient()

  const triggerImport = useCallback(
    (importId: string) => {
      return http
        .post(`/v1/price-importer/${importId}/trigger`)
        .then(({ data }) => data)
        .catch((e) => ({
          errors: e?.response?.data || [],
        }))
    },
    [http],
  )

  const getImportStatus = useCallback(
    (importId: string): Promise<ImportStatus> => {
      return http.get(`/v1/price-importer/${importId}/status`).then(({ data }) => data)
    },
    [http],
  )

  return { triggerImport, getImportStatus }
}

export abstract class PricingImporterApi {
  static useUploadFile = useUploadFile
  static usePricesImport = usePricesImport
}
