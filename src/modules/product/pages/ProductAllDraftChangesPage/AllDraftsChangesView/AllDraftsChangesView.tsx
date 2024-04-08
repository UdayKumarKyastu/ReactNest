import { Product } from '../../../model/product'
import { Translation } from '../../../../i18n/Translation'
import { MenuCategorisationDraftView } from '../../../draft-views/MenuCategorisationDraftView'
import { Routes } from '../../../../routing/Routes'
import { ProductType } from '../../../model/product-type'
import { SetupDraftView } from '../../../draft-views/SetupDraftView'
import { AccordionContainer } from '@pretamanger/component-library'
import { ProdutAllDraftChangesStyles } from '../ProductAllDraftChanges.styles'
import { ProductVariantDraftChangesStyles } from '../../../pages/ProductVariantDraftChangesPage/ProductVariantDraftChangesPage.styles'
import { ProductGroupRow } from '../ProductGroupRow/ProductGroupRow'
import { VariantRow } from '../VariantRow/VariantRow'
import { VariantDraftView } from '../VariantDraftView/VariantDraftView'
import { SingleProductState } from '../../../SingleProductState'

interface Props {
  product: Product
}

const { AccordionHeader, HeaderCell, StyledAccordionContainer } = ProdutAllDraftChangesStyles
const { Wrapper } = ProductVariantDraftChangesStyles

export const AllDraftChangesView = ({ product }: Props) => {
  const { translate } = Translation.useTranslation()
  const { reload: reloadProduct } = SingleProductState.useActiveProduct()

  const TableHeader = (
    <AccordionHeader>
      <HeaderCell>{translate('productAllDraftChangesPage.productInformation')}</HeaderCell>
      <HeaderCell>{translate('productAllDraftChangesPage.hamiltonGrant')}</HeaderCell>
      <HeaderCell>{translate('productAllDraftChangesPage.productSku')}</HeaderCell>
      <HeaderCell centered>{translate('productAllDraftChangesPage.changes')}</HeaderCell>
    </AccordionHeader>
  )

  const variantsWithChanges = product.draftChanges.variants.filter((product) => {
    return product.changesCount && product.changesCount.total > 0
  }, [])

  const productWithChanges = product.draftChanges.changesCount.total > 0 ? 1 : 0

  if (variantsWithChanges.length + productWithChanges === 1) {
    if (variantsWithChanges.length > 0) {
      const variantWithChanges = [product.masterVariant, ...product.variants].find(
        (variant) => variant.sku === variantsWithChanges[0]?.sku,
      )

      return (
        <Wrapper data-testid="variant-draft-view">
          {variantWithChanges && (
            <VariantDraftView variant={variantWithChanges} product={product} />
          )}
        </Wrapper>
      )
    }

    return (
      <Wrapper data-testid="menu-categorisation-draft-view">
        <MenuCategorisationDraftView
          product={product}
          tabRoute={Routes.resolveProductRoute(Routes.Product.categories, product.sku, true)}
          reloadProduct={reloadProduct}
        />
        {product.type === ProductType.BaristaBeverage && (
          <SetupDraftView
            product={product}
            tabRoute={Routes.resolveProductRoute(Routes.Product.setUp, product.sku, true)}
            reloadProduct={reloadProduct}
          />
        )}
      </Wrapper>
    )
  }

  return (
    <StyledAccordionContainer data-testid="accordion">
      <AccordionContainer title={TableHeader}>
        <ProductGroupRow product={product} />
        {[product.masterVariant, ...product.variants].map((variant) => {
          return <VariantRow key={variant.sku} product={product} variant={variant} />
        })}
      </AccordionContainer>
    </StyledAccordionContainer>
  )
}
