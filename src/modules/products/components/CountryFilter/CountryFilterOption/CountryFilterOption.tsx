import React from 'react'
import { OptionProps, components } from 'react-select'
import { CountryCode } from '../../../../../shared/model/country-code'
import { FlagWithText } from '../../../../common/components/FlagWithText/FlagWithText'

const CountryFilterOption = (props: OptionProps<any, boolean>) => {
  const countryCode = (props.data.value || 'ALL') as CountryCode

  return (
    <components.Option {...props}>
      <FlagWithText countryCode={countryCode} id={`country-filter-option-${countryCode}`} />
    </components.Option>
  )
}

export default CountryFilterOption
