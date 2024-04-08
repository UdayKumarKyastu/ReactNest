import { SubscriptionBuilder } from '../../../mock/subscription-builder'
import { render } from '@testing-library/react'
import SubscriptionDetails from './SubscriptionDetails'
import { SubscriptionStatus } from '../../../model/Subscription'
import { NotificationsState } from '../../../../notifications/state/NotificationsState'
import { QueryParamProvider } from 'use-query-params'

jest.spyOn(NotificationsState, 'useState').mockImplementation(() => ({
  actions: {
    addNotification: jest.fn(),
  },
  state: {} as any,
}))

describe('', () => {
  it('renders proper actions for active subscription', () => {
    const subscription = new SubscriptionBuilder().withStatus(SubscriptionStatus.Active).build()
    const { getByTestId } = render(
      <QueryParamProvider>
        <SubscriptionDetails subscription={subscription} />
      </QueryParamProvider>,
    )
    expect(getByTestId('pause-subscription-action')).toBeInTheDocument()
    expect(getByTestId('cancel-subscription-action')).toBeInTheDocument()
  })

  it('renders proper action for cancelled subscription', () => {
    const subscription = new SubscriptionBuilder().withStatus(SubscriptionStatus.Cancelled).build()
    const { queryByTestId } = render(
      <QueryParamProvider>
        <SubscriptionDetails subscription={subscription} />
      </QueryParamProvider>,
    )
    expect(queryByTestId('pause-subscription-action')).toBeNull()
    expect(queryByTestId('cancel-subscription-action')).toBeNull()
    expect(queryByTestId('restart-subscription-action')).toBeInTheDocument()
  })

  it('renders proper action for paused subscription', () => {
    const subscription = new SubscriptionBuilder().withStatus(SubscriptionStatus.Paused).build()
    const { queryByTestId } = render(
      <QueryParamProvider>
        <SubscriptionDetails subscription={subscription} />
      </QueryParamProvider>,
    )
    expect(queryByTestId('pause-subscription-action')).toBeNull()
    expect(queryByTestId('cancel-subscription-action')).toBeNull()
    expect(queryByTestId('resume-subscription-action')).toBeInTheDocument()
  })
})
