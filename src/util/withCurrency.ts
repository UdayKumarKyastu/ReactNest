interface WithCurrency {
  locale: string
  currency: string
  value: string | number
  maximumSignificantDigits?: number
}

export const withCurrency = ({
  locale,
  currency,
  value,
  maximumSignificantDigits,
}: WithCurrency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumSignificantDigits,
  }).format(Number(value))
}
