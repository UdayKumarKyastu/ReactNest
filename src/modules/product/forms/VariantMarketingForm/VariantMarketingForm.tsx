import React, { FC, useContext, useMemo } from 'react'
import { isEqual } from 'lodash'
import { useFormikContext } from 'formik'
import { Translation } from '../../../i18n/Translation'
import { MultiLocaleProductInput } from '../../components/MultiLocaleProductInput/MultiLocaleProductInput'
import { Locale } from '../../../i18n/Locale'
import { Datepicker } from '../../../common/components/Datepicker/Datepicker'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { DiscardIcon } from '../../../../icons/Discard'
import { ProductStyles } from '../../pages/styles'
import { EditForm } from '../EditForm/EditForm'
import { HowToDisplayOptionsContext } from '../../HowToDisplayOptionsContext'
import CircleQuestion from '../../../../icons/CircleQuestion'
import styles from './VariantMarketingForm.styles'
import { CountryCode } from '../../../../shared/model/country-code'

export declare namespace VariantMarketingForm {
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
    formFields: FormFields
    onSubmit(values: FormFields): void
    sku: string
    countryCode: CountryCode
  }
}

const {
  SectionDivider,
  SectionHeading,
  StyledCheckbox,
  Section,
  SubsectionHeading,
  DiscardButton,
  InputWrapper,
  StyledInput,
} = ProductStyles

