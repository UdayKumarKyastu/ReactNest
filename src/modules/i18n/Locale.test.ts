import { Locale } from './Locale'

describe('Locale', () => {
  describe('Locale.MultilangString', () => {
    const multilangString = new Locale.MultilangString({
      'en-HK': 'EngliHongkongish',
      'en-US': 'American',
      'fr-FR': 'Francois',
      'en-GB': 'British',
      'zh-HK': 'Hongkongish',
    })

    it.each`
      lang       | expected
      ${'en-HK'} | ${multilangString['en-HK']}
      ${'en-US'} | ${multilangString['en-US']}
      ${'fr-FR'} | ${multilangString['fr-FR']}
      ${'en-GB'} | ${multilangString['en-GB']}
      ${'zh-HK'} | ${multilangString['zh-HK']}
    `(
      'Returns $expected for provided lang: $lang',
      ({ lang, expected }: { lang: Locale.Lang; expected: string }) => {
        expect(multilangString.getTranslated(lang)).toBe(expected)
      },
    )
  })
})
