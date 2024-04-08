import React, { useMemo } from 'react'
import { Button } from '@pretamanger/component-library'
import { AuthPermission } from '../../../auth/AuthPermission'
import { useUserPermissions } from '../../../auth/useUserPermissions'

// todo fill props from component library
type Props = {
  disabled?: boolean
  permissionToCheck?: AuthPermission
  isHidden?: boolean
} & Record<string, any>

export const EditButtonWithPermissionCheck = ({
  disabled,
  permissionToCheck = AuthPermission.CAN_EDIT,
  isHidden = false,
  ...props
}: Props) => {
  const { hasPermission } = useUserPermissions()

  const canEdit = useMemo(() => {
    return hasPermission(permissionToCheck)
  }, [hasPermission, permissionToCheck])

  if (isHidden) {
    return null
  }

  return <Button disabled={!canEdit || disabled} {...props} />
}
