import React from 'react'
import { ProductStyles } from '../../../pages/styles'
import { ReviewStatusRowStyles } from '../../PricingChangesView/ReviewStatusRow/ReviewStatusRow.styles'
import ReadonlyFieldWrapper from '../../ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { ReviewStatus } from '../../../model/review-status'
import { ResourceSkus } from '../../../../../shared/model/resourceSkus'

const { SubsectionHeading } = ProductStyles
const { RowValues, RowHeading, Value, ChangeWrapper } = ReviewStatusRowStyles

interface Props {
  fieldName: string
  valueLabel: string
  value: string | number
  draftValue: string | number
  title?: string
  reviewStatus?: ReviewStatus
  resourceSkus?: ResourceSkus
  fieldValue?: any
  reloadProduct?: () => void
  testSelector?: string
  canApproveChanges?: boolean
}

const ReviewStatusRow = ({
  title,
  value,
  valueLabel,
  draftValue,
  fieldName,
  fieldValue,
  reviewStatus,
  resourceSkus,
  reloadProduct,
  testSelector,
  canApproveChanges,
}: Props) => {
  return (
    <div data-testid={testSelector}>
      {title && draftValue !== value && (
        <RowHeading>
          <SubsectionHeading>{title}</SubsectionHeading>
        </RowHeading>
      )}
      {draftValue !== value && (
        <RowValues>
          <ReadonlyFieldWrapper presentChange hideButtons>
            <ChangeWrapper>
              <span>{valueLabel}</span>
              <Value>{value}</Value>
            </ChangeWrapper>
          </ReadonlyFieldWrapper>

          <ReadonlyFieldWrapper
            presentChange
            showArrow
            fieldName={fieldName}
            fieldValue={fieldValue}
            reviewStatus={reviewStatus}
            resourceSkus={resourceSkus}
            reloadProduct={reloadProduct}
            tabName="pricing"
            canApproveChanges={canApproveChanges}
          >
            <ChangeWrapper>
              <span>{valueLabel}</span>
              <Value>{draftValue}</Value>
            </ChangeWrapper>
          </ReadonlyFieldWrapper>
        </RowValues>
      )}
    </div>
  )
}

export default ReviewStatusRow
