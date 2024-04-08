import { ProductVariantVersion } from '../model/product-variant'

interface Tabs {
  marketing: boolean
  labelling?: boolean
  pricing: boolean
  reporting: boolean
  baristaAttributes: boolean
}

export class ProductVariantVersionBuilder {
  private readonly variantVersion: Partial<ProductVariantVersion> = {
    version: 1,
  }

  withApprovedTabs(tabs: Tabs) {
    this.variantVersion.approvedTabs = tabs
    return this
  }

  withDraftTabs(tabs: Tabs) {
    this.variantVersion.draftTabs = tabs
    return this
  }

  build(): ProductVariantVersion {
    return { ...this.variantVersion } as ProductVariantVersion
  }
}
