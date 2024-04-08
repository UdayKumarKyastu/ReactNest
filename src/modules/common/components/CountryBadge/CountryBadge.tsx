import React from 'react'
import { FlagIcon } from '../../../../icons/FlagIcon'
import { CountryBadgeStyles } from '../../../common/components/CountryBadge/CountryBadge.styles'

const { Wrapper, Label } = CountryBadgeStyles

interface Props {
  countryCode: keyof typeof FlagIcon
}

const CountryBadge = ({ countryCode }: Props) => {
  const Flag = FlagIcon[countryCode]

  return (
    <Wrapper>
      <Flag size={14} />
      <Label>{countryCode.toUpperCase()}</Label>
    </Wrapper>
  )
}

export default CountryBadge
