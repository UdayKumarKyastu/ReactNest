import { LocaleMock } from '../../i18n/LocaleMock'
import { GetProductDto } from '../dto/get-product.dto'
import { BaristaVariantAttributes } from '../model/barista-attributes'
import { BaristaSetup } from '../model/product-setup'
import { ChangeStatus, ReviewStatus } from '../model/review-status'

type ProductDto = GetProductDto.Product
type VariantDto = GetProductDto.ProductVariant
type ProductResponseDto = GetProductDto.ProductResponse
type DraftChangesDto = GetProductDto.ProductResponse['draftChanges']
export type ProductSetupEditableForUser = Pick<
  BaristaSetup,
  | 'iceMachineRequired'
  | 'blenderRequired'
  | 'canHaveVariants'
  | 'canAddSyrup'
  | 'canAddExtraCoffeeShot'
  | 'canAddWhippedCream'
>

export class DraftChangesMockBuilder {
  private draftChanges: DraftChangesDto = {
    name: LocaleMock.createMultiLangMock('Variant name mock'),
    description: LocaleMock.createMultiLangMock('Variant description mock'),
    lastEdit: '',
    taxCategory: { id: '', name: '', amount: 0 },
    variants: [],
    categories: [],
    changesCount: {
      marketing: 0,
      setUp: 0,
      categories: 0,
      total: 0,
    },
    setUp: null,
    reviewStatuses: {
      setUp: {},
      categories: [],
    },
  }

  constructor(product: ProductDto) {
    this.fillDraftChanges(product)
  }

  private fillDraftChanges(product: ProductDto) {
    const productData: ProductDto = JSON.parse(JSON.stringify(product))
    this.draftChanges = {
      name: productData.name,
      description: productData.description,
      categories: productData.categories,
      setUp: productData.setUp,
      lastEdit: new Date(new Date().getDate() - 1).toISOString(),
      taxCategory: productData.taxCategory!,
      variants: this.getVariantsWithEmptyChangesCount(productData.variants),
      changesCount: {
        marketing: 0,
        setUp: 0,
        categories: 0,
        total: 0,
      },
      reviewStatuses: {
        setUp: {},
        categories: [],
      },
    }
  }

  private getVariantsWithEmptyChangesCount(variants: VariantDto[]) {
    const draftVariants: ProductResponseDto['draftChanges']['variants'] = variants.map((v) => {
      return {
        ...v,
        changesCount: {
          marketing: 0,
          attributes: 0,
          reporting: 0,
          pricing: 0,
          labelling: 0,
          total: 0,
        },
      }
    })

    return draftVariants
  }

  replaceVariantAttributes(variantIndex: number, newAttributes: VariantDto['attributes']) {
    const currentAttributes = this.draftChanges.variants[variantIndex].attributes!

    this.draftChanges.variants[variantIndex].changesCount.attributes = Object.keys(
      currentAttributes,
    ).filter((key) => {
      return (
        currentAttributes[key as keyof VariantDto['attributes']] !==
        newAttributes![key as keyof VariantDto['attributes']]
      )
    }).length

    this.draftChanges.variants[variantIndex].changesCount.total +=
      this.draftChanges.variants[variantIndex].changesCount.attributes

    this.draftChanges.variants[variantIndex].attributes = {
      ...newAttributes,
    } as BaristaVariantAttributes

    return this
  }

  replaceVariantPluReportingName(
    variantIndex: number,
    newPluReportingName: VariantDto['pluReportingName'],
  ) {
    this.draftChanges.variants[variantIndex].changesCount.reporting++
    this.draftChanges.variants[variantIndex].changesCount.total++

    this.draftChanges.variants[variantIndex].pluReportingName = newPluReportingName

    return this
  }

  replaceVariantParentProductSku(
    variantIndex: number,
    newParentProductSku: VariantDto['parentProductSku'],
  ) {
    this.draftChanges.variants[variantIndex].changesCount.reporting++
    this.draftChanges.variants[variantIndex].changesCount.total++

    this.draftChanges.variants[variantIndex].pluReportingName = newParentProductSku

    return this
  }

