import React from 'react'
import { NavigationStyles } from './Navigation.styles'
import { PageLogo } from '../PageLogo/PageLogo'
import { NavigationLink } from './NavigationLink/NavigationLink'
import { Translation } from '../../../../modules/i18n/Translation'
import { useUserRole } from '../../../../modules/auth/useUserRole'
import { useAuth } from '../../../../app-factory'
import { Routes as AppRoutes } from '../../../routing/Routes'
import { useUserPermissions } from '../../../auth/useUserPermissions'
import { AuthRole } from '../../../../modules/auth/AuthRole'
import { Link } from 'react-router-dom'

const { Wrapper, UserWrapper, Avatar, UserName, Nav, StyleLink } = NavigationStyles

interface Props {
  hideNavItems?: boolean
}

export const Navigation = ({ hideNavItems }: Props) => {
  const { user } = useAuth()
  const { roles } = useUserRole()
  const { translate } = Translation.useTranslation()
  const { canUsePricingImporter } = useUserPermissions()

  return (
    <Wrapper>
      <PageLogo />

      <Nav data-cy="top-navigation">
        {!hideNavItems && (
          <>
            <NavigationLink to={AppRoutes.RecipeCalculator.navigationRoot}>
              {translate('navigation.recipeCalculator')}
            </NavigationLink>

            {canUsePricingImporter && (
              <NavigationLink
                to={AppRoutes.PricingImport.root}
                testSelector="pricing-importer-link"
              >
                {translate('navigation.importPricing')}
              </NavigationLink>
            )}

            {process.env.REACT_APP_TURN_OFF_PDD === 'false' && roles.includes(AuthRole.PretAdmin) && (
              <StyleLink>
                <Link
                  to={AppRoutes.PretDigitalDashboard.root}
                  target="_top"
                  style={{ textDecoration: 'none', color: '#372f31' }}
                >
                  {translate('navigation.pretDigital')}
                </Link>
              </StyleLink>
            )}
          </>
        )}
      </Nav>

      {user && (
        <UserWrapper>
          <UserName>
            {translate('navigation.welcomeBack')} <strong>{user.given_name}</strong>
          </UserName>
          <Avatar
            src={user.picture}
            alt=""
            title={translate('navigation.assignedRolesPrefix') + roles.join(', ')}
          />
        </UserWrapper>
      )}
    </Wrapper>
  )
}
