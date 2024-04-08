import { Product } from '../../../model/product'
import { Translation } from '../../../../i18n/Translation'
import { MenuCategorisationDraftView } from '../../../draft-views/MenuCategorisationDraftView'
import { Routes } from '../../../../routing/Routes'
import { ProductType } from '../../../model/product-type'
import { SetupDraftView } from '../../../draft-views/SetupDraftView'
import { ItemHeader } from '../ItemHeader/ItemHeader'
import { ProdutAllDraftChangesStyles } from '../ProductAllDraftChanges.styles'
import { SingleProductState } from '../../../SingleProductState'

interface Props {
  product: Product
}

const { ItemWrapper, StyledAccordionItem } = ProdutAllDraftChangesStyles

export const ProductGroupRow = ({ product }: Props) => {
  const { translate } = Translation.useTranslation()
  const { reload: reloadProduct } = SingleProductState.useActiveProduct()

  if (product.draftChanges.changesCount.total === 0) {
    return null
  }

  const productGroupItemHeader = (
    <ItemHeader
      name={product.name}
      hamiltonGrantProductCode={translate('product.allProductIds')}
      sku={translate('product.allProductSkus')}
      numberOfChanges={product.draftChanges.changesCount.total}
      productType={translate('productAllDraftChangesPage.productGroup')}
    />
  )

  return (
    <StyledAccordionItem title={productGroupItemHeader} key={product.sku} data-cy="accordion-item">
      <ItemWrapper>
        <MenuCategorisationDraftView
          product={product}
          tabRoute={Routes.resolveProductRoute(Routes.Product.categories, product.sku)}
          reloadProduct={reloadProduct}
        />
        {product.type === ProductType.BaristaBeverage && (
          <SetupDraftView
            product={product}
            tabRoute={Routes.resolveProductRoute(Routes.Product.setUp, product.sku)}
            reloadProduct={reloadProduct}
          />
        )}
      </ItemWrapper>
    </StyledAccordionItem>
  )
}
