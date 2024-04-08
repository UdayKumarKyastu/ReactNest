// eslint-disable-next-line max-classes-per-file
import { useContext } from 'react'
import { FlagIcon } from '../../icons/FlagIcon'
import { LocaleProvider } from './LocaleProvider'
import { CountryCode } from '../../shared/model/country-code'
import { Language } from '../../shared/model/language'
export declare namespace Locale {
  export type Lang = 'en-GB' | 'en-US' | 'fr-FR' | 'en-HK' | 'zh-HK'

  export type MultilangString = Record<Lang, string>
}

export abstract class Locale {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  static useLocale = () => useContext(LocaleProvider.Context)

  static readonly localeLangList = ['en-GB', 'en-US', 'fr-FR', 'en-HK', 'zh-HK'] as const

  static MultilangString = class {
    ['en-GB']!: string;
    ['zh-HK']!: string;
    ['fr-FR']!: string;
    ['en-US']!: string;
    ['en-HK']!: string

    constructor(value: Locale.MultilangString | Record<string, string>) {
      Object.assign(this, value)
    }

    getTranslated(locale: Locale.Lang) {
      return this[locale]
    }

    static generateFrom(value: string) {
      return new Locale.MultilangString({
        'en-GB': value,
        'fr-FR': value,
        'en-US': value,
        'zh-HK': value,
        'en-HK': value,
      })
    }
  }

  static CountryCodeToLocale: Record<CountryCode, Locale.Lang> = {
    [CountryCode.UK]: 'en-GB',
    [CountryCode.US]: 'en-US',
    [CountryCode.FR]: 'fr-FR',
    [CountryCode.HK]: 'zh-HK',
  }

  static LocalesListByCountryCode: Record<CountryCode, Language[]> = {
    [CountryCode.UK]: [],
    [CountryCode.US]: [],
    [CountryCode.FR]: [Language.FR_FR],
    [CountryCode.HK]: [Language.EN_US, Language.FR_FR, Language.EN_HK, Language.ZH_HK],
  }

  static DefaultLocaleByCountryCode: Record<CountryCode, Language> = {
    [CountryCode.UK]: Language.EN_GB,
    [CountryCode.US]: Language.EN_US,
    [CountryCode.FR]: Language.EN_GB,
    [CountryCode.HK]: Language.EN_GB,
  }

  static LocaleToIconAndLabelMap: Record<
    string,
    {
      icon: FlagIcon
      label: string
    }
  > = {
    'en-GB': {
      icon: FlagIcon.UK,
      label: 'EN-GB',
    },
    'fr-FR': {
      icon: FlagIcon.FR,
      label: 'FR-FR',
    },
    'en-US': {
      icon: FlagIcon.US,
      label: 'EN-US',
    },
    'en-HK': {
      icon: FlagIcon.HK,
      label: 'EN-HK',
    },
    'zh-HK': {
      icon: FlagIcon.HK,
      label: 'ZN-HK',
    },
  }
}
