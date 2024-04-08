import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFoundErrorPage } from '../errors/pages/NotFoundErrorPage/NotFoundErrorPage'
import { withAuthentication } from '../../app-factory'
import { HomePage } from '../home/pages/HomePage/HomePage'
import { ProductPage } from '../product/pages/ProductPage/ProductPage'
import { ProductsPage } from '../products/pages/ProductsPage'
import { Routes as AppRoutes } from './Routes'
import { ProductVariantPageWithData } from '../product/pages/ProductVariantPage/ProductVariantPageWithData/ProductVariantPageWithData'
import { ProductVariantVersionPageWithData } from '../product/pages/ProductVariantVersionPage/ProductVariantVersionPage'
import RecipeCalculatorPage from '../recipe-calculator/pages/RecipeCalculatorPage/RecipeCalculatorPage'
import PricingImport from '../pricing-import/pages/PricingImport/PricingImport'

const ProtectedHomePage = withAuthentication(HomePage)
const ProtectedProductsPage = withAuthentication(ProductsPage)
const ProtectedProductPage = withAuthentication(ProductPage)
const ProtectedProductVariantPage = withAuthentication(ProductVariantPageWithData)
const ProtectedProductVariantVersionPage = withAuthentication(ProductVariantVersionPageWithData)
const ProtectedRecipeCalculatorPage = withAuthentication(RecipeCalculatorPage)

export const Routing = () => (
  <Routes>
    <Route path="/" element={<ProtectedHomePage />} />
    <Route path="/home" element={<ProtectedHomePage />} />
    <Route path={AppRoutes.List} element={<ProtectedProductsPage />} />

    <Route
      path={AppRoutes.ProductVariantVersion.root}
      element={<ProtectedProductVariantVersionPage />}
    />
    <Route path={AppRoutes.ProductVariant.root} element={<ProtectedProductVariantPage />} />
    <Route path={AppRoutes.Product.root} element={<ProtectedProductPage />} />

    <Route path={AppRoutes.RecipeCalculator.root} element={<ProtectedRecipeCalculatorPage />} />

    <Route path={AppRoutes.PricingImport.root} element={<PricingImport />} />

    <Route element={<NotFoundErrorPage />} />
  </Routes>
)
