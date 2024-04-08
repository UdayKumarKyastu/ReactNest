import React from 'react'
import NoPermissions from '../NoPermissions/NoPermissions'

interface Props {
  children: JSX.Element
  hasPermissions: boolean
}

const PermissionsDrivenPage = ({ children, hasPermissions }: Props) => {
  return hasPermissions ? children : <NoPermissions />
}

export default PermissionsDrivenPage
