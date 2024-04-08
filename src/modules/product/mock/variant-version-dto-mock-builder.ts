import { LocaleMock } from '../../../modules/i18n/LocaleMock'
import { GetProductVariantVersionDto } from '../dto/get-product-variant-version.dto'
import { GetProductDto } from '../dto/get-product.dto'
import { LiveStatus } from '../model/live-status'
import { VariantVersionPublishState } from '../model/variant-version-publish-state'

type VersionDto = GetProductVariantVersionDto
type VariantDto = GetProductDto.ProductVariant

export class VariantVersionResponseMockBuilder {
  private version: VersionDto = {
    id: '',
    key: '',
    publishState: VariantVersionPublishState.FUTURE,
    variantVersion: 0,
    approvedTabs: {
      labelling: false,
      marketing: false,
      pricing: false,
      reporting: false,
    },
    draftTabs: {
      labelling: false,
      marketing: false,
      pricing: false,
      reporting: false,
    },
    variant: {
      name: LocaleMock.createMultiLangMock('Version name mock'),
      description: {
        standard: LocaleMock.createMultiLangMock('Version description mock'),
      },
      sku: '',
      starKisProductCategoryID: null,
      starKisProductSubCategoryID: null,
      pluReportingName: null,
      pluPrimaryCategoryID: null,
      pluSecondaryCategoryID: null,
      productRange: [],
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
        canBeCookedInTurboChef: false,
        useByTurboChef: null,
        sellByTurboChef: null,
        productServes: null,
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
      parentProductSku: null,
      createdAt: null,
      published: false,
    },
    draft: {
      name: LocaleMock.createMultiLangMock('Version name mock'),
      description: {
        standard: LocaleMock.createMultiLangMock('Version description mock'),
      },
      sku: '',
      starKisProductCategoryID: null,
      starKisProductSubCategoryID: null,
      pluReportingName: null,
      pluPrimaryCategoryID: null,
      pluSecondaryCategoryID: null,
      productRange: [],
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
        canBeCookedInTurboChef: false,
        useByTurboChef: null,
        sellByTurboChef: null,
        productServes: null,
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
      parentProductSku: null,
      createdAt: null,
      published: false,
      changesCount: {
        marketing: 0,
        reporting: 0,
        attributes: 0,
        total: 0,
        pricing: 0,
        labelling: 0,
      },
    },
  }

  constructor(versionResponse: Partial<VersionDto> = {}) {
    this.version = {
      ...this.version,
      ...JSON.parse(JSON.stringify(versionResponse)),
    }
  }

  private fillVersionData(variant: VariantDto) {
    this.version.variantVersion = variant.version
    this.version.key = `${variant.hamiltonGrant.productCode}-${variant.version}`
    this.version.variant = { ...variant }
    this.version.draft = { ...variant }
  }

  fromVariant(variant: VariantDto) {
    this.fillVersionData(variant)

    return this
  }

  withApprovedTabs(approvedTabs: VersionDto['approvedTabs']) {
    this.version.approvedTabs = { ...approvedTabs }

    return this
  }

  withDraftTabs(draftTabs: VersionDto['approvedTabs']) {
    this.version.draftTabs = { ...draftTabs }

    return this
  }

  withDraftChanges(draft: Partial<VersionDto['draft']>) {
    this.version.draft = {
      ...this.version.draft,
      ...draft,
    }

    if (this.version.draft.changesCount!.total === 0) {
      throw new Error('Total changes count has to be greater than 0 if draft changes exists')
    }

    return this
  }

  withHgProductCode(hgCode: string) {
    this.version.variant.hamiltonGrant.productCode = hgCode
    this.version.key = `${hgCode}-${this.version.variantVersion}`

    return this
  }

  withVersionNumber(version: number) {
    if (version < 1 || !Number.isInteger(version)) {
      throw new Error('version number needs to be integer greater than 0')
    }
    this.version.variantVersion = version
    this.version.variant.version = version
    this.version.key = `${this.version.variant.hamiltonGrant.productCode}-${version}`

    return this
  }

  withAvailibility(availability: Partial<VersionDto['variant']['availability']>) {
    this.version.variant.availability = {
      ...this.version.variant.availability!,
      ...availability,
    }
    this.version.draft.availability = {
      ...this.version.draft.availability!,
      ...availability,
    }

    return this
  }

  withHamiltonGrant(hamiltonGrant: Partial<VersionDto['variant']['hamiltonGrant']>) {
    this.version.variant.hamiltonGrant = {
      ...this.version.variant.hamiltonGrant!,
      ...hamiltonGrant,
    }
    this.version.draft.hamiltonGrant = {
      ...this.version.draft.hamiltonGrant!,
      ...hamiltonGrant,
    }

    return this
  }

  setPublishState(state: VariantVersionPublishState) {
    this.version.publishState = state

    return this
  }

  build() {
    if (!this.version.publishState) {
      throw new Error('publishState needs to be specified')
    }
    if (!this.version.variant.hamiltonGrant.productCode) {
      throw new Error('hamilton grant product code needs to be specified')
    }
    if (!this.version.variantVersion) {
      throw new Error('variant version number needs to be specified')
    }
    if (!this.version.key) {
      throw new Error('variant key needs to be specified')
    }

    return this.version
  }
}
