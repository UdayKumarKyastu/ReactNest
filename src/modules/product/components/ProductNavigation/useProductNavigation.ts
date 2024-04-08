import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes } from '../../../routing/Routes'
import { Translation } from '../../../i18n/Translation'
import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'
import { ProductType } from '../../model/product-type'
import { CountryCode } from '../../../../shared/model/country-code'

export const useProductNavigation = (
  productSku: string,
  options: {
    productType: ProductType
    countryCode: CountryCode
    hasDraftChanges: boolean
  },
) => {
  const { translate } = Translation.useTranslation()
  const { pathname } = useLocation()
  const path = pathname.split('/').pop()!

  const items = useMemo(() => {
    const allItems: Array<{
      label: string
      sectionName: Routes.ProductSection
      isHidden?: boolean
      withNotice?: boolean
    }> = [
      {
        label: translate('productGroupNavigation.categorisationLink'),
        sectionName: 'categories',
      },
      {
        label: translate('productGroupNavigation.taxationLink'),
        sectionName: 'taxation',
        isHidden: options.countryCode !== CountryCode.UK,
      },
      {
        label: translate('productGroupNavigation.setUpLink'),
        sectionName: 'setUp',
        isHidden: options.productType !== ProductType.BaristaBeverage,
      },
      {
        label: translate('productGroupNavigation.variantsLink'),
        sectionName: 'variants',
      },
      {
        label: translate('productGroupNavigation.draftChangesLink'),
        sectionName: 'allDraftChanges',
        withNotice: options.hasDraftChanges,
      },
    ]

    return allItems
  }, [translate, options.hasDraftChanges, options.countryCode, options.productType])

  const navItems = useMemo((): TabNavigation.Props['items'] => {
    return items
      .filter((item) => !item.isHidden)
      .map((navItemConfig) => ({
        label: navItemConfig.label,
        href: Routes.resolveProductRoute(
          Routes.Product.resolveSection(navItemConfig.sectionName),
          productSku,
        ),
        isActive: Routes.getProductSectionFromPath(path) === navItemConfig.sectionName,
        withNotice: navItemConfig.withNotice,
      }))
  }, [items, productSku, path])

  const currentItemIndex = navItems.findIndex((item) => item.isActive)

  const previousItem = currentItemIndex === 0 ? null : navItems[currentItemIndex - 1]
  const nextItem = currentItemIndex === navItems.length - 1 ? null : navItems[currentItemIndex + 1]

  return {
    navItems,
    previousItem,
    nextItem,
  }
}
