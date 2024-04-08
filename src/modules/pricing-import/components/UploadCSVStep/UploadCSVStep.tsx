import React, { useCallback, useState } from 'react'
import TemplateFileInfo from '../../components/TemplateFileInfo/TemplateFileInfo'
import FileUploader from '../FileUploader/FileUploader'
import { UploadCSVStepStyles } from './UploadCSVStep.styles'
import UploadStatus from '../UploadStatus/UploadStatus'
import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { ImporterError } from '../../model/UploadResponse'

const { Wrapper, Error } = UploadCSVStepStyles

interface Props {
  onUpload: (file: File) => void
  filename: string
  onCancel: () => void
  errors?: ImporterError[]
}

const UploadCsvStep = ({ onUpload, filename, onCancel, errors }: Props) => {
  const [progress, setProgress] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
  const { translate } = Translation.useTranslation()

  const handleUpload = useCallback(
    (file: File) => {
      const id = setInterval(() => {
        if (progress === 100) {
          clearInterval(intervalId!)
        }
        setProgress((value) => (value === 100 ? value : value + 50))
      }, 2000)
      setIntervalId(id)
      onUpload(file)
    },
    [intervalId, onUpload, progress],
  )

  return (
    <Wrapper>
      <TemplateFileInfo />

      {!!errors?.length && (
        <Notice
          title={translate('pricingImport.errorMessage', { filename })}
          variant="critical"
          description={
            <>
              {errors.map((error) => (
                <Error>
                  [{error.code}] {error.sku && `[${error.sku}]`} {error.message}
                </Error>
              ))}
            </>
          }
        />
      )}

      {!filename && <FileUploader onUpload={handleUpload} />}

      {filename && <UploadStatus filename={filename} progress={progress} onCancel={onCancel} />}
    </Wrapper>
  )
}

export default UploadCsvStep
