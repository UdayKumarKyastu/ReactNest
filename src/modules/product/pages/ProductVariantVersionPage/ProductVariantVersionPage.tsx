import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Translation } from '../../../i18n/Translation'
import { Routes as AppRoutes } from '../../../routing/Routes'
import { ProductStyles } from '../styles'
import { ProductVariantVersionNavigation } from '../../components/ProductVariantVersionNavigation/ProductVariantVersionNavigation'
import { ProductFooterNavigation } from '../../components/ProductFooterNavigation/ProductFooterNavigation'
import { ProductVariantVersion } from '../../model/product-variant'
import { SingleProductState } from '../../SingleProductState'
import { PageLoader } from '../../../common/components/PageLoader/PageLoader'
import { ProductApi } from '../../api/product.api'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductVariantVersionBreadcrumbs } from '../../components/ProductVariantVersionBreadcrumbs/ProductVariantVersionBreadcrumbs'
import { ProductBackButton } from '../../components/ProductBackButton/ProductBackButton'
import { ProductVariantMarketingPage } from '../ProductVariantMarketingPage/ProductVariantMarketingPage'
import { useProductVariantVersionNavigation } from '../../components/ProductVariantVersionNavigation/useProductVariantVersionNavigation'
import { ProductVariantPricingPage } from '../ProductVariantPricingPage/ProductVariantPricingPage'
import { ProductVariantNutritionalsPage } from '../ProductVariantNutritionalsPage/ProductVariantNutritionalsPage'
import { ProductVariantAttributesPage } from '../ProductVariantAttributesPage/ProductVariantAttributesPage'
import { ProductVariantReportingPage } from '../ProductVariantReportingPage/ProductVariantReportingPage'
import { ProductVariantLabellingPage } from '../ProductVariantLabellingPage/ProductVariantLabellingPage'
import { Locale } from '../../../i18n/Locale'
import { Product } from '../../model/product'
import { ProductVariantVersionDraftChangesPage } from '../ProductVariantVersionDraftChangesPage/ProductVariantVersionDraftChangesPage'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'
import { HowToDisplayOptionsContext } from '../../HowToDisplayOptionsContext'
import { VersionNotice } from '../../components/VersionNotice/VersionNotice'

const { Wrapper, ProductName, FooterNavigation, TopRow } = ProductStyles
export declare namespace ProductVariantVersionPage {
  export type Props = {
    product: Product
    productVariant: ProductVariantVersion
    draftVariant: Omit<ProductVariantVersion, 'draftTabs' | 'approvedTabs'>
  }
}

