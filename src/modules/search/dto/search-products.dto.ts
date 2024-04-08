export namespace SearchProductsDto {
  export interface BaseMeta {
    name: Record<string, string>
    sku: string
    masterSku: string
    hgCode: string | null
    countryCode: string
    createdAt: string
    visibleOnWebsite: boolean
    published: boolean
  }

  export interface SearchedProductGroup extends BaseMeta {
    variants: SearchedProductVariant[]
    visibleOnWebsiteVariants: number
  }
  export interface SearchedProductVariant extends BaseMeta {
    hgCode: string | null
    imageUrl: string | null
    isMaster: boolean
  }
  export interface Response {
    products: SearchedProductGroup[]
    total: number
  }
}
