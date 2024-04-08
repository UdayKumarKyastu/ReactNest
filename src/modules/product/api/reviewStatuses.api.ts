import { HttpProvider } from '../../common/http/http.provider'
import { useCallback, useState } from 'react'
import { ResourceSkus } from 'src/shared/model/resourceSkus'

declare namespace UseAcceptRejectChanges {
  type OperationType = 'approve' | 'reject' | 'reset'

  interface PricingBody {
    channelName: string
    field:
      | 'takeAwayPrice'
      | 'eatInPrice'
      | 'eatInTax'
      | 'deliveryPrice'
      | 'deliveryTax'
      | 'takeAwayClubPret'
      | 'eatInClubPret'
  }

  type FieldValue = string[] | PricingBody
}

const formatPath = (resourceSkus: ResourceSkus) => {
  const root = `/v3/products`
  if (resourceSkus.versionKey) {
    return `${root}/${resourceSkus.masterSku}/variants/${resourceSkus.variantSku}/versions/${resourceSkus.versionKey}`
  }
  if (resourceSkus.variantSku) {
    return `${root}/${resourceSkus.masterSku}/variants/${resourceSkus.variantSku}`
  }
  return `${root}/${resourceSkus.masterSku}`
}

const useAcceptRejectChanges = (successCallback?: () => void) => {
  const http = HttpProvider.useHttpClient()
  const [isLoading, setIsLoading] = useState(false)

  const review = useCallback(
    async (
      operationType: UseAcceptRejectChanges.OperationType,
      resourceSkus: ResourceSkus,
      fieldName: string,
      tabName: string,
      fieldValue?: UseAcceptRejectChanges.FieldValue,
    ) => {
      setIsLoading(true)
      await http.post(`${formatPath(resourceSkus)}/${tabName}/review`, {
        fieldName,
        fieldValue,
        operationType,
      })
      await successCallback?.()
      setIsLoading(false)
    },
    [http, successCallback],
  )

  const accept = useCallback(
    async (
      resourceSkus: ResourceSkus,
      fieldName: string,
      tabName: string,
      fieldValue?: UseAcceptRejectChanges.FieldValue,
    ) => {
      review('approve', resourceSkus, fieldName, tabName, fieldValue)
    },
    [review],
  )

  const reject = useCallback(
    async (
      resourceSkus: ResourceSkus,
      fieldName: string,
      tabName: string,
      fieldValue?: UseAcceptRejectChanges.FieldValue,
    ) => {
      review('reject', resourceSkus, fieldName, tabName, fieldValue)
    },
    [review],
  )

  const reset = useCallback(
    async (
      resourceSkus: ResourceSkus,
      fieldName: string,
      tabName: string,
      fieldValue?: UseAcceptRejectChanges.FieldValue,
    ) => {
      review('reset', resourceSkus, fieldName, tabName, fieldValue)
    },
    [review],
  )

  return { accept, reject, reset, isLoading }
}

export abstract class ReviewStatusesApi {
  static useAcceptRejectChanges = useAcceptRejectChanges
}
