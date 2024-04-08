import { render } from '@testing-library/react'
import { ProductVariantNutritionalsPage } from './ProductVariantNutritionalsPage'
import { LocaleMock } from '../../../i18n/LocaleMock'

const MULTILANG_MOCK = LocaleMock.createMultiLangMock('ingredients')
const MULTILANG_MOCK2 = LocaleMock.createMultiLangMock('allergens')

describe('ProductVariantNutritionalsPage', () => {
  it('checkboxes for vegan and vegetarians should be checked by default and disabled', () => {
    const { container } = render(
      <ProductVariantNutritionalsPage
        nutrition={[]}
        isVegan
        isVegetarian
        size={1}
        allergens={[]}
        ingredients={MULTILANG_MOCK}
      />,
    )
    expect(container.querySelector('#isVegan')).toHaveAttribute('checked')
    expect(container.querySelector('#isVegetarian')).toBeChecked()

    expect(container.querySelector('#isVegan')).toHaveAttribute('checked')
    expect(container.querySelector('#isVegetarian')).toBeDisabled()
  })

  it('properly renders all allergens', () => {
    const allergensMock = [
      { name: 'allergen1', label: MULTILANG_MOCK },
      { name: 'allergen2', label: MULTILANG_MOCK2 },
    ]

    const { container } = render(
      <ProductVariantNutritionalsPage
        nutrition={[]}
        isVegan
        isVegetarian
        size={1}
        allergens={allergensMock}
        ingredients={MULTILANG_MOCK}
      />,
    )

    expect(container.querySelectorAll('li')).toHaveLength(allergensMock.length)
  })

  it('no allergens passed', () => {
    const { container } = render(
      <ProductVariantNutritionalsPage
        nutrition={[]}
        isVegan
        isVegetarian
        size={1}
        allergens={[]}
        ingredients={MULTILANG_MOCK}
      />,
    )

    const element = container.querySelector('[data-cy=allergens-field]')
    expect(element).toHaveTextContent('-')
  })
})
