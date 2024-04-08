import { validateEanCode } from './validateEanCode'

describe('validateEanCode', () => {
  it('returns false for not valid EAN-13 codes', () => {
    expect(validateEanCode('85011015303')).toEqual(false)
    expect(validateEanCode('8501101530003')).toEqual(false)
    expect(validateEanCode('ssa124test')).toEqual(false)
  })

  it('returns true for valid EAN-13 codes', () => {
    expect(validateEanCode('9501101530003')).toEqual(true)
    expect(validateEanCode('0012345678905')).toEqual(true)
  })
})
