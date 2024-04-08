import React from 'react'
import { LoadingIndicator } from '@pretamanger/component-library'
import { LoadingStateStyles } from './LoadingState.styles'
import { Translation } from '../../../../modules/i18n/Translation'

const { Wrapper, Info } = LoadingStateStyles

const LoadingState = () => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <LoadingIndicator size="medium" on>
        <LoadingIndicator.On />
      </LoadingIndicator>

      <Info>{translate('productNotifications.loadingProducts')}</Info>
    </Wrapper>
  )
}

export default LoadingState
