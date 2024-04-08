import { render } from '@testing-library/react'
import RecipeTitle from './RecipeTitle'

describe('RecipeTitle', () => {
  it('edit toggle is not visible in non edit mode', () => {
    const { container } = render(<RecipeTitle showEditOption={false} />)
    const editToggleElement = container.querySelector('[data-testid=edit-toggle]')
    expect(editToggleElement).toBeFalsy()
  })
})
