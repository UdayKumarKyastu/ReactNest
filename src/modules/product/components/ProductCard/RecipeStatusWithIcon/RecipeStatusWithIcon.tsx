import { useMemo } from 'react'
import { Confirmation, Alert } from '@pretamanger/component-library'
import { RecipeStatus } from '../../../../../shared/model/recipe-status'
import { RecipeStatusWithIconStyles } from './RecipeStatusWithIcon.styles'
import { Info } from '../../../../../icons/Info'
import { CircleCross } from '../../../../../icons/CircleCross'

interface Props {
  recipeStatus: RecipeStatus
}

const getRecipeStatusIcon = (recipeStatus: RecipeStatus) => {
  const iconSize = {
    width: '14px',
    height: '14px',
  }

  switch (recipeStatus) {
    case RecipeStatus.APPROVED:
      return <Confirmation {...iconSize} data-testid="approved-icon" />
    case RecipeStatus.READY:
      return <Info data-testid="ready-icon" />
    case RecipeStatus.DEACTIVATED:
      return <CircleCross data-testid="deactivated-icon" />
    case RecipeStatus.DRAFT:
      return <Alert {...iconSize} data-testid="draft-icon" />
  }
}

const { RecipeStatusWrapper } = RecipeStatusWithIconStyles

export const RecipeStatusWithIcon = ({ recipeStatus }: Props) => {
  const statusIcon = useMemo(() => {
    return getRecipeStatusIcon(recipeStatus)
  }, [recipeStatus])

  return (
    <RecipeStatusWrapper>
      {statusIcon}
      <span>{recipeStatus}</span>
    </RecipeStatusWrapper>
  )
}
