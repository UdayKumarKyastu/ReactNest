import React, { useCallback, useMemo } from 'react'
import { CustomerCardStyles } from './CustomerCard.styles'
import Person from '../../../../icons/Person'
import { Translation } from '../../../i18n/Translation'
import Badge from '../../../common/components/Badge/Badge'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'
import { NotificationsState } from '../../../notifications/state/NotificationsState'
import { useCustomer } from '../../api/useCustomer'

const { Root, AvatarPlaceholder, Content, Column, Value, Label, Item, StatusWrapper, BlockButton } =
  CustomerCardStyles

const CustomerCard = () => {
  const { translate } = Translation.useTranslation()
  const {
    state: { customer },
    actions,
  } = CustomerDetailsState.useState()
  const {
    actions: { addNotification },
  } = NotificationsState.useState()
  const { getCustomer, blockCustomer } = useCustomer()

  const badge = useMemo(() => {
    return {
      color: customer?.blocked ? 'red' : 'green',
      label: translate(`customerDetails.customerCard.${customer?.blocked ? 'blocked' : 'active'}`),
    } as const
  }, [customer?.blocked, translate])

  const toggleUser = useCallback(async () => {
    actions.setLoading(true)
    await blockCustomer(customer!.user_id, !customer?.blocked)
    const response = await getCustomer(customer!.user_id)
    actions.fetchCustomer(response)
    addNotification(
      translate(
        `customerDetails.customerCard.${customer?.blocked ? 'unblockSuccess' : 'blockSuccess'}`,
      ),
      '',
      'success',
    )
    actions.setLoading(false)
  }, [actions, addNotification, blockCustomer, customer, getCustomer, translate])

  return (
    <Root className="customer-card">
      <AvatarPlaceholder>
        <Person />
      </AvatarPlaceholder>

      <Content>
        <Column>
          <Item>
            <Label>{translate('customerDetails.customerCard.customerEmail')}</Label>
            <Value>{customer!.email}</Value>
          </Item>
          <Item>
            <Label>{translate('customerDetails.customerCard.customerMobile')}</Label>
            <Value>{customer!.app_metadata.phone_number}</Value>
          </Item>
        </Column>

        <Column>
          <StatusWrapper>
            <Badge label={badge.label} color={badge.color} />
          </StatusWrapper>

          <BlockButton styleType="secondary" compact onClick={toggleUser}>
            {translate(`customerDetails.customerCard.${customer?.blocked ? 'unblock' : 'block'}`)}
          </BlockButton>
        </Column>
      </Content>
    </Root>
  )
}

export default CustomerCard
