import { ProductApi } from './product.api'
import { renderHook } from '@testing-library/react-hooks'
import { HttpProvider } from '../../common/http/http.provider'
import { EditProductDto } from '../dto/edit-product.dto'
import { EditProductVariantDto } from '../dto/edit-product-variant.dto'

const MASTER_SKU_MOCK = 'SKU123'
const VARIANT_SKU_MOCK = 'SKU456'
const VERSION_NUMBER_MOCK = '3'
const MASTER_DATA_MOCK = {
  product: {
    variants: [
      {
        isMaster: true,
        hamiltonGrant: { ingredients: {} },
        availability: { displayAsNew: {} },
      },
    ],
  },
  draftChanges: {
    variants: [],
    reviewStatuses: {},
  },
}
const VERSION_DATA_MOCK = {
  variant: {
    hamiltonGrant: { ingredients: {} },
    availability: { displayAsNew: {} },
  },
  draft: {
    hamiltonGrant: { ingredients: {} },
    availability: { displayAsNew: {} },
  },
}

describe('Product API', () => {
  let mockHttpGet: jest.Mock
  let mockHttpPut: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({
      data: MASTER_DATA_MOCK,
    })
    mockHttpPut = jest.fn().mockResolvedValue({
      data: {},
    })
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
      put: mockHttpPut,
    })
  })

  describe('useGetProduct', () => {
    it('fetchProduct', async () => {
      const { result } = renderHook(ProductApi.useGetProduct)
      await result.current.fetchProduct(MASTER_SKU_MOCK)
      expect(mockHttpGet).toHaveBeenCalledWith(`/v3/products/${MASTER_SKU_MOCK}`)
    })
  })

  describe('useEditProduct', () => {
    const useEditHook = () => ProductApi.useEditProduct(MASTER_SKU_MOCK)
    it('editProductMarketing', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {}
      await result.current.editProductMarketing(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/marketing`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductTaxation', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = { taxCategoryId: 'id123' }
      await result.current.editProductTaxation(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/taxation`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductCategories', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = { categoriesIDs: [] }
      await result.current.editProductCategories(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/categories`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductSetup', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = { iceMachineRequired: true } as EditProductDto.UpdateSetup
      await result.current.editProductSetup(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/set-up`,
        EDIT_DATA_MOCK,
      )
    })
  })

  describe('useEditProductVariant', () => {
    const useEditHook = () => ProductApi.useEditProductVariant(MASTER_SKU_MOCK, VARIANT_SKU_MOCK)
    it('editProductVariantMarketing', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        name: 'variantName',
      } as any as EditProductVariantDto.UpdateVariantMarketing
      await result.current.editProductVariantMarketing(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/marketing`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductVariantReporting', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        prices: [],
      } as EditProductVariantDto.UpdateVariantPricing
      await result.current.editProductVariantPricing(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/pricing`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductVariantAttributes', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        withDecafPods: true,
      } as EditProductVariantDto.UpdateVariantAttributes
      await result.current.editProductVariantAttributes(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/barista-attributes`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductVariantPricing', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        prices: [],
      } as EditProductVariantDto.UpdateVariantPricing
      await result.current.editProductVariantPricing(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/pricing`,
        EDIT_DATA_MOCK,
      )
    })

    it('editProductVariantLabelling', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        legalTitle: '',
      } as EditProductVariantDto.UpdateVariantLabelling
      await result.current.editProductVariantLabelling(EDIT_DATA_MOCK)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/labelling`,
        EDIT_DATA_MOCK,
      )
    })
  })

  describe('useGetProductVariantVersions', () => {
    beforeEach(() => {
      mockHttpGet = jest.fn().mockResolvedValue({
        data: VERSION_DATA_MOCK,
      })
      HttpProvider.useHttpClient = jest.fn().mockReturnValue({
        get: mockHttpGet,
        put: mockHttpPut,
      })
    })

    it('fetchSingleProductVariantVersion', async () => {
      const { result } = renderHook(ProductApi.useGetProductVariantVersions)
      await result.current.fetchSingleProductVariantVersion(
        MASTER_SKU_MOCK,
        VARIANT_SKU_MOCK,
        VERSION_NUMBER_MOCK,
      )
      expect(mockHttpGet).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}`,
      )
    })
  })

  describe('useGetProductCategories', () => {
    it('fetchProductCategories', async () => {
      const { result } = renderHook(ProductApi.useGetProductCategories)
      await result.current.fetchProductCategories(MASTER_SKU_MOCK)
      expect(mockHttpGet).toHaveBeenCalledWith(`/v3/products/${MASTER_SKU_MOCK}/categories`)
    })
  })

  describe('useValidateProductBarcode', () => {
    it('validateProductBarcode', async () => {
      const BARCODE_MOCK = 'barcode123'
      const { result } = renderHook(ProductApi.useValidateProductBarcode)
      await result.current.validateProductBarcode(BARCODE_MOCK)
      expect(mockHttpGet).toHaveBeenCalledWith(`/v3/barcode/${BARCODE_MOCK}`)
    })
  })

  describe('useEditProductVariantVersion', () => {
    const useEditHook = () =>
      ProductApi.useEditProductVariantVersion(
        MASTER_SKU_MOCK,
        VARIANT_SKU_MOCK,
        VERSION_NUMBER_MOCK,
      )

    it('editProductVariantVersionMarketing', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        name: 'variantName',
      } as any as EditProductVariantDto.UpdateVariantMarketing
      await result.current.editProductVariantVersionMarketing(EDIT_DATA_MOCK, true)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}/marketing`,
        { ...EDIT_DATA_MOCK, isDuplicatedData: true },
      )
    })

    it('editProductVariantVersionReporting', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        pluReportingName: 'reportingName',
      } as EditProductVariantDto.UpdateVariantReporting
      await result.current.editProductVariantVersionReporting(EDIT_DATA_MOCK, true)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}/reporting`,
        { ...EDIT_DATA_MOCK, isDuplicatedData: true },
      )
    })

    it('editProductVariantVersionAttributes', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        withDecafPods: true,
      } as EditProductVariantDto.UpdateVariantAttributes
      await result.current.editProductVariantVersionAttributes(EDIT_DATA_MOCK, true)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}/barista-attributes`,
        { ...EDIT_DATA_MOCK, isDuplicatedData: true },
      )
    })

    it('editProductVariantVersionPricing', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        prices: [],
      } as EditProductVariantDto.UpdateVariantPricing
      await result.current.editProductVariantVersionPricing(EDIT_DATA_MOCK, true)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}/pricing`,
        { ...EDIT_DATA_MOCK, isDuplicatedData: true },
      )
    })

    it('editProductVariantVersionLabelling', async () => {
      const { result } = renderHook(useEditHook)
      const EDIT_DATA_MOCK = {
        legalTitle: 'title123',
      } as EditProductVariantDto.UpdateVariantLabelling
      await result.current.editProductVariantVersionLabelling(EDIT_DATA_MOCK, true)
      expect(mockHttpPut).toHaveBeenCalledWith(
        `/v3/products/${MASTER_SKU_MOCK}/variants/${VARIANT_SKU_MOCK}/versions/${VERSION_NUMBER_MOCK}/labelling`,
        { ...EDIT_DATA_MOCK, isDuplicatedData: true },
      )
    })
  })

  describe('useGetAvailableHowToDisplayOptions', () => {
    it('getAvailableHowToDisplayOptions', async () => {
      const PRODUCT_TYPE_MOCK = 'type123'
      const { result } = renderHook(ProductApi.useGetAvailableHowToDisplayOptions)
      await result.current.getAvailableHowToDisplayOptions(PRODUCT_TYPE_MOCK)
      expect(mockHttpGet).toHaveBeenCalledWith(
        `/v3/product-types/${PRODUCT_TYPE_MOCK}/how-to-display`,
      )
    })
  })
})
