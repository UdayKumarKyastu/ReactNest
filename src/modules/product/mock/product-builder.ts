import { Product } from '../model/product'
import { ProductVariant } from '../model/product-variant'
import { DraftChanges } from '../model/draft-changes'
import { ProductMock } from './product.mock'

export class ProductBuilder {
  private readonly product: Partial<Product> = {
    ...ProductMock.noVariants,
  }

  withVariants(variants: ProductVariant[]) {
    this.product.variants = variants
    return this
  }

  withDraftChanges(draftChanges: DraftChanges) {
    this.product.draftChanges = draftChanges
    return this
  }

  withMasterVariant(variant: ProductVariant) {
    this.product.masterVariant = {
      ...variant,
      isMaster: true,
    }
    return this
  }

  build() {
    return { ...this.product } as Product
  }
}
