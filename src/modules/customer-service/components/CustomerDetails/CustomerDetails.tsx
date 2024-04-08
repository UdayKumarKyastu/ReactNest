import React, { useCallback, useEffect } from 'react'
import { CustomerDetailsStyles } from './CustomerDetails.styles'
import CustomerCard from '../CustomerCard/CustomerCard'
import SubscriptionDetails from './SubscriptionDetails/SubscriptionDetails'
import InvoiceDetails from './InvoiceDetails/InvoiceDetails'
import LoyaltyAndPromotionDetails from './LoyaltyAndPromotionDetails/LoyaltyAndPromotionDetails'
import { Breadcrumbs } from '../../../common/components/Breadcrumbs/Breadcrumbs'
import { Translation } from '../../../i18n/Translation'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'
import { useCustomer } from '../../api/useCustomer'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'
import { StringParam, useQueryParam } from 'use-query-params'
import IssueRefundModal from '../IssueRefundModal/IssueRefundModal'
import RefundConfirmationModal from '../RefundConfirmationModal/RefundConfirmationModal'

const { Wrapper, Title, BreadcrumbItem, LoadingCover, Root } = CustomerDetailsStyles

const CustomerDetails = () => {
  const { translate } = Translation.useTranslation()
  const {
    actions,
    state: {
      customer,
      loading,
      subscription,
      invoices,
      loyalty,
      isRefundModalOpen,
      isRefundConfirmationModalOpen,
    },
  } = CustomerDetailsState.useState()
  const { getSubscriptions, getCustomer, getInvoices, getLoyalty } = useCustomer()
  const [pretId] = useQueryParam('pretId', StringParam)
  const [userId] = useQueryParam('userId', StringParam)
  const [walletId] = useQueryParam('walletId', StringParam)

  const getData = useCallback(async () => {
    actions.setLoading(true)
    try {
      const customer = await getCustomer(userId!)
      const subscriptions = await getSubscriptions(customer.app_metadata.cbee_id)
      const invoices = await getInvoices(customer.app_metadata.cbee_id)
      const loyalty = await getLoyalty(userId!, walletId!)
      actions.fetchCustomer(customer)
      actions.fetchSubscription(subscriptions[0])
      actions.fetchInvoices(invoices)
      actions.fetchLoyalty(loyalty)
    } finally {
      actions.setLoading(false)
    }
  }, [actions, getCustomer, getInvoices, getLoyalty, getSubscriptions, userId, walletId])

  useEffect(() => {
    getData()
  }, [getData])

  if (!customer || !invoices) {
    return <LoadingSpinner />
  }

  return (
    <Root>
      {loading && (
        <LoadingCover>
          <LoadingSpinner />
        </LoadingCover>
      )}
      <Breadcrumbs
        children={[
          <BreadcrumbItem href="/">{translate('customerDetails.searchCustomers')}</BreadcrumbItem>,
          <BreadcrumbItem>{`${customer.name} ${customer.given_name}`}</BreadcrumbItem>,
        ]}
      />

      <Wrapper>
        <Title>{`${customer.name} ${customer.given_name}`}</Title>

        <CustomerCard />
        {!!subscription && <SubscriptionDetails subscription={subscription} />}
        {!!invoices.length && <InvoiceDetails pretId={pretId!} />}
        {!!loyalty && <LoyaltyAndPromotionDetails loyalty={loyalty} />}
      </Wrapper>

      {isRefundModalOpen && <IssueRefundModal />}
      {isRefundConfirmationModalOpen && <RefundConfirmationModal />}
    </Root>
  )
}

export default CustomerDetails
