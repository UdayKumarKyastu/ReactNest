import { FC } from 'react'
import { isNumber } from 'lodash'
import { ProductBadge } from '../../../product/components/ProductBadge/ProductBadge'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../../../home/components/ProductsTable/ProductsTable.styles'

export namespace VisibilityCell {
  export interface Props {
    visible: boolean
    activeVariants?: number
  }
}

const { BrandSiteWrapper } = ProductsTableStyles

export const VisibilityCell: FC<VisibilityCell.Props> = ({ visible, activeVariants }) => {
  const { translate } = Translation.useTranslation()

  return (
    <BrandSiteWrapper>
      {visible ? (
        <ProductBadge.Default variant="green">
          {`${translate('product.brandSite')}: ${
            isNumber(activeVariants) ? activeVariants : translate('product.on')
          }`}
        </ProductBadge.Default>
      ) : (
        <ProductBadge.Default variant="red">
          {`${translate('product.brandSite')}: ${translate('product.off')}`}
        </ProductBadge.Default>
      )}
    </BrandSiteWrapper>
  )
}
