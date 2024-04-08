import { Subscription, SubscriptionStatus } from '../model/Subscription'

export class SubscriptionBuilder {
  private readonly subscription: Partial<Subscription> = {
    id: 'sub-1',
    plan_name: 'great plan',
  }

  withId(id: string) {
    this.subscription.id = id
    return this
  }

  withStatus(status: SubscriptionStatus) {
    this.subscription.status = status
    return this
  }

  build() {
    return { ...this.subscription } as Subscription
  }
}
