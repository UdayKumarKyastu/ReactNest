import { HttpProvider } from '../../common/http/http.provider'
import { useCallback } from 'react'
import { GetProductDto } from '../dto/get-product.dto'
import { ProductDtoMapper } from '../model/ProductDtoMapper'
import { ProductVariantVersionDtoMapper } from '../model/ProductVariantVersionDtoMapper'
import { Product } from '../model/product'
import { Locale } from '../../i18n/Locale'
import { EditProductDto } from '../dto/edit-product.dto'
import { EditProductVariantDto } from '../dto/edit-product-variant.dto'
import { ProductCategory } from '../model/product-category'
import { ProductVariantVersion } from '../model/product-variant'

const useGetProduct = () => {
  const http = HttpProvider.useHttpClient()

  /**
   * TODO
   * - Handle errors
   */
  const fetchProduct = useCallback(
    async (sku: string): Promise<Product> => {
      return http
        .get<GetProductDto.ProductResponse>(`/v3/products/${sku}`)
        .then((response) => response.data)
        .then(ProductDtoMapper.singleToProduct)
    },
    [http],
  )

  return { fetchProduct }
}

const useEditProduct = (productSku: string) => {
  const http = HttpProvider.useHttpClient()

  const editProductMarketing = useCallback(
    async (values: { name?: Locale.MultilangString; description?: Locale.MultilangString }) => {
      return http
        .put(`/v3/products/${productSku}/marketing`, {
          ...values,
        })
        .then((response) => response.data)
    },
    [http, productSku],
  )

  const editProductTaxation = useCallback(
    async (values: { taxCategoryId: string }) => {
      const dto: EditProductDto.UpdateTaxation = {
        taxCategoryId: values.taxCategoryId,
      }

      return http.put(`/v3/products/${productSku}/taxation`, dto).then((response) => response.data)
    },
    [http, productSku],
  )

  const editProductCategories = useCallback(
    async (values: { categoriesIDs: string[] }) => {
      const dto: EditProductDto.UpdateCategories = {
        categoriesIDs: values.categoriesIDs,
      }

      return http
        .put(`/v3/products/${productSku}/categories`, dto)
        .then((response) => response.data)
    },
    [http, productSku],
  )

  const editProductSetup = useCallback(
    async (values: EditProductDto.UpdateSetup) => {
      const dto: EditProductDto.UpdateSetup = {
        ...values,
      }

      return http.put(`/v3/products/${productSku}/set-up`, dto).then((response) => response.data)
    },
    [http, productSku],
  )

  return { editProductTaxation, editProductMarketing, editProductSetup, editProductCategories }
}

const useEditProductVariant = (masterSku: string, variantSku: string) => {
  const http = HttpProvider.useHttpClient()

  const editProductVariantMarketing = async (
    values: EditProductVariantDto.UpdateVariantMarketing,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/marketing`, {
        ...values,
      })
      .then((response) => response.data)
  }

  const editProductVariantReporting = async (
    values: EditProductVariantDto.UpdateVariantReporting,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/reporting`, {
        ...values,
      })
      .then((response) => response.data)
  }

  const editProductVariantAttributes = async (
    values: EditProductVariantDto.UpdateVariantAttributes,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/barista-attributes`, {
        ...values,
      })
      .then((response) => response.data)
  }

  const editProductVariantPricing = async (values: EditProductVariantDto.UpdateVariantPricing) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/pricing`, {
        ...values,
      })
      .then((response) => response.data)
  }

  const editProductVariantLabelling = async (
    values: EditProductVariantDto.UpdateVariantLabelling,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/labelling`, {
        ...values,
      })
      .then((response) => response.data)
  }

  return {
    editProductVariantMarketing,
    editProductVariantReporting,
    editProductVariantAttributes,
    editProductVariantPricing,
    editProductVariantLabelling,
  }
}

const useGetProductVariantVersions = () => {
  const http = HttpProvider.useHttpClient()

  const fetchSingleProductVariantVersion = async (
    masterSku: string,
    variantSku: string,
    versionNumber: string,
  ): Promise<ProductVariantVersion> => {
    return http
      .get(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionNumber}`)
      .then((response) => response.data)
      .then(ProductVariantVersionDtoMapper.singleToVersion)
  }

  return { fetchSingleProductVariantVersion }
}

