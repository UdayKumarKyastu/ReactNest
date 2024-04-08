export interface ImporterError {
  code: string
  message: string
  sku?: string
}
export interface UploadResponse {
  errors?: ImporterError[]
  skuCount?: number
  importId?: string
}
