import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleProductState } from '../../../SingleProductState'
import { PageLoader } from '../../../../common/components/PageLoader/PageLoader'
import { ProductApi } from '../../../api/product.api'
import { ProductVariantPageWithoutData } from '../ProductVariantPage'
import { HowToDisplayOptionsContext } from '../../../HowToDisplayOptionsContext'
import { Routes } from '../../../../routing/Routes'

/**
 * TODO: Unify some logic with Product fetching
 */
export const ProductVariantPageWithData = () => {
  const { fetchProduct } = ProductApi.useGetProduct()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  const { variantSku, masterSku } = useParams() as Routes.ProductVariantRouteParams

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

  const variant = useMemo(() => {
    if (!product) {
      return null
    }

    const variantsLength = product.variants.length + 1
    const { country, countryCode } = product

    const productVariant = [product.masterVariant, ...product.variants].find(
      (p) => p.sku === variantSku,
    )

    return {
      product: productVariant,
      variantsLength,
      country,
      countryCode,
    }
  }, [product, variantSku])

  if (loading || !variant?.product) {
    return <PageLoader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <HowToDisplayOptionsContext.Provider productType={product?.type!}>
      <ProductVariantPageWithoutData
        product={product!}
        productVariant={variant.product}
        variantsLength={variant.variantsLength}
        countryCode={variant.countryCode}
      />
    </HowToDisplayOptionsContext.Provider>
  )
}
