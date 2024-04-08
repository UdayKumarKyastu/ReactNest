import { Locale } from './Locale'
import { LocaleValuesComparator } from './LocaleValuesComparator'

describe('LocaleValuesComparator', () => {
  it('Can compare 2 empty locales and count is 0', () => {
    const locale1: Locale.MultilangString = {
      'en-HK': '',
      'zh-HK': '',
      'en-US': '',
      'en-GB': '',
      'fr-FR': '',
    }

    const locale2: Locale.MultilangString = {
      'en-HK': '',
      'zh-HK': '',
      'en-US': '',
      'en-GB': '',
      'fr-FR': '',
    }

    expect(LocaleValuesComparator.getDifferencesCount(locale1, locale2)).toBe(0)
  })

  it('Compare empty locale to partially filled locale', () => {
    const locale1: Locale.MultilangString = {
      'en-HK': '',
      'zh-HK': '',
      'en-US': '',
      'en-GB': '',
      'fr-FR': '',
    }

    const locale2: Locale.MultilangString = {
      'en-HK': 'Foo',
      'zh-HK': '',
      'en-US': 'Bar',
      'en-GB': '',
      'fr-FR': 'Baz',
    }

    expect(LocaleValuesComparator.getDifferencesCount(locale1, locale2)).toBe(3)
  })

  it('Can compare 2 filled locales properly', () => {
    const locale1: Locale.MultilangString = {
      'en-HK': 'Foo',
      'zh-HK': 'Foo',
      'en-US': 'Bar',
      'en-GB': 'Bar',
      'fr-FR': 'Baz',
    }

    const locale2: Locale.MultilangString = {
      'en-HK': 'Foo1',
      'zh-HK': 'Foo',
      'en-US': 'Bar1',
      'en-GB': 'Bar',
      'fr-FR': 'Baz',
    }

    expect(LocaleValuesComparator.getDifferencesCount(locale1, locale2)).toBe(2)
  })
})
