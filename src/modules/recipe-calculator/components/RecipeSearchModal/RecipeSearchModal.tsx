import React, { useCallback, useMemo, useState } from 'react'
import { Modal } from '@pretamanger/component-library'
import { RecipeCalculatorApi } from '../../api/recipeCalculator.api'
import { RecipeSearchModalStyles } from './RecipeSearchModal.styles'
import { Translation } from '../../../i18n/Translation'
import { Search } from '../../../products/components/search'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { Recipe } from '../../model/Recipe'
import RecipeCalculatorNoResults from '../RecipeCalculatorNoResults/RecipeCalculatorNoResults'
import { useNavigate } from 'react-router-dom'
import SearchRecipeTable from './SearchRecipeTable/SearchRecipeTable'
import { Routes as AppRoutes } from '../../../routing/Routes'

const { Title, SearchWrapper, ResultsLabel, ModalWrapper } = RecipeSearchModalStyles

const RecipeSearchModal = () => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const { getRecipes, getRecipeGoods } = RecipeCalculatorApi.useGetRecipes()
  const [recipesList, setRecipesList] = useState<Recipe[]>([])
  const {
    actions: { toggleSearchRecipeModal, selectRecipe },
  } = RecipeCalculatorState.useState()

  const onSearch = useCallback(
    async (query: string, propertyName: string) => {
      try {
        setLoading(true)
        const recipes = await getRecipes(query, propertyName)
        setRecipesList(recipes)
      } finally {
        setLoading(false)
        setSearchSubmitted(true)
      }
    },
    [getRecipes],
  )

  const onCreateNew = useCallback(() => {
    toggleSearchRecipeModal()
    navigate(AppRoutes.RecipeCalculator.createNew)
  }, [toggleSearchRecipeModal, navigate])

  const onRecipeSelect = useCallback(
    async (recipe: Recipe) => {
      navigate(AppRoutes.RecipeCalculator.createNew)
      const goods = await getRecipeGoods(recipe.starkisId)
      selectRecipe(recipe, goods)
    },
    [getRecipeGoods, navigate, selectRecipe],
  )

  const resultsLabel = useMemo(() => {
    return recipesList.length === 1
      ? translate('recipeCalculator.searchRecipesModal.oneResult')
      : translate('recipeCalculator.searchRecipesModal.results', { count: recipesList.length })
  }, [recipesList, translate])

  return (
    <ModalWrapper extended={searchSubmitted} data-testid="recipe-search-modal">
      <Modal open onClose={toggleSearchRecipeModal}>
        <Title>{translate('recipeCalculator.searchRecipesModal.title')}</Title>

        <SearchWrapper>
          <Search onSearch={onSearch} isSearching={loading} />
        </SearchWrapper>

        {searchSubmitted && <ResultsLabel data-testid="results-label">{resultsLabel}</ResultsLabel>}

        {searchSubmitted && !recipesList.length && (
          <RecipeCalculatorNoResults
            actionLabel="recipeCalculator.searchRecipesModal.createNewRecipe"
            action={onCreateNew}
          />
        )}

        {!!recipesList.length && (
          <SearchRecipeTable recipesList={recipesList} selectRecipe={onRecipeSelect} />
        )}
      </Modal>
    </ModalWrapper>
  )
}

export default RecipeSearchModal
