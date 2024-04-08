import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { PendingReviewProductGroup } from '../model/pending-review-product'
import { ProductNotificationsMapper } from '../model/ProductNotificationsMapper'

export const usePendingReviewProducts = ({ country = 'UK' }: { country: string }) => {
  const http = HttpProvider.useHttpClient()
  const queryParams = `?country=${country}`

  const getPendingReviewProducts = async (): Promise<PendingReviewProductGroup[]> => {
    const { data } = await http.get(`/v1/browse/pending${queryParams}`)

    return data.productGroups.map(ProductNotificationsMapper.singleToPendingReviewProduct)
  }

  return useQuery(['pendingReviewProducts', country], getPendingReviewProducts, {
    staleTime: 1000,
    keepPreviousData: true,
  })
}
