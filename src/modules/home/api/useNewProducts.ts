import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { NewProductGroup } from '../model/new-product'
import { ProductNotificationsMapper } from '../model/ProductNotificationsMapper'

export const useNewProducts = ({ country = 'UK' }: { country: string }) => {
  const http = HttpProvider.useHttpClient()
  const queryParams = `?country=${country}`

  const getNewProducts = async (): Promise<NewProductGroup[]> => {
    const { data } = await http.get(`/v1/browse/new${queryParams}`)

    return data.productGroups.map(ProductNotificationsMapper.singleToNewProduct)
  }

  return useQuery(['newProducts', country], getNewProducts, {
    staleTime: 1000,
    keepPreviousData: true,
  })
}
