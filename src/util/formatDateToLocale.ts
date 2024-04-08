export const formatDateToLocale = (date: string, locale: string) => {
  const dateObj = new Date(date)

  const day = new Intl.DateTimeFormat(locale).format(dateObj)
  const time = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(
    dateObj,
  )

  return `${day} ${time}`
}
