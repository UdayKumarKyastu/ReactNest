import React from 'react'
import { InternationalField } from '../../model/review-statuses/marketing-review-status'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import { Locale } from '../../../i18n/Locale'
import ReadonlyFieldWrapper from '../ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { MultiLangChangesStyles } from './MultiLangChanges.styles'

const { ChangeWrapper, Value } = MultiLangChangesStyles

interface Props {
  reviewStatuses?: InternationalField
  resourceSkus?: ResourceSkus
  value: Locale.MultilangString
  fieldName: string
  hideButtons?: boolean
  showArrow?: boolean
  reloadProduct?: () => void
  canApproveChanges?: boolean
}

const MultiLangChanges = ({
  reviewStatuses,
  resourceSkus,
  value,
  fieldName,
  hideButtons,
  showArrow,
  reloadProduct,
  canApproveChanges,
}: Props) => {
  const activeKeys = Object.entries(reviewStatuses || {})
    .map(([key, value]) => (value ? key : false))
    .filter(Boolean) as Locale.Lang[]

  if (!activeKeys?.length) {
    return null
  }

  return (
    <>
      {activeKeys.map((key) => (
        <ReadonlyFieldWrapper
          key={`lang-${key}`}
          fieldName={fieldName}
          fieldValue={key}
          resourceSkus={resourceSkus}
          hideButtons={hideButtons}
          reviewStatus={reviewStatuses?.[key]}
          presentChange
          showArrow={showArrow}
          reloadProduct={reloadProduct}
          testSelector="lang-row"
          tabName="marketing"
          canApproveChanges={canApproveChanges}
        >
          <ChangeWrapper>
            <span>{key.toUpperCase()}</span>
            <Value>{value[key]}</Value>
          </ChangeWrapper>
        </ReadonlyFieldWrapper>
      ))}
    </>
  )
}

export default MultiLangChanges
