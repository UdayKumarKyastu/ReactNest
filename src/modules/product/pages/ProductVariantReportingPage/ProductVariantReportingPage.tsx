import React, { FC, useState, useMemo, useCallback, Fragment } from 'react'
import { Translation } from '../../../i18n/Translation'
import { ProductVariant, ProductVariantVersion } from '../../model/product-variant'
import { ProductApi } from '../../api/product.api'
import { useReportingSections } from '../../sections/useReportingSections'
import { DataPage } from '../DataPage/DataPage'
import { SideBySideView } from '../../components/SideBySideView/SideBySideView'
import { ProductEditState } from '../../ProductEditState'
import { ReportingForm } from '../../forms/ReportingForm'
import { ProductStyles } from '../../pages/styles'
import { ProductType } from '../../model/product-type'
import { UnsavedDataNotice } from '../../../errors/UnsavedDataNotice/UnsavedDataNotice'
import { isNotApprovedNoticeVisible } from '../../../../util/isNotApprovedNoticeVisible/isNotApprovedNoticeVisible'
import { ProductRange } from '../../model/product-range'

export const getFormFieldsFromProduct = (
  productVariant: ProductVariant,
): ProductVariantReportingPage.FormFields => {
  return {
    sku: productVariant.sku,
    dateLastUpdatedOnHamiltonGrant: productVariant.hamiltonGrant.lastSyncedAt,
    pointOfSaleID: productVariant.pos,
    hamiltonGrantProductCode: productVariant.hamiltonGrant.productCode,
    pluReportingName: productVariant.pluReportingName,
    pluPrimaryCategoryID: productVariant.pluPrimaryCategoryID,
    pluSecondaryCategoryID: productVariant.pluSecondaryCategoryID,
    starKisProductCategoryID: productVariant.starKisProductCategoryID,
    starKisProductSubCategoryID: productVariant.starKisProductSubCategoryID,
    parentProductSku: productVariant.parentProductSku,
    productRange: productVariant.productRange,
  }
}

export declare namespace ProductVariantReportingPage {
  export type Props = {
    productVariant: ProductVariant | ProductVariantVersion
    draftVariant: ProductVariant
    productType: ProductType
    isFutureVersion?: boolean
    versionKey?: string
  }

  export type FormFields = {
    sku: string
    dateLastUpdatedOnHamiltonGrant: string | null
    pointOfSaleID: string | null
    hamiltonGrantProductCode: string | null
    pluReportingName: string | null
    pluPrimaryCategoryID: string | null
    pluSecondaryCategoryID: string | null
    starKisProductCategoryID: string | null
    starKisProductSubCategoryID: string | null
    parentProductSku: string | null
    productRange: ProductRange[]
  }
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

const ProductVariantReportingPageWithoutContext: FC<ProductVariantReportingPage.Props> = ({
  productVariant,
  draftVariant,
  productType,
  isFutureVersion,
  versionKey = null,
}) => {
  const showNotApprovedNotice = isNotApprovedNoticeVisible(
    productVariant,
    'reporting',
    versionKey,
    isFutureVersion,
  )

  const { translate } = Translation.useTranslation()

  const formFields = getFormFieldsFromProduct(productVariant)
  const draftChangesFormFields = getFormFieldsFromProduct(draftVariant)
  const { sections } = useReportingSections(
    formFields,
    translate,
    productType,
    draftChangesFormFields,
  )
  const { sections: draftSections } = useReportingSections(
    draftChangesFormFields,
    translate,
    productType,
    formFields,
    true,
  )

  const [isFromEdit, setIsFromEdit] = useState(false)

  const numberOfChanges = draftVariant?.changesCount?.reporting || 0

  const hasChanges = numberOfChanges! > 0

  const { editProductVariantReporting } = ProductApi.useEditProductVariant(
    productVariant.masterSku,
    productVariant.sku,
  )

  const { editProductVariantVersionReporting } = ProductApi.useEditProductVariantVersion(
    productVariant.masterSku,
    productVariant.sku,
    versionKey!,
  )

  const handleFormSubmit = useCallback(
    async (values: ProductVariantReportingPage.FormFields, isDuplicatedData?: boolean) => {
      if (versionKey) {
        await editProductVariantVersionReporting(values, isDuplicatedData)
      } else {
        await editProductVariantReporting(values)
      }

      setIsFromEdit(true)
    },
    [editProductVariantReporting, editProductVariantVersionReporting, versionKey],
  )

  const approvedNotice = useMemo(
    () =>
      showNotApprovedNotice ? (
        <UnsavedDataNotice
          tab="reporting"
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
      title={translate('productPage.variantReporting')}
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
        <ReportingForm
          formFields={draftChangesFormFields!}
          onSubmit={handleFormSubmit}
          sku={productVariant.masterSku}
          productType={productType}
        />
      }
      hasChanges={hasChanges}
      hideEditButton={showNotApprovedNotice && numberOfChanges === 0}
      isFutureVersion={isFutureVersion}
    />
  )
}

export const ProductVariantReportingPage = (props: ProductVariantReportingPage.Props) => (
  <ProductEditState.Provider>
    <ProductVariantReportingPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