export const VariantMarketingFormWithoutContext = ({
  countryCode,
}: {
  countryCode: CountryCode
}) => {
  const { translate } = Translation.useTranslation()
  const { values, initialValues, setFieldValue } =
    useFormikContext<VariantMarketingForm.FormFields>()
  const { locale } = Locale.useLocale()
  const howToDisplayOptions = useContext(HowToDisplayOptionsContext.Context)

  const editInHGOnlyTooltip = useMemo(() => {
    const { Tooltip } = styles

    return (
      <Tooltip text={translate('editTabCommon.onlyModifiableInHamiltonGrant')}>
        <CircleQuestion
          height={'16px'}
          aria-label={translate('editTabCommon.onlyModifiableInHamiltonGrant')}
        />
      </Tooltip>
    )
  }, [translate])

  return (
    <>
      <Section data-cy="variant-marketing-name-section">
        <SectionHeading data-cy="section-heading">
          {translate('productPage.variantMarketing')}
        </SectionHeading>
        <SubsectionHeading>
          {translate('productVariantMarketing.productDescriptions')}
        </SubsectionHeading>
        <MultiLocaleProductInput
          id="variantName"
          name="variantName"
          label={translate('productPage.fields.variantMarketingName')}
          value={values.variantName}
          initialValue={initialValues.variantName}
          locales={Locale.LocalesListByCountryCode[countryCode]}
          type="text"
          countryCode={countryCode}
          onChange={(values) => setFieldValue('variantName', values)}
        />
      </Section>

      <SectionDivider />

      <Section data-cy="variant-marketing-description-section">
        <MultiLocaleProductInput
          id="variantDescription"
          name="variantDescription"
          label={translate('productPage.fields.variantMarketingDescription')}
          value={values.variantDescription}
          initialValue={initialValues.variantDescription}
          locales={Locale.LocalesListByCountryCode[countryCode]}
          type="textarea"
          countryCode={countryCode}
          onChange={(values) => setFieldValue('variantDescription', values)}
          isShowAllButtonVisible={countryCode === CountryCode.FR}
        />
      </Section>

      <SectionDivider />

      <Section data-cy="is-product-available-for-section">
        <SubsectionHeading>
          {translate('productVariantMarketing.isProductAvailableFor')}
        </SubsectionHeading>
        <StyledCheckbox
          id="availableForCollection"
          label={translate('productVariantMarketing.clickAndCollect')}
          name="availableForCollection"
          defaultChecked={values.availableForCollection}
          onChange={() => setFieldValue('availableForCollection', !values.availableForCollection)}
        />
        <StyledCheckbox
          id="availableForPretDelivers"
          label={translate('productVariantMarketing.pretDelivers')}
          name="availableForPretDelivers"
          defaultChecked={values.availableForPretDelivers}
          onChange={() =>
            setFieldValue('availableForPretDelivers', !values.availableForPretDelivers)
          }
        />
        <StyledCheckbox
          id="availableForOutpost"
          label={translate('productVariantMarketing.outposts')}
          name="availableForOutpost"
          defaultChecked={values.availableForOutposts}
          onChange={() => setFieldValue('availableForOutposts', !values.availableForOutposts)}
        />
      </Section>

      <SectionDivider />

      <Section data-cy="customer-visibility-section">
        <SubsectionHeading>
          {translate('productVariantMarketing.customerVisibility')}
        </SubsectionHeading>
        <StyledCheckbox
          id="visibleOnBrandWebsite"
          label={translate('productVariantMarketing.visibleOnBrandWebsite')}
          name="visibleOnBrandWebsite"
          defaultChecked={values.visibleOnBrandWebsite}
          onChange={() => setFieldValue('visibleOnBrandWebsite', !values.visibleOnBrandWebsite)}
        />
        <StyledCheckbox
          id="visibleOnDeliveryWebsite"
          label={translate('productVariantMarketing.visibleOnPretDeliversWebsite')}
          name="visibleOnDeliveryWebsite"
          defaultChecked={values.visibleOnDeliveryWebsite}
          onChange={() =>
            setFieldValue('visibleOnDeliveryWebsite', !values.visibleOnDeliveryWebsite)
          }
        />
      </Section>

      <SectionDivider />

      <Section data-cy="website-release-dates-section">
        <SubsectionHeading>
          {translate('productVariantMarketing.websiteReleaseDates')}
        </SubsectionHeading>
        <InputWrapper data-cy="make-product-visible-on-wrapper">
          <StyledInput
            id="liveFrom"
            name="makeProductVisibleOn"
            label={translate('productVariantMarketing.liveFrom')}
            labelIcon={editInHGOnlyTooltip}
            value={
              values.liveFrom
                ? new Intl.DateTimeFormat(locale).format(new Date(values.liveFrom!))
                : ''
            }
            type="text"
            disabled
          />
        </InputWrapper>
        <InputWrapper data-cy="delist-product-on-wrapper">
          <StyledInput
            id="liveTo"
            name="deListProductOn"
            label={translate('productVariantMarketing.liveTo')}
            labelIcon={editInHGOnlyTooltip}
            value={
              values.liveTo ? new Intl.DateTimeFormat(locale).format(new Date(values.liveTo!)) : ''
            }
            type="text"
            disabled
          />
        </InputWrapper>
      </Section>

      <SectionDivider />

      <Section data-cy="product-display-section">
        <SubsectionHeading>{translate('productVariantMarketing.productDisplay')}</SubsectionHeading>
        <StyledCheckbox
          id="isChefSpecial"
          label={translate('productVariantMarketing.displayAsAChefsSpecial')}
          name="isChefSpecial"
          defaultChecked={values.isChefSpecial}
          onChange={() => setFieldValue('isChefSpecial', !values.isChefSpecial)}
        />
        <StyledCheckbox
          id="isDisplayed"
          label={translate('productVariantMarketing.displayAsANewProduct')}
          name="isDisplayed"
          defaultChecked={values.isDisplayed}
          onChange={() => setFieldValue('isDisplayed', !values.isDisplayed)}
        />
        <InputWrapper data-cy="product-display-new-till-wrapper">
          <Datepicker
            id="newUntilDate"
            label={translate('productVariantMarketing.displaysNewTill')}
            format="dd/MM/yyyy"
            value={values.displayAsNewUntil ? new Date(values.displayAsNewUntil!) : null}
            onChange={(value) => setFieldValue('displayAsNewUntil', value)}
            locale={locale}
          />
          {values.displayAsNewUntil !== initialValues.displayAsNewUntil && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('displayAsNewUntil', initialValues.displayAsNewUntil)}
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
      </Section>

      <SectionDivider />

      <Section data-cy="pret-delivers-section">
        <SubsectionHeading>{translate('productVariantMarketing.pretDelivers')}</SubsectionHeading>
        <StyledCheckbox
          id="availableAllDay"
          label={translate('productVariantMarketing.availableAllDay')}
          name="availableAllDay"
          defaultChecked={values.availableAllDay}
          onChange={() => setFieldValue('availableAllDay', !values.availableAllDay)}
        />
        <StyledCheckbox
          id="availableForLunch"
          label={translate('productVariantMarketing.availableForLunch')}
          name="availableForLunch"
          defaultChecked={values.availableForLunch}
          onChange={() => setFieldValue('availableForLunch', !values.availableForLunch)}
        />
      </Section>

      <SectionDivider />

      <Section data-cy="in-store-section">
        <SubsectionHeading>{translate('productVariantMarketing.inStore')}</SubsectionHeading>
        <InputWrapper>
          <Dropdown
            id="howToDisplay"
            label={translate('productVariantMarketing.howToDisplay')}
            value={howToDisplayOptions.filter((option) => values.howToDisplay.includes(option.key))}
            options={howToDisplayOptions}
            onChange={(options: Array<{ value: string; label: string }>) => {
              setFieldValue(
                'howToDisplay',
                options.map((option) => option.value),
              )
            }}
            isMulti
          />
          {!isEqual(values.howToDisplay, initialValues.howToDisplay) && (
            <DiscardButton
              type="button"
              onClick={() => setFieldValue('howToDisplay', initialValues.howToDisplay)}
            >
              <DiscardIcon size={18} />
            </DiscardButton>
          )}
        </InputWrapper>
      </Section>
    </>
  )
}

export const VariantMarketingForm: FC<VariantMarketingForm.Props> = ({
  formFields,
  onSubmit,
  countryCode,
  sku,
}) => {
  return (
    <EditForm formFields={formFields} onSubmit={onSubmit} sku={sku}>
      <VariantMarketingFormWithoutContext countryCode={countryCode} />
    </EditForm>
  )
}
