import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { NewProductGroup } from '../model/new-product'
import { ProductNotificationsMapper } from '../model/ProductNotificationsMapper'

export const useDelistSoonProducts = ({ country = 'UK' }: { country: string }) => {
  const http = HttpProvider.useHttpClient()
  const queryParams = `?country=${country}`

  const getDelistSoonProducts = async (): Promise<NewProductGroup[]> => {
    const { data } = await http.get(`/v1/browse/delist-soon${queryParams}`)

    return data.productGroups.map(ProductNotificationsMapper.singleToDelistSoonProduct)
  }

  return useQuery(['delistSoon', country], getDelistSoonProducts, {
    staleTime: 1000,
    keepPreviousData: true,
  })
}
