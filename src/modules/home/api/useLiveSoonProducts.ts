import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { NewProductGroup } from '../model/new-product'
import { ProductNotificationsMapper } from '../model/ProductNotificationsMapper'

export const useLiveSoonProducts = ({ country = 'UK' }: { country: string }) => {
  const http = HttpProvider.useHttpClient()
  const queryParams = `?country=${country}`

  const getLiveSoonProducts = async (): Promise<NewProductGroup[]> => {
    const { data } = await http.get(`/v1/browse/live-soon${queryParams}`)

    return data.productGroups.map(ProductNotificationsMapper.singleToLiveSoonProduct)
  }

  return useQuery(['liveSoon', country], getLiveSoonProducts, {
    staleTime: 1000,
    keepPreviousData: true,
  })
}
