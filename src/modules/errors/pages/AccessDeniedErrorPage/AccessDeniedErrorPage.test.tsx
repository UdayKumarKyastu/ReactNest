/* eslint-disable react/display-name, camelcase */
import React from 'react'
import { AccessDeniedErrorPage } from './AccessDeniedErrorPage'
import { act } from '../../../../../test-utils/declarative-act'
import { render } from '../../../../../test-utils/render'

jest.mock('../../../i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              '403-page-message': '403 heading',
            }[key]
          },
        }
      },
    },
  }
})

describe('403', () => {
  it('displays error description', async () => {
    const { container } = await act(() =>
      render(<AccessDeniedErrorPage />, {
        initialHistoryEntries: ['?error_description=something%20bad%20happened'],
      }),
    )
    expect(container.querySelector('h2')).toHaveTextContent('403 heading')
    expect(container.querySelector('p')).toHaveTextContent('something bad happened')
  })
})