  replaceProductMenuCategory(categories: ProductDto['categories']) {
    const diffA = this.draftChanges.categories.filter((cat) => !categories.includes(cat)).length
    const diffB = categories.filter((cat) => !this.draftChanges.categories.includes(cat)).length
    const categoriesChanges = diffA + diffB
    this.draftChanges.changesCount.categories += categoriesChanges
    this.draftChanges.changesCount.total += categoriesChanges

    this.draftChanges.categories = [...this.draftChanges.categories, ...categories]

    categories.forEach((categoryTree, index) => {
      this.draftChanges.reviewStatuses!.categories.push({
        modifiedAt: '2022-04-19T15:18:50.607Z',
        status: ChangeStatus.Pending,
        user: {
          name: '',
          id: '',
        },
        value: [categoryTree[categoryTree.length - 1].id],
      })
    })
    return this
  }

  replaceProductSetup(setup: ProductSetupEditableForUser) {
    let currentSetup: GetProductDto.BaristaSetup
    if (this.draftChanges.setUp) {
      currentSetup = this.draftChanges.setUp
    } else {
      throw new Error('Product setup cant be null to make setup draft changes')
    }
    const setupChanges = Object.keys(setup).filter((key) => {
      return (
        setup[key as keyof ProductSetupEditableForUser] !==
        currentSetup[key as keyof ProductDto['setUp']]
      )
    }).length
    this.draftChanges.changesCount.setUp += setupChanges
    this.draftChanges.changesCount.total += setupChanges

    Object.assign(this.draftChanges.setUp, setup)

    return this
  }

  withReviewStatuses(
    sectionName: 'categories' | 'setUp',
    fieldName: any,
    reviewStatus: ReviewStatus,
  ) {
    const defaultReviewStatuses = {
      categories: {},
      setUp: {},
      marketing: {},
    }
    this.draftChanges.reviewStatuses = {
      ...defaultReviewStatuses,
      ...this.draftChanges?.reviewStatuses,
    }
    this.draftChanges.reviewStatuses[sectionName] = {
      ...this.draftChanges.reviewStatuses?.[sectionName],
    }
    this.draftChanges.reviewStatuses[sectionName][fieldName] = {
      ...this.draftChanges.reviewStatuses?.[sectionName]?.[fieldName],
      ...reviewStatus,
    }
    return this
  }

  replaceVariantName(variantIndex: number, newName: VariantDto['name'], reviewStatus?: any) {
    const variant = this.draftChanges.variants[variantIndex]
    const currentName = variant.name
    const nameChanges = Object.keys(currentName).filter((key) => {
      return (
        currentName[key as keyof VariantDto['name']] !== newName[key as keyof VariantDto['name']]
      )
    }).length

    variant.changesCount.marketing += nameChanges
    variant.changesCount.total += nameChanges
    if (reviewStatus) {
      variant.reviewStatuses = {
        marketing: {
          name: {
            ...reviewStatus,
          },
        },
      }
    }
    variant.name = JSON.parse(JSON.stringify(newName))

    return this
  }

  replaceVariantDescription(
    variantIndex: number,
    newDescription: VariantDto['description']['standard'],
    reviewStatus?: any,
  ) {
    const currentDesc = this.draftChanges.variants[variantIndex].description.standard
    const descChanges = Object.keys(currentDesc).filter((key) => {
      return (
        currentDesc[key as keyof VariantDto['description']['standard']] !==
        newDescription[key as keyof VariantDto['description']['standard']]
      )
    }).length
    this.draftChanges.variants[variantIndex].changesCount.marketing += descChanges
    this.draftChanges.variants[variantIndex].changesCount.total += descChanges

    this.draftChanges.variants[variantIndex].description.standard = { ...newDescription }
    if (reviewStatus) {
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.description = {
        ...reviewStatus,
      }
    }

    return this
  }

