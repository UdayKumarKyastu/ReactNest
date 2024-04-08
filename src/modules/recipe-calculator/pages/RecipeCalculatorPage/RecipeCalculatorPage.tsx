import React from 'react'
import { RecipeCalculatorPageStyles } from './RecipeCalculatorPage.styles'
import { Translation } from '../../../i18n/Translation'
import { Chevron, Notice } from '@pretamanger/component-library'
import { Routes, useLocation, useNavigate } from 'react-router-dom'
import { Route } from 'react-router'
import RecipeCalculatorLanding from '../../components/RecipeCalculatorLanding/RecipeCalculatorLanding'
import RecipeCalculatorCreateNew from '../../components/RecipeCalculatorCreateNew/RecipeCalculatorCreateNew'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import RecipeCalculatorModals from '../../components/RecipeCalculatorModals/RecipeCalculatorModals'
import { Routes as AppRoutes } from '../../../routing/Routes'

const { BackToSearchButton, Wrapper, Title, ContentWrapper } = RecipeCalculatorPageStyles

const RecipeCalculatorPage = () => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <RecipeCalculatorState.Provider>
      <Wrapper>
        <div>
          <BackToSearchButton onClick={() => navigate('/')}>
            <Chevron type="left" />
            {translate('recipeCalculator.pretPortalHome')}
          </BackToSearchButton>
        </div>

        <section>
          <Title>{translate('recipeCalculator.title')}</Title>
          <Notice title={translate('recipeCalculator.toastMessage')} variant="warning" />

          <ContentWrapper>
            <Routes location={location}>
              <Route path={''} element={<RecipeCalculatorLanding />} />
              <Route
                path={AppRoutes.RecipeCalculator.createNew}
                element={<RecipeCalculatorCreateNew />}
              />
            </Routes>
          </ContentWrapper>
        </section>
      </Wrapper>

      <RecipeCalculatorModals />
    </RecipeCalculatorState.Provider>
  )
}

export default RecipeCalculatorPage
