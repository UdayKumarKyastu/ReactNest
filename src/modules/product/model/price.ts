import { Locale } from '../../i18n/Locale'

export interface Price {
  currencyCode: '$' | '£' | string // define all
  centAmount: number | string
}

export interface ChannelPrice {
  channelName: string
  channelLabel: Locale.MultilangString
  takeAwayPrice: Price
  eatInPrice: Price
  eatInTax: number | string
  takeAwayTax?: number | string
  deliveryPrice: Price
  deliveryTax?: number | string
  takeAwayClubPret: Price
  eatInClubPret: Price
}

export interface ChannelPriceWithChanges extends ChannelPrice {
  eatInPriceHasChanged?: boolean
  eatInTaxHasChanged?: boolean
  takeAwayPriceHasChanged?: boolean
  takeAwayTaxHasChanged?: boolean
  deliveryPriceHasChanged?: boolean
  deliveryTaxHasChanged?: boolean
  eatInClubPretHasChanged?: boolean
  takeAwayClubPretHasChanged?: boolean
}
