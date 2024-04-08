import { GetProductDto } from '../dto/get-product.dto'
import { TaxCategory } from '../model/tax-category'
import { DraftChangesMockBuilder } from './draft-changes-dto-mock-builder'
import { ProductDtoMockBuilder } from './product-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from './product-variant-dto-mock-builder'

type ProductDto = GetProductDto.Product
type ProductResponseDto = GetProductDto.ProductResponse
type DraftChangesDto = GetProductDto.ProductResponse['draftChanges']

export class ProductResponseDtoMockBuilder {
  private productResponse: Partial<ProductResponseDto> = {
    taxCategories: [],
    version: 0,
    categories: [],
  }

  constructor(productResponse: Partial<ProductResponseDto> = {}) {
    this.productResponse = {
      ...this.productResponse,
      ...JSON.parse(JSON.stringify(productResponse)),
    }
  }

  setProduct(product: ProductDto) {
    this.productResponse.product = product
    this.productResponse.draftChanges = new DraftChangesMockBuilder(product).build()

    return this
  }

  setDraftChanges(draftChanges: DraftChangesDto) {
    this.productResponse.draftChanges = draftChanges

    return this
  }

  setTaxCategories(taxCategories: TaxCategory[]) {
    this.productResponse.taxCategories = taxCategories

    return this
  }

  setBasicRequiredData(masterVariantSku: string) {
    this.setProduct(
      new ProductDtoMockBuilder()
        .addVariant(new ProductVariantDtoMockBuilder().asMaster().withSku(masterVariantSku).build())
        .build(),
    )

    return this
  }

  build(): ProductResponseDto {
    if (!this.productResponse.product) {
      throw new Error('Product is required')
    }

    return { ...this.productResponse } as ProductResponseDto
  }
}
