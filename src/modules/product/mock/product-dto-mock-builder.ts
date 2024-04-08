import { LocaleMock } from '../../i18n/LocaleMock'
import { GetProductDto } from '../dto/get-product.dto'
import { CountryCode } from '../../../shared/model/country-code'
import { BaristaSetup } from '../model/product-setup'
import { ProductType } from '../model/product-type'

type ProductDto = GetProductDto.Product
type VariantDto = GetProductDto.ProductVariant
export type ProductSetupEditableForUser = Pick<
  BaristaSetup,
  | 'iceMachineRequired'
  | 'blenderRequired'
  | 'canHaveVariants'
  | 'canAddSyrup'
  | 'canAddExtraCoffeeShot'
  | 'canAddWhippedCream'
>

export class ProductDtoMockBuilder {
  private readonly product: Partial<ProductDto> = {
    name: LocaleMock.createMultiLangMock('Mock product name'),
    description: LocaleMock.createMultiLangMock('Mock product description'),
    variants: [],
    setUp: null,
    taxCategory: null,
    categories: [],
    country: 'United Kingdom',
    countryCode: CountryCode.UK,
    createdAt: null,
    published: true,
    type: ProductType.Food,
    takeAwayTaxDisabled: true,
  }

  constructor(product: Partial<ProductDto> = {}) {
    this.product = {
      ...this.product,
      ...JSON.parse(JSON.stringify(product)),
    }
  }

  setCountry(code: ProductDto['countryCode'], name: string) {
    this.product.country = name
    this.product.countryCode = code

    return this
  }

  setCreatedAt(createdAt: ProductDto['createdAt']) {
    this.product.createdAt = createdAt

    return this
  }

  setPublished(published: ProductDto['published']) {
    this.product.published = published

    return this
  }

  setProductType(type: ProductType) {
    this.product.type = type

    return this
  }

  setTaxCategory(taxCategory: ProductDto['taxCategory']) {
    this.product.taxCategory = taxCategory ? { ...taxCategory } : null

    return this
  }

  setSetup(setup?: ProductDto['setUp']) {
    this.product.type = ProductType.BaristaBeverage
    this.product.setUp = setup
      ? { ...setup }
      : {
          blenderRequired: false,
          canAddExtraCoffeeShot: false,
          canAddSyrup: false,
          canAddWhippedCream: false,
          canBeDecaf: false,
          canBeWithOatMilk: false,
          canBeWithoutMilk: false,
          canBeWithRiceCoconutMilk: false,
          canBeWithSemiSkimmedMilk: false,
          canBeWithSkimmedMilk: false,
          canBeWithSoyMilk: false,
          canHaveVariants: false,
          iceMachineRequired: false,
        }

    return this
  }

  setSpecificSetup(setup?: ProductDto['setUp']) {
    this.product.type = ProductType.BaristaBeverage
    this.product.setUp = setup || {
      blenderRequired: false,
      canAddExtraCoffeeShot: true,
      canAddSyrup: true,
      canAddWhippedCream: false,
      canBeDecaf: false,
      canBeWithOatMilk: true,
      canBeWithoutMilk: false,
      canBeWithRiceCoconutMilk: true,
      canBeWithSemiSkimmedMilk: true,
      canBeWithSkimmedMilk: true,
      canBeWithSoyMilk: true,
      canHaveVariants: true,
      iceMachineRequired: false,
    }

    return this
  }

  setMenuCategories(categories: ProductDto['categories']) {
    this.product.categories = [...categories]

    return this
  }

  addVariant(variant: VariantDto) {
    this.product.variants!.push({ ...variant })

    return this
  }

  addVariants(variants: VariantDto[]) {
    variants.forEach((variant) => {
      this.product.variants!.push({ ...variant })
    })

    return this
  }

  withTakeAwayTaxEnabled() {
    this.product.takeAwayTaxDisabled = false

    return this
  }

  build(): ProductDto {
    if (!this.product.variants!.find((v) => v.isMaster)) {
      throw new Error('At least one master variant is required')
    }

    return { ...this.product } as ProductDto
  }
}
