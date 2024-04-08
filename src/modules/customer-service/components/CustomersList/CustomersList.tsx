import { CustomersListStyles } from './CustomersList.styles'
import { Translation } from '../../../i18n/Translation'
import { CustomersTable } from '../CustomersTable/CustomersTable'
import { useCallback } from 'react'
import { CustomerSearchResult } from '../../model/customer-search-result'
import { useNavigate } from 'react-router-dom'

interface Props {
  customers: any[]
}

const { ResultsCount, Toolbar, Wrapper } = CustomersListStyles

export const CustomersList = ({ customers }: Props) => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()

  const onRowClick = useCallback(
    (searchItem: CustomerSearchResult) => {
      navigate(
        `/customer-details?userId=${searchItem.user_id}&pretId=${searchItem.pret_id}&walletId=${searchItem.wallet_id}`,
      )
    },
    [navigate],
  )

  return (
    <Wrapper>
      <Toolbar>
        <ResultsCount data-cy="search-results-header">
          {`${customers.length} ${translate('productSearch.results')}`}
        </ResultsCount>
      </Toolbar>
      <CustomersTable data={customers} onRowClick={onRowClick} />
    </Wrapper>
  )
}
