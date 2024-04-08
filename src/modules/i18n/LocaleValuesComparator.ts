import { Locale } from './Locale'

export abstract class LocaleValuesComparator {
  static getDifferencesCount(locale1: Locale.MultilangString, locale2: Locale.MultilangString) {
    return Object.keys(locale1).reduce((changesCount, lang) => {
      const parsedLang = lang as Locale.Lang

      const locale1field = locale1[parsedLang]
      const locale2field = locale2[parsedLang]

      return locale1field !== locale2field ? changesCount + 1 : changesCount
    }, 0)
  }
}
