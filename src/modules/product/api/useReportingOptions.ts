import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { VariantReportingOptions } from '../model/product'
import { ProductType } from '../model/product-type'

export const useReportingOptions = (productType: ProductType) => {
  const http = HttpProvider.useHttpClient()

  const getReportingOptions = async (): Promise<VariantReportingOptions> => {
    const { data } = await http.get(`/v3/product-types/${productType}/reporting`)

    return data
  }

  return useQuery(['reportingOptions', productType], getReportingOptions, { staleTime: Infinity })
}
