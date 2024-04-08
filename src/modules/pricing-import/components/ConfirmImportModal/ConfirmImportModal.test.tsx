import { fireEvent, render } from '@testing-library/react'
import ConfirmImportModal from './ConfirmImportModal'

describe('ConfirmImportModal', () => {
  it('product number displayed correctly', () => {
    const ON_CLOSE = jest.fn()
    const { getByTestId, container } = render(
      <ConfirmImportModal productsNumber={123} onClose={ON_CLOSE} />,
    )
    expect(getByTestId('confirm-button')).toBeDisabled()
    fireEvent.click(container.querySelector('#import-confirmation')!)
    expect(container.querySelector('#import-confirmation')).toBeChecked()
    expect(getByTestId('confirm-button')).not.toBeDisabled()

    fireEvent.click(getByTestId('confirm-button'))
    expect(ON_CLOSE).toBeCalled()
  })
})
