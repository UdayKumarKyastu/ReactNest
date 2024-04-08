import RecipeCard from './RecipeCard'
import { render } from '@testing-library/react'
import { formatDateToLocale } from '../../../../util/formatDateToLocale'

describe('RecipeCard', () => {
  it('passed props are displayed properly', () => {
    const RECIPE_ID = 'id123'
    const PRODUCT_SKU = 'sku123'
    const LAST_UPDATED = '11-22-2022'
    const { getByText } = render(
      <RecipeCard recipeId={RECIPE_ID} productSku={PRODUCT_SKU} lastUpdated={LAST_UPDATED} />,
    )

    expect(getByText(RECIPE_ID)).toBeTruthy()
    expect(getByText(PRODUCT_SKU)).toBeTruthy()
    expect(getByText(formatDateToLocale(LAST_UPDATED, 'en-GB'))).toBeTruthy()
  })

  it('default props', () => {
    const { getByText, getAllByText } = render(<RecipeCard />)
    expect(getAllByText('Unassigned')).toHaveLength(2)
    expect(getByText('N/A')).toBeInTheDocument()
  })
})
