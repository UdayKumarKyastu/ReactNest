import React, { FC, useCallback } from 'react'
import { RadioButton, TextArea, Notice } from '@pretamanger/component-library'
import { useFormikContext } from 'formik'
import { Translation } from '../../../i18n/Translation'
import { ProductStyles } from '../../pages/styles'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { DiscardIcon } from '../../../../icons/Discard'
import { EditForm } from '../EditForm/EditForm'
import { ProductVariant } from '../../model/product-variant'
import { ProductApi } from '../../api/product.api'
import { validateEanCode } from './validateEanCode'
import { useLabellingOptions } from '../../api/useLabellingOptions'
import TurboChefSection from './TurboChefSection'
import InfoTooltip from '../../../common/components/InfoTooltip/InfoTooltip'
import { AxiosError } from 'axios'

export declare namespace LabellingForm {
  export type FormFields = ProductVariant['labelling']

  export type Props = {
    formFields: FormFields
    onSubmit(values: FormFields): void
    sku: string
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
  RadioButtonWrapper,
  FieldLabel,
  FieldDescription,
  FullWidthSection,
} = ProductStyles

export const LabellingFormWithoutContext: FC = () => {
  const { translate } = Translation.useTranslation()
  const { validateProductBarcode } = ProductApi.useValidateProductBarcode()
  const { data: labellingOptions } = useLabellingOptions()

  const validateBarcodeField = async (barcode: string) => {
    if (!validateEanCode(barcode)) {
      setFieldError('ean13Code', translate('productVariantLabelling.eanNotValid'))
    } else {
      try {
        const productWithSameBarcode = await validateProductBarcode(barcode)

        productWithSameBarcode.sku &&
          setFieldError('ean13Code', translate('productVariantLabelling.eanAlreadyAssigned'))
      } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        if (error.response?.status === 404) {
          setFieldError('ean13Code', undefined)
        }
      }
    }
  }

  const { values, errors, initialValues, setFieldValue, setFieldError, handleChange } =
    useFormikContext<LabellingForm.FormFields>()

  const handleTextAreaWithCharactersLimit = useCallback(
    (
      value: string,
      fieldName: 'countryOfOriginDescription' | 'legalTitle',
      charactersLimit: number,
    ) => {
      const newValue = value.length > 0 ? value : null

      setFieldValue(fieldName, newValue, false)

      if (value.length > charactersLimit) {
        setFieldError(
          fieldName,
          `${value.length - charactersLimit} ${translate(
            'productVariantLabelling.charactersOverLimit',
          )}`,
        )
      } else {
        setFieldError(fieldName, undefined)
      }
    },
    [setFieldError, setFieldValue, translate],
  )

