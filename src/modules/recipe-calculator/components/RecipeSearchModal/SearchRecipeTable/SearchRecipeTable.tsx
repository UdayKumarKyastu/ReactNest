import React, { useCallback } from 'react'
import { SearchRecipeTableStyles } from './SearchRecipeTable.styles'
import { Recipe } from '../../../model/Recipe'
import { Translation } from '../../../../i18n/Translation'
import { Locale } from '../../../../i18n/Locale'
import { formatDateToLocale } from '../../../../../util/formatDateToLocale'
import RecipeIcon from '../../../../../icons/Recipe'
import CountryBadge from '../../../../common/components/CountryBadge/CountryBadge'

const { Table, TableRow, TableHeader, TableBody, RecipeNameIcon, RecipeNameWrapper, RecipeName } =
  SearchRecipeTableStyles

interface Props {
  recipesList: Recipe[]
  selectRecipe: (recipe: Recipe) => void
}

const SearchRecipeTable = ({ recipesList, selectRecipe }: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const onRecipeSelect = useCallback(
    (recipe: Recipe) => {
      selectRecipe(recipe)
    },
    [selectRecipe],
  )

  return (
    <Table data-testid="search-recipe-table">
      <TableHeader>
        <TableRow>
          <td>{translate('recipeCalculator.searchRecipesModal.recipeName')}</td>
          <td>{translate('recipeCalculator.searchRecipesModal.recipeId')}</td>
          <td>{translate('recipeCalculator.searchRecipesModal.productSku')}</td>
          <td>{translate('recipeCalculator.searchRecipesModal.recipeLastModified')}</td>
        </TableRow>
      </TableHeader>

      <TableBody>
        {recipesList.map((recipe) => (
          <TableRow
            key={`recipe-row-${recipe.id}`}
            onClick={() => onRecipeSelect(recipe)}
            data-testid="recipe-row"
          >
            <td>
              <RecipeNameWrapper>
                <RecipeNameIcon>
                  <RecipeIcon size={10} color="#9F1B32" />
                </RecipeNameIcon>
                <div>
                  <RecipeName>{recipe.name}</RecipeName>
                  {recipe.country && <CountryBadge countryCode={recipe.country} />}
                </div>
              </RecipeNameWrapper>
            </td>
            <td>{recipe.id}</td>
            <td>{recipe.sku || ''}</td>
            <td>{formatDateToLocale(recipe.modifiedAt, locale)}</td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SearchRecipeTable
