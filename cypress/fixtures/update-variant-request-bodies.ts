import { EditProductVariantDto } from 'src/modules/product/dto/edit-product-variant.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'

type UpdateVariantMarketing = EditProductVariantDto.UpdateVariantMarketing
type VariantDto = GetProductDto.ProductVariant

export const getUpdateVariantMarketingBody = (variantData: VariantDto): UpdateVariantMarketing => {
  const requestBody: UpdateVariantMarketing = {
    name: variantData.name,
    description: variantData.description.standard,
    availableForClickAndCollect: variantData.availability.availableForClickAndCollect,
    availableForOutposts: variantData.availability.availableForOutposts,
    availableForPretDelivers: variantData.availability.availableForPretDelivers,
    visibleOnDeliveryWebsite: variantData.availability.visibleOnDeliveryWebsite,
    isLive: variantData.availability.isLive,
    isChefsSpecial: variantData.availability.isChefsSpecial,
    displayAsNew: {
      isDisplayed: variantData.availability.displayAsNew.isDisplayed,
      until: variantData.availability.displayAsNew.until
        ? new Date(variantData.availability.displayAsNew.until).toISOString()
        : null,
    },
    liveSchedule: variantData.availability.liveSchedule,
    availableForLunch: variantData.availability.availableForLunch,
    availableAllDay: variantData.availability.availableAllDay,
    howToDisplay: [...variantData.howToDisplay],
  }

  return requestBody
}
