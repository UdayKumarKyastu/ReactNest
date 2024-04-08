import { Auth0Provider, useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { StubAuthProvider, stubWthAuthenticationRequired, useStubAuth0 } from './auth0-stub'

const isIntegrationTest = process.env.IS_INTEGRATION_TEST === 'true'

const withAuthentication = isIntegrationTest
  ? stubWthAuthenticationRequired
  : withAuthenticationRequired

const AuthProvider = isIntegrationTest ? StubAuthProvider : Auth0Provider

const useAuth = isIntegrationTest ? useStubAuth0 : useAuth0

export { withAuthentication, AuthProvider, useAuth }
