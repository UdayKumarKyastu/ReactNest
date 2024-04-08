import React, { FC, useMemo } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '../../../common/components/Breadcrumbs/Breadcrumbs'
import { Routes } from '../../../routing/Routes'
import { Translation } from '../../../i18n/Translation'

export declare namespace ProductVariantVersionBreadcrumbs {
  export type Props = {
    productSku: string
    variantSku: string
    name: string
    variantName: string
    versionNumber: number
  }
}

export const ProductVariantVersionBreadcrumbs: FC<ProductVariantVersionBreadcrumbs.Props> = ({
  productSku,
  variantSku,
  name,
  variantName,
  versionNumber,
}) => {
  const { translate } = Translation.useTranslation()
  const breadcrumbsRoutes = useMemo(
    () => [
      {
        label: translate('search-input-label'),
        href: Routes.List,
      },
      {
        label: name,
        href: Routes.resolveProductRoute(Routes.Product.navigationRoot, productSku),
      },
      {
        label: variantName,
        href: Routes.resolveProductVariantRoute(
          Routes.ProductVariant.navigationRoot,
          productSku,
          variantSku,
        ),
      },
      {
        label: `${translate('variantVersionsPage.version')} ${versionNumber}`,
        href: Routes.resolveProductVariantVersionRoute(
          Routes.ProductVariantVersion.navigationRoot,
          productSku,
          variantSku,
          versionNumber.toString(),
        ),
      },
    ],
    [name, productSku, translate, variantName, variantSku, versionNumber],
  )

  return (
    <Breadcrumbs>
      {breadcrumbsRoutes.map(({ label, href }) => {
        return (
          <BreadcrumbItem href={href} key={href}>
            {label}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
