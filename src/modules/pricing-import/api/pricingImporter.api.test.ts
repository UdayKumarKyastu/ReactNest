import { HttpProvider } from '../../common/http/http.provider'
import { renderHook } from '@testing-library/react-hooks'
import { PricingImporterApi } from './pricingImporter.api'

describe('pricing importer API', () => {
  let mockHttpGet: jest.Mock
  let mockHttpPost: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({
      data: [],
    })
    mockHttpPost = jest.fn().mockResolvedValue({})
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
      post: mockHttpPost,
    })
  })

  it('upload file', async () => {
    const file = new File(['test'], 'test.txt')
    const formData = new FormData()
    formData.append('import', file)
    const { result } = renderHook(PricingImporterApi.useUploadFile)
    await result.current.uploadFile(file)
    expect(mockHttpPost).toHaveBeenCalledWith('/v1/price-importer/upload', formData)
  })

  it('trigger import', async () => {
    const IMPORT_ID = 'import123'
    const { result } = renderHook(PricingImporterApi.usePricesImport)
    await result.current.triggerImport(IMPORT_ID)
    expect(mockHttpPost).toHaveBeenCalledWith(`/v1/price-importer/${IMPORT_ID}/trigger`)
  })

  it('get import status', async () => {
    const IMPORT_ID = 'import123'
    const { result } = renderHook(PricingImporterApi.usePricesImport)
    await result.current.getImportStatus(IMPORT_ID)
    expect(mockHttpGet).toHaveBeenCalledWith(`/v1/price-importer/${IMPORT_ID}/status`)
  })
})
