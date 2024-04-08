import React, { FC, useState, useMemo, useCallback, Fragment } from 'react'
import { Translation } from '../../../i18n/Translation'
import { ProductVariant, ProductVariantVersion } from '../../model/product-variant'
import { Product } from '../../model/product'
import { ProductApi } from '../../api/product.api'
import { useLabellingSections } from '../../sections/useLabellingSections/useLabellingSections'
import { DataPage } from '../DataPage/DataPage'
import { SideBySideView } from '../../components/SideBySideView/SideBySideView'
import { ProductEditState } from '../../ProductEditState'
import { LabellingForm } from '../../forms/LabellingForm/LabellingForm'
import { ProductStyles } from '../../pages/styles'
import { UnsavedDataNotice } from '../../../errors/UnsavedDataNotice/UnsavedDataNotice'
import { isNotApprovedNoticeVisible } from '../../../../util/isNotApprovedNoticeVisible/isNotApprovedNoticeVisible'

export declare namespace ProductVariantLabellingPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant | ProductVariantVersion
    draftVariant: ProductVariant
    versionKey?: string | null
    isFutureVersion?: boolean
  }

  export type FormFields = LabellingForm.FormFields
}

const { SectionDivider, ReadonlySectionWrapper } = ProductStyles

const ReadonlyView: FC<{
  sections: React.ReactElement[]
  notice?: React.ReactNode
}> = ({ sections, notice }) => {
  return (
    <Fragment>
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

const ProductVariantLabellingPageWithoutContext = ({
  product,
  productVariant,
  draftVariant,
  versionKey = null,
  isFutureVersion,
}: ProductVariantLabellingPage.Props) => {
  const showNotApprovedNotice = isNotApprovedNoticeVisible(
    productVariant,
    'labelling',
    versionKey,
    isFutureVersion,
  )

  const { translate } = Translation.useTranslation()

  const hasChanges = draftVariant.changesCount?.labelling! > 0
  const { sections } = useLabellingSections(productVariant, translate, draftVariant)
  const { sections: draftSections } = useLabellingSections(
    draftVariant,
    translate,
    productVariant,
    true,
  )

  const [isFromEdit, setIsFromEdit] = useState(false)

  const numberOfChanges = draftVariant?.changesCount?.labelling || 0

  const { editProductVariantLabelling } = ProductApi.useEditProductVariant(
    productVariant.masterSku,
    productVariant.sku,
  )

  const { editProductVariantVersionLabelling } = ProductApi.useEditProductVariantVersion(
    productVariant.masterSku,
    productVariant.sku,
    versionKey!,
  )

  const handleFormSubmit = useCallback(
    async (
      { howToCard, ...values }: ProductVariantLabellingPage.FormFields,
      isDuplicatedData?: boolean,
    ) => {
      const mappedValues = {
        ...values,
        storageConditions: values.storageConditions || null,
        useBy: values.useBy || null,
        sellBy: values.sellBy || null,
        includeAverageWeightOnLabel: values.includeAverageWeightOnLabel || false,
        includeNutritionalInformationOnLabel: values.includeNutritionalInformationOnLabel || false,
      }

      if (versionKey) {
        await editProductVariantVersionLabelling(mappedValues, isDuplicatedData)
      } else {
        await editProductVariantLabelling(mappedValues)
      }
      setIsFromEdit(true)
    },
    [editProductVariantLabelling, editProductVariantVersionLabelling, versionKey],
  )

  const approvedNotice = useMemo(
    () =>
      showNotApprovedNotice ? (
        <UnsavedDataNotice
          tab="labelling"
          onSave={() => {
            handleFormSubmit(
              {
                ...draftVariant.labelling,
              },
              true,
            )
          }}
        />
      ) : null,
    [draftVariant.labelling, handleFormSubmit, showNotApprovedNotice],
  )

  return (
    <DataPage
      title={translate('productPage.variantLabelling')}
      readonlyView={<ReadonlyView sections={sections} notice={approvedNotice} />}
      sideBySideView={
        <SideBySideView
          sections={sections}
          draftSections={draftSections}
          numberOfChanges={numberOfChanges}
          sku={product.sku}
          isFromEdit={isFromEdit}
        />
      }
      editView={
        <LabellingForm
          formFields={draftVariant.labelling}
          sku={productVariant.sku}
          onSubmit={handleFormSubmit}
        />
      }
      hasChanges={hasChanges}
      hideEditButton={showNotApprovedNotice && numberOfChanges === 0}
      isFutureVersion={isFutureVersion}
    />
  )
}

export const ProductVariantLabellingPage = (props: ProductVariantLabellingPage.Props) => (
  <ProductEditState.Provider>
    <ProductVariantLabellingPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
