import { ProductVariant } from '../../../model/product-variant'
import { Product } from '../../../model/product'
import { Translation } from '../../../../i18n/Translation'
import { ProdutAllDraftChangesStyles } from '../ProductAllDraftChanges.styles'
import { VariantDraftView } from '../VariantDraftView/VariantDraftView'
import { ItemHeader } from '../ItemHeader/ItemHeader'

interface Props {
  variant: ProductVariant
  product: Product
}

const { StyledAccordionItem, ItemWrapper } = ProdutAllDraftChangesStyles

export const VariantRow = ({ variant, product }: Props) => {
  const { translate } = Translation.useTranslation()

  const draftVariant = product.draftChanges.variants.find(
    (draftVariant) => draftVariant.sku === variant.sku,
  )

  const changesCount = draftVariant?.changesCount!.total

  const itemHeader = (
    <ItemHeader
      name={variant.name}
      hamiltonGrantProductCode={variant.hamiltonGrant.productCode || 'N/A'}
      sku={variant.sku}
      numberOfChanges={changesCount || 0}
      productType={
        variant.isMaster
          ? translate('productAllDraftChangesPage.masterVariant')
          : translate('productAllDraftChangesPage.variant')
      }
    />
  )

  if (changesCount === 0) {
    return null
  }

  return (
    <StyledAccordionItem title={itemHeader} key={variant.sku} data-cy="accordion-item">
      <ItemWrapper>
        <VariantDraftView variant={variant} product={product} />
      </ItemWrapper>
    </StyledAccordionItem>
  )
}
