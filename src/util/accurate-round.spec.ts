import { accurateRound } from './accurate-round'

describe('accurateRound', function () {
  it('Rounds properly big fraction', () => {
    const num = 25.010113099999998

    expect(accurateRound(num, 0)).toBe(25)
    expect(accurateRound(num, 1)).toBe(25)
    expect(accurateRound(num, 2)).toBe(25.01)
    expect(accurateRound(num, 5)).toBe(25.01011)
    expect(accurateRound(num, 8)).toBe(25.0101131)
  })
})
