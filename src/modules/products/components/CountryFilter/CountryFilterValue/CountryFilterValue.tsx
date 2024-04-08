import React from 'react'
import { SingleValueProps, components } from 'react-select'
import { FlagWithText } from '../../../../common/components/FlagWithText/FlagWithText'
import { CountryCode } from 'src/shared/model/country-code'

const CountryFilterValue = (props: SingleValueProps<any>) => {
  const countryCode = (props.data.value || 'ALL') as CountryCode

  return (
    <components.SingleValue {...props}>
      <FlagWithText countryCode={countryCode} id={`country-filter-value-${countryCode}`} />
    </components.SingleValue>
  )
}

export default CountryFilterValue
