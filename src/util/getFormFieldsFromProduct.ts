import { ProductVariant } from 'src/modules/product/model/product-variant'
import { ProductVariantMarketingPage } from 'src/modules/product/pages/ProductVariantMarketingPage/ProductVariantMarketingPage'

export const getFormFieldsFromProduct = (
  product: ProductVariant,
): ProductVariantMarketingPage.FormFields => {
  return {
    variantName: product.name,
    variantDescription: product.description.standard,
    liveFrom: product.availability.liveSchedule.on,
    liveTo: product.availability.liveSchedule.off,
    availableForCollection: product.availability.availableForClickAndCollect,
    availableForOutposts: product.availability.availableForOutposts,
    availableForPretDelivers: product.availability.availableForPretDelivers,
    visible: product.availability.isLive,
    howToDisplay: product.howToDisplay,
    isChefSpecial: product.availability.isChefsSpecial,
    displayAsNewUntil: product.availability.displayAsNew.until,
    isDisplayed: product.availability.displayAsNew.isDisplayed,
    visibleOnDeliveryWebsite: product.availability.visibleOnDeliveryWebsite,
    visibleOnBrandWebsite: product.availability.isLive,
    availableAllDay: product.availability.availableAllDay,
    availableForLunch: product.availability.availableForLunch,
  }
}
