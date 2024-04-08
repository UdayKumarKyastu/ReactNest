import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { FlagIcon } from '../../../../icons/FlagIcon'
import tw from 'twin.macro'
import { Locale } from '../../../i18n/Locale'
import { FlagWithTextStyles } from './FlagWithText.styles'
import { CountryCode } from '../../../../shared/model/country-code'

export declare namespace FlagWithText {
  export type Props = PropsWithChildren<
    {
      locale?: Locale.Lang
      countryCode?: CountryCode
      printLabel?: boolean
    } & HTMLAttributes<HTMLSpanElement>
  >
}

const { Wrapper } = FlagWithTextStyles

export const FlagWithText = ({
  locale,
  countryCode,
  printLabel = true,
  children,
  id,
  ...props
}: FlagWithText.Props) => {
  const Flag = countryCode ? FlagIcon[countryCode] : Locale.LocaleToIconAndLabelMap[locale!].icon

  return (
    <Wrapper {...props}>
      <Flag id={id} css={tw`inline-block mr-2`} size={20} />
      <span>
        {countryCode ? countryCode.toUpperCase() : `${locale?.toUpperCase()}: `}
        {children}
      </span>
    </Wrapper>
  )
}
