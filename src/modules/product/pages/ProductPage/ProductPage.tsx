import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { ProductBackButton } from '../../components/ProductBackButton/ProductBackButton'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { Routes as AppRoutes } from '../../../routing/Routes'
import { PageLoader } from '../../../common/components/PageLoader/PageLoader'
import { Product } from '../../model/product'
import { SingleProductState } from '../../SingleProductState'
import { ProductApi } from '../../api/product.api'
import { ProductNavigation } from '../../components/ProductNavigation/ProductNavigation'
import { ProductFooterNavigation } from '../../components/ProductFooterNavigation/ProductFooterNavigation'
import { ProductTaxationPage } from '../ProductTaxationPage/ProductTaxationPage'
import { ProductVariantsPage } from '../ProductVariantsPage/ProductVariantsPage'
import { LiveStatus } from '../../model/live-status'
import { ProductSetupPage } from '../ProductSetupPage/ProductSetupPage'
import { ProductMenuCategorisationPage } from '../ProductMenuCategorisationPage/ProductMenuCategorisationPage'
import { ProductPageBreadcrumbs } from '../../components/ProductPageBreadcrumbs/ProductPageBreadcrumbs'
import { useProductNavigation } from '../../components/ProductNavigation/useProductNavigation'
import { Locale } from '../../../i18n/Locale'
import { ProductAllDraftChangesPage } from '../ProductAllDraftChangesPage/ProductAllDraftChangesPage'
import { HowToDisplayOptionsContext } from '../../HowToDisplayOptionsContext'
import { CountryCode } from '../../../../shared/model/country-code'
import { UnpublishedProductNotice } from '../../components/UnpublishedProductNotice/UnpublishedProductNotice'

const { ProductName, Wrapper, TopRow, FooterNavigation } = ProductStyles

export const ProductPageWithoutData = ({ product }: { product: Product }) => {
  const { locale } = Locale.useLocale()
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [goBackUrl, setGoBackUrl] = useState('')
  const variantsDraftChanges = product.draftChanges.variants.reduce(
    (acc, currentVariant) => acc + currentVariant.changesCount?.total! || 0,
    0,
  )
  const { previousItem, nextItem, navItems } = useProductNavigation(product.sku, {
    productType: product.type,
    countryCode: product.countryCode,
    hasDraftChanges: product.draftChanges.changesCount.total + variantsDraftChanges > 0,
  })

  const { masterSku } = useParams() as AppRoutes.ProductRouteParams

  const { navigateToList } = AppRoutes.useNavigation()

  const productName = product.name?.[locale]

  useEffect(() => {
    const productListUrl = (location.state as { productListUrl: string })?.productListUrl
    if (productListUrl) {
      setGoBackUrl(productListUrl)
    }
  }, [location.state])

  /**
   * TODO Move these 2 into some selector/model
   */
  const variantsLength = product.variants.length + 1 // extra one is Master
  const activeVariants =
    product.variants.filter((v) => v.status === LiveStatus.ACTIVE).length +
    (product.masterVariant.status === LiveStatus.ACTIVE ? 1 : 0)

  const backToSearch = useCallback(() => {
    if (goBackUrl) {
      navigate(goBackUrl)
    } else {
      navigateToList()
    }
  }, [goBackUrl, navigate, navigateToList])

  return (
    <Wrapper>
      {window.history.length && (
        <ProductBackButton onClick={backToSearch} data-testid="go-back-button">
          {translate('productPage.backToSearch')}
        </ProductBackButton>
      )}
      <TopRow>
        <ProductPageBreadcrumbs productSku={product.sku} name={productName} />
      </TopRow>
      <div />
      <div>
        <ProductName data-cy="product-name">{productName}</ProductName>
      </div>
      <div>
        <ProductNavigation navItems={navItems} />
      </div>
      <div>
        <ProductCard
          variantSku={translate('product.allProductSkus')}
          hgProductCode={translate('product.allProductIds')}
          masterSku={product.sku}
          lastSyncDate={product.masterVariant.hamiltonGrant.lastSyncedAt}
          imageUrl={product.masterVariant.image?.thumbnail}
          countryCode={product.countryCode}
          variantsCount={variantsLength}
          status={product.masterVariant.status}
          published={product.published}
          activeVariants={activeVariants}
          createdOn={product.createdAt}
          view="product-group"
        />
        {!product.published && <UnpublishedProductNotice productName={product.name[locale]} />}
        <Routes location={location}>
          {product.setUp && (
            <Route
              path={AppRoutes.Product.setUp}
              element={<ProductSetupPage setUp={product.setUp!} />}
            />
          )}
          <Route
            path={AppRoutes.Product.categories}
            element={<ProductMenuCategorisationPage categories={product.categories} />}
          />
          {product.countryCode === CountryCode.UK && (
            <Route path={AppRoutes.Product.taxation} element={<ProductTaxationPage />} />
          )}
          <Route
            path={AppRoutes.Product.variants}
            element={
              <ProductVariantsPage
                masterSku={product.sku}
                variants={[product.masterVariant, ...product.variants]}
              />
            }
          />
          <Route
            path={AppRoutes.Product.allDraftChanges}
            element={
              <HowToDisplayOptionsContext.Provider productType={product?.type!}>
                <ProductAllDraftChangesPage product={product} />
              </HowToDisplayOptionsContext.Provider>
            }
          />

          <Route
            path={''}
            element={
              <Navigate
                to={AppRoutes.resolveProductRoute(AppRoutes.Product.categories, masterSku)}
                state={location.state}
              />
            }
          />
          <Route
            path={'*'}
            element={
              <Navigate
                to={AppRoutes.resolveProductRoute(AppRoutes.Product.categories, masterSku)}
                state={location.state}
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

const ProductPageWithDataFetching = () => {
  const { masterSku } = useParams() as AppRoutes.ProductRouteParams
  const { fetchProduct } = ProductApi.useGetProduct()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const { setProduct, product } = SingleProductState.useActiveProduct()

  useEffect(() => {
    fetchProduct(masterSku)
      .then((product) => {
        setProduct(product)
      })
      .catch((e) => {
        setError(e.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [fetchProduct, masterSku, setProduct])

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return <div>Error {error}</div>
  }

  return <ProductPageWithoutData product={product!} />
}

export const ProductPage = ProductPageWithDataFetching
