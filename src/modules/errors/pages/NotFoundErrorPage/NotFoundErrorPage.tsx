import { ErrorPageStyles } from '../../ErrorPage.styles'
import { Logo } from '../../../../icons/logo'
import { Translation } from '../../../i18n/Translation'

const { Heading, Hr, Wrapper } = ErrorPageStyles

/**
 * TODO: Extract common wrapper for error pages, render child content based on erorr type
 */
export const NotFoundErrorPage = () => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <Logo />
      <Heading>{translate('404-page-message')}</Heading>
      <Hr />
    </Wrapper>
  )
}
