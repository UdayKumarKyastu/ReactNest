import React from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import './css/global.css'
import { AccessDeniedErrorPage } from './modules/errors/pages/AccessDeniedErrorPage/AccessDeniedErrorPage'
import { Routing } from './modules/routing/Routing'
import { Auth0Errors } from './modules/auth/Auth0Errors'
import { Layout } from './modules/common/components/Layout/Layout'
import { useUserRole } from './modules/auth/useUserRole'
import { CustomerServiceApp } from './modules/customer-service/CustomerServiceApp'
import { AuthRole } from './modules/auth/AuthRole'

export const App = () => {
  const [error] = useQueryParam('error', StringParam)
  const { roles } = useUserRole()

  // todo move to HOC/separate layer
  if (error === Auth0Errors.accessDeniedError) {
    return (
      <Layout>
        <AccessDeniedErrorPage />
      </Layout>
    )
  }

  if (roles.includes(AuthRole.CustomerServiceManager)) {
    return (
      <Layout hideNavItems>
        <CustomerServiceApp />
      </Layout>
    )
  }

  return (
    <Layout>
      <Routing />
    </Layout>
  )
}
