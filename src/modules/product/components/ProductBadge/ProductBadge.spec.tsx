import { LocaleProvider } from '../../../i18n/LocaleProvider'
import React from 'react'
import { ProductBadge } from './ProductBadge'
import { render, screen } from '@testing-library/react'

describe('Product Badge', () => {
  describe('Active variant', () => {
    it('Renders without active count properly', () => {
      render(
        <LocaleProvider.Provider>
          <ProductBadge.Active />
        </LocaleProvider.Provider>,
      )

      screen.getByText('Active')
    })
    it('Renders with active count properly', () => {
      render(
        <LocaleProvider.Provider>
          <ProductBadge.Active active={5} of={20} />
        </LocaleProvider.Provider>,
      )

      screen.getByText('5/20 Active')
    })
  })
})
