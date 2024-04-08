export const validateEanCode = (code: string) => {
  const digits = () => /^\d{13}$/g.test(code)
  if (!digits() || code.length !== 13) {
    return false
  }

  let checksum = 0
  const codelist = code.split('')
  const checkdigit = parseInt(codelist.pop()!, 10)
  codelist.forEach((value, index) => {
    const digit = parseInt(value, 10)
    if (code.length % 2 === 1) {
      checksum += index % 2 ? digit * 3 : digit
    } else {
      checksum += index % 2 ? digit : digit * 3
    }
  })

  let check = checksum % 10
  if (check !== 0) {
    check = 10 - check
  }

  return check === checkdigit
}
