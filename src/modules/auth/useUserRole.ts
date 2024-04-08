import { useAuth } from '../../app-factory'
import { useMemo } from 'react'

const rolesStoreKey = 'https://portal/roles'

export const useUserRole = () => {
  const auth = useAuth()

  const roles = useMemo((): string[] => auth.user?.[rolesStoreKey] || [], [auth.user])

  return {
    roles,
  }
}
