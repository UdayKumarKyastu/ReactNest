import React, { FC, Fragment, useState, useMemo, useCallback } from 'react'
import { isEqual } from 'lodash'
import { Translation } from '../../../i18n/Translation'
import { AttributesForm } from '../../forms/AttributesForm'
import { Product } from '../../model/product'
import { ProductVariant, ProductVariantVersion } from '../../model/product-variant'
import { DataPage } from '../DataPage/DataPage'
import { SideBySideView } from '../../components/SideBySideView/SideBySideView'
import { useAttributesSections } from '../../sections/useAttributesSections'
import { ProductEditState } from '../../ProductEditState'
import { ProductApi } from '../../api/product.api'
import { BaristaVariantAttributes } from '../../model/barista-attributes'
import { UnsavedDataNotice } from '../../../errors/UnsavedDataNotice/UnsavedDataNotice'
import { isNotApprovedNoticeVisible } from '../../../../util/isNotApprovedNoticeVisible/isNotApprovedNoticeVisible'

export declare namespace ProductVariantAttributesPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant | ProductVariantVersion
    draftVariant: ProductVariant
    isFutureVersion?: boolean
    versionKey?: string
  }
}

const ReadonlyView: FC<{
  sections: React.ReactElement[]
  notice?: React.ReactNode
}> = ({ sections, notice }) => {
  return (
    <Fragment>
      {notice}
      {sections.map((section) => {
        return section
      })}
    </Fragment>
  )
}

export const ProductVariantAttributesPageWithoutContext: FC<ProductVariantAttributesPage.Props> = ({
  product,
  productVariant,
  draftVariant,
  isFutureVersion,
  versionKey = null,
}) => {
  const showNotApprovedNotice = isNotApprovedNoticeVisible(
    productVariant,
    'baristaAttributes',
    versionKey,
    isFutureVersion,
  )

  const { translate } = Translation.useTranslation()
  const formFields = productVariant.attributes
  const draftChangesFormFields = draftVariant.attributes
  const { sections } = useAttributesSections(formFields!, translate, draftChangesFormFields!)
  const { sections: draftSections } = useAttributesSections(
    draftChangesFormFields!,
    translate,
    formFields!,
    true,
  )
  const [isFromEdit, setIsFromEdit] = useState(false)

  const numberOfChanges = draftVariant.changesCount?.attributes || 0
  const hasChanges = numberOfChanges > 0

  const { editProductVariantAttributes } = ProductApi.useEditProductVariant(
    productVariant.masterSku,
    productVariant.sku,
  )

  const { editProductVariantVersionAttributes } = ProductApi.useEditProductVariantVersion(
    productVariant.masterSku,
    productVariant.sku,
    versionKey!,
  )

  const handleFormSubmit = useCallback(
    async (values: BaristaVariantAttributes, isDuplicatedData?: boolean) => {
      if (versionKey) {
        await editProductVariantVersionAttributes(values, isDuplicatedData)
      } else {
        await editProductVariantAttributes(values)
      }
      setIsFromEdit(true)
    },
    [editProductVariantAttributes, editProductVariantVersionAttributes, versionKey],
  )

  const getExistingCombinationVariantSku = (values: BaristaVariantAttributes) => {
    const variantWithSameAttributesCombination = [
      ...product.variants,
      ...product.draftChanges.variants,
    ]
      .filter((variant) => variant.sku !== productVariant.sku)
      .find((variant) => isEqual(variant.attributes, values))

    return variantWithSameAttributesCombination?.sku || null
  }

  const approvedNotice = useMemo(
    () =>
      showNotApprovedNotice ? (
        <UnsavedDataNotice
          tab="attributes"
          onSave={() => {
            handleFormSubmit(
              {
                ...draftChangesFormFields!,
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
      title={translate('productVariantAttributes.variantAttributes')}
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
        <AttributesForm
          formFields={draftChangesFormFields!}
          onSubmit={handleFormSubmit}
          sku={product.sku}
          getExistingCombinationVariantSku={getExistingCombinationVariantSku}
        />
      }
      hasChanges={hasChanges}
      hideEditButton={showNotApprovedNotice && numberOfChanges === 0}
      isFutureVersion={isFutureVersion}
    />
  )
}

export const ProductVariantAttributesPage: FC<ProductVariantAttributesPage.Props> = (props) => {
  return (
    <ProductEditState.Provider>
      <ProductVariantAttributesPageWithoutContext {...props} />
    </ProductEditState.Provider>
  )
}
