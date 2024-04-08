import { getSelectedCategoriesFromTree } from './EditMenuCategoryModal'
import { LocaleMock } from '../../../i18n/LocaleMock'
import { categoriesTree } from '../../mock/categories-tree.mock'
import { Locale } from '../../../i18n/Locale'
import { ProductCategory } from '../../model/product-category'
import { CountryCode } from '../../../../shared/model/country-code'

const createMultiLandMock = LocaleMock.createMultiLangMock
const countryCode: CountryCode = CountryCode.UK

const mockedCategories: { key: string; name: Locale.MultilangString; id: string }[] = [
  {
    name: createMultiLandMock('UK'),
    id: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
    key: 'UK',
  },
  {
    name: createMultiLandMock('Hot drinks'),
    id: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
    key: 'UK0011',
  },
  {
    name: createMultiLandMock('Coffee'),
    id: '46e4af9c-ebe0-4d01-8710-3dd4818b6561',
    key: 'UK0009',
  },
]

const result: ProductCategory[] = [
  {
    categories: [
      {
        categoryID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
        categoryName: createMultiLandMock('Hot drinks'),
        key: 'UK0011',
        parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
        categories: [
          {
            categories: [],
            categoryID: 'd50c6e05-e68f-4e8e-8c81-4484a8f0ce28',
            categoryName: createMultiLandMock('Tea and other hot drinks'),
            key: 'UK0149',
            parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
          },
          {
            categories: [],
            categoryID: '46e4af9c-ebe0-4d01-8710-3dd4818b6561',
            categoryName: createMultiLandMock('Coffee'),
            key: 'UK0009',
            parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
          },
        ],
      },
      {
        categories: [],
        categoryID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
        categoryName: createMultiLandMock('Cold Drinks'),
        key: 'UK0008',
        parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
      },
    ],
    categoryID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
    categoryName: createMultiLandMock('UK'),
    key: 'UK',
    parentID: null,
  },
  {
    categoryID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
    categoryName: createMultiLandMock('Hot drinks'),
    key: 'UK0011',
    parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
    categories: [
      {
        categories: [],
        categoryID: 'd50c6e05-e68f-4e8e-8c81-4484a8f0ce28',
        categoryName: createMultiLandMock('Tea and other hot drinks'),
        key: 'UK0149',
        parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
      },
      {
        categories: [],
        categoryID: '46e4af9c-ebe0-4d01-8710-3dd4818b6561',
        categoryName: createMultiLandMock('Coffee'),
        key: 'UK0009',
        parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
      },
    ],
  },
  {
    categories: [],
    categoryID: '46e4af9c-ebe0-4d01-8710-3dd4818b6561',
    categoryName: createMultiLandMock('Coffee'),
    key: 'UK0009',
    parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
  },
]

describe('EditMenuCategoryModal', () => {
  describe('getSelectedCategoriesFromTree', () => {
    it('returns proper categories from tree', () => {
      expect(getSelectedCategoriesFromTree(mockedCategories, categoriesTree, countryCode)).toEqual(
        result,
      )
      expect(
        getSelectedCategoriesFromTree([mockedCategories[0]], categoriesTree, countryCode),
      ).toEqual([result[0]])
      expect(
        getSelectedCategoriesFromTree(
          [mockedCategories[0], mockedCategories[1]],
          categoriesTree,
          countryCode,
        ),
      ).toEqual([result[0], result[1]])
    })

    it('returns one category based on country code if categories are not passed', () => {
      const categories = getSelectedCategoriesFromTree(null, categoriesTree, countryCode)

      const result = categoriesTree.find((category) => category.key === countryCode)

      expect(categories).toEqual([result])
    })
  })
})
