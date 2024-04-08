import { useState, useMemo, useCallback } from 'react'
import { Translation } from '../../../i18n/Translation'
import { DataPage } from '../DataPage/DataPage'
import { SideBySideView } from '../../components/SideBySideView/SideBySideView'
import { PricingForm } from '../../forms/PricingForm/PricingForm'
import { usePricingFormFields } from '../../forms/PricingForm/usePricingFormFields'
import { Product } from '../../model/product'
import { ProductVariant, ProductVariantVersion } from '../../model/product-variant'
import { usePricingSections } from '../../sections/usePricingSections'
import { ProductEditState } from '../../ProductEditState'
import { ProductApi } from '../../api/product.api'
import { ChannelPrice } from '../../model/price'
import { accurateRound } from '../../../../util/accurate-round'
import { UnsavedDataNotice } from '../../../errors/UnsavedDataNotice/UnsavedDataNotice'
import ReadonlyView from './ReadonlyView/ReadonlyView'
import { isNotApprovedNoticeVisible } from '../../../../util/isNotApprovedNoticeVisible/isNotApprovedNoticeVisible'

export declare namespace ProductVariantPricingPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant | ProductVariantVersion
    draftVariant: ProductVariant
    isFutureVersion?: boolean
    versionKey?: string | null
  }
}

export const ProductVariantPricingPageWithoutContext = ({
  product,
  productVariant,
  draftVariant,
  isFutureVersion,
  versionKey = null,
}: ProductVariantPricingPage.Props) => {
  const { translate } = Translation.useTranslation()
  const showNotApprovedNotice = isNotApprovedNoticeVisible(
    productVariant,
    'pricing',
    versionKey,
    isFutureVersion,
  )

  const formFields = productVariant.prices
  const draftChangesFormFields = draftVariant.prices
  const takeawayTax = product.taxCategory?.amount
  const isTakeAwayTaxFieldDisabled = product.takeAwayTaxDisabled
  const { section } = usePricingSections(
    formFields,
    undefined,
    false,
    takeawayTax,
    isTakeAwayTaxFieldDisabled,
  )
  const { section: sideBySideSection } = usePricingSections(
    formFields,
    undefined,
    true,
    takeawayTax,
    isTakeAwayTaxFieldDisabled,
  )
  const { section: draftSection } = usePricingSections(
    formFields!,
    draftChangesFormFields!,
    true,
    takeawayTax,
    isTakeAwayTaxFieldDisabled,
  )
  const pricingFormFields = usePricingFormFields(draftChangesFormFields)
  const [isFromEdit, setIsFromEdit] = useState(false)

  const numberOfChanges = draftVariant.changesCount?.pricing || 0
  const hasChanges = numberOfChanges! > 0

  const { editProductVariantPricing } = ProductApi.useEditProductVariant(
    productVariant.masterSku,
    productVariant.sku,
  )

  const { editProductVariantVersionPricing } = ProductApi.useEditProductVariantVersion(
    productVariant.masterSku,
    productVariant.sku,
    versionKey!,
  )

  const handleFormSubmit = useCallback(
    async (values: { prices: ChannelPrice[] }, isDuplicatedData?: boolean) => {
      const mappedValues = values.prices.map((channel) => {
        const mappedChannel: Omit<ChannelPrice, 'channelLabel'> = {
          channelName: channel.channelName,
          eatInPrice: {
            currencyCode: channel.eatInPrice.currencyCode,
            centAmount: Math.round(Number(channel.eatInPrice.centAmount) * 100),
          },
          eatInTax: accurateRound(Number(channel.eatInTax) / 100, 4),
          eatInClubPret: {
            currencyCode: channel.eatInClubPret.currencyCode,
            centAmount: Math.round(Number(channel.eatInClubPret.centAmount) * 100),
          },
          takeAwayPrice: {
            currencyCode: channel.takeAwayPrice.currencyCode,
            centAmount: Math.round(Number(channel.takeAwayPrice.centAmount) * 100),
          },
          takeAwayClubPret: {
            currencyCode: channel.takeAwayClubPret.currencyCode,
            centAmount: Math.round(Number(channel.takeAwayClubPret.centAmount) * 100),
          },
          deliveryPrice: {
            currencyCode: channel.deliveryPrice.currencyCode,
            centAmount: Math.round(Number(channel.deliveryPrice.centAmount) * 100),
          },
          deliveryTax: accurateRound(Number(channel.deliveryTax) / 100, 4),
        }

        if (!isTakeAwayTaxFieldDisabled) {
          mappedChannel.takeAwayTax = accurateRound(Number(channel.takeAwayTax) / 100, 4)
        }

        return mappedChannel
      })

      if (versionKey) {
        await editProductVariantVersionPricing({ prices: mappedValues }, isDuplicatedData)
      } else {
        await editProductVariantPricing({ prices: mappedValues })
      }

      setIsFromEdit(true)
    },
    [
      editProductVariantPricing,
      editProductVariantVersionPricing,
      isTakeAwayTaxFieldDisabled,
      versionKey,
    ],
  )

  const approvedNotice = useMemo(
    () =>
      showNotApprovedNotice ? (
        <UnsavedDataNotice
          tab="pricing"
          onSave={() => {
            handleFormSubmit(
              {
                prices: pricingFormFields,
              },
              true,
            )
          }}
        />
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draftChangesFormFields, handleFormSubmit, showNotApprovedNotice],
  )

  return (
    <DataPage
      title={translate('productVariantPricing.variantPricing')}
      readonlyView={<ReadonlyView sections={[section]} notice={approvedNotice} />}
      sideBySideView={
        <SideBySideView
          sections={[sideBySideSection]}
          draftSections={[draftSection]}
          numberOfChanges={numberOfChanges}
          sku={product.sku}
          isFromEdit={isFromEdit}
        />
      }
      editView={
        <PricingForm
          formFields={{ prices: draftChangesFormFields!, takeawayTax }}
          onSubmit={handleFormSubmit}
          sku={product.sku}
          takeAwayTaxDisabled={isTakeAwayTaxFieldDisabled}
        />
      }
      hasChanges={hasChanges}
      hideEditButton={showNotApprovedNotice && numberOfChanges === 0}
      isFutureVersion={isFutureVersion}
    />
  )
}

export const ProductVariantPricingPage = (props: ProductVariantPricingPage.Props) => {
  return (
    <ProductEditState.Provider>
      <ProductVariantPricingPageWithoutContext {...props} />
    </ProductEditState.Provider>
  )
}
