import { CountryCode } from '../../../shared/model/country-code'
import { LocaleMock } from '../../i18n/LocaleMock'
import { GetPendingReviewProductsDto } from '../dto/get-pending-review-products.dto'

export const pendingRewievProductDto: GetPendingReviewProductsDto.ProductGroup = {
  changesCount: 1,
  countryCode: CountryCode.UK,
  sku: 'UK123',
  imageUrl: '',
  name: LocaleMock.createMultiLangMock(`Test name`),
  variants: [
    {
      name: LocaleMock.createMultiLangMock(`Test variant name`),
      changesCount: 1,
      countryCode: CountryCode.UK,
      sku: 'UK123',
      imageUrl: '',
      isMaster: true,
      recipeID: null,
      versionNumber: 1,
      versions: [
        {
          name: LocaleMock.createMultiLangMock('Test version name'),
          sku: 'UK123',
          imageUrl: '',
          isMaster: true,
          recipeID: null,
          changesCount: 1,
          countryCode: CountryCode.UK,
          versionNumber: 1,
        },
      ],
    },
  ],
}
