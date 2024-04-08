import { LocaleMock } from '../../i18n/LocaleMock'
import { Locale } from '../../i18n/Locale'
import { GetProductDto } from '../dto/get-product.dto'
import { BaristaVariantAttributes } from '../model/barista-attributes'
import { ChannelPrice } from '../model/price'
import { BaristaSetup } from '../model/product-setup'

type LiveStatus = GetProductDto.LiveStatus
type VariantDto = GetProductDto.ProductVariant
type VariantVersionsDto = GetProductDto.ProductVariant['versions']
export type ProductSetupEditableForUser = Pick<
  BaristaSetup,
  | 'iceMachineRequired'
  | 'blenderRequired'
  | 'canHaveVariants'
  | 'canAddSyrup'
  | 'canAddExtraCoffeeShot'
  | 'canAddWhippedCream'
>

export class ProductVariantDtoMockBuilder {
  private productVariant: Partial<VariantDto> = {
    name: LocaleMock.createMultiLangMock('Variant name mock'),
    description: {
      standard: LocaleMock.createMultiLangMock('Variant description mock'),
    },
    sku: '',
    starKisProductCategoryID: null,
    starKisProductSubCategoryID: null,
    pluReportingName: null,
    pluPrimaryCategoryID: null,
    pluSecondaryCategoryID: null,
    howToDisplay: [],
    posID: null,
    size: 0,
    prices: [],
    availability: {
      availableForClickAndCollect: false,
      availableForOutposts: false,
      availableForPretDelivers: false,
      isChefsSpecial: false,
      visibleOnDeliveryWebsite: false,
      isLive: false,
      availableAllDay: false,
      availableForLunch: false,
      displayAsNew: {
        isDisplayed: false,
        until: null,
      },
      liveSchedule: {
        on: null,
        off: null,
      },
    },
    labelling: {
      legalTitle: null,
      storageConditions: null,
      includeAverageWeightOnLabel: false,
      includeNutritionalInformationOnLabel: false,
      countryOfOriginDescription: null,
      ean13Code: null,
      useBy: null,
      sellBy: null,
      productServes: null,
      canBeCookedInTurboChef: false,
      useByTurboChef: null,
      sellByTurboChef: null,
      howToCard: {
        fileName: 'QR_CODE',
        qrPng: '',
        qrSvg: '<svg/>',
      },
    },
    attributes: null,
    image: null,
    status: 'ACTIVE' as LiveStatus,
    hamiltonGrant: {
      cuisine: {
        isVegan: false,
        isVegetarian: false,
      },
      productCode: null,
      allergens: [],
      lastSyncedAt: null,
      nutrition: [],
      ingredients: LocaleMock.createMultiLangMock('Ingridients list mock'),
      constituentHGCodes: [],
      hgRecipeStatus: null,
      recipeTypes: [],
    },
    isMaster: false,
    version: 0,
    versions: [],
    changesCount: {
      marketing: 0,
      reporting: 0,
      attributes: 0,
      pricing: 0,
      labelling: 0,
      total: 0,
    },
    reviewStatuses: null,
  }

  constructor(productVariant: Partial<VariantDto> = {}) {
    this.productVariant = {
      ...this.productVariant,
      ...JSON.parse(JSON.stringify(productVariant)),
    }
  }

  asMaster() {
    this.productVariant.isMaster = true

    return this
  }

  withAttributes(attributes?: Partial<BaristaVariantAttributes>) {
    if (!attributes) {
      this.productVariant.attributes = {
        withDecafPods: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withSoyMilk: false,
        withoutMilk: false,
      }
    } else {
      this.productVariant.attributes = {
        withDecafPods: false,
        withOatMilk: false,
        withRiceCoconutMilk: false,
        withSemiSkimmedMilk: false,
        withSkimmedMilk: false,
        withSoyMilk: false,
        withoutMilk: false,
        ...attributes,
      }
    }

    return this
  }

  withLabelling(labelling: Partial<VariantDto['labelling']>) {
    this.productVariant.labelling = {
      ...this.productVariant.labelling!,
      ...labelling,
    }

    return this
  }

  withAvailability(availability: Partial<VariantDto['availability']>) {
    this.productVariant.availability = {
      ...this.productVariant.availability!,
      ...availability,
    }

    return this
  }

  withHamiltonGrant(hg: Partial<VariantDto['hamiltonGrant']>) {
    this.productVariant.hamiltonGrant = {
      ...this.productVariant.hamiltonGrant!,
      ...hg,
    }

    return this
  }

  withSku(sku: string) {
    this.productVariant.sku = sku

    return this
  }

  withName(name: Locale.MultilangString | string) {
    if (typeof name === 'string') {
      this.productVariant.name = LocaleMock.createMultiLangMock(name)
    } else {
      this.productVariant.name = name
    }

    return this
  }

  withDescription(description: Locale.MultilangString | string) {
    if (typeof description === 'string') {
      this.productVariant.description!.standard = LocaleMock.createMultiLangMock(description)
    } else {
      this.productVariant.description!.standard = description
    }

    return this
  }

  withReporting(
    reporting: Pick<
      VariantDto,
      | 'pluReportingName'
      | 'starKisProductCategoryID'
      | 'starKisProductSubCategoryID'
      | 'pluPrimaryCategoryID'
      | 'pluSecondaryCategoryID'
      | 'posID'
    >,
  ) {
    this.productVariant = {
      ...this.productVariant,
      ...reporting,
    }

    return this
  }

  withParentProductSku(parentSku: VariantDto['parentProductSku']) {
    this.productVariant.parentProductSku = parentSku

    return this
  }

  withHowToDisplay(howToDisplay: string[]) {
    this.productVariant.howToDisplay!.push(...howToDisplay)

    return this
  }

  withPrices(prices: ChannelPrice[]) {
    this.productVariant.prices!.push(...prices)

    return this
  }

  withStatus(status: VariantDto['status']) {
    this.productVariant.status = status

    return this
  }

  withVersionNumber(versionNumber: number) {
    this.productVariant.version = versionNumber

    return this
  }

  addVersions(versions: VariantVersionsDto) {
    versions.forEach((version) => {
      this.productVariant.versions!.push({ ...version })
    })

    return this
  }

  build(): VariantDto {
    if (!this.productVariant.sku) {
      throw new Error('SKU is required')
    }

    return this.productVariant as VariantDto
  }
}
