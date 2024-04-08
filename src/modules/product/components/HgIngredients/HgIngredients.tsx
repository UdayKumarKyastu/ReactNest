import React from 'react'
import { MultiLangText } from '../../../common/components/MultiLangText/MultiLangText'
import { Locale } from '../../../i18n/Locale'
import { HgIngredientsStyles } from './HgIngredients.styles'
import { Language } from '../../../../shared/model/language'

export declare namespace HgIngredients {
  export type Props = {
    ingredients: Locale.MultilangString
  } & Omit<MultiLangText.Props, 'value' | 'defaultLocale'>
}

const { Wrapper } = HgIngredientsStyles

export const HgIngredients = ({ ingredients, ...props }: HgIngredients.Props) => {
  return (
    <Wrapper>
      <MultiLangText
        customValueRender={(v) => <span dangerouslySetInnerHTML={{ __html: v }} />}
        value={ingredients}
        locales={[Language.EN_US, Language.FR_FR, Language.EN_HK]}
        defaultLocale={Language.EN_GB}
        {...props}
      />
    </Wrapper>
  )
}
