import { generatePath } from 'react-router'
import { useNavigate } from 'react-router-dom'

import findKey from 'lodash/findKey'

import { useCallback } from 'react'

const ProductRoutes = {
  root: 'products/:masterSku/*' as const,
  navigationRoot: '/products/:masterSku' as const,
  taxation: 'taxation' as const,
  setUp: 'set-up' as const,
  variants: 'variants' as const,
  categories: 'categories' as const,
  allDraftChanges: 'all-draft-changes' as const,
}

const ProductVariantRoutes = {
  root: '/products/:masterSku/variants/:variantSku/*' as const,
  navigationRoot: '/products/:masterSku/variants/:variantSku' as const,
  marketing: 'marketing' as const,
  pricing: 'pricing' as const,
  reporting: 'reporting' as const,
  attributes: 'attributes' as const,
  nutrition: 'nutrition' as const,
  labelling: 'labelling' as const,
  versions: 'versions' as const,
  draftChanges: 'draft-changes' as const,
}

const ProductVariantVersionRoutes = {
  root: '/products/:masterSku/variants/:variantSku/versions/:version/*' as const,
  navigationRoot: '/products/:masterSku/variants/:variantSku/versions/:version' as const,
  marketing: 'marketing' as const,
  pricing: 'pricing' as const,
  reporting: 'reporting' as const,
  attributes: 'attributes' as const,
  nutrition: 'nutrition' as const,
  labelling: 'labelling' as const,
  draftChanges: 'draft-changes' as const,
}

const RecipeCalculatorRoutes = {
  root: '/recipe-calculator/*' as const,
  navigationRoot: '/recipe-calculator' as const,
  createNew: 'create-new' as const,
  saveNew: 'save-new' as const,
}

const PricingImporterRoutes = {
  root: '/import-pricing',
}

const PretDigitalRoutes = {
  root: '/en-GB/pret-digital/home',
}

export declare namespace Routes {
  export type ProductSection = keyof typeof ProductRoutes
  export type ProductVariantSection = keyof typeof ProductVariantRoutes
  export type ProductVariantVersionSection = keyof typeof ProductVariantVersionRoutes

  export type ProductRouteParams = {
    masterSku: string
  }

  export type ProductVariantRouteParams = {
    masterSku: string
    variantSku: string
  }

  export type ProductVariantVersionRouteParams = {
    masterSku: string
    variantSku: string
    version: string
  }
}

const useNavigation = () => {
  const navigate = useNavigate()

  const navigateToList = useCallback(() => {
    navigate(Routes.List)
  }, [navigate])

  const navigateToProduct = useCallback(
    (masterSku: string, section: Routes.ProductSection = 'navigationRoot', state?: unknown) => {
      if (state) {
        navigate(Routes.resolveProductRoute(Routes.Product.resolveSection(section), masterSku), {
          state,
        })
      } else {
        navigate(Routes.resolveProductRoute(Routes.Product.resolveSection(section), masterSku))
      }
    },
    [navigate],
  )

  const navigateToProductVariant = useCallback(
    (
      masterSku: string,
      variantSku: string,
      section: Routes.ProductVariantSection = 'navigationRoot',
    ) => {
      navigate(
        Routes.resolveProductVariantRoute(
          Routes.ProductVariant.resolveSection(section),
          masterSku,
          variantSku,
        ),
      )
    },
    [navigate],
  )

  const navigateToProductVariantVersion = useCallback(
    (
      masterSku: string,
      variantSku: string,
      version: string,
      section: Routes.ProductVariantVersionSection = 'navigationRoot',
    ) => {
      navigate(
        Routes.resolveProductVariantVersionRoute(
          Routes.ProductVariantVersion.resolveSection(section),
          masterSku,
          variantSku,
          version,
        ),
      )
    },
    [navigate],
  )

  return {
    navigateToList,
    navigateToProduct,
    navigateToProductVariant,
    navigateToProductVariantVersion,
  }
}

/**
 * TODO: Some routes might be missing or changed - this was created when
 *   designs were still WIP
 *
 * TODO: Ensure SKUs are branded types for security
 */
export abstract class Routes {
  static readonly List = '/products'
  static readonly LandingPage = '/home'

  static readonly Product = {
    ...ProductRoutes,
    resolveSection(section: Routes.ProductSection) {
      return ProductRoutes[section]
    },
  }

  static readonly RecipeCalculator = {
    ...RecipeCalculatorRoutes,
  }

  static readonly PricingImport = {
    ...PricingImporterRoutes,
  }

  static readonly PretDigitalDashboard = {
    ...PretDigitalRoutes,
  }

  static readonly ProductVariant = {
    ...ProductVariantRoutes,
    resolveSection(section: Routes.ProductVariantSection) {
      return ProductVariantRoutes[section]
    },
  }

  static readonly ProductVariantVersion = {
    ...ProductVariantVersionRoutes,
    resolveSection(section: Routes.ProductVariantVersionSection) {
      return ProductVariantVersionRoutes[section]
    },
  }

  static resolveProductRoute = (
    route: typeof ProductRoutes[Routes.ProductSection],
    masterSku: string,
    absolutePath?: boolean,
  ) => {
    const path = absolutePath ? `${Routes.Product.navigationRoot}/${route}` : route

    return generatePath(path, {
      masterSku,
    })
  }

  static resolveProductVariantRoute = (
    route: typeof ProductVariantRoutes[Routes.ProductVariantSection],
    masterSku: string,
    variantSku: string,
    absolutePath?: boolean,
  ) => {
    const path = absolutePath ? `${Routes.ProductVariant.navigationRoot}/${route}` : route

    return generatePath(path, {
      masterSku,
      variantSku,
    })
  }

  static resolveProductVariantVersionRoute = (
    route: typeof ProductVariantVersionRoutes[Routes.ProductVariantVersionSection],
    masterSku: string,
    variantSku: string,
    version: string,
    absolutePath?: boolean,
  ) => {
    const path = absolutePath ? `${Routes.ProductVariantVersion.navigationRoot}/${route}` : route

    return generatePath(path, {
      masterSku,
      variantSku,
      version,
    })
  }

  static getProductSectionFromPath = (
    path: typeof ProductRoutes[Routes.ProductSection] | string,
  ) => {
    return findKey(ProductRoutes, (v) => path === v)
  }

  static getProductVariantSectionFromPath = (
    path: typeof ProductVariantRoutes[Routes.ProductVariantSection] | string,
  ) => {
    return findKey(ProductVariantRoutes, (v) => path === v)
  }

  static getProductVariantVersionSectionFromPath = (
    path: typeof ProductVariantVersionRoutes[Routes.ProductVariantVersionSection] | string,
  ) => {
    return findKey(ProductVariantVersionRoutes, (v) => path === v)
  }

  static useNavigation = useNavigation
}
