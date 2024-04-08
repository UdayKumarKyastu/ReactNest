import React from 'react'
import { ReadonlyFieldWrapperStyles } from './ReadonlyFieldWrapper.styles'
import { ArrowRight } from '../../../../icons/ArrowRight'
import { ReviewStatus, ChangeStatus } from '../../model/review-status'
import AcceptRejectButtons from '../AcceptRejectButtons/AcceptRejectButtons'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import InfoTooltip from '../../../common/components/InfoTooltip/InfoTooltip'

interface Props {
  children?: JSX.Element | JSX.Element[] | string | null
  presentChange?: boolean
  showArrow?: boolean
  reviewStatus?: ReviewStatus
  fullWidth?: boolean
  noMargin?: boolean
  isHidden?: boolean
  hideButtons?: boolean
  isNotDisplayed?: boolean
  testSelector?: string
  label?: string
  fieldName?: string
  resourceSkus?: ResourceSkus
  reloadProduct?: () => void
  fieldValue?: any
  tabName?: string
  canApproveChanges?: boolean
  tooltipText?: string
}

const { ReadOnlyFieldWrapperRoot, Content, FieldLabel } = ReadonlyFieldWrapperStyles

const ReadonlyFieldWrapper = (props: Props) => {
  const {
    children,
    presentChange,
    showArrow,
    reviewStatus,
    testSelector,
    label,
    fieldName,
    resourceSkus,
    hideButtons,
    reloadProduct,
    fieldValue,
    tabName,
    canApproveChanges,
    tooltipText,
    ...restProps
  } = props
  const displayAcceptRejectButtons = !!(reviewStatus && fieldName && resourceSkus && tabName)

  return (
    <ReadOnlyFieldWrapperRoot {...restProps}>
      {label && (
        <FieldLabel>
          {label}
          {tooltipText && <InfoTooltip text={tooltipText} />}
        </FieldLabel>
      )}

      <Content
        data-cy={testSelector}
        presentChange={presentChange}
        crossOut={showArrow && reviewStatus?.status === ChangeStatus.Rejected}
      >
        {children}
        {showArrow && <ArrowRight data-testid="change-icon" />}
      </Content>

      {displayAcceptRejectButtons && (
        <AcceptRejectButtons
          hideButtons={hideButtons}
          fieldName={fieldName}
          changeStatus={reviewStatus}
          canApproveChanges={!!canApproveChanges}
          resourceSkus={resourceSkus}
          reloadProduct={reloadProduct}
          fieldValue={fieldValue}
          tabName={tabName}
        />
      )}
    </ReadOnlyFieldWrapperRoot>
  )
}

export default ReadonlyFieldWrapper
