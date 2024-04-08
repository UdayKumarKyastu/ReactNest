import React, { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Translation } from '../../../i18n/Translation'
import { Routes as AppRoutes } from '../../../routing/Routes'
import { ProductStyles } from '../styles'
import { ProductVariantNavigation } from '../../components/ProductVariantNavigation/ProductVariantNavigation'
import { ProductFooterNavigation } from '../../components/ProductFooterNavigation/ProductFooterNavigation'
import { ProductVariant } from '../../model/product-variant'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductVariantBreadcrumbs } from '../../components/ProductVariantBreadcrumbs/ProductVariantBreadcrumbs'
import { ProductBackButton } from '../../components/ProductBackButton/ProductBackButton'
import { ProductVariantMarketingPage } from '../ProductVariantMarketingPage/ProductVariantMarketingPage'
import { useProductVariantNavigation } from '../../components/ProductVariantNavigation/useProductVariantNavigation'
import { ProductVariantPricingPage } from '../ProductVariantPricingPage/ProductVariantPricingPage'
import { ProductVariantNutritionalsPage } from '../ProductVariantNutritionalsPage/ProductVariantNutritionalsPage'
import { ProductVariantAttributesPage } from '../ProductVariantAttributesPage/ProductVariantAttributesPage'
import { ProductVariantReportingPage } from '../ProductVariantReportingPage/ProductVariantReportingPage'
import { ProductVariantLabellingPage } from '../ProductVariantLabellingPage/ProductVariantLabellingPage'
import { ProductVariantVersionHistoryPage } from '../ProductVariantVersionHistoryPage/ProductVariantVersionHistoryPage'
import { Locale } from '../../../i18n/Locale'
import { Product } from '../../model/product'
import { ProductVariantDraftChangesPage } from '../ProductVariantDraftChangesPage/ProductVariantDraftChangesPage'
import { ProductType } from '../../model/product-type'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'
import { CountryCode } from '../../../../shared/model/country-code'
import { UnpublishedProductNotice } from '../../components/UnpublishedProductNotice/UnpublishedProductNotice'

const { Wrapper, ProductName, FooterNavigation, TopRow } = ProductStyles

export declare namespace ProductVariantPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant
    variantsLength: number
    countryCode: CountryCode
  }
}

