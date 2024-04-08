import { render } from '@testing-library/react'
import { RecipeStatusWithIcon } from './RecipeStatusWithIcon'
import { RecipeStatus } from '../../../../../shared/model/recipe-status'

describe('RecipeStatusWithIcon', () => {
  it('should display proper icon for approved recipe status', () => {
    const { getByTestId } = render(<RecipeStatusWithIcon recipeStatus={RecipeStatus.APPROVED} />)

    expect(getByTestId('approved-icon')).toBeInTheDocument()
  })

  it('should display proper icon for ready recipe status', () => {
    const { getByTestId } = render(<RecipeStatusWithIcon recipeStatus={RecipeStatus.READY} />)

    expect(getByTestId('ready-icon')).toBeInTheDocument()
  })

  it('should display proper icon for draft recipe status', () => {
    const { getByTestId } = render(<RecipeStatusWithIcon recipeStatus={RecipeStatus.DRAFT} />)

    expect(getByTestId('draft-icon')).toBeInTheDocument()
  })

  it('should display proper icon for deactivated recipe status', () => {
    const { getByTestId } = render(<RecipeStatusWithIcon recipeStatus={RecipeStatus.DEACTIVATED} />)

    expect(getByTestId('deactivated-icon')).toBeInTheDocument()
  })
})
