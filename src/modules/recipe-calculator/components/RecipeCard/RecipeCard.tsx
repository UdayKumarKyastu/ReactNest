import React from 'react'
import { RecipeCardStyles } from './RecipeCard.styles'
import RecipeIcon from '../../../../icons/Recipe'
import { Translation } from '../../../i18n/Translation'
import { Locale } from '../../../i18n/Locale'
import { formatDateToLocale } from '../../../../util/formatDateToLocale'

const { Wrapper, IconBox, DescriptionWrapper, TextLabel, TextGroup } = RecipeCardStyles

interface Props {
  recipeId?: string
  productSku?: string
  lastUpdated?: string
}

const RecipeCard = ({ recipeId, productSku, lastUpdated }: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  return (
    <Wrapper data-testid="recipe-card">
      <IconBox>
        <RecipeIcon size={20} color="#9F1B32" />
      </IconBox>

      <DescriptionWrapper>
        <TextGroup>
          <TextLabel>{translate('recipeCalculator.createNew.recipeID')}</TextLabel>
          {recipeId || translate('recipeCalculator.createNew.unassigned')}
        </TextGroup>

        <TextGroup>
          <TextLabel>{translate('recipeCalculator.createNew.lastUpdated')}</TextLabel>
          {lastUpdated
            ? formatDateToLocale(lastUpdated, locale)
            : translate('recipeCalculator.createNew.na')}
        </TextGroup>

        <TextGroup>
          <TextLabel>{translate('recipeCalculator.createNew.productSku')}</TextLabel>
          {productSku || translate('recipeCalculator.createNew.unassigned')}
        </TextGroup>
      </DescriptionWrapper>
    </Wrapper>
  )
}

export default RecipeCard
