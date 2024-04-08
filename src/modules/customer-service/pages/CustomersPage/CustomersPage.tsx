import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CustomersPageStyles } from './CustomersPage.styles'
import { Translation } from '../../../i18n/Translation'
import { CustomersList } from '../../components/CustomersList/CustomersList'
import { useCustomers } from '../../api/useCustomers'
import { Search } from '../../../products/components/search'

const { Heading, Wrapper } = CustomersPageStyles

export const CustomersPage = () => {
  const { translate } = Translation.useTranslation()
  const [params] = useSearchParams()
  const initialQuery = params.get('q') || ''
  const initialProperty = params.get('p') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchProperty, setSearchProperty] = useState(initialProperty)
  const navigate = useNavigate()

  const { data: customers, isLoading } = useCustomers(searchQuery, searchProperty)

  const onSearch = (query: string, searchProperty: string) => {
    setSearchQuery(query)
    setSearchProperty(searchProperty)
  }

  useEffect(() => {
    if (searchQuery.length && searchProperty.length) {
      navigate(`/customers?p=${searchProperty}&q=${searchQuery}`)
    }
  }, [searchQuery, searchProperty, navigate])

  const searchProperties = useMemo(() => {
    return [
      {
        key: '1',
        value: 'name',
        label: translate('customerService.customerName'),
      },
      {
        key: '2',
        value: 'phone_number',
        label: translate('customerService.customerMobile'),
      },
      {
        key: '3',
        value: 'email',
        label: translate('customerService.emailAddress'),
      },
    ]
  }, [translate])

  return (
    <Wrapper>
      <Heading>{translate('customerService.customers')}</Heading>
      <Search
        onSearch={onSearch}
        isSearching={isLoading}
        query={searchQuery}
        searchProperties={searchProperties}
      />
      {customers && <CustomersList customers={customers} />}
    </Wrapper>
  )
}
