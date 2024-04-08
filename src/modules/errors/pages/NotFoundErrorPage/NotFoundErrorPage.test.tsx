/* eslint-disable react/display-name */

import React from 'react'

import { NotFoundErrorPage } from './NotFoundErrorPage'
import { act } from '../../../../../test-utils/declarative-act'
import { render } from '../../../../../test-utils/render'

jest.mock('../../../i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              '404-page-message': '404 heading',
            }[key]
          },
        }
      },
    },
  }
})

describe('404', () => {
  it('displays 404 message', async () => {
    const { container } = await act(() => render(<NotFoundErrorPage />))
    expect(container.querySelector('h2')).toHaveTextContent('404 heading')
  })
})
