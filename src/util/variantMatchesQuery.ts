import { Locale } from 'src/modules/i18n/Locale'
import { ProductNotifications } from 'src/modules/home/components/ProductNotifications/ProductNotifications'

//TODO: write tests
export const variantMatchesQuery = (
  variant: ProductNotifications.FilteredVariant,
  query: string,
  locale: Locale.Lang,
) => {
  const queryRegex = new RegExp(query, 'i')

  return (
    queryRegex.test(variant.name[locale]) ||
    queryRegex.test(variant.sku) ||
    queryRegex.test(variant.recipeID!)
  )
}
