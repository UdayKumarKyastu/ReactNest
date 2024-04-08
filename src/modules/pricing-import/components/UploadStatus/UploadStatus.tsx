import React, { useMemo } from 'react'
import { UploadStatusStyles } from './UploadStatus.styles'
import { Translation } from '../../../i18n/Translation'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'
import DoneIcon from '../../../../icons/Done'

const { Root, ProgressBar, ProgressIndicator, Wrapper, Spinner, Filename, CancelButton } =
  UploadStatusStyles

interface Props {
  filename: string
  progress: number
  onCancel: () => void
}

const UploadStatus = ({ filename, progress, onCancel }: Props) => {
  const { translate } = Translation.useTranslation()

  const isLoaded = progress === 100

  const buttonLabel = useMemo(() => {
    return isLoaded ? translate('pricingImport.removeFile') : translate('pricingImport.cancel')
  }, [isLoaded, translate])

  return (
    <Root data-testid="upload-status">
      <Wrapper>
        <Spinner>
          {isLoaded ? (
            <DoneIcon data-testid="done-icon" />
          ) : (
            <LoadingSpinner testSelector="loading-spinner" />
          )}
          <Filename>{filename}</Filename>
        </Spinner>

        <CancelButton styleType="secondary" compact onClick={onCancel} data-testid="cancel-button">
          {buttonLabel}
        </CancelButton>
      </Wrapper>

      {!isLoaded && (
        <ProgressBar data-testid="progress-bar">
          <ProgressIndicator progress={progress} />
        </ProgressBar>
      )}
    </Root>
  )
}

export default UploadStatus
