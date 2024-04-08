import { Customer } from '../model/Customer'

export class CustomerBuilder {
  private readonly customer: Partial<Customer> = {
    user_id: 'customer-1',
    identities: [],
    billing_address: {},
  }

  withBlocked(blocked: boolean) {
    this.customer.blocked = blocked
    return this
  }

  build() {
    return { ...this.customer } as Customer
  }
}
