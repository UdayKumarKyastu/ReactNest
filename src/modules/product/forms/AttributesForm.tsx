import { FC, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { Notice } from '@pretamanger/component-library'
import { ProductStyles } from '../pages/styles'
import { Translation } from '../../i18n/Translation'
import { BaristaVariantAttributes } from '../model/barista-attributes'
import { EditForm, FormStatus } from './EditForm/EditForm'

export declare namespace AttributesForm {
  export type FormFields = BaristaVariantAttributes

  export type Props = {
    formFields: FormFields
    onSubmit(values: FormFields): void
    sku: string
    getExistingCombinationVariantSku(values: FormFields): string | null
  }
}

const attributesKeys: Array<keyof BaristaVariantAttributes> = [
  'withDecafPods',
  'withoutMilk',
  'withSemiSkimmedMilk',
  'withSkimmedMilk',
  'withOatMilk',
  'withRiceCoconutMilk',
  'withSoyMilk',
]

const { SectionHeading, StyledCheckbox, FullWidthSection, SubsectionHeading } = ProductStyles

export const AttributesFormWithoutContext: FC<{
  getExistingCombinationVariantSku(values: AttributesForm.FormFields): string | null
}> = ({ getExistingCombinationVariantSku }) => {
  const { translate } = Translation.useTranslation()
  const { values, setFieldValue, setStatus } = useFormikContext<AttributesForm.FormFields>()
  const [existingCombinationVariantSku, setExistingCombinationVariantSku] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const sku = getExistingCombinationVariantSku(values)
    setExistingCombinationVariantSku(sku)

    sku ? setStatus(FormStatus.INVALID) : setStatus(FormStatus.VALID)
  }, [getExistingCombinationVariantSku, setStatus, values])

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantAttributes.variantAttributes')}
      </SectionHeading>
      {existingCombinationVariantSku && (
        <Notice
          title={translate('productVariantAttributes.attributesCombinationExists', {
            sku: existingCombinationVariantSku!,
          })}
          variant="critical"
        />
      )}
      <SubsectionHeading>{`${translate(
        'productVariantAttributes.drinkIsMade',
      )}:`}</SubsectionHeading>
      {values &&
        attributesKeys.map((key) => {
          return (
            <StyledCheckbox
              key={key}
              id={key}
              label={translate(`productVariantAttributes.${key}`)}
              name={key}
              isSelected={values[key]}
              defaultChecked={values[key]}
              onChange={() => setFieldValue(key, !values[key])}
            />
          )
        })}
    </FullWidthSection>
  )
}

export const AttributesForm: FC<AttributesForm.Props> = ({
  formFields,
  onSubmit,
  sku,
  getExistingCombinationVariantSku,
}) => {
  return (
    <EditForm formFields={formFields} onSubmit={onSubmit} sku={sku}>
      <AttributesFormWithoutContext
        getExistingCombinationVariantSku={getExistingCombinationVariantSku}
      />
    </EditForm>
  )
}
