import { LiveSchedule } from './live-schedule'
import { GetProductDto } from '../dto/get-product.dto'

export class Availability {
  isLive!: boolean
  availableForClickAndCollect!: boolean
  availableForOutposts!: boolean
  availableForPretDelivers!: boolean
  isChefsSpecial!: boolean
  displayAsNew!:
    | {
        isDisplayed: true
        until: Date
      }
    | {
        isDisplayed: false
        until: null
      }
  liveSchedule!: LiveSchedule
  visibleOnDeliveryWebsite!: boolean
  availableForLunch!: boolean
  availableAllDay!: boolean

  static fromDto(dto: GetProductDto.ProductVariant['availability']) {
    return new Availability({
      liveSchedule: dto.liveSchedule,
      displayAsNew:
        dto.displayAsNew.isDisplayed && dto.displayAsNew.until
          ? {
              isDisplayed: true,
              until: new Date(dto.displayAsNew.until),
            }
          : {
              isDisplayed: false,
              until: null,
            },
      availableAllDay: dto.availableAllDay,
      availableForClickAndCollect: dto.availableForClickAndCollect,
      availableForLunch: dto.availableForLunch,
      availableForOutposts: dto.availableForOutposts,
      availableForPretDelivers: dto.availableForPretDelivers,
      isChefsSpecial: dto.isChefsSpecial,
      isLive: dto.isLive,
      visibleOnDeliveryWebsite: dto.visibleOnDeliveryWebsite,
    })
  }

  constructor(params: Availability) {
    Object.assign(this, params)
  }
}
