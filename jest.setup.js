import '@testing-library/jest-dom'
import matchMediaPolyfill from 'mq-polyfill'
import { toHaveNoViolations } from 'jest-axe'

Object.defineProperty(global.self, 'crypto', { value: {} })
global.crypto.subtle = {} // this gets around the 'auth0-spa-js must run on a secure origin' error

global.FontFace = class FontFace {
  constructor() {}
  load() {
    return {
      then: jest.fn(),
    }
  }
}

document.fonts = {
  ...document.fonts,
  add: jest.fn(),
}

matchMediaPolyfill(window)

expect.extend(toHaveNoViolations)