const useGetProductCategories = () => {
  const http = HttpProvider.useHttpClient()

  const fetchProductCategories = useCallback(
    async (sku: string): Promise<{ categories: ProductCategory[] }> => {
      return http.get(`/v3/products/${sku}/categories`).then((response) => response.data)
    },
    [http],
  )

  return { fetchProductCategories }
}

const useValidateProductBarcode = () => {
  const http = HttpProvider.useHttpClient()

  const validateProductBarcode = useCallback(
    async (barcode: string) => {
      return http.get(`/v3/barcode/${barcode}`).then((response) => response.data)
    },
    [http],
  )

  return { validateProductBarcode }
}

const useEditProductVariantVersion = (
  masterSku: string,
  variantSku: string,
  versionKey: string,
) => {
  const http = HttpProvider.useHttpClient()

  const editProductVariantVersionMarketing = async (
    values: EditProductVariantDto.UpdateVariantMarketing,
    isDuplicatedData?: boolean,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/marketing`, {
        ...values,
        isDuplicatedData,
      })
      .then((response) => response.data)
  }

  const editProductVariantVersionReporting = async (
    values: EditProductVariantDto.UpdateVariantReporting,
    isDuplicatedData?: boolean,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/reporting`, {
        ...values,
        isDuplicatedData,
      })
      .then((response) => response.data)
  }

  const editProductVariantVersionAttributes = async (
    values: EditProductVariantDto.UpdateVariantAttributes,
    isDuplicatedData?: boolean,
  ) => {
    return http
      .put(
        `/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/barista-attributes`,
        {
          ...values,
          isDuplicatedData,
        },
      )
      .then((response) => response.data)
  }

  const editProductVariantVersionPricing = async (
    values: EditProductVariantDto.UpdateVariantPricing,
    isDuplicatedData?: boolean,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/pricing`, {
        ...values,
        isDuplicatedData,
      })
      .then((response) => response.data)
  }

  const editProductVariantVersionLabelling = async (
    values: EditProductVariantDto.UpdateVariantLabelling,
    isDuplicatedData?: boolean,
  ) => {
    return http
      .put(`/v3/products/${masterSku}/variants/${variantSku}/versions/${versionKey}/labelling`, {
        ...values,
        isDuplicatedData,
      })
      .then((response) => response.data)
  }

  return {
    editProductVariantVersionMarketing,
    editProductVariantVersionReporting,
    editProductVariantVersionAttributes,
    editProductVariantVersionPricing,
    editProductVariantVersionLabelling,
  }
}

const useGetAvailableHowToDisplayOptions = () => {
  const http = HttpProvider.useHttpClient()

  const getAvailableHowToDisplayOptions = useCallback(
    async (productType: string): Promise<{ options: Array<{ key: string; label: string }> }> => {
      return http
        .get(`/v3/product-types/${productType}/how-to-display`)
        .then((response) => response.data)
    },
    [http],
  )

  return { getAvailableHowToDisplayOptions }
}

export abstract class ProductApi {
  static useGetProduct = useGetProduct
  static useEditProduct = useEditProduct
  static useEditProductVariant = useEditProductVariant
  static useGetProductCategories = useGetProductCategories
  static useGetProductVariantVersions = useGetProductVariantVersions
  static useValidateProductBarcode = useValidateProductBarcode
  static useEditProductVariantVersion = useEditProductVariantVersion
  static useGetAvailableHowToDisplayOptions = useGetAvailableHowToDisplayOptions
}
