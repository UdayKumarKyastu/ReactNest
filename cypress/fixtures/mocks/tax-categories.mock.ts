import { TaxCategory } from 'src/modules/product/model/tax-category'

export const getUkTaxCategories = (): TaxCategory[] => {
  return [
    {
      id: '388c1a00-e84e-49f3-8d63-2414d8e5f9f4',
      name: 'VAT (0%)',
      amount: 0,
    },
    {
      id: '34488784-f419-473b-8b81-9c748c7331db',
      name: 'VAT (5%)',
      amount: 0.05,
    },
    {
      id: '394d73a9-cdb7-45c2-982c-2619fd479b01',
      name: 'VAT (20%)',
      amount: 0.2,
    },
  ]
}

export const getUsTaxCategories = (): TaxCategory => {
  return {
    id: '4d10198d-2d12-49cc-bd1f-485b5a13e368',
    name: 'US 20%',
    amount: 0.2,
  }
}
