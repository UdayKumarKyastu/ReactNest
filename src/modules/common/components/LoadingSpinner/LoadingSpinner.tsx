import React from 'react'
import { LoadingIndicator } from '@pretamanger/component-library'
import { LoadingSpinnerStyles } from './LoadingSpinner.styles'

const { Wrapper } = LoadingSpinnerStyles

interface Props {
  size?: string
  testSelector?: string
}

const LoadingSpinner = ({ size, testSelector }: Props) => {
  return (
    <Wrapper data-testid={testSelector}>
      <LoadingIndicator size={size || 'small'} on>
        <LoadingIndicator.On />
      </LoadingIndicator>
    </Wrapper>
  )
}

export default LoadingSpinner
