import { render } from '@testing-library/react'
import UploadCSVStep from './UploadCSVStep'

describe('UploadCSVStep', () => {
  it('file uploader displayed before upload', () => {
    const { getByTestId } = render(
      <UploadCSVStep onUpload={jest.fn()} filename="" onCancel={jest.fn()} />,
    )
    expect(getByTestId('file-uploader')).toBeInTheDocument()
  })

  it('UploadStatus displayed when file is ready', () => {
    const { getByTestId } = render(
      <UploadCSVStep onUpload={jest.fn()} filename="file.csv" onCancel={jest.fn()} />,
    )
    expect(getByTestId('upload-status')).toBeInTheDocument()
  })
})
