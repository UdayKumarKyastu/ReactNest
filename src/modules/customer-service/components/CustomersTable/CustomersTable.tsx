import { Translation } from '../../../i18n/Translation'
import { CustomersTableStyles } from './CustomersTable.styles'
import { ProductBadge } from '../../../product/components/ProductBadge/ProductBadge'
import CountryBadge from '../../../common/components/CountryBadge/CountryBadge'
import { NoDataNotice } from '../../../home/components/NoDataNotice/NoDataNotice'
import MagnifyIcon from '../../../../icons/Magnify'
import { CustomerSearchResult } from '../../model/customer-search-result'
import { useCallback } from 'react'

export interface Props {
  data: CustomerSearchResult[]
  onRowClick?: (row: CustomerSearchResult) => void
}

const placeholderImage =
  'https://images.ctfassets.net/4zu8gvmtwqss/4EPVs5nOqNrgQvC6ckU9G2/69134074a3bbcafa293a8ea578e4aed3/Placeholder.svg?fm=jpg&fl=progressive&w=502'

const {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  CustomerNameWrapper,
  CustomerName,
  CustomerImage,
} = CustomersTableStyles

export const CustomersTable = ({ data, onRowClick }: Props) => {
  const { translate } = Translation.useTranslation()

  const getBadge = useCallback((customer: CustomerSearchResult) => {
    if (!customer.wallet_id) {
      return <ProductBadge.Legacy />
    }
    if (customer.blocked) {
      return <ProductBadge.Blocked />
    }
    return null
  }, [])

  if (data?.length === 0) {
    return (
      <NoDataNotice
        title={translate('customerService.noCustomersFound')}
        description={translate('customerService.pleaseDoubleCheck')}
        icon={<MagnifyIcon />}
      />
    )
  }

  return (
    <Table data-testid="search-recipe-table">
      <TableHeader>
        <TableRow>
          <td>{translate('customerService.customerName')}</td>
          <td>{translate('customerService.emailAddress')}</td>
          <td>{translate('customerService.customerMobile')}</td>
          <td>{translate('customerService.country')}</td>
          <td>{translate('customerService.status')}</td>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((customer) => (
          <TableRow
            key={customer.user_id}
            onClick={() => customer.wallet_id && onRowClick?.(customer)}
            data-testid="recipe-row"
            notClickable={!customer.wallet_id}
            resultRow
          >
            <td>
              <CustomerNameWrapper>
                <CustomerImage alt="Image" src={customer.imageUrl || placeholderImage} />
                <CustomerName>{customer.name}</CustomerName>
              </CustomerNameWrapper>
            </td>
            <td>{customer.email}</td>
            <td>{customer.phone_number}</td>
            <td>{customer.country && <CountryBadge countryCode={customer.country} />}</td>
            <td>{getBadge(customer)}</td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
