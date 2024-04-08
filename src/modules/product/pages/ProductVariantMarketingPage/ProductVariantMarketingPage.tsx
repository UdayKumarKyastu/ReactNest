import React, { FC, useState, useMemo, useCallback, Fragment } from 'react'
import { isEqual } from 'lodash'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { Locale } from '../../../i18n/Locale'
import { ProductVariant, ProductVariantVersion } from '../../model/product-variant'
import { ProductEditState } from '../../ProductEditState'
import { ProductApi } from '../../api/product.api'
import { EditProductVariantDto } from '../../dto/edit-product-variant.dto'
import { useVariantMarketingSections } from '../../sections/useVariantMarketingSections'
import { VariantMarketingForm } from '../../forms/VariantMarketingForm/VariantMarketingForm'
import { DataPage } from '../DataPage/DataPage'
import { SideBySideView } from '../../components/SideBySideView/SideBySideView'
import { UnsavedDataNotice } from '../../../errors/UnsavedDataNotice/UnsavedDataNotice'
import { CountryCode } from '../../../../shared/model/country-code'
import { getFormFieldsFromProduct } from '../../../../util/getFormFieldsFromProduct'
import { isNotApprovedNoticeVisible } from '../../../../util/isNotApprovedNoticeVisible/isNotApprovedNoticeVisible'

// @TODO: To be moved to hook
const mapValuesToDto = (
  values: ProductVariantMarketingPage.FormFields,
): EditProductVariantDto.UpdateVariantMarketing => {
  return {
    name: values.variantName,
    description: values.variantDescription,
    availableForClickAndCollect: values.availableForCollection!,
    availableForOutposts: values.availableForOutposts!,
    availableForPretDelivers: values.availableForPretDelivers!,
    visibleOnDeliveryWebsite: values.visibleOnDeliveryWebsite!,
    isLive: values.visibleOnBrandWebsite!,
    isChefsSpecial: values.isChefSpecial!,
    displayAsNew: {
      isDisplayed: values.isDisplayed,
      until: values.displayAsNewUntil ? new Date(values.displayAsNewUntil).toISOString() : null,
    },
    liveSchedule: {
      on: values.liveFrom || null,
      off: values.liveTo || null,
    },
    howToDisplay: values.howToDisplay,
    availableAllDay: values.availableAllDay,
    availableForLunch: values.availableForLunch,
  }
}

export declare namespace ProductVariantMarketingPage {
  export type FormFields = {
    variantName: Locale.MultilangString
    variantDescription: Locale.MultilangString
    liveFrom: string | null
    liveTo: string | null
    visible: boolean | null
    availableForCollection: boolean | null
    availableForOutposts: boolean | null
    availableForPretDelivers: boolean | null
    visibleOnBrandWebsite: boolean | null
    isChefSpecial: boolean | null
    displayAsNewUntil: Date | null
    isDisplayed: boolean
    howToDisplay: string[]
    visibleOnDeliveryWebsite: boolean | null
    availableForLunch: boolean
    availableAllDay: boolean
  }

  export type Props = {
    productVariant: ProductVariant | ProductVariantVersion
    draftVariant: ProductVariant
    countryCode: CountryCode
    isFutureVersion?: boolean
    versionKey?: string | null
  }
}

const { SectionDivider, ReadonlySectionWrapper } = ProductStyles

const ReadonlyView: FC<{
  sections: React.ReactElement[]
  versionNotice?: React.ReactElement
  notice?: React.ReactNode
}> = ({ sections, versionNotice, notice }) => {
  return (
    <Fragment>
      {versionNotice}
      {notice}
      {sections.map((section, index) => {
        return (
          <Fragment key={index}>
            <ReadonlySectionWrapper>{section}</ReadonlySectionWrapper>
            {index < sections.length - 1 && <SectionDivider />}
          </Fragment>
        )
      })}
    </Fragment>
  )
}

const ProductVariantMarketingPageWithoutContext = ({
  productVariant,
  draftVariant,
  countryCode,
  isFutureVersion,
  versionKey = null,
}: ProductVariantMarketingPage.Props) => {
  const showNotApprovedNotice = isNotApprovedNoticeVisible(
    productVariant,
    'marketing',
    versionKey,
    isFutureVersion,
  )

  const { translate } = Translation.useTranslation()

  const formFields = getFormFieldsFromProduct(productVariant)
  const draftChangesFormFields = getFormFieldsFromProduct(draftVariant)
  const hasChanges = !isEqual(formFields, draftChangesFormFields)

  const { sections } = useVariantMarketingSections({
    formFields,
    fieldsToCompare: draftChangesFormFields,
    countryCode,
    isSideBySide: false,
  })

  const { sections: draftSections } = useVariantMarketingSections({
    formFields: draftChangesFormFields,
    fieldsToCompare: formFields,
    countryCode,
    isSideBySide: true,
    sectionWithChanges: true,
  })

  const [isFromEdit, setIsFromEdit] = useState(false)

  const numberOfChanges = draftVariant?.changesCount?.marketing || 0

  const { editProductVariantMarketing } = ProductApi.useEditProductVariant(
    productVariant.masterSku,
    productVariant.sku,
  )

  const { editProductVariantVersionMarketing } = ProductApi.useEditProductVariantVersion(
    productVariant.masterSku,
    productVariant.sku,
    versionKey!,
  )

  const handleFormSubmit = useCallback(
    async (values: ProductVariantMarketingPage.FormFields, isDuplicatedData?: boolean) => {
      const mappedValues = mapValuesToDto(values)

      if (versionKey) {
        await editProductVariantVersionMarketing(mappedValues, isDuplicatedData)
      } else {
        await editProductVariantMarketing(mappedValues)
      }
      setIsFromEdit(true)
    },
    [editProductVariantMarketing, editProductVariantVersionMarketing, versionKey],
  )

  const approvedNotice = useMemo(
    () =>
      showNotApprovedNotice ? (
        <UnsavedDataNotice
          tab="marketing"
          onSave={() => {
            handleFormSubmit(
              {
                ...draftChangesFormFields,
              },
              true,
            )
          }}
        />
      ) : null,
    [draftChangesFormFields, handleFormSubmit, showNotApprovedNotice],
  )

  return (
    <DataPage
      title={translate('productPage.variantMarketing')}
      readonlyView={<ReadonlyView sections={sections} notice={approvedNotice} />}
      sideBySideView={
        <SideBySideView
          sections={sections}
          draftSections={draftSections}
          numberOfChanges={numberOfChanges}
          sku={productVariant.masterSku}
          isFromEdit={isFromEdit}
        />
      }
      editView={
        <VariantMarketingForm
          formFields={draftChangesFormFields!}
          onSubmit={handleFormSubmit}
          sku={productVariant.masterSku}
          countryCode={countryCode}
        />
      }
      hasChanges={hasChanges}
      hideEditButton={showNotApprovedNotice && numberOfChanges === 0}
      isFutureVersion={isFutureVersion}
    />
  )
}

export const ProductVariantMarketingPage = (props: ProductVariantMarketingPage.Props) => (
  <ProductEditState.Provider>
    <ProductVariantMarketingPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
