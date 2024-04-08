import { fireEvent, render } from '@testing-library/react'
import UploadStatus from './UploadStatus'

describe('Upload Status', () => {
  it('filename is rendered properly', () => {
    const FILENAME = 'file123.csv'
    const { getByText } = render(
      <UploadStatus filename={FILENAME} progress={100} onCancel={jest.fn()} />,
    )
    expect(getByText(FILENAME)).toBeInTheDocument()
  })

  it('upload in progress', () => {
    const { getByTestId } = render(
      <UploadStatus filename="file.csv" progress={50} onCancel={jest.fn()} />,
    )
    expect(getByTestId('loading-spinner')).toBeInTheDocument()
    expect(getByTestId('progress-bar')).toBeInTheDocument()
  })

  it('upload in done', () => {
    const { queryByTestId } = render(
      <UploadStatus filename="file.csv" progress={100} onCancel={jest.fn()} />,
    )
    expect(queryByTestId('done-icon')).toBeInTheDocument()
    expect(queryByTestId('progress-bar')).not.toBeInTheDocument()
  })

  it('onCancel prop', () => {
    const ON_CANCEL = jest.fn()
    const { getByTestId } = render(
      <UploadStatus filename="file.csv" progress={100} onCancel={ON_CANCEL} />,
    )
    fireEvent.click(getByTestId('cancel-button'))
    expect(ON_CANCEL).toBeCalled()
  })
})
