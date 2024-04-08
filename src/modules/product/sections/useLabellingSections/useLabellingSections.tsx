import React, { useCallback } from 'react'
import { isEqual } from 'lodash'
import { Button, RadioButton } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { ProductStyles } from '../../pages/styles'
import { ProductVariantLabellingPage } from '../../pages/ProductVariantLabellingPage/ProductVariantLabellingPage'
import styled from '@emotion/styled'
import { useLabellingOptions } from '../../api/useLabellingOptions'
import TurboChefSection from './TurboChefSection'
import LabelPreview from '../../components/LabelPreview/LabelPreview'
import { ProductVariant } from '../../model/product-variant'
import ReadonlyFieldWrapper from '../../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import WrapperWithArrow from '../../components/WrapperWithArrow/WrapperWithArrow'
import InfoTooltip from '../../../common/components/InfoTooltip/InfoTooltip'
import { ResourceSkus } from 'src/shared/model/resourceSkus'
import { LabellingReviewStatus } from '../../model/review-statuses/labelling-review-status'
import { useUserPermissions } from '../../../auth/useUserPermissions'

const { SubsectionHeading, FieldLabel, FullWidthSection, RadioButtonWrapper } = ProductStyles

const QrCodeBox = styled('div')`
  width: 166px;
  border: 1px solid black;
  padding: 15px;
  padding-bottom: 5px;

  & span {
    text-align: center;
    display: block;

    &:first-of-type {
      margin-top: 5px;
    }
  }
`

const DownloadButton = styled(Button)`
  margin-top: 20px;
  width: 166px;

  &.download-button {
    position: relative;
  }
`

const FixedFieldWrapper = styled.span<{ presentChange: boolean }>`
  height: ${(props) => props.presentChange && `115px`};
  display: block;
`

export type LabellingKeys = Array<keyof ProductVariantLabellingPage.FormFields>

