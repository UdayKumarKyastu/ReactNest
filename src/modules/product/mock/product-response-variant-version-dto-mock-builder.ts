import { Locale } from 'src/modules/i18n/Locale'
import { LocaleMock } from 'src/modules/i18n/LocaleMock'
import { VariantVersionPublishState } from '../model/variant-version-publish-state'
import { GetProductDto } from '../dto/get-product.dto'

export type ProductResponseVariantVersion = {
  id: string
  liveFrom: string
  name: Locale.MultilangString
  version: number
  key: string
  sku: string
  hgCode: string
  publishState: VariantVersionPublishState
}

export class ProductResponseVariantVersionsMockBuilder {
  private version: Partial<ProductResponseVariantVersion> = {
    id: '',
    liveFrom: '',
    name: LocaleMock.createMultiLangMock('Version name mock'),
    version: 0,
    key: '',
    sku: '',
    hgCode: '',
  }

  constructor(version: Partial<ProductResponseVariantVersion> = {}) {
    this.version = {
      ...this.version,
      ...JSON.parse(JSON.stringify(version)),
    }
  }

  fromVariant(variant: GetProductDto.ProductVariant) {
    this.version.name = variant.name
    this.version.sku = variant.sku
    if (variant.hamiltonGrant.productCode) {
      this.version.hgCode = variant.hamiltonGrant.productCode
    }
    if (variant.version) {
      this.version.version = variant.version
    }
    this.version.key = `${this.version.hgCode}-${this.version.version}`

    return this
  }

  withLiveFrom(liveFrom: Date) {
    this.version.liveFrom = liveFrom.toISOString().substring(0, 10)

    return this
  }

  withVersionNumber(versionNumber: number) {
    this.version.version = versionNumber
    this.version.key = `${this.version.hgCode}-${versionNumber}`

    return this
  }

  withPublishState(state: VariantVersionPublishState) {
    this.version.publishState = state

    return this
  }

  withName(newName: Locale.MultilangString | string) {
    if (typeof newName === 'string') {
      this.version.name = LocaleMock.createMultiLangMock(newName)
    } else {
      this.version.name = newName
    }

    return this
  }

  build() {
    if (!this.version.publishState) {
      throw new Error('publishState needs to be specified')
    }

    return this.version as ProductResponseVariantVersion
  }
}
