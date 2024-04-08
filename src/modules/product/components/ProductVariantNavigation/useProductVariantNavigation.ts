import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes } from '../../../routing/Routes'
import { Translation } from '../../../i18n/Translation'
import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'
import { ProductType } from '../../model/product-type'

export const useProductVariantNavigation = (
  masterSku: string,
  variantSku: string,
  productType: ProductType,
  numberOfFutureVersions: number,
  hasDraftChanges?: boolean,
) => {
  const { translate } = Translation.useTranslation()
  const { pathname } = useLocation()
  const path = pathname.split('/').pop()!

  const items = useMemo((): Array<{
    label: string
    sectionName: Routes.ProductVariantSection
    withNotice?: boolean
    numberBadge?: number
  }> => {
    return [
      {
        label: translate('productVariantNavigation.marketingLink'),
        sectionName: 'marketing',
      },
      {
        label: translate('productVariantNavigation.pricingLink'),
        sectionName: 'pricing',
      },
      {
        label: translate('productVariantNavigation.reportingLink'),
        sectionName: 'reporting',
      },
      {
        label: translate('productVariantNavigation.attributesLink'),
        sectionName: 'attributes',
      },
      {
        label: translate('productVariantNavigation.nutritionalsLink'),
        sectionName: 'nutrition',
      },
      {
        label: translate('productVariantNavigation.labellingLink'),
        sectionName: 'labelling',
      },
      {
        label: translate('productVariantNavigation.versionHistory'),
        sectionName: 'versions',
        numberBadge: numberOfFutureVersions,
      },
      {
        label: translate('productVariantNavigation.draftChanges'),
        sectionName: 'draftChanges',
        withNotice: hasDraftChanges,
      },
    ]
  }, [hasDraftChanges, numberOfFutureVersions, translate])

  const navItems = useMemo((): TabNavigation.Props['items'] => {
    const filteredItems =
      productType === ProductType.BaristaBeverage
        ? items.filter((item) => item.sectionName !== 'labelling')
        : items.filter((item) => item.sectionName !== 'attributes')

    return filteredItems.map((navItemConfig) => {
      return {
        label: navItemConfig.label,
        href: Routes.resolveProductVariantRoute(
          Routes.ProductVariant.resolveSection(navItemConfig.sectionName),
          masterSku,
          variantSku,
        ),
        isActive: Routes.getProductVariantSectionFromPath(path) === navItemConfig.sectionName,
        withNotice: navItemConfig.withNotice,
        numberBadge: navItemConfig.numberBadge,
      }
    })
  }, [productType, items, masterSku, variantSku, path])

  const currentItemIndex = navItems.findIndex((item) => item.isActive)

  const previousItem = currentItemIndex === 0 ? null : navItems[currentItemIndex - 1]
  const nextItem = currentItemIndex === navItems.length - 1 ? null : navItems[currentItemIndex + 1]

  return {
    navItems,
    previousItem,
    nextItem,
  }
}
