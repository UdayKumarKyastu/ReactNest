import React, { useCallback, useMemo } from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
import RecipeTitle from '../RecipeTitle/RecipeTitle'
import RecipeCalculatorNoGoodsView from './RecipeCalculatorNoGoodsView/RecipeCalculatorNoGoodsView'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import RecipeCostsTable from '../RecipeCostsTable/RecipeCostsTable'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import { RecipeCalculatorCreateNewStyles } from './RecipeCalculatorCreateNew.styles'
import EditModeToggle from './EditModeToggle/EditModeToggle'
import { usePrompt } from '../../hooks/usePrompt'
import { Translation } from '../../../i18n/Translation'

const { Header } = RecipeCalculatorCreateNewStyles

const RecipeCalculatorCreateNew = () => {
  const {
    selectors: {
      recipeGoods,
      recipeId,
      recipeSku,
      recipeLastModified,
      editMode,
      goodsOriginals,
      recipeName,
    },
    actions,
  } = RecipeCalculatorState.useState()
  const { translate } = Translation.useTranslation()

  const hasAnythingChanged = useMemo(() => {
    return recipeGoods.some((good) => {
      const original = goodsOriginals.find(({ id }) => id === good.id)
      return original?.cost !== good.cost || original?.quantity !== good.quantity
    })
  }, [goodsOriginals, recipeGoods])

  usePrompt(translate('recipeCalculator.createNew.areYouSure'), hasAnythingChanged)

  const totalCost = useMemo(() => {
    return recipeGoods.reduce((acc, item) => {
      const cost = Number(item.cost.centAmount) / 100
      return item.removed ? acc : acc + item.quantity * cost
    }, 0)
  }, [recipeGoods])

  const onCloseEditMode = useCallback(() => {
    if (window.confirm(translate('recipeCalculator.createNew.areYouSure'))) {
      actions.toggleEditMode()
    }
  }, [actions, translate])

  return (
    <>
      <Header>
        <RecipeTitle showEditOption={editMode} />
        <EditModeToggle
          editMode={editMode}
          openEditMode={actions.toggleEditMode}
          closeEditMode={onCloseEditMode}
        />
      </Header>

      <RecipeCard recipeId={recipeId} productSku={recipeSku} lastUpdated={recipeLastModified} />
      {!recipeGoods.length && <RecipeCalculatorNoGoodsView />}
      {!!recipeGoods.length && (
        <RecipeCostsTable
          recipeGoods={recipeGoods}
          onAddGoods={actions.toggleGoodsModal}
          onRemoveGood={actions.removeFromRecipe}
          onRestoreGood={actions.restoreGood}
          onEditCost={actions.editCost}
          onEditQuantity={actions.editQuantity}
          editMode={editMode}
          goodsOriginals={goodsOriginals}
          onResetGoods={actions.resetGoods}
          onResetQuantity={actions.resetQuantity}
          onResetCost={actions.resetCost}
          totalCost={totalCost}
        />
      )}

      {!!recipeGoods.length && (
        <PriceCalculator
          recipeName={recipeName}
          totalCost={totalCost}
          recipeGoods={recipeGoods}
          editMode={editMode}
        />
      )}
    </>
  )
}

export default RecipeCalculatorCreateNew