export const useLabellingSections = (
  product: ProductVariant,
  translate: Translation.TranslationFunc,
  fieldsToCompare: ProductVariant,
  sectionWithChanges?: boolean,
  isDraftView?: boolean,
  resourceSkus?: ResourceSkus,
  reviewStatuses?: LabellingReviewStatus,
  reloadProduct?: () => void,
) => {
  const { labelling }: { labelling: ProductVariantLabellingPage.FormFields } = product
  const labellingFieldsToCompare: ProductVariantLabellingPage.FormFields | undefined =
    fieldsToCompare?.labelling
  const hgCode = product.hamiltonGrant.productCode
  const { data: labellingOptions } = useLabellingOptions()
  const { canReviewLabelling } = useUserPermissions()

  const hasSectionChanged = useCallback(
    (keys: LabellingKeys) => {
      return keys.some((key) => !isEqual(labelling[key], labellingFieldsToCompare[key]))
    },
    [labelling, labellingFieldsToCompare],
  )

  const showSection = useCallback(
    (keys: LabellingKeys) => {
      return sectionWithChanges ? hasSectionChanged(keys) : true
    },
    [hasSectionChanged, sectionWithChanges],
  )

  const displaySection = useCallback(
    (keys: LabellingKeys) => {
      return isDraftView ? hasSectionChanged(keys) : true
    },
    [hasSectionChanged, isDraftView],
  )

  const showArrow = useCallback(
    (keys: LabellingKeys) => {
      return hasSectionChanged(keys) && !!sectionWithChanges
    },
    [hasSectionChanged, sectionWithChanges],
  )

  const sections = [
    <FullWidthSection
      key="productLabel"
      isHidden={
        !showSection([
          'legalTitle',
          'includeAverageWeightOnLabel',
          'includeNutritionalInformationOnLabel',
          'countryOfOriginDescription',
          'useBy',
          'sellBy',
          'storageConditions',
          'productServes',
        ])
      }
    >
      <SubsectionHeading>{translate('productVariantLabelling.productLabel')}</SubsectionHeading>
      <ReadonlyFieldWrapper
        isHidden={!showSection(['legalTitle'])}
        isNotDisplayed={!displaySection(['legalTitle'])}
        testSelector="legalTitle"
        showArrow={showArrow(['legalTitle'])}
        presentChange={hasSectionChanged(['legalTitle'])}
        label={translate('productVariantLabelling.legalTitle')}
        hideButtons={reviewStatuses?.legalTitle && !sectionWithChanges}
        reviewStatus={reviewStatuses?.legalTitle}
        fieldName="legalTitle"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
        tooltipText={translate('productVariantLabelling.legalTitleTooltipText')}
      >
        <FixedFieldWrapper presentChange={hasSectionChanged(['legalTitle'])}>
          {labelling.legalTitle}
        </FixedFieldWrapper>
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['countryOfOriginDescription'])}
        isNotDisplayed={!displaySection(['countryOfOriginDescription'])}
        label={translate('productVariantLabelling.countryOfOriginDescription')}
        testSelector="countryOfOriginDescription"
        showArrow={showArrow(['countryOfOriginDescription'])}
        presentChange={hasSectionChanged(['countryOfOriginDescription'])}
        hideButtons={reviewStatuses?.countryOfOriginDescription && !sectionWithChanges}
        reviewStatus={reviewStatuses?.countryOfOriginDescription}
        fieldName="countryOfOriginDescription"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        <FixedFieldWrapper presentChange={hasSectionChanged(['countryOfOriginDescription'])}>
          {labelling.countryOfOriginDescription}
        </FixedFieldWrapper>
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['storageConditions'])}
        isNotDisplayed={!displaySection(['storageConditions'])}
        testSelector="storageConditions"
        showArrow={showArrow(['storageConditions'])}
        presentChange={hasSectionChanged(['storageConditions'])}
        label={translate('productVariantLabelling.instructionsForUse')}
        hideButtons={reviewStatuses?.storageConditions && !sectionWithChanges}
        reviewStatus={reviewStatuses?.storageConditions}
        fieldName="storageConditions"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {
          labellingOptions?.instructionsForUse.find(
            (option) => labelling.storageConditions === option.key,
          )?.label
        }
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['useBy'])}
        isNotDisplayed={!displaySection(['useBy'])}
        testSelector="useBy"
        showArrow={showArrow(['useBy'])}
        presentChange={hasSectionChanged(['useBy'])}
        label={translate('productVariantLabelling.useBy')}
        hideButtons={reviewStatuses?.useBy && !sectionWithChanges}
        reviewStatus={reviewStatuses?.useBy}
        fieldName="useBy"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {labellingOptions?.useBy.find((option) => labelling.useBy === option.key)?.label}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['sellBy'])}
        isNotDisplayed={!displaySection(['sellBy'])}
        testSelector="sellBy"
        showArrow={showArrow(['sellBy'])}
        presentChange={hasSectionChanged(['sellBy'])}
        label={translate('productVariantLabelling.sellBy')}
        hideButtons={reviewStatuses?.sellBy && !sectionWithChanges}
        reviewStatus={reviewStatuses?.sellBy}
        fieldName="sellBy"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {labellingOptions?.sellBy.find((option) => labelling.sellBy === option.key)?.label}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['productServes'])}
        isNotDisplayed={!displaySection(['productServes'])}
        testSelector="productServes"
        showArrow={showArrow(['productServes'])}
        presentChange={hasSectionChanged(['productServes'])}
        label={translate('productVariantLabelling.productServes')}
        hideButtons={reviewStatuses?.productServes && !sectionWithChanges}
        reviewStatus={reviewStatuses?.productServes}
        fieldName="productServes"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {
          labellingOptions?.productServes.find((option) => labelling.productServes === option.key)
            ?.label
        }
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['includeAverageWeightOnLabel'])}
        isNotDisplayed={!displaySection(['includeAverageWeightOnLabel'])}
        hideButtons={reviewStatuses?.includeAverageWeightOnLabel && !sectionWithChanges}
        reviewStatus={reviewStatuses?.includeAverageWeightOnLabel}
        fieldName="includeAverageWeightOnLabel"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        <FieldLabel>
          {translate('productVariantLabelling.showProductWeight')}
          <InfoTooltip text={translate('productVariantLabelling.weightIsUnderDeclared')} />
        </FieldLabel>

        <ReadonlyFieldWrapper
          showArrow={showArrow(['includeAverageWeightOnLabel'])}
          presentChange={hasSectionChanged(['includeAverageWeightOnLabel'])}
        >
          <RadioButtonWrapper data-cy="includeAverageWeightOnLabelYes">
            <RadioButton
              id="includeAverageWeightOnLabel"
              name={
                sectionWithChanges
                  ? 'includeAverageWeightOnLabelYesDraft'
                  : 'includeAverageWeightOnLabelYes'
              }
              label="Yes"
              defaultChecked={labelling.includeAverageWeightOnLabel!}
              onChange={() => {}}
              disabled
            />
          </RadioButtonWrapper>
          <RadioButtonWrapper data-cy="includeAverageWeightOnLabelNo">
            <RadioButton
              id="includeAverageWeightOnLabel"
              name={
                sectionWithChanges
                  ? 'includeAverageWeightOnLabelNoDraft'
                  : 'includeAverageWeightOnLabelNo'
              }
              label="No"
              defaultChecked={!labelling.includeAverageWeightOnLabel!}
              onChange={() => {}}
              disabled
            />
          </RadioButtonWrapper>
        </ReadonlyFieldWrapper>
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['includeNutritionalInformationOnLabel'])}
        isNotDisplayed={!displaySection(['includeNutritionalInformationOnLabel'])}
        hideButtons={reviewStatuses?.includeNutritionalInformationOnLabel && !sectionWithChanges}
        reviewStatus={reviewStatuses?.includeNutritionalInformationOnLabel}
        fieldName="includeNutritionalInformationOnLabel"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        <FieldLabel>
          {translate('productVariantLabelling.showNutritionalInformation')}
          <InfoTooltip
            text={translate('productVariantLabelling.showNutritionalInformationTooltipText')}
          />
        </FieldLabel>
        <ReadonlyFieldWrapper
          showArrow={showArrow(['includeNutritionalInformationOnLabel'])}
          presentChange={hasSectionChanged(['includeNutritionalInformationOnLabel'])}
        >
          <RadioButtonWrapper data-cy="includeNutritionalInformationOnLabelYes">
            <RadioButton
              id="includeNutritionalInformationOnLabel"
              name={
                sectionWithChanges
                  ? 'includeNutritionalInformationOnLabelYesDraft'
                  : 'includeNutritionalInformationOnLabelYes'
              }
              label="Yes"
              defaultChecked={labelling.includeNutritionalInformationOnLabel!}
              onChange={() => {}}
              disabled
            />
          </RadioButtonWrapper>
          <RadioButtonWrapper data-cy="includeNutritionalInformationOnLabelNo">
            <RadioButton
              id="includeNutritionalInformationOnLabel"
              name={
                sectionWithChanges
                  ? 'includeNutritionalInformationOnLabelNoDraft'
                  : 'includeNutritionalInformationOnLabelNo'
              }
              label="No"
              defaultChecked={!labelling.includeNutritionalInformationOnLabel!}
              onChange={() => {}}
              disabled
            />
          </RadioButtonWrapper>
        </ReadonlyFieldWrapper>
      </ReadonlyFieldWrapper>
    </FullWidthSection>,

    <FullWidthSection key="productPackagingBarcode" isHidden={!showSection(['ean13Code'])}>
      <SubsectionHeading>
        {translate('productVariantLabelling.productPackagingBarcode')}
      </SubsectionHeading>
      <ReadonlyFieldWrapper
        showArrow={showArrow(['ean13Code'])}
        presentChange={hasSectionChanged(['ean13Code'])}
        hideButtons={reviewStatuses?.ean13Code && !sectionWithChanges}
        testSelector="ean13Code"
        label={translate('productVariantLabelling.ean13Code')}
        reviewStatus={reviewStatuses?.ean13Code}
        resourceSkus={resourceSkus}
        fieldName="ean13Code"
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
        reloadProduct={reloadProduct}
      >
        {labelling.ean13Code}
      </ReadonlyFieldWrapper>
    </FullWidthSection>,

    <FullWidthSection
      key="labelPreview"
      isHidden={
        !showSection([
          'legalTitle',
          'includeAverageWeightOnLabel',
          'includeNutritionalInformationOnLabel',
          'countryOfOriginDescription',
          'useBy',
          'sellBy',
          'productServes',
          'storageConditions',
          'ean13Code',
        ])
      }
    >
      <WrapperWithArrow showArrow={sectionWithChanges}>
        <SubsectionHeading>
          {translate('productVariantLabelling.preview.sectionTitle')}
          <InfoTooltip text={translate('productVariantLabelling.preview.sectionTitleTooltip')} />
        </SubsectionHeading>
        <LabelPreview product={product} />
      </WrapperWithArrow>
    </FullWidthSection>,
  ]

  if (displaySection(['useByTurboChef', 'sellByTurboChef', 'canBeCookedInTurboChef'])) {
    sections.splice(
      2,
      0,
      <TurboChefSection
        key="labelling-section"
        labellingOptions={labellingOptions}
        sectionWithChanges={sectionWithChanges}
        showSection={showSection}
        showArrow={showArrow}
        formFields={labelling}
        hasSectionChanged={hasSectionChanged}
        displaySection={displaySection}
        resourceSkus={resourceSkus}
        reviewStatuses={reviewStatuses}
        reloadProduct={reloadProduct}
      />,
    )
  }

  if (!sectionWithChanges && !isDraftView) {
    const { constituentHGCodes } = product.hamiltonGrant
    const hgCodes = [hgCode, ...constituentHGCodes]

    sections.push(
      <FullWidthSection key="howToCard">
        <SubsectionHeading>{translate('productVariantLabelling.howToCard')}</SubsectionHeading>
        <ReadonlyFieldWrapper>
          <FieldLabel>{translate('productVariantLabelling.qrCode')}</FieldLabel>
          <QrCodeBox>
            <img src={labelling.howToCard.qrPng} />
            {hgCodes.map((code) => (
              <span key={code}>{code}</span>
            ))}
          </QrCodeBox>
          <DownloadButton
            styleType="secondary"
            download={labelling.howToCard.fileName}
            href={labelling.howToCard.qrPng}
            className="download-button"
          >
            {translate('productVariantLabelling.download')}
          </DownloadButton>
        </ReadonlyFieldWrapper>
      </FullWidthSection>,
    )
  }

  return {
    sections,
  }
}
