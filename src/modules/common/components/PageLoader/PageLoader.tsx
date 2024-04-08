import { LoadingIndicator } from '@pretamanger/component-library'
import { PageLoaderStyles } from './PageLoader.styles'

const { Wrapper } = PageLoaderStyles

export const PageLoader = () => {
  return (
    <Wrapper>
      <LoadingIndicator size="medium" on>
        <LoadingIndicator.On />
      </LoadingIndicator>
    </Wrapper>
  )
}
