import { Auth0ContextInterface } from '@auth0/auth0-react/dist/auth0-context'
import { AuthPermission } from './modules/auth/AuthPermission'
import React, { ComponentType } from 'react'
import { Auth0ProviderOptions } from '@auth0/auth0-react/dist/auth0-provider'
import { getUsersRoles, getUsersPermissions } from '../cypress/helpers/auth0'

/**
 * Auth0 can't be easily mocked without actual server-side test environments
 * So, on integration cypress tests (where Cypress can't alter production code)
 * this is used (via env flag) instead real one.
 */
export const useStubAuth0 = (): Auth0ContextInterface =>
  ({
    getAccessTokenSilently: async () => '',
    loginWithRedirect: async () => {},
    user: {
      'https://portal/permissions': getUsersPermissions() || [
        AuthPermission.CAN_EDIT,
        AuthPermission.CAN_APPROVE_CHANGES,
      ],
      'https://portal/roles': getUsersRoles() || ['Manager'],
      // eslint-disable-next-line camelcase
      given_name: 'John',
      // eslint-disable-next-line camelcase
      family_name: 'Doe',
      nickname: 'jdoe',
      // eslint-disable-next-line camelcase
      preferred_username: 'JDOE',
      name: 'John Doe',
      picture: '',
      zoneinfo: 'America/Los_Angeles',
      locale: 'en-US',
      // eslint-disable-next-line camelcase
      updated_at: '2021-06-14T07:20:37.768Z',
      email: 'john.doe@pret.com',
      // eslint-disable-next-line camelcase
      email_verified: true,
      sub: 'oauth2|Pret-Okta|00uy3adznwGdg19Ef0h71111',
    },
  } as any as Auth0ContextInterface)

/* eslint-disable react/display-name */
export const stubWthAuthenticationRequired = (Component: ComponentType) => () => <Component />
export const StubAuthProvider = ({ children }: Auth0ProviderOptions): JSX.Element =>
  children as JSX.Element
