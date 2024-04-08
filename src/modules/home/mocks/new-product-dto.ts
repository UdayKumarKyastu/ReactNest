import { CountryCode } from '../../../shared/model/country-code'
import { LocaleMock } from '../../i18n/LocaleMock'
import { GetNewProductsDto } from '../dto/get-new-products.dto'

export const newProductDto: GetNewProductsDto.ProductGroup = {
  countryCode: CountryCode.UK,
  sku: 'UK123',
  imageUrl: '',
  name: LocaleMock.createMultiLangMock(`Test name`),
  variants: [
    {
      name: LocaleMock.createMultiLangMock(`Test variant name`),
      countryCode: CountryCode.UK,
      sku: 'UK123',
      imageUrl: '',
      isMaster: true,
      recipeID: null,
      createdAt: '2020-04-09T17:18:53.589Z',
      versionNumber: 1,
      versions: [
        {
          name: LocaleMock.createMultiLangMock('Test version name'),
          sku: 'UK123',
          imageUrl: '',
          isMaster: true,
          recipeID: null,
          countryCode: CountryCode.UK,
          createdAt: '2020-04-09T17:18:53.589Z',
          versionNumber: 1,
        },
      ],
    },
  ],
}
