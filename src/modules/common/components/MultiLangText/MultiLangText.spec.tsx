import { fireEvent, render } from '@testing-library/react'
import { MultiLangText } from './MultiLangText'
import { Locale } from '../../../i18n/Locale'
import { LocaleMock } from '../../../i18n/LocaleMock'

describe('MultiLangText', () => {
  const value: Locale.MultilangString = LocaleMock.createMultiLangMock('Test name')
  const locales: Locale.Lang[] = ['en-US', 'fr-FR', 'zh-HK']
  const showAllLanguagesButtonLabel = 'Show all languages'
  const hideAllLanguagesButtonLabel = 'Hide other languages'
  const defaultLocale = 'en-GB'

  it('renders value based on defaultLocale prop', () => {
    const { queryByText } = render(<MultiLangText value={value} defaultLocale={defaultLocale} />)

    expect(
      queryByText(`${defaultLocale.toUpperCase()}: ${value[defaultLocale]}`),
    ).toBeInTheDocument()
  })

  it('does not render expand button if locales are not passed', () => {
    const { queryByText } = render(<MultiLangText value={value} defaultLocale={defaultLocale} />)

    expect(queryByText(showAllLanguagesButtonLabel)).not.toBeInTheDocument()
  })

  it('shows expand button and allows to show and hide other languages', () => {
    const { getByText, queryByText } = render(
      <MultiLangText value={value} defaultLocale={defaultLocale} locales={locales} />,
    )

    expect(getByText(showAllLanguagesButtonLabel)).toBeInTheDocument()
    fireEvent.click(getByText(showAllLanguagesButtonLabel))

    locales.forEach((locale) => {
      expect(getByText(`${locale.toUpperCase()}: ${value[locale]}`)).toBeInTheDocument()
    })

    fireEvent.click(getByText(hideAllLanguagesButtonLabel))

    locales.forEach((locale) => {
      expect(queryByText(`${locale.toUpperCase()}: ${value[locale]}`)).not.toBeInTheDocument()
    })
  })
})
