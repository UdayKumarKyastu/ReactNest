import React, { useCallback, useMemo, useState } from 'react'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { AddGoodsModalStyles } from './AddGoodsModal.styles'
import { Translation } from '../../../i18n/Translation'
import { Search } from '../../../products/components/search'
import { Modal } from '@pretamanger/component-library'
import { RecipeCalculatorApi } from '../../api/recipeCalculator.api'
import SearchGoodsTable from './SearchGoodsTable/SearchGoodsTable'
import SelectedGoodsTable from './SelectedGoodsTable/SelectedGoodsTable'
import RecipeCalculatorNoResults from '../RecipeCalculatorNoResults/RecipeCalculatorNoResults'

const { ModalWrapper, Title, SearchWrapper, ResultsLabel, AddToRecipeButton } = AddGoodsModalStyles

const AddGoodsModal = () => {
  const { translate } = Translation.useTranslation()
  const {
    selectors: { isGoodsModalOpen, goodsSearchList, selectedGoods },
    actions,
  } = RecipeCalculatorState.useState()
  const { getGoods, getGoodsDetails } = RecipeCalculatorApi.useGetGoods()
  const [loading, setLoading] = useState(false)
  const [addingToRecipe, setAddingToRecipe] = useState(false)
  const [searchSubmitted, setSearchSubmitted] = useState(false)

  const onSearch = useCallback(
    async (query: string, propertyName: string) => {
      try {
        setLoading(true)
        const goods = await getGoods(query, propertyName)
        actions.updateGoodsSearchList(goods)
      } finally {
        setLoading(false)
        setSearchSubmitted(true)
      }
    },
    [actions, getGoods],
  )

  const resultsLabel = useMemo(() => {
    return goodsSearchList.length === 1
      ? translate('recipeCalculator.addGoodsModal.oneResult')
      : translate('recipeCalculator.addGoodsModal.results', { count: goodsSearchList.length })
  }, [goodsSearchList, translate])

  const onAddToRecipe = useCallback(async () => {
    setAddingToRecipe(true)
    const ids = selectedGoods.map(({ id }) => id)
    const goods = await getGoodsDetails(ids)
    actions.addToRecipe(goods)
    setAddingToRecipe(false)
  }, [actions, getGoodsDetails, selectedGoods])

  return (
    <ModalWrapper extended={searchSubmitted} data-testid="add-goods-modal">
      <Modal open={isGoodsModalOpen} onClose={actions.toggleGoodsModal}>
        <Title>{translate('recipeCalculator.addGoodsModal.title')}</Title>

        <SearchWrapper>
          <Search
            onSearch={onSearch}
            isSearching={loading}
            parametersNames={[
              'recipeCalculator.addGoodsModal.goods',
              'recipeCalculator.addGoodsModal.hamiltonGrant',
            ]}
          />
        </SearchWrapper>

        {searchSubmitted && !!goodsSearchList.length && <ResultsLabel>{resultsLabel}</ResultsLabel>}

        {!!goodsSearchList.length && (
          <SearchGoodsTable
            onSelect={actions.selectGood}
            goodsList={goodsSearchList}
            selectedGoods={selectedGoods}
          />
        )}
        {!!selectedGoods.length && (
          <SelectedGoodsTable unSelectGood={actions.unselectGood} selectedGoods={selectedGoods} />
        )}

        {!!goodsSearchList.length && (
          <AddToRecipeButton
            activity={addingToRecipe}
            compact
            disabled={!selectedGoods.length}
            onClick={onAddToRecipe}
          >
            {translate('recipeCalculator.addGoodsModal.addToRecipe')}
          </AddToRecipeButton>
        )}

        {searchSubmitted && !goodsSearchList.length && (
          <RecipeCalculatorNoResults
            action={actions.toggleCreateGoodModal}
            actionLabel="recipeCalculator.addGoodsModal.createGoods"
          />
        )}
      </Modal>
    </ModalWrapper>
  )
}

export default AddGoodsModal
