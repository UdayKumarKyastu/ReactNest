import { AuthPermission } from '../../src/modules/auth/AuthPermission'

export const setUsersRoles = (roles: string[]) => {
  sessionStorage.setItem('ROLES', JSON.stringify(roles))
}

export const setUsersPermissions = (permissions: AuthPermission[]) => {
  sessionStorage.setItem('PERMISSIONS', JSON.stringify(permissions))
}

export const getUsersRoles = () => {
  return JSON.parse(sessionStorage.getItem('ROLES')!)
}

export const getUsersPermissions = () => {
  return JSON.parse(sessionStorage.getItem('PERMISSIONS')!)
}