export const ProductVariantPageWithoutData = ({
  product,
  productVariant,
  variantsLength,
  countryCode,
}: ProductVariantPage.Props) => {
  const { locale } = Locale.useLocale()
  const { translate } = Translation.useTranslation()
  const { navigateToProduct } = AppRoutes.useNavigation()
  const draftVariant = product.draftChanges.variants.find(
    (variant) => variant.sku === productVariant.sku,
  )
  const productName = product.name[locale]
  const productVariantName = productVariant.name[locale]
  const isMaster = productVariant.isMaster

  const numberOfFutureVersions = useMemo(() => {
    return productVariant.versions.filter(
      ({ publishState, liveFrom }) =>
        liveFrom && publishState === VariantVersionPublishState.FUTURE,
    ).length
  }, [productVariant])

  const { previousItem, nextItem, navItems } = useProductVariantNavigation(
    productVariant.masterSku,
    productVariant.sku,
    product.type,
    numberOfFutureVersions,
    Boolean(draftVariant?.changesCount?.total),
  )

  const variantNumber = useMemo(() => {
    return product.variants.findIndex(({ sku }) => productVariant.sku === sku) + 1
  }, [product.variants, productVariant.sku])

  return (
    <Wrapper>
      {window.history.length && (
        <ProductBackButton onClick={() => navigateToProduct(product.sku)}>
          {translate('productPage.backToProductGroup')}
        </ProductBackButton>
      )}
      <TopRow>
        <ProductVariantBreadcrumbs
          productSku={productVariant.masterSku}
          variantSku={productVariant.sku}
          name={productName}
          variantName={isMaster ? translate('common.masterVariant') : productVariantName}
        />
      </TopRow>
      <div />
      <div>
        <ProductName data-cy="product-name">{productVariantName}</ProductName>
      </div>
      <div>
        <ProductVariantNavigation navItems={navItems} />
      </div>
      <div>
        <ProductCard
          variantSku={productVariant.sku}
          masterSku={productVariant.masterSku}
          lastSyncDate={productVariant.hamiltonGrant.lastSyncedAt}
          hgProductCode={productVariant.hamiltonGrant.productCode}
          imageUrl={productVariant.image?.thumbnail}
          variantsCount={variantsLength}
          versionNumber={productVariant.version}
          countryCode={countryCode}
          status={productVariant.status}
          createdOn={productVariant.createdAt}
          published={productVariant.published}
          variantNumber={variantNumber}
          view={isMaster ? 'master' : 'variant'}
          recipeStatus={productVariant.hamiltonGrant.hgRecipeStatus!}
        />

        {!productVariant.published && (
          <UnpublishedProductNotice
            productName={productVariant.name[locale]}
            versionNumber={productVariant.version}
          />
        )}
        <Routes>
          <Route
            path={AppRoutes.ProductVariant.marketing}
            element={
              <ProductVariantMarketingPage
                productVariant={productVariant}
                draftVariant={draftVariant!}
                countryCode={countryCode}
              />
            }
          />

          <Route
            path={AppRoutes.ProductVariant.pricing}
            element={
              <ProductVariantPricingPage
                product={product}
                productVariant={productVariant}
                draftVariant={draftVariant!}
              />
            }
          />

          {productVariant.attributes && (
            <Route
              path={AppRoutes.ProductVariant.attributes}
              element={
                <ProductVariantAttributesPage
                  product={product}
                  productVariant={productVariant}
                  draftVariant={draftVariant!}
                />
              }
            />
          )}
          <Route
            path={AppRoutes.ProductVariant.reporting}
            element={
              <ProductVariantReportingPage
                productVariant={productVariant}
                draftVariant={draftVariant!}
                productType={product.type}
              />
            }
          />
          <Route
            path={AppRoutes.ProductVariant.nutrition}
            element={
              <ProductVariantNutritionalsPage
                nutrition={productVariant.hamiltonGrant.nutrition}
                isVegan={productVariant.hamiltonGrant.cuisine.isVegan}
                isVegetarian={productVariant.hamiltonGrant.cuisine.isVegetarian}
                size={productVariant.size}
                ingredients={productVariant.hamiltonGrant.ingredients}
                allergens={productVariant.hamiltonGrant.allergens}
              />
            }
          />
          {product.type === ProductType.Food && (
            <Route
              path={AppRoutes.ProductVariant.labelling}
              element={
                <ProductVariantLabellingPage
                  product={product}
                  productVariant={productVariant}
                  draftVariant={draftVariant!}
                />
              }
            />
          )}
          <Route
            path={AppRoutes.ProductVariant.draftChanges}
            element={
              <ProductVariantDraftChangesPage
                product={product}
                productVariant={productVariant}
                draftVariant={draftVariant!}
              />
            }
          />
          <Route
            path={AppRoutes.ProductVariant.versions}
            element={
              <ProductVariantVersionHistoryPage product={product} productVariant={productVariant} />
            }
          />

          <Route
            path={''}
            element={
              <Navigate
                to={AppRoutes.resolveProductVariantRoute(
                  AppRoutes.ProductVariant.marketing,
                  productVariant.masterSku,
                  productVariant.sku,
                )}
              />
            }
          />

          <Route
            path={'*'}
            element={
              <Navigate
                to={AppRoutes.resolveProductVariantRoute(
                  AppRoutes.ProductVariant.marketing,
                  productVariant.masterSku,
                  productVariant.sku,
                )}
              />
            }
          />
        </Routes>

        <FooterNavigation data-cy="footer-navigation">
          <ProductFooterNavigation previousItem={previousItem} nextItem={nextItem} />
        </FooterNavigation>
      </div>
    </Wrapper>
  )
}
