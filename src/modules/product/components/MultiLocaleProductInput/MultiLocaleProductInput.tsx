import { ChangeEvent, useState } from 'react'
import { MultiLocaleProductInputStyles } from './MultiLocaleProductInput.styles'
import { Locale } from '../../../i18n/Locale'
import { Translation } from '../../../i18n/Translation'
import { LocaleInputAdornment } from '../../../common/components/LocaleInputAdornment/LocaleInputAdornment'
import { DiscardIcon } from '../../../../icons/Discard'
import { CountryCode } from '../../../../shared/model/country-code'

export declare namespace MultiLocaleProductInput {
  export type Type = 'text' | 'textarea'
  export type Props = {
    id: string
    name: string
    label: string
    value: Locale.MultilangString
    type: Type
    locales: Locale.Lang[]
    countryCode: CountryCode
    isShowAllButtonVisible?: boolean
    disabled?: boolean
    initialValue?: Locale.MultilangString
    hidden?: boolean
    onChange?(value: Locale.MultilangString): void
  }
}

const {
  Wrapper,
  ShowLanguagesButton,
  StyledInput,
  StyledTextArea,
  LanguageInputList,
  LocaleInputWrapper,
  DiscardButton,
} = MultiLocaleProductInputStyles

export const MultiLocaleProductInput = ({
  id,
  name,
  label,
  value,
  initialValue,
  type,
  locales,
  disabled,
  countryCode,
  hidden = false,
  onChange,
}: MultiLocaleProductInput.Props) => {
  const { translate } = Translation.useTranslation()

  const locale = Locale.DefaultLocaleByCountryCode[countryCode]
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  const currentLocaleValue = value?.[locale]

  const toggleLanguages = () => {
    setShowAllLanguages(!showAllLanguages)
  }

  const handleDiscardInputChanges = (locale: keyof Locale.MultilangString) => {
    onChange?.({
      ...value,
      [locale]: initialValue?.[locale],
    })
  }

  const InputComponent = type === 'textarea' ? StyledTextArea : StyledInput

  return (
    <Wrapper isHidden={hidden}>
      <LocaleInputWrapper data-cy="language-gb-field">
        <InputComponent
          id={id}
          adornment={
            <LocaleInputAdornment locale={Locale.DefaultLocaleByCountryCode[countryCode]} />
          }
          label={label}
          name={`${name}.${locale}`}
          value={currentLocaleValue}
          type={type}
          disabled={disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange?.({
              ...value!,
              [locale]: e.target.value,
            })
          }
        />
        {currentLocaleValue !== initialValue?.[locale] && (
          <DiscardButton type="button" onClick={() => handleDiscardInputChanges(locale)}>
            <DiscardIcon size={18} />
          </DiscardButton>
        )}
      </LocaleInputWrapper>

      {locales.length > 0 && (
        <ShowLanguagesButton type="button" onClick={toggleLanguages}>
          {translate(
            showAllLanguages ? 'productField.hideAllLanguages' : 'productField.showAllLanguages',
            { count: locales.length },
          )}
        </ShowLanguagesButton>
      )}

      {showAllLanguages && (
        <LanguageInputList data-cy="languages-list">
          {locales.map((locale) => {
            return (
              <LocaleInputWrapper key={`${name}.${locale}`} data-cy="language-input">
                <InputComponent
                  adornment={<LocaleInputAdornment locale={locale} />}
                  label={label}
                  hideLabel
                  id={`${id}.${locale}`}
                  key={`${name}.${locale}`}
                  name={`${name}.${locale}`}
                  value={value?.[locale]}
                  type={type}
                  disabled={disabled}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange &&
                    onChange({
                      ...value!,
                      [locale]: e.target.value,
                    })
                  }
                />
                {value?.[locale] !== initialValue?.[locale] && (
                  <DiscardButton
                    type="button"
                    onClick={() => handleDiscardInputChanges(locale)}
                    withoutLabel
                  >
                    <DiscardIcon size={18} />
                  </DiscardButton>
                )}
              </LocaleInputWrapper>
            )
          })}
        </LanguageInputList>
      )}
    </Wrapper>
  )
}
