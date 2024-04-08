import React from 'react'
import ReadonlyFieldWrapper from '../ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { CheckboxWithApproveStyles } from './CheckboxWithApprove.styles'
import { ReviewStatus } from '../../model/review-status'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import { Translation } from '../../../i18n/Translation'

const { StyledCheckbox } = CheckboxWithApproveStyles

interface Props {
  isSelected: boolean
  fieldName: string
  label: string
  reviewStatus?: ReviewStatus
  hasChanged?: boolean
  sectionWithChanges?: boolean
  resourceSkus?: ResourceSkus
  isNotDisplayed?: boolean
  reloadProduct?: () => void
  tabName: string
  canApproveChanges?: boolean
  id?: string
}

const CheckboxWithApprove = ({
  fieldName,
  sectionWithChanges,
  hasChanged,
  reviewStatus,
  resourceSkus,
  label,
  isSelected,
  isNotDisplayed,
  reloadProduct,
  tabName,
  canApproveChanges,
  id,
}: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <ReadonlyFieldWrapper
      showArrow={sectionWithChanges && hasChanged}
      presentChange={hasChanged}
      reviewStatus={reviewStatus}
      fieldName={fieldName}
      resourceSkus={resourceSkus}
      hideButtons={reviewStatus && !sectionWithChanges}
      noMargin={!reviewStatus}
      isHidden={sectionWithChanges && !hasChanged}
      isNotDisplayed={isNotDisplayed}
      reloadProduct={reloadProduct}
      tabName={tabName}
      canApproveChanges={canApproveChanges}
    >
      <StyledCheckbox
        id={id || fieldName}
        name={fieldName}
        label={translate(label)}
        isSelected={isSelected}
        defaultChecked={isSelected}
        disabled
      />
    </ReadonlyFieldWrapper>
  )
}

export default CheckboxWithApprove