  replaceAvailability(
    variantIndex: number,
    newAvailability: VariantDto['availability'],
    reviewStatus?: any,
  ) {
    let availabilityChanges = 0
    const currentAvailability = this.draftChanges.variants[variantIndex].availability
    if (
      currentAvailability.availableForClickAndCollect !==
      newAvailability.availableForClickAndCollect
    ) {
      availabilityChanges += 1
      this.draftChanges.variants[
        variantIndex
      ].reviewStatuses.marketing.availableForClickAndCollect = {
        ...reviewStatus.availableForClickAndCollect,
      }
    }
    if (currentAvailability.availableForOutposts !== newAvailability.availableForOutposts) {
      availabilityChanges += 1
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.availableForOutposts = {
        ...reviewStatus.availableForOutposts,
      }
    }
    if (currentAvailability.visibleOnDeliveryWebsite !== newAvailability.visibleOnDeliveryWebsite) {
      availabilityChanges += 1
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.visibleOnDeliveryWebsite = {
        ...reviewStatus.visibleOnDeliveryWebsite,
      }
    }
    if (currentAvailability.availableForLunch !== newAvailability.availableForLunch) {
      availabilityChanges += 1
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.availableForLunch = {
        ...reviewStatus.availableForLunch,
      }
    }
    if (currentAvailability.isLive !== newAvailability.isLive) {
      availabilityChanges += 1
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.isLive = {
        ...reviewStatus.isLive,
      }
    }

    this.draftChanges.variants[variantIndex].changesCount.marketing += availabilityChanges
    this.draftChanges.variants[variantIndex].changesCount.total += availabilityChanges
    this.draftChanges.variants[variantIndex].availability = JSON.parse(
      JSON.stringify({
        ...this.draftChanges.variants[variantIndex].availability,
        ...newAvailability,
      }),
    )
    return this
  }

  replaceHowToDisplay(
    variantIndex: number,
    newDisplay: VariantDto['howToDisplay'],
    reviewStatus?: any,
  ) {
    let howToDisplayChanges = 0
    const currentDisplay = this.draftChanges.variants[variantIndex].howToDisplay
    if (currentDisplay !== newDisplay) {
      howToDisplayChanges += 1
      this.draftChanges.variants[variantIndex].reviewStatuses.marketing.howToDisplay = {
        ...reviewStatus,
      }
    }
    this.draftChanges.variants[variantIndex].changesCount.marketing += howToDisplayChanges
    this.draftChanges.variants[variantIndex].changesCount.total += howToDisplayChanges

    this.draftChanges.variants[variantIndex].howToDisplay = {
      ...reviewStatus,
    }
    this.draftChanges.variants[variantIndex].howToDisplay = [...newDisplay]

    return this
  }

  replaceVariantLabelling(variantIndex: number, newLabelling: VariantDto['labelling']) {
    let labellingChanges = 0
    const currentLabelling = this.draftChanges.variants[variantIndex].labelling
    if (currentLabelling.legalTitle !== newLabelling.legalTitle) {
      labellingChanges++
    }
    if (currentLabelling.countryOfOriginDescription !== newLabelling.countryOfOriginDescription) {
      labellingChanges++
    }
    if (
      (currentLabelling.storageConditions === null && newLabelling.storageConditions !== null) ||
      currentLabelling.storageConditions !== newLabelling.storageConditions
    ) {
      labellingChanges++
    }
    if (
      (currentLabelling.useBy === null && newLabelling.useBy !== null) ||
      currentLabelling.useBy !== newLabelling.useBy
    ) {
      labellingChanges++
    }
    if (
      (currentLabelling.sellBy === null && newLabelling.sellBy !== null) ||
      currentLabelling.sellBy !== newLabelling.sellBy
    ) {
      labellingChanges++
    }
    if (currentLabelling.includeAverageWeightOnLabel !== newLabelling.includeAverageWeightOnLabel) {
      labellingChanges++
    }
    if (currentLabelling.ean13Code !== newLabelling.ean13Code) {
      labellingChanges++
    }
    this.draftChanges.variants[variantIndex].changesCount.labelling = labellingChanges
    this.draftChanges.variants[variantIndex].changesCount.total += labellingChanges

    this.draftChanges.variants[variantIndex].labelling = JSON.parse(JSON.stringify(newLabelling))

    return this
  }

  build(): DraftChangesDto {
    return this.draftChanges
  }
}
