/* eslint-disable react/display-name, camelcase */
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { Search } from './index'
import { act } from '../../../../../test-utils/declarative-act'
import { render } from '../../../../../test-utils/render'

describe('Search', () => {
  const onSearch = jest.fn()
  const onClear = jest.fn()
  const propertyName = 'name'

  const renderSearch = (props = {}) => {
    return render(
      <Search onSearch={onSearch} onClear={onClear} {...props} propertyName={propertyName} />,
    )
  }

  ;['search term', 'another search term'].forEach((searchTerm) => {
    it(`passes search query (${searchTerm}) to onSearch`, async () => {
      await act(renderSearch)

      fireEvent.change(screen.getByTestId('btnSearch'), {
        target: { value: searchTerm },
      })
      fireEvent.click(screen.getAllByRole('button')[1])
      expect(onSearch).toHaveBeenCalledWith(searchTerm, propertyName)
    })
  })

  it('calls onClear when clear button is pressed', async () => {
    const searchTerm = 'cancel test'
    await act(renderSearch)

    fireEvent.change(screen.getByTestId('btnSearch'), {
      target: { value: searchTerm },
    })
    fireEvent.click(screen.queryAllByRole('button')[0])
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('populates the default field value from the query prop', async () => {
    const query = 'Americano'
    await act(() => renderSearch({ query }))
    expect(screen.getByDisplayValue(query)).toBeInTheDocument()
  })
})
