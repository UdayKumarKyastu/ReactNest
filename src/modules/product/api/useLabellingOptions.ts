import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { LabellingOptions } from '../model/product'

export const useLabellingOptions = () => {
  const http = HttpProvider.useHttpClient()

  const getLabellingOptions = async (): Promise<LabellingOptions> => {
    const { data } = await http.get(`/v3/product-types/food/labelling-options`)

    return data
  }

  return useQuery('labellingOptions', getLabellingOptions, { staleTime: Infinity })
}
