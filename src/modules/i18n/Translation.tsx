import React, { useCallback } from 'react'
import get from 'lodash/get'
import translations from '../../../translations.json'
import { renderToStaticMarkup } from 'react-dom/server'
import { Locale } from './Locale'

type Tokens = Record<string, string | number | JSX.Element>

export declare namespace Translation {
  export type TranslationFunc = (key: string, tokens?: Tokens) => string
  export type TranslationWithHtmlFunc = (key: string, tokens?: Tokens) => JSX.Element
}

/**
 * TODO: Use translation library instead
 */
export abstract class Translation {
  private static TEMPLATE = /{{(.*?)}}/g

  private static substituteWithHtml = (s = '', tokens: Tokens = {}): JSX.Element => {
    const parts = s.split(' ')

    Object.keys(tokens).forEach((token) => {
      const tokenIndex = parts.indexOf(`{{${token}}}`)

      parts[tokenIndex] = renderToStaticMarkup(tokens[token] as JSX.Element)
    })

    return <span dangerouslySetInnerHTML={{ __html: parts.join(' ') }} />
  }

  private static substitute = (s = '', tokens: Tokens = {}): string => {
    return s.replace(Translation.TEMPLATE, (original, token) => `${tokens[token] ?? original}`)
  }

  static getTranslation = (key: string, locale: string, tokens: Tokens = {}) => {
    return Translation.substitute(get(translations, `${locale}.${key}`), tokens)
  }

  static getTranslationWithHtml = (key: string, locale: string, tokens: Tokens = {}) => {
    return Translation.substituteWithHtml(get(translations, `${locale}.${key}`), tokens)
  }

  static useTranslation(): {
    translate: Translation.TranslationFunc
    translateWithHtml: Translation.TranslationWithHtmlFunc
  } {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = Locale.useLocale()

    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      translate: useCallback(
        (key: string, tokens: Tokens = {}): string => {
          return Translation.getTranslation(key, locale, tokens)
        },
        [locale],
      ),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      translateWithHtml: useCallback(
        (key: string, tokens: Tokens = {}): JSX.Element => {
          return Translation.getTranslationWithHtml(key, locale, tokens)
        },
        [locale],
      ),
    }
  }
}
