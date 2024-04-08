import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { ProductCategory } from 'src/modules/product/model/product-category'

type CategoryTree = GetProductDto.ProductCategoryTree
type CategoryBranch = CategoryTree[0]

export const createSingleCategoryBranch = (
  key: string,
  id: string,
  name: string,
): CategoryBranch => {
  return {
    key,
    id,
    name: {
      'zh-HK': name + '-ZH',
      'fr-FR': name + '-FR',
      'en-US': name + '-US',
      'en-GB': name + '-GB',
      'en-HK': name + '-enHK',
    },
  }
}

export const createSingleCategoryByNames = (...names: string[]): CategoryTree => {
  const singleCategory: CategoryTree = []
  let index = 1

  names.forEach((name) => {
    const key = `UK${index.toString().padStart(4, '0')}`
    const id = `${index.toString().padStart(4, '0')}-`.repeat(4).slice(0, -1)
    singleCategory.push(createSingleCategoryBranch(key, id, name))
    index++
  })

  return singleCategory
}

export const getUkCategoriesResponseMock = () => {
  const nestedCategories: ProductCategory[] = [
    {
      categoryID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
      parentID: null,
      categoryName: {
        'en-GB': 'UK',
        'en-US': 'UK',
        'fr-FR': '',
        'en-HK': '',
        'zh-HK': '',
      },
      key: 'UK',
      categories: [
        {
          categoryID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
          parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
          categoryName: {
            'en-GB': 'Breakfast',
            'en-US': 'Breakfast',
            'fr-FR': '',
            'en-HK': '',
            'zh-HK': '',
          },
          key: 'UK0004',
          categories: [
            {
              categoryID: '03f3dd55-b667-4746-89d9-f5bc9f464e2d',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Breakfast baguettes',
                'en-US': 'Breakfast baguettes',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0002',
              categories: [],
            },
            {
              categoryID: 'f7a6e512-d821-481d-b029-88ffbdc2c58c',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Breakfast porridge',
                'en-US': 'Breakfast porridge',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0016',
              categories: [],
            },
            {
              categoryID: '645d7f12-eb4b-45be-8adc-2649e37884c7',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Breakfast pastries',
                'en-US': 'Breakfast pastries',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0017',
              categories: [],
            },
            {
              categoryID: '91d5a8d5-7410-47ec-a4f7-cc5ea035ecba',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Brioche and rolls',
                'en-US': 'Brioche and rolls',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0018',
              categories: [],
            },
            {
              categoryID: '5689e9d3-d99f-44ea-adeb-ca904a9115d0',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Birchers and yoghurt bowls',
                'en-US': 'Birchers and yoghurt bowls',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0019',
              categories: [],
            },
            {
              categoryID: '302a37fd-62c0-45da-a127-f49bcd2b2d94',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'Omelettes',
                'en-US': 'Omelettes',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0020',
              categories: [],
            },
            {
              categoryID: 'aaa88edb-cc39-4aa3-9a3d-b4d8021df922',
              parentID: 'fe4949e9-36f6-4f9e-918b-1212c4d2c43e',
              categoryName: {
                'en-GB': 'test buguette category',
                'en-US': 'test buguette category',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0020',
              categories: [],
            },
          ],
        },
        {
          categoryID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
          parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
          categoryName: {
            'en-GB': 'Cold drinks',
            'en-US': 'Cold drinks',
            'fr-FR': '',
            'en-HK': '',
            'zh-HK': '',
          },
          key: 'UK0008',
          categories: [
            {
              categoryID: 'a4a3c42b-36eb-4842-8d6f-ad5ab9c15966',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Juices',
                'en-US': 'Cold Coffee',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'juices',
              categories: [],
            },
            {
              categoryID: 'c37c2bea-48ce-486a-9eda-353782a1baa4',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Frappes',
                'en-US': '',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'Frappes',
              categories: [],
            },
            {
              categoryID: '9190a705-7f00-4838-b13c-8bf859e808bf',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Iced coffee and frappes',
                'en-US': 'Iced coffee and frappes',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0012',
              categories: [],
            },
            {
              categoryID: '3727c2a7-0136-4aa2-9625-e29f6fb7a345',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Iced tea and other iced drinks',
                'en-US': 'Iced tea and other iced drinks',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0013',
              categories: [],
            },
            {
              categoryID: '5d9ea8f1-f561-4cd6-807e-7bd9378f77cb',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Water and soft drinks',
                'en-US': 'Water and soft drinks',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0014',
              categories: [],
            },
            {
              categoryID: '830ca573-9c71-423d-bf7b-c4d97ac2c0c4',
              parentID: '55c4103c-dc19-4ebe-b14a-66406f96a34f',
              categoryName: {
                'en-GB': 'Juices and smoothies',
                'en-US': 'Juices and smoothies',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0015',
              categories: [],
            },
          ],
        },
        {
          categoryID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
          parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
          categoryName: {
            'en-GB': 'Platters',
            'en-US': 'Platters',
            'fr-FR': '',
            'en-HK': '',
            'zh-HK': '',
          },
          key: 'UK0151',
          categories: [
            {
              categoryID: '4f0b9eea-1f02-4886-844d-156f8078bc0a',
              parentID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
              categoryName: {
                'en-GB': 'Sandwich and baguette platters',
                'en-US': 'Sandwich and baguette platters',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0044',
              categories: [],
            },
            {
              categoryID: '97d78c6f-3b34-4c45-b2db-90347d1494fd',
              parentID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
              categoryName: {
                'en-GB': 'Pastry platters',
                'en-US': 'Pastry platters',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0045',
              categories: [],
            },
            {
              categoryID: 'ab8c1548-3569-4714-bdd7-5d00f87f0f69',
              parentID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
              categoryName: {
                'en-GB': 'Sweet platters',
                'en-US': 'Sweet platters',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0046',
              categories: [],
            },
            {
              categoryID: 'a583fc81-e7ce-4ae3-9aaa-54554255b6ee',
              parentID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
              categoryName: {
                'en-GB': 'Salad platters',
                'en-US': 'Salad platters',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0047',
              categories: [],
            },
            {
              categoryID: '25b2e14c-b1ee-4d3a-835e-16a5e882c5cc',
              parentID: '0dd3fead-48d7-4784-a0b8-0a3324599806',
              categoryName: {
                'en-GB': 'Bundles',
                'en-US': 'Bundles',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0048',
              categories: [],
            },
          ],
        },
        {
          categoryID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
          parentID: 'e3218cc1-3da2-4ea5-9663-34aa18a7c996',
          categoryName: {
            'en-GB': 'Hot drinks',
            'en-US': 'Hot drinks',
            'fr-FR': '',
            'en-HK': '',
            'zh-HK': '',
          },
          key: 'UK0011',
          categories: [
            {
              categoryID: 'd50c6e05-e68f-4e8e-8c81-4484a8f0ce28',
              parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
              categoryName: {
                'en-GB': 'Tea and other hot drinks',
                'en-US': 'Tea and other hot drinks',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0149',
              categories: [],
            },
            {
              categoryID: '46e4af9c-ebe0-4d01-8710-3dd4818b6561',
              parentID: '6bc3740c-69b8-400f-89ff-d1aeb472c0c1',
              categoryName: {
                'en-GB': 'Coffee',
                'en-US': 'Coffee',
                'fr-FR': '',
                'en-HK': '',
                'zh-HK': '',
              },
              key: 'UK0009',
              categories: [],
            },
          ],
        },
      ],
    },
  ]

  return {
    categories: nestedCategories,
  }
}
