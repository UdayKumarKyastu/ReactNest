import { useUserPermissions } from '../auth/useUserPermissions'
import { useMemo } from 'react'
import { AuthPermission } from '../auth/AuthPermission'

export const useApprovalPermissions = () => {
  const { hasPermission } = useUserPermissions()

  const canApprove = useMemo(() => {
    return hasPermission(AuthPermission.CAN_APPROVE_CHANGES)
  }, [hasPermission])

  return {
    canApprove,
  }
}
