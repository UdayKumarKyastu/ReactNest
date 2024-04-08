interface WithPercentage {
  locale: string
  value?: number | string
}

export const withPercentage = ({ locale, value }: WithPercentage) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(Number(value || 0))
}
