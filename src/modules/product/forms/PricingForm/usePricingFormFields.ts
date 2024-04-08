import { ChannelPrice } from '../../model/price'
import { accurateRound } from '../../../../util/accurate-round'

export const usePricingFormFields = (channels: ChannelPrice[]) => {
  const pricingFormFields = channels.map((channel) => {
    return {
      ...channel,
      eatInPrice: {
        ...channel.eatInPrice,
        centAmount: Number(channel.eatInPrice.centAmount) / 100 || 0,
      },
      takeAwayPrice: {
        ...channel.takeAwayPrice,
        centAmount: Number(channel.takeAwayPrice.centAmount) / 100 || 0,
      },
      deliveryPrice: {
        ...channel.deliveryPrice,
        centAmount: Number(channel.deliveryPrice.centAmount) / 100 || 0,
      },
      eatInClubPret: {
        ...channel.eatInClubPret,
        centAmount: Number(channel.eatInClubPret.centAmount) / 100 || 0,
      },
      takeAwayClubPret: {
        ...channel.takeAwayClubPret,
        centAmount: Number(channel.takeAwayClubPret.centAmount) / 100 || 0,
      },
      eatInTax: accurateRound(Number(channel.eatInTax) * 100 || 0, 4),
      takeAwayTax: channel.takeAwayTax
        ? accurateRound(Number(channel.takeAwayTax) * 100 || 0, 4)
        : 0,
      deliveryTax: channel.deliveryTax
        ? accurateRound(Number(channel.deliveryTax) * 100 || 0, 4)
        : 0,
    }
  })

  return pricingFormFields
}
