import React, { useCallback, useEffect } from 'react'
import { FileDrop } from 'react-file-drop'
import { FileUploaderStyles } from './FileUploader.styles'
import { Translation } from '../../../i18n/Translation'
import Upload from '../../../../icons/Upload'
import { Button } from '@pretamanger/component-library'

const { Root, Wrapper, Message, HiddenFileInput } = FileUploaderStyles

interface Props {
  onUpload: (file: File) => void
}

const CSV_FILE_TYPE = 'text/csv'

const FileUploader = ({ onUpload }: Props) => {
  const { translate } = Translation.useTranslation()

  const preventDownloading = (event: Event) => {
    event.preventDefault()
  }

  useEffect(() => {
    window.addEventListener('drop', preventDownloading)
    return () => {
      window.removeEventListener('drop', preventDownloading)
    }
  }, [])

  const uploadHandler = useCallback(
    (files: FileList | null) => {
      if (!files) {
        return
      }
      const [file] = files
      if (file.type === CSV_FILE_TYPE) {
        onUpload(file)
      }
    },
    [onUpload],
  )

  const onBrowse = useCallback(() => {
    document.getElementById('file-input')?.click()
  }, [])

  return (
    <Root data-testid="file-uploader">
      <FileDrop onDrop={uploadHandler}>
        <Wrapper>
          <Upload />

          <Message>
            {translate('fileUploader.dragAndDrop')}
            <Button onClick={onBrowse} compact styleType="tertiary" icon={null}>
              {translate('fileUploader.browse')}
            </Button>
          </Message>

          <Message>{translate('fileUploader.acceptedFileTypes')}</Message>
        </Wrapper>
      </FileDrop>

      <HiddenFileInput
        onChange={({ target }) => uploadHandler(target.files)}
        type="file"
        id="file-input"
        accept=".csv"
      />
    </Root>
  )
}

export default FileUploader
