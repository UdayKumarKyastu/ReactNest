import { isEqual } from 'lodash'
import { Translation } from '../../i18n/Translation'
import { ProductStyles } from '../pages/styles'
import { Locale } from '../../i18n/Locale'
import { ProductVariantReportingPage } from '../pages/ProductVariantReportingPage/ProductVariantReportingPage'
import { ProductType } from '../model/product-type'
import { useReportingOptions } from '../api/useReportingOptions'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import React, { useCallback } from 'react'
import { ResourceSkus } from '../../../shared/model/resourceSkus'
import { ReportingReviewStatus } from '../model/review-statuses/reporting-review-status'
import { useUserPermissions } from '../../auth/useUserPermissions'

const { SubsectionHeading, FullWidthSection } = ProductStyles

export const useReportingSections = (
  formFields: ProductVariantReportingPage.FormFields,
  translate: Translation.TranslationFunc,
  productType: ProductType,
  fieldsToCompare?: ProductVariantReportingPage.FormFields,
  sectionWithChanges?: boolean,
  isDraftView?: boolean,
  resourceSkus?: ResourceSkus,
  reviewStatuses?: ReportingReviewStatus,
  reloadProduct?: () => void,
) => {
  const {
    sku,
    dateLastUpdatedOnHamiltonGrant,
    pointOfSaleID,
    hamiltonGrantProductCode,
    pluReportingName,
    pluPrimaryCategoryID,
    pluSecondaryCategoryID,
    starKisProductCategoryID,
    starKisProductSubCategoryID,
    parentProductSku,
    productRange,
  } = formFields
  const { canReviewReporting } = useUserPermissions()
  const { locale } = Locale.useLocale()

  const { data: variantReportingOptions } = useReportingOptions(productType)

  const hasSectionChanged = useCallback(
    (keys: Array<keyof ProductVariantReportingPage.FormFields>) => {
      return keys.some((key) => !isEqual(formFields[key], fieldsToCompare?.[key]))
    },
    [fieldsToCompare, formFields],
  )

  const showSection = useCallback(
    (keys: Array<keyof ProductVariantReportingPage.FormFields>) => {
      if (isDraftView) {
        return hasSectionChanged(keys)
      }
      return sectionWithChanges ? hasSectionChanged(keys) : true
    },
    [hasSectionChanged, isDraftView, sectionWithChanges],
  )

  const displaySection = useCallback(
    (keys: Array<keyof ProductVariantReportingPage.FormFields>) => {
      return isDraftView ? hasSectionChanged(keys) : true
    },
    [isDraftView, hasSectionChanged],
  )

  const showArrow = useCallback(
    (keys: Array<keyof ProductVariantReportingPage.FormFields>) => {
      return sectionWithChanges && hasSectionChanged(keys)
    },
    [hasSectionChanged, sectionWithChanges],
  )

  const sections = [
    <FullWidthSection
      key="reporting"
      isHidden={
        !showSection(['pluReportingName', 'pluPrimaryCategoryID', 'pluSecondaryCategoryID'])
      }
    >
      <SubsectionHeading>
        {translate('productVariantReporting.reportingInformation')}
      </SubsectionHeading>
      <ReadonlyFieldWrapper
        data-cy="sku"
        isHidden={sectionWithChanges}
        isNotDisplayed={isDraftView}
        label={translate('productVariantReporting.productSku')}
      >
        {sku}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="dateLastUpdatedOnHamiltonGrant"
        isHidden={sectionWithChanges}
        isNotDisplayed={isDraftView}
        label={translate('productVariantReporting.dateLastUpdatedInHamiltonGrant')}
      >
        {dateLastUpdatedOnHamiltonGrant
          ? new Intl.DateTimeFormat(locale).format(new Date(dateLastUpdatedOnHamiltonGrant))
          : 'N/A'}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="pointOfSaleID"
        isHidden={sectionWithChanges}
        isNotDisplayed={isDraftView}
        label={translate('productVariantReporting.pointOfSaleID')}
      >
        {pointOfSaleID}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="hamiltonGrantProductCode"
        isHidden={sectionWithChanges}
        isNotDisplayed={isDraftView}
        label={translate('productVariantReporting.recipeID')}
      >
        {hamiltonGrantProductCode}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="priceLookUpReportingName"
        isHidden={!showSection(['pluReportingName'])}
        isNotDisplayed={!displaySection(['pluReportingName'])}
        showArrow={showArrow(['pluReportingName'])}
        presentChange={hasSectionChanged(['pluReportingName'])}
        label={translate('productVariantReporting.priceLookUpReportingName')}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.pluReportingName}
        fieldName="pluReportingName"
        hideButtons={reviewStatuses?.pluReportingName && !sectionWithChanges}
        reloadProduct={reloadProduct}
        tabName="reporting"
        canApproveChanges={canReviewReporting}
      >
        {pluReportingName}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="priceLookUpPrimaryCategory"
        isHidden={!showSection(['pluPrimaryCategoryID'])}
        isNotDisplayed={!displaySection(['pluPrimaryCategoryID'])}
        showArrow={showArrow(['pluPrimaryCategoryID'])}
        presentChange={hasSectionChanged(['pluPrimaryCategoryID'])}
        label={translate('productVariantReporting.priceLookUpPrimaryCategory')}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.pluPrimaryCategoryID}
        fieldName="pluPrimaryCategoryID"
        hideButtons={reviewStatuses?.pluPrimaryCategoryID && !sectionWithChanges}
        reloadProduct={reloadProduct}
        tabName="reporting"
        canApproveChanges={canReviewReporting}
      >
        {
          variantReportingOptions?.pluCategoryOptions.find(
            (option) => option.key === pluPrimaryCategoryID,
          )?.label
        }
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        data-cy="priceLookUpSecondaryCategory"
        isHidden={!showSection(['pluSecondaryCategoryID'])}
        isNotDisplayed={!displaySection(['pluSecondaryCategoryID'])}
        showArrow={showArrow(['pluSecondaryCategoryID'])}
        presentChange={hasSectionChanged(['pluSecondaryCategoryID'])}
        label={translate('productVariantReporting.priceLookUpSecondaryCategory')}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.pluSecondaryCategoryID}
        fieldName="pluSecondaryCategoryID"
        hideButtons={reviewStatuses?.pluSecondaryCategoryID && !sectionWithChanges}
        reloadProduct={reloadProduct}
        tabName="reporting"
        canApproveChanges={canReviewReporting}
      >
        {
          variantReportingOptions?.pluCategoryOptions
            .find((option) => option.key === pluPrimaryCategoryID)
            ?.children?.find((option) => option.key === pluSecondaryCategoryID)?.label
        }
      </ReadonlyFieldWrapper>
    </FullWidthSection>,
    <FullWidthSection
      key="productCategories"
      isHidden={!showSection(['starKisProductCategoryID', 'starKisProductSubCategoryID'])}
    >
      <SubsectionHeading>
        {translate('productVariantReporting.productCategories')}
      </SubsectionHeading>
      <ReadonlyFieldWrapper
        data-cy="productionProductCategory"
        isHidden={!showSection(['starKisProductCategoryID'])}
        isNotDisplayed={!displaySection(['starKisProductCategoryID'])}
        showArrow={showArrow(['starKisProductCategoryID'])}
        presentChange={hasSectionChanged(['starKisProductCategoryID'])}
        label={translate('productVariantReporting.productCategory')}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.starKisProductCategoryID}
        fieldName="starKisProductCategoryID"
        hideButtons={reviewStatuses?.starKisProductCategoryID && !sectionWithChanges}
        reloadProduct={reloadProduct}
        tabName="reporting"
        canApproveChanges={canReviewReporting}
      >
        {
          variantReportingOptions?.starKisCategoryOptions.find(
            (option) => option.key === starKisProductCategoryID,
          )?.label
        }
      </ReadonlyFieldWrapper>
      <ReadonlyFieldWrapper
        data-cy="productionProductSubcategory"
        isHidden={!showSection(['starKisProductSubCategoryID'])}
        isNotDisplayed={!displaySection(['starKisProductSubCategoryID'])}
        showArrow={showArrow(['starKisProductSubCategoryID'])}
        presentChange={hasSectionChanged(['starKisProductSubCategoryID'])}
        label={translate('productVariantReporting.productSubcategory')}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.starKisProductSubCategoryID}
        fieldName="starKisProductSubCategoryID"
        hideButtons={reviewStatuses?.starKisProductSubCategoryID && !sectionWithChanges}
        reloadProduct={reloadProduct}
        tabName="reporting"
        canApproveChanges={canReviewReporting}
      >
        {
          variantReportingOptions?.starKisCategoryOptions
            .find((option) => option.key === starKisProductCategoryID)
            ?.children?.find((option) => option.key === starKisProductSubCategoryID)?.label
        }
      </ReadonlyFieldWrapper>
    </FullWidthSection>,
    <FullWidthSection key="rangeAvailability" isHidden={!showSection(['productRange'])}>
      <SubsectionHeading>
        {translate('productVariantReporting.rangeAvailability')}
      </SubsectionHeading>

      <ReadonlyFieldWrapper
        showArrow={showArrow(['productRange'])}
        presentChange={hasSectionChanged(['productRange'])}
        label={translate('productVariantReporting.productRange')}
        hideButtons={reviewStatuses?.productRange && !sectionWithChanges}
        fieldName="productRange"
        tabName="reporting"
        canApproveChanges={canReviewReporting}
        resourceSkus={resourceSkus}
        reviewStatus={reviewStatuses?.productRange}
        reloadProduct={reloadProduct}
      >
        {translate(
          `productVariantReporting.${productRange?.map((prodRange) => prodRange).join('')}`,
        )}
      </ReadonlyFieldWrapper>
    </FullWidthSection>,
  ]

  if (productType === ProductType.Food && displaySection(['parentProductSku'])) {
    sections.push(
      <FullWidthSection key="slimProductReporting" isHidden={!showSection(['parentProductSku'])}>
        <SubsectionHeading>
          {translate('productVariantReporting.slimProductReporting')}
        </SubsectionHeading>
        <ReadonlyFieldWrapper
          data-cy="parentProductSku"
          showArrow={showArrow(['parentProductSku'])}
          presentChange={hasSectionChanged(['parentProductSku'])}
          label={translate('productVariantReporting.productSku')}
          resourceSkus={resourceSkus}
          reviewStatus={reviewStatuses?.parentProductSku}
          fieldName="parentProductSku"
          hideButtons={reviewStatuses?.parentProductSku && !sectionWithChanges}
          reloadProduct={reloadProduct}
          tabName="reporting"
          canApproveChanges={canReviewReporting}
        >
          {parentProductSku}
        </ReadonlyFieldWrapper>
      </FullWidthSection>,
    )
  }

  return {
    sections,
  }
}
