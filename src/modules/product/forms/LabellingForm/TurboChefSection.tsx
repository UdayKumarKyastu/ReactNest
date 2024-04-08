import React from 'react'
import { Labelling } from 'src/modules/product/model/labelling'
import { RadioButton } from '@pretamanger/component-library'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { DiscardIcon } from '../../../../icons/Discard'
import { ProductStyles } from '../../pages/styles'
import { Translation } from '../../../i18n/Translation'
import { LabellingOptions } from '../../../product/model/product'

const { Section, SubsectionHeading, DiscardButton, InputWrapper, RadioButtonWrapper, FieldLabel } =
  ProductStyles

interface Props {
  values: Labelling
  labellingOptions?: LabellingOptions
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  initialValues: Labelling
}

const TurboChefSection = ({ values, labellingOptions, setFieldValue, initialValues }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Section>
      <SubsectionHeading>
        {translate('productVariantLabelling.turboChefLabelling')}
      </SubsectionHeading>
      <InputWrapper>
        <FieldLabel>{translate('productVariantLabelling.canBeCookedInTurboChef')}</FieldLabel>
        <RadioButtonWrapper data-cy="canBeCookedInTurboChefYes">
          <RadioButton
            id=""
            name="canBeCookedInTurboChef"
            label={translate('common.yes')}
            defaultChecked={values.canBeCookedInTurboChef!}
            onChange={() => setFieldValue('canBeCookedInTurboChef', true)}
          />
        </RadioButtonWrapper>
        <RadioButtonWrapper data-cy="canBeCookedInTurboChefNo">
          <RadioButton
            id=""
            name="canBeCookedInTurboChef"
            label={translate('common.no')}
            defaultChecked={!values.canBeCookedInTurboChef!}
            onChange={() => setFieldValue('canBeCookedInTurboChef', false)}
          />
        </RadioButtonWrapper>
      </InputWrapper>

      <InputWrapper>
        <FieldLabel>{translate('productVariantLabelling.useByTurboChef')}</FieldLabel>
        <Dropdown
          id="useByTurboChef"
          label=""
          value={
            labellingOptions?.useBy.find((option) => option.key === values.useByTurboChef) || null
          }
          options={labellingOptions?.useBy}
          onChange={(option: { key: string; label: string }) => {
            setFieldValue('useByTurboChef', option.key)
          }}
        />
        {values.useByTurboChef !== initialValues.useByTurboChef && (
          <DiscardButton
            type="button"
            onClick={() => setFieldValue('useByTurboChef', initialValues.useByTurboChef)}
            fromTop="24px"
          >
            <DiscardIcon size={18} />
          </DiscardButton>
        )}
      </InputWrapper>

      <InputWrapper>
        <FieldLabel>{translate('productVariantLabelling.sellByTurboChef')}</FieldLabel>
        <Dropdown
          id="sellByTurboChef"
          label=""
          value={
            labellingOptions?.sellBy.find((option) => option.key === values.sellByTurboChef) || null
          }
          options={labellingOptions?.sellBy}
          onChange={(option: { key: string; label: string }) => {
            setFieldValue('sellByTurboChef', option.key)
          }}
        />
        {values.sellByTurboChef !== initialValues.sellByTurboChef && (
          <DiscardButton
            type="button"
            onClick={() => setFieldValue('sellByTurboChef', initialValues.sellByTurboChef)}
            fromTop="24px"
          >
            <DiscardIcon size={18} />
          </DiscardButton>
        )}
      </InputWrapper>
    </Section>
  )
}

export default TurboChefSection
