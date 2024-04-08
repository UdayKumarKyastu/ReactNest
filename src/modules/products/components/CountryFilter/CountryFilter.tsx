import React, { useMemo } from 'react'
import { Translation } from '../../../i18n/Translation'
import { CountryFilterStyles } from './CountryFilter.styles'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import CountryFilterOption from './CountryFilterOption/CountryFilterOption'
import CountryFilterValue from './CountryFilterValue/CountryFilterValue'

const { Root, Label, SelectWrapper } = CountryFilterStyles

interface Props {
  value?: string
  onChange: (countryCode: string) => void
}

const CountryFilter = ({ value, onChange }: Props) => {
  const { translate } = Translation.useTranslation()

  const selectOptions = useMemo(() => {
    return [
      { key: '1', value: '', label: translate('productSearch.countryFilter.all') },
      { key: '2', value: 'UK', label: translate('productSearch.countryFilter.uk') },
      { key: '3', value: 'US', label: translate('productSearch.countryFilter.us') },
      { key: '4', value: 'FR', label: translate('productSearch.countryFilter.fr') },
      { key: '5', value: 'HK', label: translate('productSearch.countryFilter.hk') },
    ]
  }, [translate])

  const dropdownComponents = {
    Option: CountryFilterOption,
    SingleValue: CountryFilterValue,
  }

  return (
    <Root>
      <Label>{translate('productSearch.countryFilter.title')}</Label>

      <SelectWrapper>
        <Dropdown
          id="country-filter"
          options={selectOptions}
          value={selectOptions.find((option) => option.value === value)}
          onChange={(option: { value: string; label: string }) => onChange(option!.value!)}
          customExternalComponents={dropdownComponents}
        />
      </SelectWrapper>
    </Root>
  )
}

export default CountryFilter
