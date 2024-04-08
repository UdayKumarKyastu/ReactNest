import React from 'react'
import { Translation } from '../../../i18n/Translation'
import { NoPermissionsStyles } from './NoPermissions.styles'

const { Root, Title, Icon } = NoPermissionsStyles

const NoPermissions = () => {
  const { translate } = Translation.useTranslation()

  return (
    <Root data-testid="no-permissions-page">
      <Icon height={80} width={80} stroke="#9ca3af" />
      <Title>{translate('common.noPermissions')}</Title>
    </Root>
  )
}

export default NoPermissions
