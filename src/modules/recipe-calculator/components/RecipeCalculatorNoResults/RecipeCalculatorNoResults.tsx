import React from 'react'
import { RecipeCalculatorNoResultsStyles } from './RecipeCalculatorNoResults.styles'
import { Translation } from '../../../i18n/Translation'
import MagnifyIcon from '../../../../icons/Magnify'

const { Wrapper, Title, StyledButton, Description } = RecipeCalculatorNoResultsStyles

interface Props {
  action?: () => void
  actionLabel?: string
}

const RecipeCalculatorNoResults = ({ action, actionLabel }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper data-testid="recipe-calc-no-results">
      <MagnifyIcon height={70} width={70} />
      <Title>{translate('recipeCalculator.addGoodsModal.nothingFound')}</Title>
      <Description>{translate('recipeCalculator.addGoodsModal.noResultsDescription')}</Description>

      {!!action && !!actionLabel && (
        <StyledButton styleType="secondary" compact onClick={action}>
          {translate(actionLabel)}
        </StyledButton>
      )}
    </Wrapper>
  )
}

export default RecipeCalculatorNoResults
