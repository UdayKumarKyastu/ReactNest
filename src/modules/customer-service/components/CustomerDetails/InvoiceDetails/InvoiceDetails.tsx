import React from 'react'
import { CustomerDetailsState } from '../../../state/CustomerDetailsState'
import { Translation } from '../../../../i18n/Translation'
import DetailsSection from '../../DetailsSection/DetailsSection'
import { InvoiceDetailsStyles } from './InvoiceDetails.styles'
import InvoicesTable from './InvoicesTable/InvoicesTable'

const { SubTitle } = InvoiceDetailsStyles

interface Props {
  pretId: string
}

const InvoiceDetails = ({ pretId }: Props) => {
  const { translate } = Translation.useTranslation()
  const {
    state: { invoices, customer },
    actions: { fetchInvoices, toggleRefundModal },
  } = CustomerDetailsState.useState()

  return (
    <DetailsSection title={translate('customerDetails.invoiceDetails.title')}>
      <SubTitle>{translate('customerDetails.invoiceDetails.mostRecentInvoices')}</SubTitle>
      <InvoicesTable
        invoices={invoices}
        customerId={customer!.user_id}
        fetchInvoices={fetchInvoices}
        pretId={pretId}
        onRefund={(id) => toggleRefundModal(true, id)}
      />
    </DetailsSection>
  )
}

export default InvoiceDetails
