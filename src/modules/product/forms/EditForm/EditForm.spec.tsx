import { fireEvent, render } from '@testing-library/react'
import { EditForm } from './EditForm'
import { AppProvider, withEditState } from '../../../../app-provider'

describe('EditForm', () => {
  const defaultProps: EditForm.Props<{}> = {
    formFields: {},
    onSubmit: jest.fn(),
    sku: 'UK123',
  }

  it('properly renders form controls', () => {
    const { getByTestId } = render(
      <AppProvider providers={[withEditState]}>
        <EditForm {...defaultProps}>
          <div />
        </EditForm>
      </AppProvider>,
    )

    expect(getByTestId('cross-button')).toBeInTheDocument()
    expect(getByTestId('cancel-button')).toBeInTheDocument()
    expect(getByTestId('save-button')).toBeInTheDocument()
  })

  it('quits edit mode on cross button click', () => {
    const { getByTestId, queryByTestId } = render(
      <AppProvider providers={[withEditState]}>
        <EditForm {...defaultProps}>
          <div />
        </EditForm>
      </AppProvider>,
    )

    fireEvent.click(getByTestId('cross-button'), () => {
      expect(getByTestId('edit-button')).toBeInTheDocument()
      expect(queryByTestId('save-button')).not.toBeInTheDocument()
      expect(queryByTestId('cancel-button')).not.toBeInTheDocument()
    })
  })

  it('fires onSubmit and displays confirm modal on save button click', () => {
    const { getByTestId } = render(
      <AppProvider providers={[withEditState]}>
        <EditForm {...defaultProps}>
          <div />
        </EditForm>
      </AppProvider>,
    )

    fireEvent.click(getByTestId('save-button'), () => {
      expect(defaultProps.onSubmit).toHaveBeenCalled()
      expect(getByTestId('save-changes-modal-headline')).toBeInTheDocument()
      expect(getByTestId('approve-button')).toBeInTheDocument()
    })
  })
})