export const ProductVariantVersionPageWithoutData = ({
  product,
  productVariant,
  draftVariant,
}: ProductVariantVersionPage.Props) => {
  const { locale } = Locale.useLocale()
  const { translate } = Translation.useTranslation()
  const { navigateToProductVariant } = AppRoutes.useNavigation()

  const currentVariant = [...product.variants, product.masterVariant].find(
    (variant) => variant.sku === productVariant.sku,
  )

  const isFutureVersion = productVariant.publishState === VariantVersionPublishState.FUTURE
  const { previousItem, nextItem, navItems } = useProductVariantVersionNavigation(
    product.sku,
    productVariant,
    product.type,
    Boolean(draftVariant?.changesCount?.total),
    isFutureVersion,
    productVariant.versions.length > 1,
  )

  const productName = product.name[locale]
  const productVariantName = productVariant.name?.[locale]
  const isMaster = productVariant.isMaster
  const variantsLength = product.variants.length + 1
  const isEditButtonHidden = !isFutureVersion
  const params = useParams()

  const currentPathname = useMemo(() => {
    return AppRoutes.resolveProductVariantVersionRoute(
      AppRoutes.ProductVariantVersion.marketing,
      productVariant.masterSku,
      productVariant.sku,
      productVariant.version.toString(),
    )
  }, [productVariant.masterSku, productVariant.sku, productVariant.version])

  return (
    <Wrapper isEditButtonHidden={isEditButtonHidden}>
      {window.history.length && (
        <ProductBackButton
          onClick={() => navigateToProductVariant(product.sku, currentVariant!.sku)}
        >
          {translate('productPage.backToCurrentVersion')}
        </ProductBackButton>
      )}
      <TopRow>
        <ProductVariantVersionBreadcrumbs
          productSku={productVariant.masterSku}
          variantSku={productVariant.sku}
          versionNumber={productVariant.version}
          name={productName}
          variantName={isMaster ? translate('common.masterVariant') : productVariantName}
        />
      </TopRow>
      <div />
      <div>
        <ProductName data-cy="product-name">{productVariantName}</ProductName>
      </div>
      <div>
        <ProductVariantVersionNavigation navItems={navItems} />
      </div>
      <div>
        <ProductCard
          variantSku={productVariant.sku}
          masterSku={productVariant.masterSku}
          lastSyncDate={productVariant.hamiltonGrant.lastSyncedAt}
          hgProductCode={productVariant.hamiltonGrant.productCode}
          imageUrl={productVariant.image?.thumbnail}
          variantsCount={variantsLength}
          countryCode={product.countryCode}
          status={productVariant.status}
          createdOn={product.createdAt}
          versionNumber={productVariant.version}
          published={productVariant.published}
          versionsCount={productVariant.versions.length}
          view="version"
          recipeStatus={productVariant.hamiltonGrant.hgRecipeStatus!}
        />
        <VersionNotice
          productVariant={productVariant}
          pubblishState={productVariant.publishState}
        />

        <Routes>
          <Route
            path={AppRoutes.ProductVariantVersion.marketing}
            element={
              <ProductVariantMarketingPage
                productVariant={productVariant}
                draftVariant={draftVariant}
                versionKey={productVariant.versionKey}
                countryCode={product.countryCode}
                isFutureVersion={isFutureVersion}
              />
            }
          />

          <Route
            path={AppRoutes.ProductVariantVersion.pricing}
            element={
              <ProductVariantPricingPage
                product={product}
                productVariant={productVariant}
                draftVariant={draftVariant}
                versionKey={productVariant.versionKey}
                isFutureVersion={isFutureVersion}
              />
            }
          />

          {productVariant.attributes && (
            <Route
              path={AppRoutes.ProductVariantVersion.attributes}
              element={
                <ProductVariantAttributesPage
                  product={product}
                  productVariant={productVariant}
                  draftVariant={draftVariant}
                  versionKey={productVariant.versionKey}
                  isFutureVersion={isFutureVersion}
                />
              }
            />
          )}
          <Route
            path={AppRoutes.ProductVariantVersion.reporting}
            element={
              <ProductVariantReportingPage
                productVariant={productVariant}
                draftVariant={draftVariant}
                productType={product.type}
                versionKey={productVariant.versionKey}
                isFutureVersion={isFutureVersion}
              />
            }
          />

          <Route
            path={AppRoutes.ProductVariantVersion.nutrition}
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

          <Route
            path={AppRoutes.ProductVariantVersion.labelling}
            element={
              <ProductVariantLabellingPage
                product={product}
                productVariant={productVariant}
                draftVariant={draftVariant!}
                versionKey={productVariant.versionKey}
                isFutureVersion={isFutureVersion}
              />
            }
          />

          <Route
            path={AppRoutes.ProductVariantVersion.draftChanges}
            element={
              <ProductVariantVersionDraftChangesPage
                product={product}
                productVariant={productVariant}
                draftVariant={draftVariant}
              />
            }
          />

          {productVariant.version?.toString() === params.version && (
            <>
              <Route path={''} element={<Navigate to={currentPathname} />} />
              <Route path={'*'} element={<Navigate to={currentPathname} />} />
            </>
          )}
        </Routes>

        <FooterNavigation data-cy="footer-navigation">
          <ProductFooterNavigation previousItem={previousItem} nextItem={nextItem} />
        </FooterNavigation>
      </div>
    </Wrapper>
  )
}

export const ProductVariantVersionPageWithData = () => {
  const { fetchProduct } = ProductApi.useGetProduct()
  const { fetchSingleProductVariantVersion } = ProductApi.useGetProductVariantVersions()
  const [loading, setLoading] = useState(true)
  const [error] = useState<null | string>(null)

  const params = useParams() as AppRoutes.ProductVariantVersionRouteParams
  const { variantSku, masterSku, version: routeVersion } = params

  const { setProduct, product } = SingleProductState.useActiveProduct()

  const fetchCurrentProduct = useCallback(async () => {
    setLoading(true)
    const product = await fetchProduct(masterSku)

    const currentVariant = [product.masterVariant, ...product.variants].find(
      ({ sku }) => sku === variantSku,
    )

    const currentVersion = currentVariant?.versions.find(
      ({ version }) => version?.toString() === routeVersion,
    )!

    const version = await fetchSingleProductVariantVersion(
      masterSku,
      variantSku,
      currentVersion?.key,
    )

    setProduct({
      ...product,
      currentVersion: {
        ...version,
        masterSku: product.sku,
        draft: {
          ...version.draft!,
          masterSku: product.sku,
        },
      },
    })
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterSku, routeVersion, setProduct, variantSku])

  useEffect(() => {
    fetchCurrentProduct()
  }, [fetchCurrentProduct])

  if (loading || !product) {
    return <PageLoader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <HowToDisplayOptionsContext.Provider productType={product.type}>
      <ProductVariantVersionPageWithoutData
        product={product!}
        productVariant={product?.currentVersion!}
        draftVariant={product?.currentVersion?.draft!}
      />
    </HowToDisplayOptionsContext.Provider>
  )
}
