import React, { FC, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { Translation } from '../../i18n/Translation'
import { Locale } from '../../i18n/Locale'
import { ProductStyles } from '../pages/styles'
import { Dropdown } from '../../common/components/Dropdown/Dropdown'
import { DiscardIcon } from '../../../icons/Discard'
import { EditForm } from './EditForm/EditForm'
import { ProductType } from '../model/product-type'
import { useReportingOptions } from '../api/useReportingOptions'
import { RadioButton } from '@pretamanger/component-library'
import { ProductRange } from '../model/product-range'

export declare namespace ReportingForm {
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

  export type Props = {
    formFields: FormFields
    onSubmit(values: FormFields): void
    sku: string
    productType: ProductType
  }
}

const {
  SectionDivider,
  SectionHeading,
  Section,
  SubsectionHeading,
  DiscardButton,
  InputWrapper,
  StyledInput,
  FieldDescription,
  FieldLabel,
  RadioButtonWrapper,
} = ProductStyles

export const ReportingFormWithoutContext: FC<{
  productType: ProductType
}> = ({ productType }) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const { values, initialValues, setFieldValue } = useFormikContext<ReportingForm.FormFields>()
  const { data: variantReportingOptions } = useReportingOptions(productType)

  const [pluSecondaryCategoryOptions, setPluSecondaryCategoryOptions] = useState(
    variantReportingOptions?.pluCategoryOptions.find(
      (option) => option.key === values.pluPrimaryCategoryID,
    )?.children,
  )
  const [starKisProductSubCategoryOptions, setStarKisProductSubCategoryOptions] = useState(
    variantReportingOptions?.starKisCategoryOptions.find(
      (option) => option.key === values.starKisProductCategoryID,
    )?.children,
  )

  const isProductRangeChecked = (productRangeEnum: string) => {
    return values.productRange?.map((prodRange) => prodRange).join('') === productRangeEnum
  }

  useEffect(() => {
    const filteredOptions = variantReportingOptions?.pluCategoryOptions.find(
      (option) => option.key === values.pluPrimaryCategoryID,
    )?.children

    setPluSecondaryCategoryOptions(filteredOptions)
  }, [values.pluPrimaryCategoryID, variantReportingOptions?.pluCategoryOptions])

  useEffect(() => {
    const filteredOptions = variantReportingOptions?.starKisCategoryOptions.find(
      (option) => option.key === values.starKisProductCategoryID,
    )?.children

    setStarKisProductSubCategoryOptions(filteredOptions)
  }, [values.starKisProductCategoryID, variantReportingOptions?.starKisCategoryOptions])

  return (
    <>
      <Section>
        <SectionHeading data-cy="section-heading">
          {translate('productVariantReporting.reporting')}
        </SectionHeading>
        <SubsectionHeading>
          {translate('productVariantReporting.reportingInformation')}
        </SubsectionHeading>
        <StyledInput
          data-cy="sku"
          id="sku"
          name="sku"
          label={translate('productVariantReporting.productSku')}
          value={values.sku}
          type="text"
          disabled
        />
        <StyledInput
          data-cy="dateLastUpdatedOnHamiltonGrant"
          id="dateLastUpdatedOnHamiltonGrant"
          name="dateLastUpdatedOnHamiltonGrant"
          label={translate('productVariantReporting.dateLastUpdatedInHamiltonGrant')}
          value={
            values.dateLastUpdatedOnHamiltonGrant
              ? new Intl.DateTimeFormat(locale).format(
                  new Date(values.dateLastUpdatedOnHamiltonGrant),
                )
              : 'N/A'
          }
          type="text"
          disabled
        />
        <StyledInput
          data-cy="pointOfSaleID"
          id="pointOfSaleID"
          name="pointOfSaleID"
          label={translate('productVariantReporting.pointOfSaleID')}
          value={values.pointOfSaleID}
          type="text"
          disabled
        />
        <StyledInput
          data-cy="hamiltonGrantProductCode"
          id="hamiltonGrantProductCode"
          name="hamiltonGrantProductCode"
          label={translate('productVariantReporting.recipeID')}
          value={values.hamiltonGrantProductCode}
          type="text"
          disabled
        />
        <InputWrapper>
          <StyledInput
            data-cy="priceLookUpReportingName"
            id="priceLookUpReportingName"
            name="priceLookUpReportingName"
            label={translate('productVariantReporting.priceLookUpReportingName')}
            value={values.pluReportingName || ''}
            type="text"
            onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
              setFieldValue('pluReportingName', e.currentTarget.value)
            }
          />
          {values.pluReportingName !== initialValues.pluReportingName && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('pluReportingName', initialValues.pluReportingName)}
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper data-cy="priceLookUpPrimaryCategory">
          <Dropdown
            id="priceLookUpPrimaryCategory"
            label={translate('productVariantReporting.priceLookUpPrimaryCategory')}
            value={
              variantReportingOptions?.pluCategoryOptions.find(
                (option) => option.key === values.pluPrimaryCategoryID,
              ) || null
            }
            options={variantReportingOptions?.pluCategoryOptions.map((option) => ({
              key: option.key,
              label: option.label,
            }))}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('pluPrimaryCategoryID', option?.key)
              setFieldValue('pluSecondaryCategoryID', null)
            }}
          />
          {values.pluPrimaryCategoryID !== initialValues.pluPrimaryCategoryID && (
            <DiscardButton
              type="button"
              onClick={() =>
                setFieldValue('pluPrimaryCategoryID', initialValues.pluPrimaryCategoryID)
              }
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper data-cy="priceLookUpSecondaryCategory">
          <Dropdown
            id="priceLookUpSecondaryCategory"
            label={translate('productVariantReporting.priceLookUpSecondaryCategory')}
            value={
              pluSecondaryCategoryOptions?.find(
                (option) => values.pluSecondaryCategoryID === option.key,
              ) || null
            }
            options={pluSecondaryCategoryOptions}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('pluSecondaryCategoryID', option?.key)
            }}
          />
          {values.pluSecondaryCategoryID &&
            values.pluSecondaryCategoryID !== initialValues.pluSecondaryCategoryID && (
              <DiscardButton
                type="button"
                onClick={() =>
                  setFieldValue('pluSecondaryCategoryID', initialValues.pluSecondaryCategoryID)
                }
              >
                <DiscardIcon size={18} />
              </DiscardButton>
            )}
        </InputWrapper>
      </Section>

      <SectionDivider />

      <Section>
        <SubsectionHeading>
          {translate('productVariantReporting.productCategories')}
        </SubsectionHeading>
        <InputWrapper data-cy="productionProductCategory">
          <Dropdown
            id="starKisProductCategoryID"
            label={translate('productVariantReporting.productCategory')}
            value={
              variantReportingOptions?.starKisCategoryOptions.find(
                (option) => option.key === values.starKisProductCategoryID,
              ) || null
            }
            options={variantReportingOptions?.starKisCategoryOptions.map((option) => ({
              key: option.key,
              label: option.label,
            }))}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('starKisProductCategoryID', option?.key)
              setFieldValue('starKisProductSubCategoryID', null)
            }}
          />
          {values.starKisProductCategoryID !== initialValues.starKisProductCategoryID && (
            <DiscardButton
              type="button"
              onClick={() =>
                setFieldValue('starKisProductCategoryID', initialValues.starKisProductCategoryID)
              }
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper data-cy="productionProductSubcategory">
          <Dropdown
            id="starKisProductSubCategoryID"
            label={translate('productVariantReporting.productSubcategory')}
            value={
              starKisProductSubCategoryOptions?.find(
                (option) => values.starKisProductSubCategoryID === option.key,
              ) || null
            }
            options={starKisProductSubCategoryOptions}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('starKisProductSubCategoryID', option?.key)
            }}
          />
          {values.starKisProductSubCategoryID &&
            values.starKisProductSubCategoryID !== initialValues.starKisProductSubCategoryID && (
              <DiscardButton
                type="button"
                onClick={() =>
                  setFieldValue(
                    'starKisProductSubCategoryID',
                    initialValues.starKisProductSubCategoryID,
                  )
                }
              >
                <DiscardIcon size={18} />
              </DiscardButton>
            )}
        </InputWrapper>
      </Section>

      <SectionDivider />

      <Section>
        <SubsectionHeading>
          {translate('productVariantReporting.rangeAvailability')}
        </SubsectionHeading>

        <FieldLabel>{translate('productVariantReporting.productRange')}</FieldLabel>
        <RadioButtonWrapper>
          <RadioButton
            id=""
            name="productRange"
            label={translate('productVariantReporting.CLASSIC')}
            defaultChecked={isProductRangeChecked(ProductRange.CLASSIC)}
            onChange={() => setFieldValue('productRange', [ProductRange.CLASSIC])}
          />
        </RadioButtonWrapper>
        <RadioButtonWrapper>
          <RadioButton
            id=""
            name="productRange"
            label={translate('productVariantReporting.VEGGIE')}
            defaultChecked={isProductRangeChecked(ProductRange.VEGGIE)}
            onChange={() => setFieldValue('productRange', [ProductRange.VEGGIE])}
          />
        </RadioButtonWrapper>

        <RadioButtonWrapper>
          <RadioButton
            id=""
            name="productRange"
            label={translate('productVariantReporting.CLASSICVEGGIE')}
            defaultChecked={isProductRangeChecked(ProductRange.CLASSICVEGGIE)}
            onChange={() =>
              setFieldValue('productRange', [ProductRange.CLASSIC, ProductRange.VEGGIE])
            }
          />
        </RadioButtonWrapper>
      </Section>
      <SectionDivider />

      {productType === ProductType.Food && (
        <Section>
          <SubsectionHeading>
            {translate('productVariantReporting.slimProductReporting')}
          </SubsectionHeading>
          <InputWrapper>
            <StyledInput
              data-cy="parentProductSku"
              id="parentProductSku"
              name="parentProductSku"
              label={
                <>
                  {translate('productVariantReporting.productSku')}
                  <FieldDescription>
                    {translate('productVariantReporting.slimProductMessage')}
                  </FieldDescription>
                </>
              }
              value={values.parentProductSku || ''}
              type="text"
              onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
                setFieldValue('parentProductSku', e.currentTarget.value)
              }
            />
            {values.parentProductSku !== initialValues.parentProductSku && (
              <DiscardButton
                type="button"
                onClick={() => setFieldValue('parentProductSku', initialValues.parentProductSku)}
              >
                <DiscardIcon size={18} />
              </DiscardButton>
            )}
          </InputWrapper>
        </Section>
      )}

      <SectionDivider />
    </>
  )
}

export const ReportingForm: FC<ReportingForm.Props> = ({
  formFields,
  onSubmit,
  sku,
  productType,
}) => {
  return (
    <EditForm formFields={formFields} onSubmit={onSubmit} sku={sku}>
      <ReportingFormWithoutContext productType={productType} />
    </EditForm>
  )
}
