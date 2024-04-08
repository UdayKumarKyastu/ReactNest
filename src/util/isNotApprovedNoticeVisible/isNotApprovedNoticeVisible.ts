import { ProductVariant, ProductVariantVersion } from '../../modules/product/model/product-variant'

export const isNotApprovedNoticeVisible = (
  productVariant: ProductVariant | ProductVariantVersion,
  tabKey: 'marketing' | 'baristaAttributes' | 'reporting' | 'labelling' | 'pricing',
  versionKey: string | null,
  isFutureVersion?: boolean,
) => {
  const isDraftVersionTab = 'approvedTabs' in productVariant && productVariant.approvedTabs[tabKey]

  return !!(
    !isDraftVersionTab &&
    versionKey &&
    isFutureVersion &&
    productVariant.versions.length > 1
  )
}
