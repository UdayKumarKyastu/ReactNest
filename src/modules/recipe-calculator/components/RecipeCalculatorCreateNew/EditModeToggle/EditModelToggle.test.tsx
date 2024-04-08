import { fireEvent, render } from '@testing-library/react'
import EditModeToggle from './EditModeToggle'

describe('EditModeToggle', () => {
  it('reject icon in edit mode', () => {
    const openActionMock = jest.fn()
    const closeActionMock = jest.fn()
    const { getByTestId } = render(
      <EditModeToggle editMode openEditMode={openActionMock} closeEditMode={closeActionMock} />,
    )

    fireEvent.click(getByTestId('reject-icon'))
    expect(closeActionMock).toBeCalled()
  })

  it('button in non edit mode', () => {
    const openActionMock = jest.fn()
    const closeActionMock = jest.fn()
    const { getByTestId } = render(
      <EditModeToggle
        editMode={false}
        openEditMode={openActionMock}
        closeEditMode={closeActionMock}
      />,
    )

    fireEvent.click(getByTestId('model-pricing-button'))
    expect(openActionMock).toBeCalled()
  })
})
