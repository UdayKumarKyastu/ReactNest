import { useCallback, useMemo } from 'react'
import { CustomerSearchStyles } from './CustomerSearch.styles'
//@ts-ignore
import BackgroundImage from '../../../../images/customer_service_background.svg'
import { Translation } from '../../../i18n/Translation'
import { Search } from '../../../products/components/search'
import { useNavigate } from 'react-router-dom'

const { Wrapper, InnerWrapper, Title } = CustomerSearchStyles

export const CustomerSearch = () => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()

  const onSearch = useCallback(
    (query: string, propertyName: string) => {
      navigate(`/customers?p=${propertyName}&q=${query}`)
    },
    [navigate],
  )

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
      <img src={BackgroundImage} />
      <InnerWrapper>
        <Title>{translate('customerService.lookingForACustomer')}</Title>
        <Search onSearch={onSearch} searchProperties={searchProperties} />
      </InnerWrapper>
    </Wrapper>
  )
}
