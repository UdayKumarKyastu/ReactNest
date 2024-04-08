import { fireEvent, render, waitFor } from '@testing-library/react'
import ApplyChangesStep from './ApplyChangesStep'
import { BrowserRouter } from 'react-router-dom'
import { NotificationsState } from '../../../notifications/state/NotificationsState'
import { HttpProvider } from '../../../common/http/http.provider'

jest.spyOn(NotificationsState, 'useState').mockImplementation(() => ({
  actions: {
    addNotification: jest.fn(),
  },
  state: {} as any,
}))

describe('ApplyChangesStep', () => {
  let mockHttpGet: jest.Mock
  let mockHttpPost: jest.Mock

  beforeEach(() => {
    mockHttpGet = jest.fn().mockResolvedValue({
      data: [],
    })
    mockHttpPost = jest.fn().mockResolvedValue({})
    HttpProvider.useHttpClient = jest.fn().mockReturnValue({
      get: mockHttpGet,
      post: mockHttpPost,
    })
  })

  it('check import flow', async () => {
    const IMPORT_ID = 'import123'
    const { getByTestId, container, queryByTestId } = render(
      <BrowserRouter>
        <ApplyChangesStep
          onCompleted={() => {}}
          productsNumber={123}
          onCancel={jest.fn()}
          filename="file.csv"
          importId={IMPORT_ID}
        />
      </BrowserRouter>,
    )

    fireEvent.click(getByTestId('apply-changes-button'))
    expect(getByTestId('confirmation-modal')).toBeInTheDocument()

    fireEvent.click(container.querySelector('#import-confirmation')!)
    fireEvent.click(getByTestId('confirm-button'))
    expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument()

    expect(mockHttpPost).toHaveBeenCalledWith(`/v1/price-importer/${IMPORT_ID}/trigger`)
    await waitFor(() => {
      expect(mockHttpGet).toBeCalled()
    })
  })
})
