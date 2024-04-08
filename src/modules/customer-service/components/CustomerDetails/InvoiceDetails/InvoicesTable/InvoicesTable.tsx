import React, { useCallback } from 'react'
import { InvoicesTableStyles } from './InvoicesTable.styles'
import { Translation } from '../../../../../i18n/Translation'
import Export from '../../../../../../icons/Export'
import { format } from 'date-fns'
import Badge from '../../../../../common/components/Badge/Badge'
import { Invoice, InvoiceStatus, PaymentMethod } from '../../../../model/Invoice'
import { withCurrency } from '../../../../../../util/withCurrency'
import { Locale } from '../../../../../i18n/Locale'
import { useInvoice } from '../../../../api/useInvoice'
import { NotificationsState } from '../../../../../notifications/state/NotificationsState'
import { useCustomer } from '../../../../api/useCustomer'

const { Table, Header, Body, Row, Cell, InvoiceButton, ActionButton, ButtonsWrapper, Hour } =
  InvoicesTableStyles

interface Props {
  invoices: Invoice[]
  customerId: string
  fetchInvoices(invoices: Invoice[]): void
  pretId: string
  onRefund(invoice: Invoice): void
}

const InvoicesTable = ({ invoices, customerId, fetchInvoices, pretId, onRefund }: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const { getInvoices } = useCustomer()
  const { downloadInvoice, voidInvoice } = useInvoice()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()

  const onInvoiceDownload = useCallback(
    async (invoiceId: string) => {
      const url = await downloadInvoice(customerId, invoiceId)
      const link = document.createElement('a')
      link.href = url
      link.download = `${invoiceId}.pdf`
      link.click()
      document.body.removeChild(link)
    },
    [customerId, downloadInvoice],
  )

  const reloadInvoices = useCallback(async () => {
    const invoices = await getInvoices(pretId!)
    fetchInvoices(invoices)
  }, [fetchInvoices, getInvoices, pretId])

  const onVoid = useCallback(
    async (invoiceId: string) => {
      await voidInvoice(customerId, invoiceId)
      addNotification(translate('customerDetails.invoiceDetails.voidSuccess'), '', 'success')
      reloadInvoices()
    },
    [addNotification, customerId, reloadInvoices, translate, voidInvoice],
  )

  const statusColorMap = {
    [InvoiceStatus.Paid]: 'green',
    [InvoiceStatus.Posted]: 'yellow',
    [InvoiceStatus.PaymentDue]: 'yellow',
    [InvoiceStatus.NotPaid]: 'red',
    [InvoiceStatus.Voided]: 'black',
    [InvoiceStatus.Pending]: 'yellow',
  } as const

  const getAmount = useCallback(
    (invoice: Invoice) => {
      const { amount_paid, currency_code, amount_refunded } = invoice
      const paid = withCurrency({ locale, value: amount_paid! / 100, currency: currency_code })
      const refunded = withCurrency({
        locale,
        value: amount_refunded! / 100,
        currency: currency_code,
      })
      return amount_refunded ? `${paid}(-${refunded})` : paid
    },
    [locale],
  )

  const goToAdyen = useCallback((transactionId: string) => {
    window.open(`${process.env.ADYEN_DOMAIN}${transactionId}`, '_blank')
  }, [])

  return (
    <Table>
      <Header>
        <Row>
          <Cell>{translate('customerDetails.invoiceDetails.date')}</Cell>
          <Cell>{translate('customerDetails.invoiceDetails.amount')}</Cell>
          <Cell>{translate('customerDetails.invoiceDetails.gatewayTransactionId')}</Cell>
          <Cell />
        </Row>
      </Header>

      <Body>
        {invoices.map((invoice) => (
          <Row key={invoice.id}>
            <Cell>
              {invoice.paid_at ? format(new Date(invoice.paid_at), 'dd MMM yyyy') : '-'}
              <Hour>{invoice.paid_at ? format(new Date(invoice.paid_at), 'HH:mm') : '-'}</Hour>
            </Cell>

            <Cell>
              <div>{getAmount(invoice)}</div>
              <Badge
                label={translate(`customerDetails.invoiceDetails.${invoice.status}`)}
                color={statusColorMap[invoice.status]}
              />
            </Cell>

            <Cell>{invoice.transaction_id}</Cell>

            <Cell>
              <ButtonsWrapper>
                <InvoiceButton
                  styleType="tertiary"
                  icon={<Export height={12} width={12} />}
                  onClick={() => onInvoiceDownload(invoice.id)}
                >
                  {translate('customerDetails.invoiceDetails.invoice')}
                </InvoiceButton>
                {invoice.status === InvoiceStatus.Paid &&
                  invoice.amount_refunded < invoice.amount_paid! && (
                    <ActionButton styleType="secondary" compact onClick={() => onRefund(invoice)}>
                      {translate('customerDetails.invoiceDetails.issueRefund')}
                    </ActionButton>
                  )}
                {invoice.status !== InvoiceStatus.Paid && (
                  <ActionButton styleType="secondary" compact onClick={() => onVoid(invoice.id)}>
                    {translate('customerDetails.invoiceDetails.voidInvoice')}
                  </ActionButton>
                )}
                {invoice.payment_method === PaymentMethod.Other && (
                  <ActionButton
                    styleType="secondary"
                    compact
                    onClick={() => goToAdyen(invoice.transaction_id)}
                  >
                    {translate('customerDetails.invoiceDetails.goToAdyen')}
                  </ActionButton>
                )}
              </ButtonsWrapper>
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  )
}

export default InvoicesTable
