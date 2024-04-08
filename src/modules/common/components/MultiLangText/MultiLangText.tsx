import React, { ReactNode, HTMLAttributes, useState } from 'react'
import { Locale } from '../../../i18n/Locale'
import { Translation } from '../../../i18n/Translation'
import { MultiLangTextStyles } from './MultiLangText.styles'

export declare namespace MultiLangText {
  export type Props = {
    value: Locale.MultilangString
    defaultLocale: Locale.Lang
    draftValue?: Locale.MultilangString
    locales?: Locale.Lang[]
    isExpanded?: boolean
    customValueRender?(value: string): ReactNode
  } & HTMLAttributes<HTMLDivElement>
}

const { FlagWithTextBlock, ShowLanguagesButton } = MultiLangTextStyles

export const MultiLangText = ({
  value,
  defaultLocale,
  draftValue,
  locales = [],
  isExpanded = false,
  customValueRender = (v: string) => v,
  ...props
}: MultiLangText.Props) => {
  const [showAllLanguages, setShowAllLanguages] = useState(isExpanded)
  const { translate } = Translation.useTranslation()

  return (
    <div {...props}>
      <FlagWithTextBlock locale={defaultLocale} data-cy="language-field" noBorder>
        {customValueRender(value?.[defaultLocale])}
      </FlagWithTextBlock>
      {locales.length > 0 && !isExpanded && (
        <ShowLanguagesButton type="button" onClick={() => setShowAllLanguages((show) => !show)}>
          {translate(
            showAllLanguages ? 'productField.hideAllLanguages' : 'productField.showAllLanguages',
            { count: locales.length },
          )}
        </ShowLanguagesButton>
      )}
      {showAllLanguages && (
        <div data-cy="languages-list">
          {locales.map((locale) => (
            <FlagWithTextBlock locale={locale} key={value[locale]} data-cy="language-field">
              {customValueRender(value[locale])}
            </FlagWithTextBlock>
          ))}
        </div>
      )}
    </div>
  )
}
