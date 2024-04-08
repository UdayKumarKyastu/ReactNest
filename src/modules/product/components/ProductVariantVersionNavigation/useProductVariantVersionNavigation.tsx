import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes } from '../../../routing/Routes'
import { Translation } from '../../../i18n/Translation'
import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'
import { ProductType } from '../../model/product-type'
import { ProductVariantVersion } from '../../model/product-variant'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'

interface MenuItem {
  label: string
  sectionName: Routes.ProductVariantSection
  withNotice?: boolean
  isHidden?: boolean
  withWarning?: boolean
}

export const useProductVariantVersionNavigation = (
  masterSku: string,
  productVariant: ProductVariantVersion,
  productType: ProductType,
  hasDraftChanges?: boolean,
  isFutureVersion?: boolean,
  isMoreThanOneVersion?: boolean,
) => {
  const { sku: variantSku } = productVariant
  const versionId = productVariant.version.toString()
  const { translate } = Translation.useTranslation()
  const { pathname } = useLocation()
  const path = pathname.split('/').pop()!

  const items = useMemo((): MenuItem[] => {
    return [
      {
        label: translate('productVariantNavigation.marketingLink'),
        sectionName: 'marketing',
        withWarning:
          !(productVariant.approvedTabs.marketing || productVariant.draftTabs.marketing) &&
          isFutureVersion &&
          isMoreThanOneVersion,
      },
      {
        label: translate('productVariantNavigation.pricingLink'),
        sectionName: 'pricing',
        withWarning:
          !(productVariant.approvedTabs.pricing || productVariant.draftTabs.pricing) &&
          isFutureVersion &&
          isMoreThanOneVersion,
      },
      {
        label: translate('productVariantNavigation.reportingLink'),
        sectionName: 'reporting',
        withWarning:
          !(productVariant.approvedTabs.reporting || productVariant.draftTabs.reporting) &&
          isFutureVersion &&
          isMoreThanOneVersion,
      },
      {
        label: translate('productVariantNavigation.attributesLink'),
        sectionName: 'attributes',
        withWarning:
          !(
            productVariant.approvedTabs.baristaAttributes ||
            productVariant.draftTabs.baristaAttributes
          ) &&
          isFutureVersion &&
          isMoreThanOneVersion,
      },
      {
        label: translate('productVariantNavigation.nutritionalsLink'),
        sectionName: 'nutrition',
      },
      {
        label: translate('productVariantNavigation.labellingLink'),
        sectionName: 'labelling',
        withWarning:
          !(productVariant.approvedTabs.labelling || productVariant.draftTabs.labelling) &&
          isFutureVersion &&
          isMoreThanOneVersion,
      },
      {
        label: translate('productVariantNavigation.versionHistory'),
        sectionName: 'versions',
        isHidden: productVariant.publishState !== VariantVersionPublishState.CURRENT,
      },
      {
        label: translate('productVariantNavigation.draftChanges'),
        sectionName: 'draftChanges',
        withNotice: hasDraftChanges,
      },
    ].filter(({ isHidden }) => !isHidden) as MenuItem[]
  }, [hasDraftChanges, productVariant, translate, isFutureVersion, isMoreThanOneVersion])

  const navItems = useMemo((): TabNavigation.Props['items'] => {
    const filteredItems =
      productType === ProductType.BaristaBeverage
        ? items.filter((item) => item.sectionName !== 'labelling')
        : items.filter((item) => item.sectionName !== 'attributes')

    return filteredItems.map((navItemConfig) => {
      if (navItemConfig.sectionName === 'versions') {
        return {
          label: navItemConfig.label,
          href: Routes.resolveProductVariantRoute(
            Routes.ProductVariant.resolveSection(navItemConfig.sectionName),
            masterSku,
            variantSku,
          ),
          isActive:
            Routes.getProductVariantVersionSectionFromPath(path) === navItemConfig.sectionName,
          withNotice: navItemConfig.withNotice,
          withWarning: navItemConfig.withWarning,
        }
      }

      return {
        label: navItemConfig.label,
        href: Routes.resolveProductVariantVersionRoute(
          Routes.ProductVariantVersion.resolveSection(navItemConfig.sectionName),
          masterSku,
          variantSku,
          versionId,
        ),
        isActive:
          Routes.getProductVariantVersionSectionFromPath(path) === navItemConfig.sectionName,
        withNotice: navItemConfig.withNotice,
        withWarning: navItemConfig.withWarning,
      }
    })
  }, [productType, items, masterSku, variantSku, versionId, path])

  const currentItemIndex = navItems.findIndex((item) => item.isActive)

  const previousItem = currentItemIndex === 0 ? null : navItems[currentItemIndex - 1]
  const nextItem = currentItemIndex === navItems.length - 1 ? null : navItems[currentItemIndex + 1]

  return {
    navItems,
    previousItem,
    nextItem,
  }
}
