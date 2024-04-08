import { CountryCode } from '../../../shared/model/country-code'
import { LocaleMock } from '../../i18n/LocaleMock'
import { GetLiveSoonProductsDto } from '../dto/get-live-soon-products.dto'

export const liveSoonProductDto: GetLiveSoonProductsDto.ProductGroup = {
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
          versionNumber: 1,
        },
      ],
    },
  ],
}
