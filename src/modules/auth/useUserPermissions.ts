import { useAuth } from '../../app-factory'
import { useCallback, useMemo } from 'react'
import { AuthPermission } from './AuthPermission'

const permissionsStoreKey = 'https://portal/permissions'

export const useUserPermissions = () => {
  const auth = useAuth()

  const permissions = useMemo((): AuthPermission[] => {
    return (auth.user && (auth.user[permissionsStoreKey] as AuthPermission[])) || []
  }, [auth.user])

  const hasPermission = useCallback(
    (permToCheck: AuthPermission) => {
      return Boolean(permissions.includes(permToCheck))
    },
    [permissions],
  )

  const canReviewLabelling = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_LABELLING_CHANGES)
  }, [hasPermission])

  const canReviewMarketing = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_MARKETING_CHANGES)
  }, [hasPermission])

  const canReviewMenuCategorisation = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_MENU_CATEGORISATION_CHANGES)
  }, [hasPermission])

  const canReviewPricing = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_PRICING_CHANGES)
  }, [hasPermission])

  const canReviewReporting = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_REPORTING_CHANGES)
  }, [hasPermission])

  const canReviewBaristaAttribute = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_BARISTA_ATTRIBUTE_CHANGES)
  }, [hasPermission])

  const canReviewSetUp = useMemo(() => {
    return hasPermission(AuthPermission.REVIEW_BARISTA_ATTRIBUTE_CHANGES)
  }, [hasPermission])

  const canUsePricingImporter = useMemo(() => {
    return hasPermission(AuthPermission.MANAGE_PRICING_IMPORTS)
  }, [hasPermission])

  return {
    permissions,
    hasPermission,
    canReviewBaristaAttribute,
    canReviewLabelling,
    canReviewMarketing,
    canReviewMenuCategorisation,
    canReviewPricing,
    canReviewReporting,
    canReviewSetUp,
    canUsePricingImporter,
  }
}
