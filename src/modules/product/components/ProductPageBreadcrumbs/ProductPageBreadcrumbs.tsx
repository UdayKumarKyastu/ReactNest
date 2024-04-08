import React, { FC, useMemo } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '../../../common/components/Breadcrumbs/Breadcrumbs'
import { Routes } from '../../../routing/Routes'
import { Translation } from '../../../i18n/Translation'

export declare namespace ProductBreadcrumbs {
  export type Props = {
    productSku: string
    name: string
  }
}

export const ProductPageBreadcrumbs: FC<ProductBreadcrumbs.Props> = ({ productSku, name }) => {
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
    ],
    [name, productSku, translate],
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
