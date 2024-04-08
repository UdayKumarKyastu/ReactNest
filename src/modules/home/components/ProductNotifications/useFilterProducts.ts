import { Locale } from 'src/modules/i18n/Locale'
import { variantMatchesQuery } from '../../../../util/variantMatchesQuery'
import { ProductNotifications } from './ProductNotifications'

const useFilterProducts = () => {
  return (products: ProductNotifications.FilteredProduct[], query: string, locale: Locale.Lang) => {
    const productsWithFilteredVersions = products.map((product) => {
      return {
        ...product,
        variants: product.variants.map((variant) => {
          return {
            ...variant,
            versions: variant.versions?.filter((version) =>
              variantMatchesQuery(version, query, locale),
            ),
          }
        }),
      }
    })

    const productsWithFilteredVariants = productsWithFilteredVersions.map((product) => {
      return {
        ...product,
        variants: product.variants.filter((variant) => {
          return variantMatchesQuery(variant, query, locale) || variant.versions?.length! > 0
        }),
      }
    })

    return productsWithFilteredVariants.filter((product) => {
      return (
        product.name[locale].toLowerCase().includes(query.toLowerCase()) ||
        product.variants.length > 0
      )
    })
  }
}

export default useFilterProducts
