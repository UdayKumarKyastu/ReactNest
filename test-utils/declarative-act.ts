import { act as _hookAct } from '@testing-library/react-hooks'

/**
 * @deprecated pretty sure not needed
 */
export const act = async <Returns extends any>(fn: () => Returns) => {
  let result: ReturnType<typeof fn>
  await _hookAct(async () => {
    result = fn()
  })
  return result!
}