  return (
    <>
      <FullWidthSection>
        <SectionHeading data-cy="section-heading">
          {translate('productVariantLabelling.variantLabelling')}
        </SectionHeading>
        <Notice
          title={translate('productVariantLabelling.allFieldsAreMandatory')}
          variant="critical"
        />
      </FullWidthSection>
      <Section>
        <SubsectionHeading>{translate('productVariantLabelling.productLabel')}</SubsectionHeading>
        <InputWrapper>
          <FieldLabel>{translate('productVariantLabelling.legalTitle')}</FieldLabel>
          <TextArea
            id="legalTitle"
            name="legalTitle"
            label=""
            value={values.legalTitle || ''}
            error={errors.legalTitle}
            onChange={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
              handleTextAreaWithCharactersLimit(e.currentTarget.value, 'legalTitle', 280)
            }
          />
          {!errors.legalTitle && (
            <FieldDescription>
              {`${280 - (values.legalTitle?.length || 0)} ${translate(
                'productVariantLabelling.charactersRemaining',
              )}`}
            </FieldDescription>
          )}
          {values.legalTitle !== initialValues.legalTitle && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('legalTitle', initialValues.legalTitle)}
              fromTop="24px"
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>{translate('productVariantLabelling.countryOfOriginDescription')}</FieldLabel>
          <FieldDescription>
            {translate('productVariantLabelling.whenCountryIsClaimed')}
          </FieldDescription>
          <TextArea
            id="countryOfOriginDescription"
            name="countryOfOriginDescription"
            label=""
            value={values.countryOfOriginDescription || ''}
            error={errors.countryOfOriginDescription}
            onChange={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
              handleTextAreaWithCharactersLimit(
                e.currentTarget.value,
                'countryOfOriginDescription',
                100,
              )
            }
          />
          {!errors.countryOfOriginDescription && (
            <FieldDescription>
              {`${100 - (values.countryOfOriginDescription?.length || 0)} ${translate(
                'productVariantLabelling.charactersRemaining',
              )}`}
            </FieldDescription>
          )}
          {values.countryOfOriginDescription !== initialValues.countryOfOriginDescription && (
            <DiscardButton
              type="button"
              onClick={() =>
                setFieldValue(
                  'countryOfOriginDescription',
                  initialValues.countryOfOriginDescription,
                )
              }
              fromTop="24px"
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <Dropdown
            id="storageConditions"
            label={translate('productVariantLabelling.instructionsForUse')}
            value={
              labellingOptions?.instructionsForUse.find(
                (option) => option.key === values.storageConditions,
              ) || null
            }
            options={labellingOptions?.instructionsForUse}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('storageConditions', option.key)
            }}
          />
          {values.storageConditions !== initialValues.storageConditions && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('storageConditions', initialValues.storageConditions)}
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>{translate('productVariantLabelling.useBy')}</FieldLabel>
          <FieldDescription>
            {translate('productVariantLabelling.requiredIfNeedsLabel')}
          </FieldDescription>
          <Dropdown
            id="useBy"
            label=""
            value={labellingOptions?.useBy.find((option) => option.key === values.useBy) || null}
            options={labellingOptions?.useBy}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('useBy', option.key)
            }}
          />
          {values.useBy !== initialValues.useBy && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('useBy', initialValues.useBy)}
              fromTop="24px"
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>{translate('productVariantLabelling.sellBy')}</FieldLabel>
          <FieldDescription>
            {translate('productVariantLabelling.requiredIfNeedsLabel')}
          </FieldDescription>
          <Dropdown
            id="sellBy"
            label=""
            value={labellingOptions?.sellBy.find((option) => option.key === values.sellBy) || null}
            options={labellingOptions?.sellBy}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('sellBy', option.key)
            }}
          />
          {values.sellBy !== initialValues.sellBy && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('sellBy', initialValues.sellBy)}
              fromTop="24px"
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>{translate('productVariantLabelling.productServes')}</FieldLabel>
          <Dropdown
            id="productServes"
            label=""
            value={
              labellingOptions?.productServes.find(
                (option) => option.key === values.productServes,
              ) || null
            }
            options={labellingOptions?.productServes}
            onChange={(option: { key: string; label: string }) => {
              setFieldValue('productServes', option.key)
            }}
          />
          {values.productServes !== initialValues.productServes && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('productServes', initialValues.productServes)}
              fromTop="12px"
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            {translate('productVariantLabelling.showProductWeight')}
            <InfoTooltip text={translate('productVariantLabelling.weightIsUnderDeclared')} />
          </FieldLabel>
          <RadioButtonWrapper data-cy="includeAverageWeightOnLabelYes">
            <RadioButton
              id=""
              name="includeAverageWeightOnLabel"
              label={translate('common.yes')}
              defaultChecked={values.includeAverageWeightOnLabel!}
              onChange={() => setFieldValue('includeAverageWeightOnLabel', true)}
            />
          </RadioButtonWrapper>
          <RadioButtonWrapper data-cy="includeAverageWeightOnLabelNo">
            <RadioButton
              id=""
              name="includeAverageWeightOnLabel"
              label={translate('common.no')}
              defaultChecked={!values.includeAverageWeightOnLabel!}
              onChange={() => setFieldValue('includeAverageWeightOnLabel', false)}
            />
          </RadioButtonWrapper>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            {translate('productVariantLabelling.showNutritionalInformation')}
            <InfoTooltip
              text={translate('productVariantLabelling.showNutritionalInformationTooltipText')}
            />
          </FieldLabel>
          <RadioButtonWrapper data-cy="includeNutritionalInformationOnLabelYes">
            <RadioButton
              id=""
              name="includeNutritionalInformationOnLabel"
              label={translate('common.yes')}
              defaultChecked={values.includeNutritionalInformationOnLabel!}
              onChange={() => setFieldValue('includeNutritionalInformationOnLabel', true)}
            />
          </RadioButtonWrapper>
          <RadioButtonWrapper data-cy="includeNutritionalInformationOnLabelNo">
            <RadioButton
              id=""
              name="includeNutritionalInformationOnLabel"
              label={translate('common.no')}
              defaultChecked={!values.includeNutritionalInformationOnLabel!}
              onChange={() => setFieldValue('includeNutritionalInformationOnLabel', false)}
            />
          </RadioButtonWrapper>
        </InputWrapper>
      </Section>

      <SectionDivider />

      <TurboChefSection
        values={values}
        labellingOptions={labellingOptions}
        setFieldValue={setFieldValue}
        initialValues={initialValues}
      />

      <SectionDivider />

      <Section>
        <SubsectionHeading>
          {translate('productVariantLabelling.productPackagingBarcode')}
        </SubsectionHeading>
        <InputWrapper>
          <StyledInput
            id="ean13Code"
            name="ean13Code"
            type="text"
            label={translate('productVariantLabelling.ean13Code')}
            value={values.ean13Code || ''}
            error={errors.ean13Code}
            onChange={handleChange}
            onBlur={() => values.ean13Code && validateBarcodeField(values.ean13Code)}
          />
          {values.ean13Code && values.ean13Code !== initialValues.ean13Code && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('ean13Code', initialValues.ean13Code)}
              fromTop={errors.ean13Code && '0px'}
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
      </Section>
    </>
  )
}

export const LabellingForm: FC<LabellingForm.Props> = ({ formFields, onSubmit, sku }) => {
  return (
    <EditForm formFields={formFields} onSubmit={onSubmit} sku={sku}>
      <LabellingFormWithoutContext />
    </EditForm>
  )
}
