import React from 'react'
import ChefIcon from '../../../../../icons/Chef'
import { Button } from '@pretamanger/component-library'
import { Translation } from '../../../../i18n/Translation'
import { RecipeCalculatorNoGoodsViewStyles } from './RecipeCalculatorNoGoodsView.styles'
import { RecipeCalculatorState } from '../../../state/RecipeCalculatorState'

const { Wrapper } = RecipeCalculatorNoGoodsViewStyles

const RecipeCalculatorNoGoodsView = () => {
  const { translate } = Translation.useTranslation()
  const { actions } = RecipeCalculatorState.useState()

  return (
    <Wrapper data-testid="no-goods-view">
      <ChefIcon />
      <Button styleType="secondary" onClick={actions.toggleGoodsModal}>
        {translate('recipeCalculator.createNew.addGoods')}
      </Button>
    </Wrapper>
  )
}

export default RecipeCalculatorNoGoodsView
