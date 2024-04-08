import React from 'react'

import { LocaleInputAdornmentStyles } from './LocaleInputAdornment.styles'
import { Locale } from '../../../i18n/Locale'

export declare namespace LocaleInputAdornment {
  export type Props = {
    locale: string
  }
}

const { Wrapper } = LocaleInputAdornmentStyles

export const LocaleInputAdornment = ({ locale }: LocaleInputAdornment.Props) => {
  const { icon: Flag } = Locale.LocaleToIconAndLabelMap[locale]

  return (
    <Wrapper>
      {Flag && <Flag size={20} />}
      <span>{locale.toUpperCase()}</span>
    </Wrapper>
  )
}
