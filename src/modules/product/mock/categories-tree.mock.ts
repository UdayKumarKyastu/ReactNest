import { ProductCategory } from '../model/product-category'
import { LocaleMock } from '../../i18n/LocaleMock'

const createMultiLandMock = LocaleMock.createMultiLangMock

export const categoriesTree: ProductCategory[] = [
  {
    categories: [
      {
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
        categoryID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
        categoryName: createMultiLandMock('Hot drinks'),
        key: 'UK0011',
        parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
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
    categories: [],
    categoryID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
    categoryName: createMultiLandMock('HK'),
    key: 'HK',
    parentID: null,
  },
]
