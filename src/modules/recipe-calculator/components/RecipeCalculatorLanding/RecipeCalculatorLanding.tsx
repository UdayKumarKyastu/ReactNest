import React, { useCallback } from 'react'
import ChefIcon from '../../../../icons/Chef'
import RecipeIcon from '../../../../icons/Recipe'
import { RecipeCalculatorLandingStyles } from './RecipeCalculatorLanding.styles'
import { Translation } from '../../../i18n/Translation'
import { useNavigate } from 'react-router-dom'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'

const { Wrapper, Tile, TileButton } = RecipeCalculatorLandingStyles

const RecipeCalculatorLanding = () => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()
  const {
    actions: { toggleSearchRecipeModal, toggleEditMode },
  } = RecipeCalculatorState.useState()

  const onCreateNew = useCallback(() => {
    toggleEditMode()
    navigate('create-new')
  }, [navigate, toggleEditMode])

  return (
    <Wrapper>
      <Tile>
        <ChefIcon />
        <TileButton styleType="secondary" onClick={onCreateNew}>
          {translate('recipeCalculator.landing.createNew')}
        </TileButton>
      </Tile>

      <Tile>
        <RecipeIcon />
        <TileButton styleType="secondary" onClick={toggleSearchRecipeModal}>
          {translate('recipeCalculator.landing.loadExisting')}
        </TileButton>
      </Tile>
    </Wrapper>
  )
}

export default RecipeCalculatorLanding
