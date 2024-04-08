import { GetPendingReviewProductsDto } from 'src/modules/home/dto/get-pending-review-products.dto'
import { LocaleMock } from 'src/modules/i18n/LocaleMock'
import { CountryCode } from 'src/shared/model/country-code'

type ProductGroup = GetPendingReviewProductsDto.ProductGroup

export const getPendingReviewResponseMock = (
  productGroupsQuantity: number,
  productGroupChanges: number = 1,
  variantChanges: number = 1,
  versionChanges: number = 1,
  countryCode: CountryCode = CountryCode.UK,
): GetPendingReviewProductsDto.PendingReviewProductsResponse => {
  const productGroups: ProductGroup[] = []

  for (let i = 1; i <= productGroupsQuantity; i++) {
    const productSku = `UKP${i.toString().padStart(5, '0')}`
    const variantSku = `UKVAR${i.toString().padStart(5, '0')}`
    const variantHg = `HGVAR${i.toString().padStart(5, '0')}`
    const versionSku = `UKVER${i.toString().padStart(5, '0')}`
    const versionHg = `HGVER${i.toString().padStart(5, '0')}`

    const group: ProductGroup = {
      changesCount: productGroupChanges,
      countryCode: countryCode,
      sku: productSku,
      imageUrl: '',
      name: LocaleMock.createMultiLangMock(`${countryCode} | Product group name mock ${i}`),
      variants:
        variantChanges > 0 || versionChanges > 0
          ? [
              {
                name: LocaleMock.createMultiLangMock(`${countryCode} | Variant name mock ${i}`),
                changesCount: variantChanges,
                countryCode: countryCode,
                sku: variantSku,
                imageUrl: '',
                isMaster: true,
                recipeID: variantHg,
                versionNumber: 1,
                versions:
                  versionChanges > 0
                    ? [
                        {
                          name: LocaleMock.createMultiLangMock(
                            `${countryCode} | Version name mock ${i}`,
                          ),
                          sku: versionSku,
                          imageUrl: '',
                          isMaster: true,
                          recipeID: versionHg,
                          changesCount: versionChanges,
                          countryCode: countryCode,
                          versionNumber: 1,
                        },
                      ]
                    : [],
              },
            ]
          : [],
    }

    productGroups.push(group)
  }

  return { productGroups: productGroups }
}
