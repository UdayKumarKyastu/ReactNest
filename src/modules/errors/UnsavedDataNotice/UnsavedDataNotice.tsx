import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Notice, Button, LoadingIndicator } from '@pretamanger/component-library'
import { UnsavedDataNoticeStyles } from './UnsavedDataNotice.styles'
import { Translation } from '../../i18n/Translation'
import { ProductEditState } from '../../product/ProductEditState'
import { ProductApi } from '../../product/api/product.api'
import { SingleProductState } from '../../product/SingleProductState'
import { Routes } from '../../routing/Routes'

export type Props = {
  onSave(): void
  tab: 'marketing' | 'reporting' | 'labelling' | 'attributes' | 'pricing'
}

const { DescriptionText, ButtonsWrapper } = UnsavedDataNoticeStyles

export const UnsavedDataNotice = ({ onSave, tab }: Props) => {
  const { translate } = Translation.useTranslation()

  const {
    action: { userRequestEdit, setApiSubmittingFail },
  } = ProductEditState.useState()
  const { fetchSingleProductVariantVersion } = ProductApi.useGetProductVariantVersions()
  const { setProduct, product } = SingleProductState.useActiveProduct()
  const { variantSku, version: versionNumber } =
    useParams<Routes.ProductVariantVersionRouteParams>()
  const { fetchProduct } = ProductApi.useGetProduct()
  const [isLoading, setIsLoading] = useState(false)

  const productVariant = [product?.masterVariant, ...product?.variants!].find(
    (variant) => variant?.sku === variantSku,
  )!
  const productVersion = productVariant.versions.find(
    (version) => version.version.toString() === versionNumber,
  )!

  const handleSave = useCallback(async () => {
    setIsLoading(true)
    try {
      await onSave()
      const newProduct = await fetchProduct(product?.sku!)
      const version = await fetchSingleProductVariantVersion(
        productVariant.masterSku,
        productVariant.sku,
        productVersion?.key,
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
    } catch (e: unknown) {
      const error = e as AxiosError<{ error: string }>
      setApiSubmittingFail(new Error(error.response?.data.error || 'UNKNOWN'))
    }
    setIsLoading(false)
  }, [
    onSave,
    fetchProduct,
    product?.sku,
    fetchSingleProductVariantVersion,
    productVariant.masterSku,
    productVariant.sku,
    productVersion?.key,
    setProduct,
    setApiSubmittingFail,
  ])

  return (
    <Notice
      title={translate('variantVersionsPage.unsavedDataNoticeTitle')}
      variant="critical"
      description={
        <div>
          <DescriptionText>
            {translate('variantVersionsPage.unsavedDataNoticeDescription', { tab })}
          </DescriptionText>
          <ButtonsWrapper>
            <Button onClick={handleSave} data-testid="save-unsaved-data">
              <LoadingIndicator colour="white" size="small" on={isLoading}>
                <LoadingIndicator.On />
                <LoadingIndicator.Off>
                  {translate('variantVersionsPage.saveDuplicatedData')}
                </LoadingIndicator.Off>
              </LoadingIndicator>
            </Button>
            <Button
              styleType="secondary"
              onClick={userRequestEdit}
              data-testid="update-unsaved-data"
            >
              {translate('variantVersionsPage.updateData')}
            </Button>
          </ButtonsWrapper>
        </div>
      }
    />
  )
}
