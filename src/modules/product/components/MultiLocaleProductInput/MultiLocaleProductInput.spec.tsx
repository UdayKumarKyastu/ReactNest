import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { MultiLocaleProductInput } from './MultiLocaleProductInput'
import { Locale } from '../../../i18n/Locale'
import { CountryCode } from '../../../../shared/model/country-code'

describe('MultiLocaleProductInput', () => {
  const defaultName = 'some-name'
  const defaultLabel = 'Some Label'
  const defaultValue: Locale.MultilangString = {
    'en-GB': 'Some Value',
    'en-HK': 'some value',
    'en-US': 'some value',
    'zh-HK': 'some value',
    'fr-FR': 'some value',
  }
  const defaultType = 'text'
  const locales: Locale.Lang[] = ['en-US', 'fr-FR', 'zh-HK', 'en-HK']
  const defaultCountryCode = CountryCode.UK

  it('renders as expected when type is input', async () => {
    const { container } = render(
      <MultiLocaleProductInput
        name={defaultName}
        label={defaultLabel}
        value={defaultValue}
        type={defaultType}
        countryCode={defaultCountryCode}
        id="test-id"
        locales={locales}
      />,
    )

    expect(container.querySelector("input[type='text']")).toBeInTheDocument()
  })

  it('renders as expected when type is textarea', async () => {
    const { container } = render(
      <MultiLocaleProductInput
        name={defaultName}
        label={defaultLabel}
        value={defaultValue}
        id="test-id"
        countryCode={defaultCountryCode}
        locales={locales}
        type="textarea"
      />,
    )

    expect(container.querySelector('textarea')).toBeInTheDocument()
  })

  it('allows the user to show and hide languages', async () => {
    const { queryAllByText, getByText } = render(
      <MultiLocaleProductInput
        name={defaultName}
        label={defaultLabel}
        value={defaultValue}
        type={defaultType}
        countryCode={defaultCountryCode}
        id="test-id"
        locales={locales}
      />,
    )

    expect(queryAllByText(/Some Label/)).toHaveLength(1)

    fireEvent.click(getByText(/Show all languages/))

    expect(queryAllByText(/Some Label/)).toHaveLength(5)

    fireEvent.click(getByText(/Hide other languages/))

    expect(queryAllByText(/Some Label/)).toHaveLength(1)
  })
})
