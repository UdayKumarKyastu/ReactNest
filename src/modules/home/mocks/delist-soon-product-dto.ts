import { CountryCode } from '../../../shared/model/country-code'
import { LocaleMock } from '../../i18n/LocaleMock'
import { GetDelistSoonProductsDto } from '../dto/get-delist-soon-products.dto'

export const delistSoonProductDto: GetDelistSoonProductsDto.ProductGroup = {
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
      liveFrom: '2020-04-09T17:18:53.589Z',
      liveTo: '2020-04-10T17:18:53.589Z',
      versionNumber: 1,
      versions: [
        {
          name: LocaleMock.createMultiLangMock('Test version name'),
          sku: 'UK123',
          imageUrl: '',
          isMaster: true,
          recipeID: null,
          countryCode: CountryCode.UK,
          liveFrom: '2020-04-09T17:18:53.589Z',
          liveTo: '2020-04-10T17:18:53.589Z',
          versionNumber: 1,
        },
      ],
    },
  ],
}
