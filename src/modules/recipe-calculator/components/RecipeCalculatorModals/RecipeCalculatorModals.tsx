import React from 'react'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import AddGoodsModal from '../AddGoodsModal/AddGoodsModal'
import CreateGoodModal from '../CreateGoodModal/CreateGoodModal'
import RecipeSearchModal from '../RecipeSearchModal/RecipeSearchModal'

const RecipeCalculatorModals = () => {
  const {
    selectors: { isGoodsModalOpen, isCreateGoodModalOpen, isSearchRecipeModalOpen },
  } = RecipeCalculatorState.useState()

  return (
    <>
      {isGoodsModalOpen && <AddGoodsModal />}
      {isCreateGoodModalOpen && <CreateGoodModal />}
      {isSearchRecipeModalOpen && <RecipeSearchModal />}
    </>
  )
}

export default RecipeCalculatorModals
