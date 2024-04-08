import { createContext, PropsWithChildren, useState } from 'react'
import { Locale } from './Locale'

export declare namespace LocaleProvider {
  export type LocaleContextValue = {
    locale: Locale.Lang
    switchLocale: (newLocale: Locale.Lang) => void
  }
}

const defaultLocale = 'en-GB' as const

const Provider = ({ children }: PropsWithChildren<{}>) => {
  const [locale, setLocale] = useState<Locale.Lang>(defaultLocale)

  const switchLocale = (newLocale: Locale.Lang) => {
    setLocale(newLocale)
  }

  return (
    <LocaleProvider.Context.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleProvider.Context.Provider>
  )
}

export abstract class LocaleProvider {
  private static defaultLocale = defaultLocale

  static Context = createContext<LocaleProvider.LocaleContextValue>({
    locale: LocaleProvider.defaultLocale,
    switchLocale: () => {
      throw new Error('Locale changed before context initialized')
    },
  })

  static Provider = Provider
}
