import { Locale } from './Locale'

export abstract class LocaleMock {
  static createMultiLangMock = (value: string, withoutSuffix = false): Locale.MultilangString => ({
    'en-US': withoutSuffix ? value : `${value}-en-US`,
    'en-GB': withoutSuffix ? value : `${value}-en-GB`,
    'zh-HK': withoutSuffix ? value : `${value}-zh-HK`,
    'en-HK': withoutSuffix ? value : `${value}-en-HK`,
    'fr-FR': withoutSuffix ? value : `${value}-fr-FR`,
  })
}
