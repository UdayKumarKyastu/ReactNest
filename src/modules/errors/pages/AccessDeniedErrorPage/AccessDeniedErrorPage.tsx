import React from 'react'
import { StringParam, useQueryParam } from 'use-query-params'
import { ErrorPageStyles } from '../../ErrorPage.styles'
import { Logo } from '../../../../icons/logo'
import { Translation } from '../../../i18n/Translation'

const { Wrapper, Heading, Hr, LogoWrapper } = ErrorPageStyles

export const AccessDeniedErrorPage = () => {
  const [errorDescription] = useQueryParam('error_description', StringParam)
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Heading>{translate('403-page-message')}</Heading>
      <Hr />
      <p>{errorDescription}</p>
    </Wrapper>
  )
}
