import { fireEvent, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { DraftChangesExistNotice } from './DraftChangesExistNotice'

describe('DraftChangesExistNotice', () => {
  const history = createMemoryHistory()
  const sku = 'UK123'

  it('should display correct amount of changes', () => {
    const { getByText } = render(
      <Router navigator={history} location={history.location}>
        <DraftChangesExistNotice numberOfChanges={5} sku={sku} />,
      </Router>,
    )

    expect(getByText('5 draft changes are pending approval')).toBeInTheDocument()
  })

  it('should redirect user to product all draft changes page', () => {
    const { getByTestId } = render(
      <Router navigator={history} location={history.location}>
        <DraftChangesExistNotice numberOfChanges={5} sku={sku} />,
      </Router>,
    )

    fireEvent.click(getByTestId('all-draft-changes-link'))
    expect(history.location.pathname).toBe(`/products/${sku}/all-draft-changes`)
  })
})
