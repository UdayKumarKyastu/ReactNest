export const getCurrencySymbol = (locale: string, currencyCode: string = 'GBP'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  })
    .formatToParts(0)
    .find(({ type }) => type === 'currency')!.value
}
