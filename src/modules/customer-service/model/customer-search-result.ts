import { CountryCode } from '../../../shared/model/country-code'

export interface CustomerSearchResult {
  name: string
  user_id: string
  pret_id: string
  email: string
  phone_number: string
  country: CountryCode
  blocked: boolean
  imageUrl: string
  wallet_id: string
}
