import { HttpProvider } from '../../common/http/http.provider'
import { renderHook } from '@testing-library/react-hooks'
import { ReviewStatusesApi } from './reviewStatuses.api'

const MOCK_PRODUCT_SKU = { masterSku: 'masterSku123' }
const MOCK_VARIANT_SKU = { masterSku: 'masterSku123', variantSku: 'variant123' }
const MOCK_VERSION_SKU = {
  masterSku: 'masterSku123',
  variantSku: 'variant123',
  versionKey: 'version123',
}

describe('Review Statuses API', () => {
  let mockHttpPost: jest.Mock

  beforeEach(() => {
    mockHttpPost = jest.fn()
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      post: mockHttpPost,
    })
  })

  it('accept', async () => {
    const callbackMock = jest.fn()
    const FIELD_NAME = 'fieldName1'
    const TAB_NAME = 'marketing'
    const { result } = renderHook(() => ReviewStatusesApi.useAcceptRejectChanges(callbackMock))
    await result.current.accept(MOCK_PRODUCT_SKU, FIELD_NAME, TAB_NAME)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v3/products/${MOCK_PRODUCT_SKU.masterSku}/${TAB_NAME}/review`,
      {
        fieldName: FIELD_NAME,
        fieldValue: undefined,
        operationType: 'approve',
      },
    )
    expect(callbackMock).toBeCalled()
  })

  it('reject', async () => {
    const callbackMock = jest.fn()
    const FIELD_NAME = 'fieldName1'
    const TAB_NAME = 'marketing'
    const { result } = renderHook(() => ReviewStatusesApi.useAcceptRejectChanges(callbackMock))
    await result.current.reject(MOCK_VARIANT_SKU, FIELD_NAME, TAB_NAME)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v3/products/${MOCK_VARIANT_SKU.masterSku}/variants/${MOCK_VARIANT_SKU.variantSku}/${TAB_NAME}/review`,
      {
        fieldName: FIELD_NAME,
        fieldValue: undefined,
        operationType: 'reject',
      },
    )
    expect(callbackMock).toBeCalled()
  })

  it('reset', async () => {
    const callbackMock = jest.fn()
    const FIELD_NAME = 'fieldName1'
    const TAB_NAME = 'marketing'
    const { result } = renderHook(() => ReviewStatusesApi.useAcceptRejectChanges(callbackMock))
    await result.current.reset(MOCK_VERSION_SKU, FIELD_NAME, TAB_NAME)
    expect(mockHttpPost).toHaveBeenCalledWith(
      `/v3/products/${MOCK_VERSION_SKU.masterSku}/variants/${MOCK_VERSION_SKU.variantSku}/versions/${MOCK_VERSION_SKU.versionKey}/${TAB_NAME}/review`,
      {
        fieldName: FIELD_NAME,
        fieldValue: undefined,
        operationType: 'reset',
      },
    )
    expect(callbackMock).toBeCalled()
  })
})
