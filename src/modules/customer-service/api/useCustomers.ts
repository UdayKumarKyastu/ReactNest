import { useQuery } from 'react-query'
import { HttpProvider } from '../../common/http/http.provider'
import { CustomerSearchResult } from '../model/customer-search-result'

export const useCustomers = (query: string, propertyName: string) => {
  const http = HttpProvider.useHttpClient()

  const searchParams = new URLSearchParams({
    query,
    propertyName,
  }).toString()

  const getCustomers = async (): Promise<CustomerSearchResult[]> => {
    const { data }: { data: CustomerSearchResult[] } = await http.get(
      `/v1/customer-service/customers?${searchParams}`,
    )

    return data
  }

  return useQuery(['customers', { query, propertyName }], getCustomers, {
    refetchOnWindowFocus: false,
  })
}
