import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { Product } from './model/product'
import { ProductVariantVersion } from './model/product-variant'
import { ProductApi } from './api/product.api'
import { useParams } from 'react-router-dom'
import { Routes } from '../routing/Routes'

export declare namespace SingleProductState {
  export type Context = {
    setProduct(
      product: Product & {
        currentVersion?: ProductVariantVersion
      },
    ): void
    product: (Product & { currentVersion?: ProductVariantVersion }) | null
  }
}

const Context = createContext<SingleProductState.Context>({
  product: null,
  setProduct: () => {
    throw new Error('Context accessed before initialized. Is Provided attached?')
  },
})

const Provider = ({
  children,
  initialProduct = null,
}: PropsWithChildren<{ initialProduct?: Product | null }>) => {
  const [product, setProduct] = useState(initialProduct)

  return <Context.Provider value={{ product, setProduct }}>{children}</Context.Provider>
}

const useActiveProduct = () => {
  const { product, setProduct } = useContext(Context)
  const { fetchProduct } = ProductApi.useGetProduct()
  const { variantSku, version: routeVersion } =
    useParams() as Routes.ProductVariantVersionRouteParams
  const { fetchSingleProductVariantVersion } = ProductApi.useGetProductVariantVersions()

  const sku = product?.sku

  const fetch = useCallback(
    (sku: string) => {
      fetchProduct(sku).then(setProduct)
    },
    [fetchProduct, setProduct],
  )

  const reload = useCallback(async () => {
    if (product?.sku) {
      const newProduct = await fetchProduct(product.sku)
      setProduct(newProduct)
    }
  }, [fetchProduct, setProduct, product?.sku])

  const reloadVersion = useCallback(async () => {
    if (product?.sku) {
      const newProduct = await fetchProduct(product.sku)
      const currentVariant = [product.masterVariant, ...product.variants].find(
        ({ sku }) => sku === variantSku,
      )
      const currentVersion = currentVariant?.versions.find(
        ({ version }) => version.toString() === routeVersion,
      )!
      const version = await fetchSingleProductVariantVersion(
        product.sku,
        variantSku,
        currentVersion.key,
      )
      setProduct({
        ...newProduct,
        currentVersion: {
          ...version,
          masterSku: newProduct.sku,
          draft: {
            ...version.draft!,
            masterSku: newProduct.sku,
          },
        },
      })
    }
  }, [
    fetchProduct,
    fetchSingleProductVariantVersion,
    product,
    routeVersion,
    setProduct,
    variantSku,
  ])

  return {
    product,
    setProduct,
    sku,
    fetch,
    reload,
    reloadVersion,
  }
}

export abstract class SingleProductState {
  static useActiveProduct = useActiveProduct

  static Provider = Provider
}
