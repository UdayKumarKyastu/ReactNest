import React, { useMemo } from 'react'
import { VariantsCounterStyles } from './VariantsCounter.styles'
import { NavLink } from 'react-router-dom'
import { Routes } from '../../../../../modules/routing/Routes'
import { Translation } from '../../../../i18n/Translation'

const { Root } = VariantsCounterStyles

interface Props {
  masterSku: string
  variantSku: string
  versionsCount?: number
  variantsCount?: number
  versionNumber: number | null
  variantNumber?: number
  view: 'version' | 'variant' | 'master' | 'product-group'
}

const VariantsCounter = ({
  masterSku,
  variantSku,
  versionsCount,
  variantsCount,
  versionNumber,
  view,
  variantNumber,
}: Props) => {
  const { translate } = Translation.useTranslation()

  const label = useMemo(() => {
    switch (view) {
      case 'version':
        return translate('product.variantsCounter.version', { number: versionNumber! })
      case 'variant':
        return translate('product.variantsCounter.variant', { number: variantNumber! })
      case 'master':
        return translate('product.variantsCounter.masterVariant')
      case 'product-group':
        return translate('product.variantsCounter.productGroup')
    }
  }, [translate, variantNumber, versionNumber, view])

  const link = useMemo(() => {
    if (view === 'version') {
      return Routes.resolveProductVariantRoute(
        Routes.ProductVariant.resolveSection('versions'),
        masterSku,
        variantSku,
        true,
      )
    }

    return Routes.resolveProductRoute(Routes.Product.variants, masterSku, true)
  }, [masterSku, variantSku, view])

  const countValue = useMemo(() => {
    return view === 'version'
      ? translate('product.variantsCounter.versionsCount', { count: versionsCount! })
      : translate('product.variantsCounter.variantsCount', { count: variantsCount! })
  }, [translate, variantsCount, versionsCount, view])

  return (
    <Root data-cy="product-variants-counter">
      <span aria-label={label}>{label}</span>
      <NavLink to={link} aria-label={countValue}>
        {countValue}
      </NavLink>
    </Root>
  )
}

export default VariantsCounter
