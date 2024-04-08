import { Router } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { VersionDraftChangesExistNotice } from './VersionDraftChangesExistNotice'

const masterSku = 'UK123'
const variantSku = 'UK123'
const version = 1

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ masterSku, variantSku, version }),
}))

describe('VersionDraftChangesExistNotice', () => {
  const history = createMemoryHistory()

  it('draft changes button should redirect to draft changes tab', () => {
    const { getByTestId } = render(
      <Router navigator={history} location={history.location}>
        <VersionDraftChangesExistNotice numberOfChanges={5} />
      </Router>,
    )

    fireEvent.click(getByTestId('draft-changes-link'))
    expect(history.location.pathname).toBe(
      `/products/${masterSku}/variants/${variantSku}/versions/${version}/draft-changes`,
    )
  })
})
