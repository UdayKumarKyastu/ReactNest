import React from 'react'
import { Translation } from '../../../../i18n/Translation'
import { EditModeToggleStyles } from './EditModeToggle.styles'

const { StyledButton, RejectIcon } = EditModeToggleStyles

interface Props {
  editMode: boolean
  openEditMode: () => void
  closeEditMode: () => void
}

const EditModeToggle = ({ editMode, openEditMode, closeEditMode }: Props) => {
  const { translate } = Translation.useTranslation()

  return editMode ? (
    <RejectIcon
      stroke="#404040"
      height={20}
      width={20}
      onClick={closeEditMode}
      data-testid="reject-icon"
    />
  ) : (
    <StyledButton onClick={openEditMode} data-testid="model-pricing-button">
      {translate('recipeCalculator.createNew.modelPricing')}
    </StyledButton>
  )
}

export default EditModeToggle
